"""Temporary runtime fix for Ring doorbell push events.

firebase-messaging 0.4.5 (used by the Ring integration) shuts its whole
FcmPushClient down on the first push whose ``crypto-key`` header is not
padded base64 or carries extra parameters (``dh=KEY; p256ecdsa=SIG``):
``binascii.Error: Incorrect padding``. Every doorbell press then kills the
listener, so ``event.front_door_ding`` never fires.

This patch, loaded via ``fcm_padding_fix:`` in configuration.yaml:
- keeps only the value of the ``dh=`` / ``salt=`` parameter and pads it,
- skips a message it still cannot decrypt instead of letting the error
  shut the client down.

It only applies to firebase-messaging <= 0.4.5. Remove this component (and
its configuration.yaml entry) once Home Assistant ships the upstream fix
(sdb9696/firebase-messaging PR #46; home-assistant/core#191852).
"""

from __future__ import annotations

import logging
from base64 import urlsafe_b64decode
from importlib.metadata import PackageNotFoundError, version

from homeassistant.components import persistent_notification
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

DOMAIN = "fcm_padding_fix"
PATCHED_UP_TO = (0, 4, 5)

_LOGGER = logging.getLogger(__name__)


def _version_tuple(text: str) -> tuple[int, ...]:
    parts: list[int] = []
    for piece in text.split("."):
        digits = "".join(ch for ch in piece if ch.isdigit())
        if not digits:
            break
        parts.append(int(digits))
    return tuple(parts)


def _clean_b64(value: str, prefix: str) -> bytes:
    """Return the decoded value of one header parameter.

    Accepts "KEY", "dh=KEY", "KEY; p256ecdsa=SIG" or "dh=KEY;p256ecdsa=SIG".
    """
    chosen = value
    for param in value.split(";"):
        param = param.strip()
        if param.startswith(prefix):
            chosen = param[len(prefix) :]
            break
    else:
        chosen = value.split(";")[0]
    chosen = chosen.strip()
    chosen += "=" * (-len(chosen) % 4)
    return urlsafe_b64decode(chosen.encode("ascii"))


def _apply_patch() -> str:
    """Patch the client; return "patched", "outdated" or "missing"."""
    try:
        installed = version("firebase-messaging")
    except PackageNotFoundError:
        _LOGGER.warning("firebase-messaging is not installed; nothing to patch")
        return "missing"
    if _version_tuple(installed) > PATCHED_UP_TO:
        _LOGGER.warning(
            "firebase-messaging %s is newer than %s; the upstream fix is likely "
            "included, so the patch is skipped. Remove custom_components/%s",
            installed,
            ".".join(map(str, PATCHED_UP_TO)),
            DOMAIN,
        )
        return "outdated"

    from cryptography.hazmat.backends import default_backend
    from cryptography.hazmat.primitives.serialization import load_der_private_key
    from firebase_messaging import fcmpushclient
    from http_ece import decrypt as http_decrypt

    client_cls = fcmpushclient.FcmPushClient
    if getattr(client_cls, "_fcm_padding_fix", False):
        return "patched"

    def _decrypt_raw_data(credentials, crypto_key_str, salt_str, raw_data):
        # The caller already cut the first 3 / 5 characters ("dh=" / "salt="),
        # so look for the parameter name only when it is still there.
        crypto_key = _clean_b64(crypto_key_str, "dh=")
        salt = _clean_b64(salt_str, "salt=")
        der_data = urlsafe_b64decode(
            credentials["keys"]["private"].encode("ascii") + b"========"
        )
        secret = urlsafe_b64decode(
            credentials["keys"]["secret"].encode("ascii") + b"========"
        )
        privkey = load_der_private_key(
            der_data, password=None, backend=default_backend()
        )
        return http_decrypt(
            raw_data,
            salt=salt,
            private_key=privkey,
            dh=crypto_key,
            version="aesgcm",
            auth_secret=secret,
        )

    original_handle = client_cls._handle_data_message

    def _handle_data_message(self, msg):
        try:
            original_handle(self, msg)
        except Exception:  # noqa: BLE001 - one bad push must not stop the client
            _LOGGER.exception(
                "Skipped an FCM push that could not be handled (persistent id %s)",
                getattr(msg, "persistent_id", "?"),
            )

    client_cls._decrypt_raw_data = staticmethod(_decrypt_raw_data)
    client_cls._handle_data_message = _handle_data_message
    client_cls._fcm_padding_fix = True
    _LOGGER.warning(
        "Patched firebase-messaging %s FcmPushClient (padding fix for Ring push "
        "events). Temporary: remove once HA ships the upstream fix",
        installed,
    )
    return "patched"


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Patch the FCM client before (or after) the Ring integration starts."""
    result = await hass.async_add_executor_job(_apply_patch)
    if result == "outdated":
        persistent_notification.async_create(
            hass,
            "Home Assistant now ships a newer firebase-messaging, so the temporary "
            "Ring push patch is no longer applied. Remove custom_components/"
            f"{DOMAIN} and the `{DOMAIN}:` line in configuration.yaml, then check "
            "that a doorbell press still fires event.front_door_ding.",
            title="Ring push patch can be removed",
            notification_id=DOMAIN,
        )
    return True
