function t(){return document.querySelector("hc-main")?document.querySelector("hc-main").hass:document.querySelector("home-assistant")?document.querySelector("home-assistant").hass:void 0}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),i=new Map;class s{constructor(t,e){if(this._$cssResult$=!0,e!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=i.get(this.cssText);return e&&void 0===t&&(i.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new s("string"==typeof t?t:t+"",o))(e)})(t):t;var r;const a=window.reactiveElementPolyfillSupport,d={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},l=(t,e)=>e!==t&&(e==e||t==t),c={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:l};class h extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,o)=>{const i=this._$Eh(o,e);void 0!==i&&(this._$Eu.set(i,o),t.push(i))})),t}static createProperty(t,e=c){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const o="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,o,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(i){const s=this[t];this[e]=i,this.requestUpdate(t,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||c}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of e)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eh(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,o;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(o=t.hostConnected)||void 0===o||o.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const o=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{e?t.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):o.forEach((e=>{const o=document.createElement("style"),i=window.litNonce;void 0!==i&&o.setAttribute("nonce",i),o.textContent=e.cssText,t.appendChild(o)}))})(o,this.constructor.elementStyles),o}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$Eg(t,e,o=c){var i,s;const n=this.constructor._$Eh(t,o);if(void 0!==n&&!0===o.reflect){const r=(null!==(s=null===(i=o.converter)||void 0===i?void 0:i.toAttribute)&&void 0!==s?s:d.toAttribute)(e,o.type);this._$Ei=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Ei=null}}_$AK(t,e){var o,i,s;const n=this.constructor,r=n._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=n.getPropertyOptions(r),a=t.converter,l=null!==(s=null!==(i=null===(o=a)||void 0===o?void 0:o.fromAttribute)&&void 0!==i?i:"function"==typeof a?a:null)&&void 0!==s?s:d.fromAttribute;this._$Ei=r,this[r]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,o){let i=!0;void 0!==t&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||l)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,o))):i=!1),!this.isUpdatePending&&i&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(o)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$EU()}updated(t){}firstUpdated(t){}}var u;h.finalized=!0,h.elementProperties=new Map,h.elementStyles=[],h.shadowRootOptions={mode:"open"},null==a||a({ReactiveElement:h}),(null!==(r=globalThis.reactiveElementVersions)&&void 0!==r?r:globalThis.reactiveElementVersions=[]).push("1.0.1");const p=globalThis.trustedTypes,m=p?p.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,v="?"+f,y=`<${v}>`,_=document,g=(t="")=>_.createComment(t),$=t=>null===t||"object"!=typeof t&&"function"!=typeof t,w=Array.isArray,b=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,E=/-->/g,A=/>/g,S=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,C=/'/g,U=/"/g,N=/^(?:script|style|textarea)$/i,M=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),P=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),x=new WeakMap,O=_.createTreeWalker(_,129,null,!1),R=(t,e)=>{const o=t.length-1,i=[];let s,n=2===e?"<svg>":"",r=b;for(let e=0;e<o;e++){const o=t[e];let a,d,l=-1,c=0;for(;c<o.length&&(r.lastIndex=c,d=r.exec(o),null!==d);)c=r.lastIndex,r===b?"!--"===d[1]?r=E:void 0!==d[1]?r=A:void 0!==d[2]?(N.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=S):void 0!==d[3]&&(r=S):r===S?">"===d[0]?(r=null!=s?s:b,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,a=d[1],r=void 0===d[3]?S:'"'===d[3]?U:C):r===U||r===C?r=S:r===E||r===A?r=b:(r=S,s=void 0);const h=r===S&&t[e+1].startsWith("/>")?" ":"";n+=r===b?o+y:l>=0?(i.push(a),o.slice(0,l)+"$lit$"+o.slice(l)+f+h):o+f+(-2===l?(i.push(void 0),e):h)}const a=n+(t[o]||"<?>")+(2===e?"</svg>":"");return[void 0!==m?m.createHTML(a):a,i]};class T{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[d,l]=R(t,e);if(this.el=T.createElement(d,o),O.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=O.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(f)){const o=l[n++];if(t.push(e),void 0!==o){const t=i.getAttribute(o.toLowerCase()+"$lit$").split(f),e=/([.?@])?(.*)/.exec(o);a.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?I:"?"===e[1]?j:"@"===e[1]?z:q})}else a.push({type:6,index:s})}for(const e of t)i.removeAttribute(e)}if(N.test(i.tagName)){const t=i.textContent.split(f),e=t.length-1;if(e>0){i.textContent=p?p.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],g()),O.nextNode(),a.push({type:2,index:++s});i.append(t[e],g())}}}else if(8===i.nodeType)if(i.data===v)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(f,t+1));)a.push({type:7,index:s}),t+=f.length-1}s++}}static createElement(t,e){const o=_.createElement("template");return o.innerHTML=t,o}}function k(t,e,o=t,i){var s,n,r,a;if(e===P)return e;let d=void 0!==i?null===(s=o._$Cl)||void 0===s?void 0:s[i]:o._$Cu;const l=$(e)?void 0:e._$litDirective$;return(null==d?void 0:d.constructor)!==l&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===l?d=void 0:(d=new l(t),d._$AT(t,o,i)),void 0!==i?(null!==(r=(a=o)._$Cl)&&void 0!==r?r:a._$Cl=[])[i]=d:o._$Cu=d),void 0!==d&&(e=k(t,d._$AS(t,e.values),d,i)),e}class H{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:o},parts:i}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:_).importNode(o,!0);O.currentNode=s;let n=O.nextNode(),r=0,a=0,d=i[0];for(;void 0!==d;){if(r===d.index){let e;2===d.type?e=new L(n,n.nextSibling,this,t):1===d.type?e=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(e=new B(n,this,t)),this.v.push(e),d=i[++a]}r!==(null==d?void 0:d.index)&&(n=O.nextNode(),r++)}return s}m(t){let e=0;for(const o of this.v)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class L{constructor(t,e,o,i){var s;this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cg=null===(s=null==i?void 0:i.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=k(this,t,e),$(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==P&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return w(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==D&&$(this._$AH)?this._$AA.nextSibling.data=t:this.S(_.createTextNode(t)),this._$AH=t}T(t){var e;const{values:o,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=T.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.m(o);else{const t=new H(s,this),e=t.p(this.options);t.m(o),this.S(e),this._$AH=t}}_$AC(t){let e=x.get(t.strings);return void 0===e&&x.set(t.strings,e=new T(t)),e}M(t){w(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const s of t)i===e.length?e.push(o=new L(this.A(g()),this.A(g()),this,this.options)):o=e[i],o._$AI(s),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var o;for(null===(o=this._$AP)||void 0===o||o.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class q{constructor(t,e,o,i,s){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=D}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,i){const s=this.strings;let n=!1;if(void 0===s)t=k(this,t,e,0),n=!$(t)||t!==this._$AH&&t!==P,n&&(this._$AH=t);else{const i=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=k(this,i[o+r],e,r),a===P&&(a=this._$AH[r]),n||(n=!$(a)||a!==this._$AH[r]),a===D?t=D:t!==D&&(t+=(null!=a?a:"")+s[r+1]),this._$AH[r]=a}n&&!i&&this.k(t)}k(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class I extends q{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===D?void 0:t}}class j extends q{constructor(){super(...arguments),this.type=4}k(t){t&&t!==D?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class z extends q{constructor(t,e,o,i,s){super(t,e,o,i,s),this.type=5}_$AI(t,e=this){var o;if((t=null!==(o=k(this,t,e,0))&&void 0!==o?o:D)===P)return;const i=this._$AH,s=t===D&&i!==D||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==D&&(i===D||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;"function"==typeof this._$AH?this._$AH.call(null!==(o=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==o?o:this.element,t):this._$AH.handleEvent(t)}}class B{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){k(this,t)}}const V=window.litHtmlPolyfillSupport;var J,W;null==V||V(T,L),(null!==(u=globalThis.litHtmlVersions)&&void 0!==u?u:globalThis.litHtmlVersions=[]).push("2.0.1");class K extends h{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,o)=>{var i,s;const n=null!==(i=null==o?void 0:o.renderBefore)&&void 0!==i?i:e;let r=n._$litPart$;if(void 0===r){const t=null!==(s=null==o?void 0:o.renderBefore)&&void 0!==s?s:null;n._$litPart$=r=new L(e.insertBefore(g(),t),t,void 0,null!=o?o:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return P}}K.finalized=!0,K._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:K});const Y=globalThis.litElementPolyfillSupport;null==Y||Y({LitElement:K}),(null!==(W=globalThis.litElementVersions)&&void 0!==W?W:globalThis.litElementVersions=[]).push("3.0.1");const Z=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(o){o.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}};const F="lovelace-player-device-id";function G(){if(!localStorage[F]){const t=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);window.fully&&"function"==typeof fully.getDeviceId?localStorage[F]=fully.getDeviceId():localStorage[F]=`${t()}${t()}-${t()}${t()}`}return localStorage[F]}let Q=G();const X=new URLSearchParams(window.location.search);var tt;X.get("deviceID")&&null!==(tt=X.get("deviceID"))&&("clear"===tt?localStorage.removeItem(F):localStorage[F]=tt,Q=G()),window.cardMod_template_cache=window.cardMod_template_cache||{};const et=window.cardMod_template_cache;async function ot(e,o,i){const s=t().connection,n=JSON.stringify([o,i]);let r=et[n];r?(r.callbacks.has(e)||it(e),e(r.value),r.callbacks.add(e)):(it(e),e(""),i=Object.assign({user:t().user.name,browser:Q,hash:location.hash.substr(1)||""},i),et[n]=r={template:o,variables:i,value:"",callbacks:new Set([e]),unsubscribe:s.subscribeMessage((t=>function(t,e){const o=et[t];o&&(o.value=e.result,o.callbacks.forEach((t=>t(e.result))))}(n,t)),{type:"render_template",template:o,variables:i})})}async function it(t){let e;for(const[o,i]of Object.entries(et))if(i.callbacks.has(t)){i.callbacks.delete(t),0==i.callbacks.size&&(e=i.unsubscribe,delete et[o]);break}e&&await(await e)()}var st="3.1.0";async function nt(t,e,o=!1){let i=t;"string"==typeof e&&(e=e.split(/(\$| )/)),""===e[e.length-1]&&e.pop();for(const[t,s]of e.entries())if(s.trim().length){if(!i)return null;i.localName&&i.localName.includes("-")&&await customElements.whenDefined(i.localName),i.updateComplete&&await i.updateComplete,i="$"===s?o&&t==e.length-1?[i.shadowRoot]:i.shadowRoot:o&&t==e.length-1?i.querySelectorAll(s):i.querySelector(s)}return i}async function rt(t,e,o=!1,i=1e4){return Promise.race([nt(t,e,o),new Promise(((t,e)=>setTimeout((()=>e(new Error("timeout"))),i)))]).catch((t=>{if(!t.message||"timeout"!==t.message)throw t;return null}))}const at=async t=>{await(async()=>{if(customElements.get("developer-tools-event"))return;await customElements.whenDefined("partial-panel-resolver");const t=document.createElement("partial-panel-resolver");t.hass={panels:[{url_path:"tmp",component_name:"developer-tools"}]},t._updateRoutes(),await t.routerOptions.routes.tmp.load(),await customElements.whenDefined("developer-tools-router");const e=document.createElement("developer-tools-router");await e.routerOptions.routes.event.load()})();return document.createElement("developer-tools-event")._computeParsedEventData(t)};async function dt(t,e,o="",i={},s=null,n=!0){var r;if(!t)return;let a;(null===(r=t.localName)||void 0===r?void 0:r.includes("-"))&&await customElements.whenDefined(t.localName),t.updateComplete&&await t.updateComplete,void 0===t._cardMod&&(t._cardMod=[]);for(const o of t._cardMod)if(o.type===e){a=o;break}return a||(a=document.createElement("card-mod"),a.type=e,t._cardMod.push(a)),queueMicrotask((async()=>{(t.modElement?t.modElement:n&&t.shadowRoot||t).appendChild(a),a.variables=i,a.styles=o})),a}function lt(t,e){const o=t=>t&&"object"==typeof t&&!Array.isArray(t);if(o(t)&&o(e))for(const i in e)o(e[i])?(t[i]||Object.assign(t,{[i]:{}}),"string"==typeof t[i]&&(t[i]={".":t[i]}),lt(t[i],e[i])):t[i]?t[i]=e[i]+t[i]:t[i]=e[i];return t}function ct(t,e){if(t===e)return!0;if(typeof t!=typeof e)return!1;if(!(t instanceof Object&&e instanceof Object))return!1;for(const o in t)if(t.hasOwnProperty(o)){if(!e.hasOwnProperty(o))return!1;if(t[o]!==e[o]){if("object"!=typeof t[o])return!1;if(!ct(t[o],e[o]))return!1}}for(const o in e)if(e.hasOwnProperty(o)&&!t.hasOwnProperty(o))return!1;return!0}function ht(t){return t.config?t.config:t._config?t._config:t.host?ht(t.host):t.parentElement?ht(t.parentElement):t.parentNode?ht(t.parentNode):null}function ut(t,e){for(const o of e)t.add(o)}async function pt(t,e=0){let o=new Set;if(10==e)return o;if(!t)return o;if(t._cardMod)for(const e of t._cardMod)e.styles&&o.add(e);return t.updateComplete&&await t.updateComplete,t.parentElement?ut(o,await pt(t.parentElement,e+1)):t.parentNode&&ut(o,await pt(t.parentNode,e+1)),t.host&&ut(o,await pt(t.host,e+1)),o}function mt(){var t,e,o;const i=document.querySelectorAll("script"),s=[];for(const n of i)if(null===(e=null===(t=null==n?void 0:n.innerText)||void 0===t?void 0:t.trim())||void 0===e?void 0:e.startsWith("import(")){const t=null===(o=n.innerText.split("\n"))||void 0===o?void 0:o.map((t=>t.trim()));for(const e of t)s.push(e.replace(/^import\(\"/,"").replace(/\"\);/,""))}return s}class ft extends K{constructor(){super(),this._rendered_styles="",this._styleChildren=new Set,this._observer=new MutationObserver((t=>{for(const e of t){if("card-mod"===e.target.localName)return;let t=!0;if(e.addedNodes.length&&e.addedNodes.forEach((e=>{"card-mod"!==e.localName&&(t=!1)})),t)return;if(t=!0,e.removedNodes.length&&e.removedNodes.forEach((e=>{"card-mod"!==e.localName&&(t=!1)})),t)return}this.refresh()})),document.addEventListener("cm_update",(()=>{this.refresh()}))}static get applyToElement(){return dt}connectedCallback(){super.connectedCallback(),this._connect(),this.setAttribute("slot","none")}disconnectedCallback(){super.disconnectedCallback(),this._disconnect()}set styles(e){ct(e,this._input_styles)||(this._input_styles=e,(async()=>{let o=JSON.parse(JSON.stringify(e||{}));"string"==typeof o&&(o={".":o});lt(o,await async function(e){var o,i;if(!e.type)return null;const s=e.parentElement?e.parentElement:e,n=window.getComputedStyle(s).getPropertyValue("--card-mod-theme");if(!t())return{};const r=null!==(i=null===(o=t())||void 0===o?void 0:o.themes.themes)&&void 0!==i?i:{};return r[n]?r[n][`card-mod-${e.type}-yaml`]?at(r[n][`card-mod-${e.type}-yaml`]):r[n][`card-mod-${e.type}`]?{".":r[n][`card-mod-${e.type}`]}:{}:{}}(this)),this._fixed_styles=o,this._connect()})())}get styles(){return this._styles}refresh(){this._connect()}async _styleChildEl(t,e){if(void 0===e){const o=this._fixed_styles;for(const[i,s]of Object.entries(o)){if("."===i)continue;if((await rt(this.parentElement||this.parentNode,i,!0)).forEach((o=>{o===t&&(e=s)})),void 0!==e)break}if(void 0===e)return}if(!t)return;const o=await dt(t,`${this.type}-child`,e,this.variables,null,!1);return o.refresh,o}async _connect(){var t;const e=null!==(t=this._fixed_styles)&&void 0!==t?t:{},o=new Set;let i="",s=!1;const n=this.parentElement||this.parentNode;for(const[t,r]of Object.entries(e))if("."===t)i=r;else{s=!0;const e=await rt(n,t,!0);if(!e)continue;for(const t of e){const e=await this._styleChildEl(t,r);e&&o.add(e)}}for(const t of this._styleChildren)o.has(t)||t&&(t.styles="");var r;(this._styleChildren=o,this._styles!==i)&&(this._styles=i,this._styles&&(r=this._styles,String(r).includes("{%")||String(r).includes("{{"))?(this._renderer=this._renderer||this._style_rendered.bind(this),ot(this._renderer,this._styles,this.variables)):this._style_rendered(this._styles||""),s&&this._observer.observe(function(t){if(!t)return;const e=t.parentElement||t.parentNode;return e?e.host?e.host:e:void 0}(this),{childList:!0}))}async _disconnect(){this._observer.disconnect(),this._styles="",await it(this._renderer)}_style_rendered(t){this._rendered_styles=t,this.dispatchEvent(new Event("card-mod-update"))}createRenderRoot(){return this}render(){return M`
      <style>
        ${this._rendered_styles}
        ${1===(new Date).getDate()&&3===(new Date).getMonth()?M`:host{transform: rotate(${2*Math.random()-1}deg);}`:""}
      </style>
    `}}!function(t,e,o,i){var s,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,o,r):s(e,o))||r);n>3&&r&&Object.defineProperty(e,o,r)}([function(t){return(e,o)=>void 0!==o?((t,e,o)=>{e.constructor.createProperty(o,t)})(t,e,o):Z(t,e)}()],ft.prototype,"_rendered_styles",void 0),customElements.get("card-mod")||(customElements.define("card-mod",ft),console.info(`%cCARD-MOD ${st} IS INSTALLED`,"color: green; font-weight: bold")),customElements.whenDefined("ha-card").then((()=>{const t=customElements.get("ha-card");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.firstUpdated;t.prototype.firstUpdated=function(t){var o,i;null==e||e.bind(this)(t);const s=this.shadowRoot.querySelector(".card-header");s&&this.insertBefore(s,this.children[0]);const n=ht(this);(null===(o=null==n?void 0:n.card_mod)||void 0===o?void 0:o.class)&&this.classList.add(n.card_mod.class),(null==n?void 0:n.type)&&this.classList.add(`type-${n.type.replace(":","-")}`),dt(this,"card",(null===(i=null==n?void 0:n.card_mod)||void 0===i?void 0:i.style)||(null==n?void 0:n.style)||"",{config:n},null,!1).then((t=>{var e;const o=null===(e=this.parentNode)||void 0===e?void 0:e.host;if(o){if(o.setConfig&&!o.setConfig.cm_patched){const e=o.setConfig;o.setConfig=function(o){var i;e.bind(this)(o),t.variables={config:o},t.styles=(null===(i=o.card_mod)||void 0===i?void 0:i.style)||{}},o.setConfig.cm_patched=!0}if(o.update&&!o.update.cm_patched){const e=o.update;o.update=function(o){e.bind(this)(o),t.refresh(),this.updateComplete.then((()=>{t.refresh()}))},o.update.cm_patched=!0}window.setTimeout((()=>t.refresh()),100),window.setTimeout((()=>t.refresh()),500),window.setTimeout((()=>t.refresh()),1e3)}}))}})),customElements.whenDefined("hui-entities-card").then((()=>{const t=customElements.get("hui-entities-card");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.renderEntity;t.prototype.renderEntity=function(t){var o;const i=e.bind(this)(t);if(!i||!i.values)return i;const s=i.values[0];if(!s)return i;(null===(o=null==t?void 0:t.card_mod)||void 0===o?void 0:o.class)&&s.classList.add(t.card_mod.class),(null==t?void 0:t.type)&&s.classList.add(`type-${t.type.replace(":","-")}`);const n=()=>{var e;return dt(s,"row",(null===(e=null==t?void 0:t.card_mod)||void 0===e?void 0:e.style)||(null==t?void 0:t.style)||"",{config:t})};return this.updateComplete.then((()=>n())),i.values[0]&&i.values[0].addEventListener("ll-rebuild",n),i}}));customElements.whenDefined("hui-glance-card").then((()=>{const t=customElements.get("hui-glance-card");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.updated;t.prototype.updated=function(t){var o,i;null==e||e.bind(this)(t);for(const t of this.shadowRoot.querySelectorAll("ha-card div.entity")){if(!t.cardmod_patched){t.cardmod_patched=!0;const e=t.attachShadow({mode:"open"});for(;t.firstChild;)e.append(t.firstChild);const o=document.createElement("style");e.appendChild(o),o.innerHTML="\ndiv {\n  width: 100%;\n  text-align: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.name {\n  min-height: var(--paper-font-body1_-_line-height, 20px);\n}\nstate-badge {\n  margin: 8px 0;\n}\n"}const e=t.config||t.entityConf;(null===(o=null==e?void 0:e.card_mod)||void 0===o?void 0:o.class)&&t.classList.add(e.card_mod.class),dt(t,"glance",(null===(i=null==e?void 0:e.card_mod)||void 0===i?void 0:i.style)||(null==e?void 0:e.style)||"",{config:e})}}})),customElements.whenDefined("hui-state-label-badge").then((()=>{const t=customElements.get("hui-state-label-badge");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.firstUpdated;t.prototype.firstUpdated=function(t){var o,i;null==e||e.bind(this)(t);const s=this._config;(null===(o=null==s?void 0:s.card_mod)||void 0===o?void 0:o.class)&&this.classList.add(s.card_mod.class),dt(this,"badge",(null===(i=null==s?void 0:s.card_mod)||void 0===i?void 0:i.style)||(null==s?void 0:s.style)||"",{config:s})}})),customElements.whenDefined("hui-view").then((()=>{const t=customElements.get("hui-view");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.firstUpdated;t.prototype.firstUpdated=function(t){null==e||e.bind(this)(t),dt(this,"view")}})),customElements.whenDefined("hui-root").then((()=>{const t=customElements.get("hui-root");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.firstUpdated;t.prototype.firstUpdated=async function(t){null==e||e.bind(this)(t),dt(this,"root")},rt(document,"home-assistant$home-assistant-main$app-drawer-layout partial-panel-resolver ha-panel-lovelace$hui-root",!1).then((t=>{null==t||t.firstUpdated()}))})),customElements.whenDefined("ha-more-info-dialog").then((()=>{const t=customElements.get("ha-more-info-dialog");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.showDialog;t.prototype.showDialog=function(t){null==e||e.bind(this)(t),this.requestUpdate(),this.updateComplete.then((async()=>{dt(this.shadowRoot.querySelector("ha-dialog"),"more-info","",{config:t},null,!1)}))},rt(document,"home-assistant$ha-more-info-dialog",!1).then((e=>{e&&(e.showDialog=t.prototype.showDialog.bind(e),e.showDialog({entityId:e.entityId}))}))})),customElements.whenDefined("ha-sidebar").then((()=>{const t=customElements.get("ha-sidebar");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.firstUpdated;t.prototype.firstUpdated=async function(t){null==e||e.bind(this)(t),dt(this,"sidebar")},rt(document,"home-assistant$home-assistant-main$app-drawer-layout app-drawer ha-sidebar",!1).then((t=>null==t?void 0:t.firstUpdated()))})),customElements.whenDefined("hui-card-element-editor").then((()=>{const t=customElements.get("hui-card-element-editor");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.getConfigElement;t.prototype.getConfigElement=async function(){const t=await e.bind(this)();if(t){const e=t.setConfig;t.setConfig=function(t){var o,i;const s=JSON.parse(JSON.stringify(t));if(this._cardModData={card:s.card_mod,entities:[]},s.entities)for(const[t,e]of null===(o=s.entities)||void 0===o?void 0:o.entries())this._cardModData.entities[t]=e.card_mod,delete e.card_mod;if(delete s.card_mod,e.bind(this)(s),s.entities)for(const[t,e]of null===(i=s.entities)||void 0===i?void 0:i.entries())this._cardModData.entities[t]&&(e.card_mod=this._cardModData.entities[t])}}return t};const o=t.prototype._handleUIConfigChanged;t.prototype._handleUIConfigChanged=function(t){if(this._configElement&&this._configElement._cardModData){const e=this._configElement._cardModData;e.card&&(t.detail.config.card_mod=e.card)}o.bind(this)(t)}})),customElements.whenDefined("hui-dialog-edit-card").then((()=>{const t=customElements.get("hui-dialog-edit-card");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.updated;t.prototype.updated=function(t){null==e||e.bind(this)(t),this.updateComplete.then((async()=>{var t,e,o;this._cardModIcon||(this._cardModIcon=document.createElement("ha-icon"),this._cardModIcon.icon="mdi:brush");const i=this.shadowRoot.querySelector("mwc-button[slot=secondaryAction]");i&&(i.appendChild(this._cardModIcon),(null===(t=this._cardConfig)||void 0===t?void 0:t.card_mod)||(null===(o=null===(e=this._cardConfig)||void 0===e?void 0:e.entities)||void 0===o?void 0:o.some((t=>t.card_mod)))?this._cardModIcon.style.visibility="visible":this._cardModIcon.style.visibility="hidden")}))}})),customElements.whenDefined("hui-picture-elements-card").then((()=>{const t=customElements.get("hui-picture-elements-card");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.setConfig;t.prototype.setConfig=function(t){var o,i;null==e||e.bind(this)(t);for(const[t,e]of this._elements.entries()){const s=this._config.elements[t];(null===(o=null==s?void 0:s.card_mod)||void 0===o?void 0:o.class)&&e.classList.add(s.card_mod.class),(null==s?void 0:s.type)&&e.classList.add(`type-${s.type.replace(":","-")}`),dt(e,"element",null===(i=null==s?void 0:s.card_mod)||void 0===i?void 0:i.style,{config:s})}}})),customElements.whenDefined("ha-icon").then((()=>{const t=customElements.get("ha-icon");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.firstUpdated;t.prototype.firstUpdated=function(){null==e||e.bind(this)();const t=()=>{const t=window.getComputedStyle(this).getPropertyValue("--card-mod-icon");t&&(this.icon=t.trim());const e=window.getComputedStyle(this).getPropertyValue("--card-mod-icon-color");e&&(this.style.color=e)};(async()=>{const e=await pt(this);for(const o of e)o.addEventListener("card-mod-update",(async()=>{await o.updateComplete,t()}));t()})()}})),customElements.whenDefined("ha-svg-icon").then((()=>{const t=customElements.get("ha-svg-icon");if(t.prototype.cardmod_patched)return;t.prototype.cardmod_patched=!0;const e=t.prototype.firstUpdated;t.prototype.firstUpdated=function(){null==e||e.bind(this)();const t=async()=>{const t=window.getComputedStyle(this).getPropertyValue("--card-mod-icon");if(t){const e=document.createElement("ha-icon");e.icon=t.trim(),await e._loadIcon(),this.path=e._path}const e=window.getComputedStyle(this).getPropertyValue("--card-mod-icon-color");e&&(this.style.color=e)};(async()=>{const e=await pt(this);for(const o of e)o.addEventListener("card-mod-update",(async()=>{await o.updateComplete,t()}));t()})()}}));const vt="\nha-card {\n  background: none;\n  box-shadow: none;\n}";function yt(){document.dispatchEvent(new Event("cm_update"))}customElements.define("mod-card",class extends K{static get properties(){return{hass:{}}}setConfig(t){var e;this._config=JSON.parse(JSON.stringify(t));let o=(null===(e=this._config.card_mod)||void 0===e?void 0:e.style)||this._config.style;void 0===o?o=vt:"string"==typeof o?o=vt+o:o["."]?o["."]=vt+o["."]:o["."]=vt,this._config.card_mod={style:o},this.build_card(t.card)}async build_card(t){const e=await window.loadCardHelpers();this.card=await e.createCardElement(t),this.card.hass=this.hass}firstUpdated(){window.setTimeout((()=>{var t,e;if(null===(e=null===(t=this.card)||void 0===t?void 0:t.shadowRoot)||void 0===e?void 0:e.querySelector("ha-card")){console.info("%cYou are doing it wrong!","color: red; font-weight: bold");let t=this.card.localName.replace(/hui-(.*)-card/,"$1");console.info(`mod-card should NEVER be used with a card that already has a ha-card element, such as ${t}`)}}),3e3)}render(){return M` <ha-card modcard> ${this.card} </ha-card> `}set hass(t){this.card&&(this.card.hass=t)}getCardSize(){if(this._config.report_size)return this._config.report_size;let t=this.shadowRoot;return t&&(t=t.querySelector("ha-card card-maker")),t&&(t=t.getCardSize),t&&(t=t()),t||1}});const _t=[customElements.whenDefined("home-assistant"),customElements.whenDefined("hc-main")];Promise.race(_t).then((()=>{window.setTimeout((()=>{var e,o;t().connection.subscribeEvents((()=>{window.setTimeout(yt,500)}),"themes_updated"),null===(e=document.querySelector("home-assistant"))||void 0===e||e.addEventListener("settheme",yt),null===(o=document.querySelector("hc-main"))||void 0===o||o.addEventListener("settheme",yt)}),1e3)})),window.getResources=mt;mt().some((t=>t.endsWith("card-mod.js")))?console.info("Card-mod is loaded as a module"):(!function(t,e,o=null){if((t=new Event(t,{bubbles:!0,cancelable:!1,composed:!0})).detail=e||{},o)o.dispatchEvent(t);else{var i=function(){var t=document.querySelector("hc-main");return t?(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("hc-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-view")||t.querySelector("hui-panel-view"):(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=document.querySelector("home-assistant"))&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root"))&&t.shadowRoot)&&t.querySelector("ha-app-layout"))&&t.querySelector("#view"))&&t.firstElementChild}();i&&i.dispatchEvent(t)}}("ll-rebuild",{}),console.info("You may not be getting optimal performance out of card-mod.\nSee https://github.com/thomasloven/lovelace-card-mod#performance-improvements"));
