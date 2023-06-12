"""Implements application_credentials support for Miele integration."""
from homeassistant.components.application_credentials import AuthorizationServer
from homeassistant.core import HomeAssistant
from pymiele import OAUTH2_AUTHORIZE, OAUTH2_TOKEN


async def async_get_authorization_server(hass: HomeAssistant) -> AuthorizationServer:
    """Return authorization server."""
    return AuthorizationServer(authorize_url=OAUTH2_AUTHORIZE, token_url=OAUTH2_TOKEN)


async def async_get_description_placeholders(hass: HomeAssistant) -> dict[str, str]:
    """Return description placeholders for the credentials dialog."""
    return {
        "register_url": "https://www.miele.com/f/com/en/register_api.aspx",
    }
