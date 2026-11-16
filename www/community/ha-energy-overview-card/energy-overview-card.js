/*!
MIT License

Copyright (c) 2023 Sebastian Schneider
Copyright (c) 2026 Tim Laing

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var je=Object.defineProperty;var qt=Object.getOwnPropertyDescriptor;var m=(i,e,t)=>()=>{if(t)throw t[0];try{return i&&(e=i(i=0)),e}catch(s){throw t=[s],s}};var zt=(i,e)=>{for(var t in e)je(i,t,{get:e[t],enumerable:!0})};var _=(i,e,t,s)=>{for(var r=s>1?void 0:s?qt(e,t):e,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(e,t,r):o(r))||r);return s&&r&&je(e,t,r),r};var Q,ee,we,qe,z,ze,B,Be,xe,Ce=m(()=>{Q=globalThis,ee=Q.ShadowRoot&&(Q.ShadyCSS===void 0||Q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),qe=new WeakMap,z=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ee&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=qe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&qe.set(t,e))}return e}toString(){return this.cssText}},ze=i=>new z(typeof i=="string"?i:i+"",void 0,we),B=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new z(t,i,we)},Be=(i,e)=>{if(ee)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),r=Q.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},xe=ee?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return ze(t)})(i):i});var Bt,Vt,Wt,Gt,Yt,Kt,te,Ve,Zt,Jt,V,W,ie,We,E,G=m(()=>{Ce();Ce();({is:Bt,defineProperty:Vt,getOwnPropertyDescriptor:Wt,getOwnPropertyNames:Gt,getOwnPropertySymbols:Yt,getPrototypeOf:Kt}=Object),te=globalThis,Ve=te.trustedTypes,Zt=Ve?Ve.emptyScript:"",Jt=te.reactiveElementPolyfillSupport,V=(i,e)=>i,W={toAttribute(i,e){switch(e){case Boolean:i=i?Zt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},ie=(i,e)=>!Bt(i,e),We={attribute:!0,type:String,converter:W,reflect:!1,useDefault:!1,hasChanged:ie};Symbol.metadata??=Symbol("metadata"),te.litPropertyMetadata??=new WeakMap;E=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=We){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&Vt(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){let{get:r,set:n}=Wt(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){let l=r?.call(this);n?.call(this,o),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??We}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;let e=Kt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){let t=this.properties,s=[...Gt(t),...Yt(t)];for(let r of s)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let r of s)t.unshift(xe(r))}else e!==void 0&&t.push(xe(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Be(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:W).toAttribute(t,s.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){let s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let n=s.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:W;this._$Em=r;let l=o.fromAttribute(t,n.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(e,t,s,r=!1,n){if(e!==void 0){let o=this.constructor;if(r===!1&&(n=this[e]),s??=o.getPropertyOptions(e),!((s.hasChanged??ie)(n,t)||s.useDefault&&s.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:n},o){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,n]of s){let{wrapped:o}=n,l=this[r];o!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,n,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[V("elementProperties")]=new Map,E[V("finalized")]=new Map,Jt?.({ReactiveElement:E}),(te.reactiveElementVersions??=[]).push("2.1.2")});function st(i,e){if(!He(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ye!==void 0?Ye.createHTML(e):e}function N(i,e,t=i,s){if(e===x)return e;let r=s!==void 0?t._$Co?.[s]:t._$Cl,n=Z(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??=[])[s]=r:t._$Cl=r),r!==void 0&&(e=N(i,r._$AS(i,e.values),r,s)),e}var Te,Ge,se,Ye,Me,w,Ne,Xt,M,K,Z,He,et,Se,Y,Ke,Ze,S,Je,Xe,tt,Ie,y,it,gi,x,d,Qe,T,rt,J,re,D,H,ne,oe,ae,le,nt,Qt,ot,O=m(()=>{Te=globalThis,Ge=i=>i,se=Te.trustedTypes,Ye=se?se.createPolicy("lit-html",{createHTML:i=>i}):void 0,Me="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,Ne="?"+w,Xt=`<${Ne}>`,M=document,K=()=>M.createComment(""),Z=i=>i===null||typeof i!="object"&&typeof i!="function",He=Array.isArray,et=i=>He(i)||typeof i?.[Symbol.iterator]=="function",Se=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ke=/-->/g,Ze=/>/g,S=RegExp(`>|${Se}(?:([^\\s"'>=/]+)(${Se}*=${Se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Je=/'/g,Xe=/"/g,tt=/^(?:script|style|textarea|title)$/i,Ie=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),y=Ie(1),it=Ie(2),gi=Ie(3),x=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Qe=new WeakMap,T=M.createTreeWalker(M,129);rt=(i,e)=>{let t=i.length-1,s=[],r,n=e===2?"<svg>":e===3?"<math>":"",o=Y;for(let l=0;l<t;l++){let a=i[l],h,f,c=-1,p=0;for(;p<a.length&&(o.lastIndex=p,f=o.exec(a),f!==null);)p=o.lastIndex,o===Y?f[1]==="!--"?o=Ke:f[1]!==void 0?o=Ze:f[2]!==void 0?(tt.test(f[2])&&(r=RegExp("</"+f[2],"g")),o=S):f[3]!==void 0&&(o=S):o===S?f[0]===">"?(o=r??Y,c=-1):f[1]===void 0?c=-2:(c=o.lastIndex-f[2].length,h=f[1],o=f[3]===void 0?S:f[3]==='"'?Xe:Je):o===Xe||o===Je?o=S:o===Ke||o===Ze?o=Y:(o=S,r=void 0);let u=o===S&&i[l+1].startsWith("/>")?" ":"";n+=o===Y?a+Xt:c>=0?(s.push(h),a.slice(0,c)+Me+a.slice(c)+w+u):a+w+(c===-2?l:u)}return[st(i,n+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},J=class i{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let n=0,o=0,l=e.length-1,a=this.parts,[h,f]=rt(e,t);if(this.el=i.createElement(h,s),T.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=T.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let c of r.getAttributeNames())if(c.endsWith(Me)){let p=f[o++],u=r.getAttribute(c).split(w),g=/([.?@])?(.*)/.exec(p);a.push({type:1,index:n,name:g[2],strings:u,ctor:g[1]==="."?ne:g[1]==="?"?oe:g[1]==="@"?ae:H}),r.removeAttribute(c)}else c.startsWith(w)&&(a.push({type:6,index:n}),r.removeAttribute(c));if(tt.test(r.tagName)){let c=r.textContent.split(w),p=c.length-1;if(p>0){r.textContent=se?se.emptyScript:"";for(let u=0;u<p;u++)r.append(c[u],K()),T.nextNode(),a.push({type:2,index:++n});r.append(c[p],K())}}}else if(r.nodeType===8)if(r.data===Ne)a.push({type:2,index:n});else{let c=-1;for(;(c=r.data.indexOf(w,c+1))!==-1;)a.push({type:7,index:n}),c+=w.length-1}n++}}static createElement(e,t){let s=M.createElement("template");return s.innerHTML=e,s}};re=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,r=(e?.creationScope??M).importNode(t,!0);T.currentNode=r;let n=T.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new D(n,n.nextSibling,this,e):a.type===1?h=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(h=new le(n,this,e)),this._$AV.push(h),a=s[++l]}o!==a?.index&&(n=T.nextNode(),o++)}return T.currentNode=M,r}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},D=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),Z(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):et(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&Z(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=J.createElement(st(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(t);else{let n=new re(r,this),o=n.u(this.options);n.p(t),this.T(o),this._$AH=n}}_$AC(e){let t=Qe.get(e.strings);return t===void 0&&Qe.set(e.strings,t=new J(e)),t}k(e){He(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,r=0;for(let n of e)r===t.length?t.push(s=new i(this.O(K()),this.O(K()),this,this.options)):s=t[r],s._$AI(n),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=Ge(e).nextSibling;Ge(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(e,t=this,s,r){let n=this.strings,o=!1;if(n===void 0)e=N(this,e,t,0),o=!Z(e)||e!==this._$AH&&e!==x,o&&(this._$AH=e);else{let l=e,a,h;for(e=n[0],a=0;a<n.length-1;a++)h=N(this,l[s+a],t,a),h===x&&(h=this._$AH[a]),o||=!Z(h)||h!==this._$AH[a],h===d?e=d:e!==d&&(e+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!r&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ne=class extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},oe=class extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},ae=class extends H{constructor(e,t,s,r,n){super(e,t,s,r,n),this.type=5}_$AI(e,t=this){if((e=N(this,e,t,0)??d)===x)return;let s=this._$AH,r=e===d&&s!==d||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==d&&(s===d||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},le=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}},nt={M:Me,P:w,A:Ne,C:1,L:rt,R:re,D:et,V:N,I:D,H,N:oe,U:ae,B:ne,F:le},Qt=Te.litHtmlPolyfillSupport;Qt?.(J,D),(Te.litHtmlVersions??=[]).push("3.3.3");ot=(i,e,t)=>{let s=t?.renderBefore??e,r=s._$litPart$;if(r===void 0){let n=t?.renderBefore??null;s._$litPart$=r=new D(e.insertBefore(K(),n),n,void 0,t??{})}return r._$AI(i),r}});var Le,v,ei,at=m(()=>{G();G();O();O();Le=globalThis,v=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ot(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};v._$litElement$=!0,v.finalized=!0,Le.litElementHydrateSupport?.({LitElement:v});ei=Le.litElementPolyfillSupport;ei?.({LitElement:v});(Le.litElementVersions??=[]).push("4.2.2")});var lt=m(()=>{});var ce=m(()=>{G();O();at();lt()});var k,ct=m(()=>{k=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)}});function b(i){return(e,t)=>typeof t=="object"?ii(i,e,t):((s,r,n)=>{let o=r.hasOwnProperty(n);return r.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(r,n):void 0})(i,e,t)}var ti,ii,Pe=m(()=>{G();ti={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:ie},ii=(i=ti,e,t)=>{let{kind:s,metadata:r}=t,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),n.set(t.name,i),s==="accessor"){let{name:o}=t;return{set(l){let a=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,a,i,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,i,l),l}}}if(s==="setter"){let{name:o}=t;return function(l){let a=this[o];e.call(this,l),this.requestUpdate(o,a,i,!0,l)}}throw Error("Unsupported decorator location: "+s)}});function I(i){return b({...i,state:!0,attribute:!1})}var dt=m(()=>{Pe();});var ht=m(()=>{});var U=m(()=>{});var ut=m(()=>{U();});var pt=m(()=>{U();});var mt=m(()=>{U();});var ft=m(()=>{U();});var gt=m(()=>{U();});var he=m(()=>{ct();Pe();dt();ht();ut();pt();mt();ft();gt()});var Tt,Mt,L,me,Nt,fe,ge,j=m(()=>{"use strict";Tt="Energy Overview",Mt="energy-overview",L=`${Mt}-card`,me=`${L}-editor`,Nt=`${Mt}-entity-editor`,fe="mdi:transmission-tower",ge="mdi:home-lightning-bolt"});function ye(i,e,t){return Math.max(e,Math.min(i,t))}function ve(i){return i.replace(/(^\w)|(\s+\w)/g,e=>e.toUpperCase())}function $e(i,e,t){i.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}async function li(){if(!window.loadCardHelpers)throw new Error("Home Assistant card helpers are unavailable.");let t=(await window.loadCardHelpers()).createCardElement({type:"button"}).constructor;if(!t.getConfigElement)throw new Error("Home Assistant button editor is unavailable.");if(await t.getConfigElement(),!customElements.get("ha-form"))throw new Error("Home Assistant form did not load.")}async function ci(){let i,e=new Promise((t,s)=>{i=setTimeout(()=>s(new Error("Home Assistant form loading timed out.")),ai)});try{await Promise.race([li(),e])}finally{clearTimeout(i)}}async function It(){if(customElements.get("ha-form"))return;_e??=ci();let i=_e;try{await i}catch(e){throw _e===i&&(_e=void 0),e}}var ai,_e,be=m(()=>{"use strict";ai=15e3});var X,Ae,Rt,Dt,Ot,kt,Ue=m(()=>{"use strict";j();X=["sensor","input_number"],Ae=[{type:"grid",name:"",schema:[{name:"power",label:"Animation Max Power",selector:{number:{mode:"box",unit_of_measurement:"W"}}},{name:"min_duration",label:"Animation Min Duration",selector:{number:{mode:"box",unit_of_measurement:"s"}}},{name:"max_duration",label:"Animation Max Duration",selector:{number:{mode:"box",unit_of_measurement:"s"}}}]},{name:"inverted",label:"Animation Direction Inverted",selector:{boolean:{}}}],Rt=[{name:"power",required:!0,selector:{entity:{domain:X}}},{type:"grid",name:"",schema:[{name:"voltage",selector:{entity:{domain:X}}},{name:"current",selector:{entity:{domain:X}}},{name:"frequency",selector:{entity:{domain:X}}},{name:"power_factor",selector:{entity:{domain:X}}}]}],Dt=[{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"icon_leading",label:"Leading Icon",selector:{icon:{placeholder:fe}}},{name:"icon_trailing",selector:{icon:{placeholder:ge}}}]},{type:"grid",name:"",schema:[{name:"label_leading",selector:{text:{}}},{name:"label_trailing",selector:{text:{}}}]},{name:"color",selector:{text:{}}}],Ot=[{name:"title",label:"Title",selector:{text:{}}}],kt=[{name:"order_by",label:"Order entities by",selector:{select:{mode:"dropdown",options:[{value:"",label:"None"},{value:"power",label:"Power"},{value:"voltage",label:"Voltage"},{value:"current",label:"Current"},{value:"frequency",label:"Frequency"},{value:"power_factor",label:"Power Factor"}]}}}]});var P,Ut=m(()=>{"use strict";ce();he();be();j();Ue();P=class extends v{constructor(){super(...arguments);this._computeLabel=t=>{if(t.label)return t.label;let s=`${ve(t.name.replaceAll("_"," "))}`;return t.selector?.entity&&(s+=` ${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")}`),s}}_publish(t){this.config=t,$e(this,"config-changed",{config:t})}_valueChanged(t){t.stopPropagation(),this.config&&this._publish({...this.config,...t.detail.value})}_animationChanged(t){t.stopPropagation(),this.config&&this._publish({...this.config,animation:t.detail.value})}render(){return!this.hass||!this.config?d:y`
      <h3>Data</h3>
      <ha-form
        .hass="${this.hass}"
        .data="${this.config}"
        .schema="${Rt}"
        .computeLabel="${this._computeLabel}"
        @value-changed="${this._valueChanged}">
      </ha-form>
      <h3>Visuals</h3>
      <ha-form
        .hass="${this.hass}"
        .data="${this.config}"
        .schema="${Dt}"
        .computeLabel="${this._computeLabel}"
        @value-changed="${this._valueChanged}">
      </ha-form>
      <h3>Animation Overwrite</h3>
      <ha-form
        .hass="${this.hass}"
        .data="${this.config.animation??{}}"
        .schema="${Ae}"
        .computeLabel="${this._computeLabel}"
        @value-changed="${this._animationChanged}">
      </ha-form>
    `}};_([b({attribute:!1})],P.prototype,"hass",2),_([b({attribute:!1})],P.prototype,"lovelace",2),_([b({attribute:!1})],P.prototype,"config",2),P=_([k(Nt)],P)});var Ft={};zt(Ft,{EnergyOverviewCardEditor:()=>$});var $,jt=m(()=>{"use strict";ce();he();j();Ut();Ue();be();$=class extends v{constructor(){super(...arguments);this._selectedCard=0;this._ready=!1;this._loadFailed=!1;this._computeLabel=t=>t.label||ve(t.name.replaceAll("_"," "))}setConfig(t){if(!Array.isArray(t?.entities))throw new Error("Entities must be a list.");this._config=t,this._selectedCard=Math.min(this._selectedCard,Math.max(0,t.entities.length-1))}connectedCallback(){super.connectedCallback(),this._loadEditor()}async _loadEditor(){this._loadFailed=!1;try{await It(),this._ready=!0}catch{this._ready=!1,this._loadFailed=!0}}_publish(t){this._config=t,$e(this,"config-changed",{config:t})}_handleConfigChanged(t){if(t.stopPropagation(),!this._config?.entities[this._selectedCard])return;let s=[...this._config.entities];s[this._selectedCard]=t.detail.config,this._publish({...this._config,entities:s})}_addEntity(){if(!this._config)return;let t=[...this._config.entities,{power:""}];this._selectedCard=t.length-1,this._publish({...this._config,entities:t})}_deleteEntity(){if(!this._config?.entities.length)return;let t=[...this._config.entities];t.splice(this._selectedCard,1),this._selectedCard=Math.max(0,this._selectedCard-1),this._publish({...this._config,entities:t})}_moveEntity(t){if(!this._config)return;let s=this._selectedCard+t;if(s<0||s>=this._config.entities.length)return;let r=[...this._config.entities],[n]=r.splice(this._selectedCard,1);r.splice(s,0,n),this._selectedCard=s,this._publish({...this._config,entities:r})}_navigate(t){let s=this._config?.entities.length??0;if(!s)return;let r=[...this.renderRoot.querySelectorAll(".entity-select")],n=r.findIndex(o=>o===t.target);if(!(n<0)){if(t.key==="ArrowRight")n=(n+1)%s;else if(t.key==="ArrowLeft")n=(n+s-1)%s;else if(t.key==="Home")n=0;else if(t.key==="End")n=s-1;else return;t.preventDefault(),this._selectedCard=n,r[n]?.focus()}}_label(t,s){let r=this.hass?.localize(t);return r&&r!==t?r:s}_valueChanged(t){t.stopPropagation(),this._config&&this._publish({...this._config,...t.detail.value})}_animationChanged(t){t.stopPropagation(),this._config&&this._publish({...this._config,animation:t.detail.value})}render(){if(!this.hass||!this._config)return d;if(this._loadFailed)return y`<p class="error" role="alert">Unable to load the Home Assistant editor. Use YAML or retry.</p><button type="button" @click=${this._loadEditor}>${this._label("ui.panel.app.retry","Retry")}</button>`;if(!this._ready)return y`<p role="status">Loading editor…</p>`;let t=this._selectedCard,s=this._config.entities.length;return y`
      <h2>Entities</h2>
      <div class="toolbar">
        <div class="entity-list" role="group" aria-label=${this._label("ui.panel.lovelace.editor.card.entities.name","Entities")} @keydown=${this._navigate}>
          ${this._config.entities.map((r,n)=>y`
            <button type="button" class="entity-select" aria-label=${`${this._label("ui.panel.lovelace.editor.card.generic.entity","Entity")} ${n+1}`}
              aria-pressed=${n===t?"true":"false"}
              @click=${()=>{this._selectedCard=n}}>${n+1}</button>
          `)}
        </div>
        <button type="button" id="add-card" @click=${this._addEntity}>${this._label("ui.panel.lovelace.editor.entities.add","Add entity")}</button>
      </div>
      <div id="editor">
        ${s?y`
          <div class="card-options">
            <button type="button" aria-label=${this._label("ui.panel.lovelace.editor.edit_card.move_before","Move entity before")} ?disabled=${t===0} @click=${()=>this._moveEntity(-1)}>←</button>
            <button type="button" aria-label=${this._label("ui.panel.lovelace.editor.edit_card.move_after","Move entity after")} ?disabled=${t===s-1} @click=${()=>this._moveEntity(1)}>→</button>
            <button type="button" aria-label=${this._label("ui.panel.lovelace.editor.edit_card.delete","Delete entity")} @click=${this._deleteEntity}>${this._label("ui.panel.lovelace.editor.edit_card.delete","Delete entity")}</button>
          </div>
          <energy-overview-entity-editor .hass=${this.hass} .config=${this._config.entities[t]}
            .lovelace=${this.lovelace} @config-changed=${this._handleConfigChanged}></energy-overview-entity-editor>
        `:y`<p>No entities configured. Add an entity to begin.</p>`}
      </div>
      <h2>Card options</h2>
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${Ot}
        .computeLabel=${this._computeLabel} @value-changed=${this._valueChanged}></ha-form>
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${kt}
        .computeLabel=${this._computeLabel} @value-changed=${this._valueChanged}></ha-form>
      <h2>Animation</h2>
      <ha-form .hass=${this.hass} .data=${this._config.animation??{}} .schema=${Ae}
        .computeLabel=${this._computeLabel} @value-changed=${this._animationChanged}></ha-form>
    `}};$.styles=B`
    :host { display: block; color: var(--primary-text-color); }
    .toolbar, .entity-list, .card-options { display: flex; gap: 4px; align-items: center; }
    .entity-list { flex: 1; min-width: 0; overflow-x: auto; }
    .toolbar { margin-bottom: 8px; }
    .card-options { flex-wrap: wrap; justify-content: flex-end; margin-bottom: 12px; }
    button {
      font: inherit; color: var(--primary-text-color); background: var(--card-background-color, transparent);
      border: 1px solid var(--divider-color, #888); border-radius: 6px;
      min-width: 44px; min-height: 44px; padding: 8px; cursor: pointer;
    }
    button[aria-pressed="true"] { border: 2px solid var(--primary-color, #03a9f4); font-weight: bold; }
    button:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 2px; }
    button:disabled { opacity: 0.45; cursor: default; }
    #editor { border: 1px solid var(--divider-color, #888); border-radius: 6px; padding: 12px; }
    .error { color: var(--error-color, #db4437); }
  `,_([b({attribute:!1})],$.prototype,"hass",2),_([b({attribute:!1})],$.prototype,"lovelace",2),_([I()],$.prototype,"_config",2),_([I()],$.prototype,"_selectedCard",2),_([I()],$.prototype,"_ready",2),_([I()],$.prototype,"_loadFailed",2),$=_([k(me)],$)});ce();he();O();var _t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},yt=i=>(...e)=>({_$litDirective$:i,values:e}),ue=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};O();var{I:si}=nt,vt=i=>i;var $t=()=>document.createComment(""),F=(i,e,t)=>{let s=i._$AA.parentNode,r=e===void 0?i._$AB:e._$AA;if(t===void 0){let n=s.insertBefore($t(),r),o=s.insertBefore($t(),r);t=new si(n,o,i,i.options)}else{let n=t._$AB.nextSibling,o=t._$AM,l=o!==i;if(l){let a;t._$AQ?.(i),t._$AM=i,t._$AP!==void 0&&(a=i._$AU)!==o._$AU&&t._$AP(a)}if(n!==r||l){let a=t._$AA;for(;a!==n;){let h=vt(a).nextSibling;vt(s).insertBefore(a,r),a=h}}}return t},C=(i,e,t=i)=>(i._$AI(e,t),i),ri={},bt=(i,e=ri)=>i._$AH=e,At=i=>i._$AH,pe=i=>{i._$AR(),i._$AA.remove()};var Et=(i,e,t)=>{let s=new Map;for(let r=e;r<=t;r++)s.set(i[r],r);return s},wt=yt(class extends ue{constructor(i){if(super(i),i.type!==_t.CHILD)throw Error("repeat() can only be used in text expressions")}dt(i,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);let r=[],n=[],o=0;for(let l of i)r[o]=s?s(l,o):o,n[o]=t(l,o),o++;return{values:n,keys:r}}render(i,e,t){return this.dt(i,e,t).values}update(i,[e,t,s]){let r=At(i),{values:n,keys:o}=this.dt(e,t,s);if(!Array.isArray(r))return this.ut=o,n;let l=this.ut??=[],a=[],h,f,c=0,p=r.length-1,u=0,g=n.length-1;for(;c<=p&&u<=g;)if(r[c]===null)c++;else if(r[p]===null)p--;else if(l[c]===o[u])a[u]=C(r[c],n[u]),c++,u++;else if(l[p]===o[g])a[g]=C(r[p],n[g]),p--,g--;else if(l[c]===o[g])a[g]=C(r[c],n[g]),F(i,a[g+1],r[c]),c++,g--;else if(l[p]===o[u])a[u]=C(r[p],n[u]),F(i,r[c],r[p]),p--,u++;else if(h===void 0&&(h=Et(o,u,g),f=Et(l,c,p)),h.has(l[c]))if(h.has(l[p])){let A=f.get(o[u]),Ee=A!==void 0?r[A]:null;if(Ee===null){let Fe=F(i,r[c]);C(Fe,n[u]),a[u]=Fe}else a[u]=C(Ee,n[u]),F(i,r[c],Ee),r[A]=null;u++}else pe(r[p]),p--;else pe(r[c]),c++;for(;u<=g;){let A=F(i,a[g+1]);C(A,n[u]),a[u++]=A}for(;c<=p;){let A=r[c++];A!==null&&pe(A)}return this.ut=o,bt(i,a),x}});var Ct="3.0.0";var St="https://github.com/Sese-Schneider/ha-energy-overview-card";j();var ni=(i,e=2)=>Math.round(i*10**e)/10**e,Re=(i,e)=>{let t={maximumFractionDigits:2,...e},s=Number(i);if(!(e?.minimumFractionDigits!==void 0||e?.maximumFractionDigits!==void 0)&&s!==0&&Math.abs(s)<1e-20)return{notation:"scientific",maximumSignificantDigits:17,...e};if(typeof i!="string")return t;if(!e||e.minimumFractionDigits===void 0&&e.maximumFractionDigits===void 0){let n=/^[+-]?\d*(?:\.(\d*))?(?:e([+-]?\d+))?$/i.exec(i.trim()),o=Math.max(0,(n?.[1]?.length??0)-Number(n?.[2]??0));if(o>20&&Number(s.toFixed(20))!==s)return{notation:"scientific",maximumSignificantDigits:17,...e};let l=Math.min(20,o);t.minimumFractionDigits=l,t.maximumFractionDigits=l}return t},oi=i=>{switch(i.number_format){case"comma_decimal":return["en-US","en"];case"decimal_comma":return["de","es","it"];case"space_comma":return["fr","sv","cs"];case"quote_decimal":return["de-CH"];case"system":return;default:return i.language}},De=(i,e,t)=>{let s=e?oi(e):void 0;if(e?.number_format!=="none"&&!Number.isNaN(Number(i))&&Intl)try{return new Intl.NumberFormat(s,Re(i,t)).format(Number(i))}catch(r){return console.error(r),new Intl.NumberFormat(void 0,Re(i,t)).format(Number(i))}return!Number.isNaN(Number(i))&&i!==""&&e?.number_format==="none"&&Intl?new Intl.NumberFormat("en-US",Re(i,{...t,useGrouping:!1})).format(Number(i)):typeof i=="string"?i:`${ni(i,t?.maximumFractionDigits).toString()}${t?.style==="currency"?` ${t.currency}`:""}`},Ht=(i,e)=>{let t=e?.display_precision;if(typeof t=="number"&&Number.isInteger(t)&&t>=0&&t<=20)return{maximumFractionDigits:t,minimumFractionDigits:t};if(Number.isInteger(Number(i.attributes?.step))&&Number.isInteger(Number(i.state)))return{maximumFractionDigits:0}};be();function q(i,e,t,s=!1){if(!e)return s?{display:"Not configured",unit:"",value:void 0}:void 0;let r=i.states[e];if(!r)return{display:"Not found",unit:"",value:void 0};let n=r.state.trim()===""?void 0:Number(r.state),o=n!==void 0&&Number.isFinite(n)?n:void 0,l=Ht(r,i.entities?.[e]);if(o===void 0){let a=`state.default.${r.state}`,h=i.localize(a);return{value:o,unit:"",display:h&&h!==a?h:r.state||"Unknown"}}return{value:o,unit:r.attributes.unit_of_measurement??t,display:De(r.state,i.locale,l),precision:l?.maximumFractionDigits}}function Oe(i,e){return typeof i=="number"&&Number.isFinite(i)&&i>0?i:e}function ke(i){let t={mW:.001,kW:1e3,MW:1e6,"BTU/h":.29307107}[i.unit]??1;return i.value===void 0?void 0:i.value*t}function Lt(i,e){let t=ke(i);if(t===void 0||!Number.isFinite(t)||t===0)return{duration:void 0,inverted:!1};let s=ye(Oe(e?.min_duration,1),.001,86400),r=Math.max(s,ye(Oe(e?.max_duration,10),.001,86400)),n=Oe(e?.power,1e3),o=Math.min(Math.abs(t)/n,1);return{duration:ye(r-(r-s)*o,s,r),inverted:e?.inverted===!0!=t<0}}function Pt(i,e){let t=i.value;if(t===void 0||i.unit==="%"||Math.abs(t)>1)return i.display;let s=Math.max(0,(i.precision??0)-2);return De(t*100,e.locale,{maximumFractionDigits:s,minimumFractionDigits:s})}j();var R=class extends v{static getStubConfig(){return{type:`custom:${L}`,entities:[{power:""}]}}static async getConfigElement(){return await Promise.resolve().then(()=>(jt(),Ft)),document.createElement(me)}setConfig(e){if(!e||!Array.isArray(e.entities)||e.entities.some(t=>!t||typeof t!="object"||Array.isArray(t)))throw new Error("Entities must be a list of entity configurations.");this._config=e}getCardSize(){let e=this._config?.entities.length??0,t=this._config?.entities.filter(s=>s.name).length??0;return Math.max(1,Math.ceil((e*56+t*20+(this._config?.title?56:0))/50))}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}render(){if(!this._config||!this.hass)return d;let e=this._config.entities.map((n,o)=>({...n,key:o,power:q(this.hass,n.power,"W",!0),current:q(this.hass,n.current,"A"),voltage:q(this.hass,n.voltage,"V"),frequency:q(this.hass,n.frequency,"Hz"),power_factor:q(this.hass,n.power_factor,""),animation:{...this._config?.animation,...n.animation}})),t=this._config.order_by,r=["power","current","voltage","frequency","power_factor"].find(n=>n===t);if(r){let n=o=>r==="power"?ke(o.power)??0:o[r]?.value??0;e.sort((o,l)=>n(l)-n(o))}return y`
      <ha-card .header=${this._config.title}>
        ${e.length?d:y`<div class="entity">No entities configured.</div>`}
        ${wt(e,n=>n.key,n=>this._renderEntity(n))}
      </ha-card>
    `}_renderEntity(e){let t=Lt(e.power,e.animation),s=e.power_factor,r=s?.value===void 0?"":"%",n=`entity entity-${e.key}`,o=`--energy-line-color: ${e.color||"var(--energy-grid-consumption-color, var(--primary-color, #03a9f4))"};`;return y`
      <div class=${n} style=${o}>
        ${e.name?y`<span class="primary name">${e.name}</span>`:d}
        <div class="metadata">
          ${e.current||e.voltage||e.frequency?y`
            <div class="metadata-left">
              ${this._measurement(e.voltage,"voltage")}
              ${this._measurement(e.current,"current")}
              ${this._measurement(e.frequency,"frequency")}
            </div>`:d}
          <div class="metadata-center">
            <span class="secondary power">${e.power.display}</span>&nbsp;<span class="secondary power-unit">${e.power.unit}</span>
          </div>
          ${s?y`<div class="metadata-right">
            <span class="secondary power-factor">${Pt(s,this.hass)}</span>&nbsp;<span class="secondary power-factor-unit">${r}</span>
          </div>`:d}
        </div>
        <div class="main">
          <div class="primary label label-leading">${e.label_leading||""}</div>
          <div class="icon icon-leading"><ha-icon .icon=${e.icon_leading||fe}></ha-icon></div>
          <div class="line">
            <svg preserveAspectRatio="none" viewBox="0 0 100 10" aria-hidden="true">
              <path class="grid" d="M0,5 H100" vector-effect="non-scaling-stroke"></path>
              ${this._motion(t)}
            </svg>
          </div>
          <div class="icon icon-trailing"><ha-icon .icon=${e.icon_trailing||ge}></ha-icon></div>
          <div class="primary label label-trailing">${e.label_trailing||""}</div>
        </div>
      </div>
    `}_motion(e){if(e.duration===void 0)return d;let t=`${e.duration}s`,s=e.inverted?"reverse":"normal",r=`--flow-duration: ${t}; --flow-direction: ${s};`;return it`<path class="flow-dot" d="M0,5 h0" vector-effect="non-scaling-stroke"
      style=${r}></path>`}_measurement(e,t){if(!e)return d;let s=`secondary ${t}`,r=`secondary ${t}-unit`;return y`<div class="measurement"><span class=${s}>${e.display}</span>&nbsp;<span class=${r}>${e.unit}</span></div>`}};R.styles=B`
    :host { display: block; min-width: 0; container-type: inline-size; }
    ha-card { display: block; overflow: hidden; }
    .primary { font-weight: bold; font-size: 14px; color: var(--primary-text-color); }
    .secondary { font-weight: bolder; font-size: 12px; color: var(--secondary-text-color); }
    .entity { max-width: 492px; padding: 8px; margin: 0 auto; min-width: 0; }
    .name { display: block; overflow-wrap: anywhere; }
    .metadata { display: flex; flex-wrap: wrap; justify-content: space-evenly; align-items: center; gap: 4px 12px; margin-bottom: 2px; }
    .metadata-left { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 12px; min-width: 0; }
    .measurement, .metadata-center, .metadata-right { font-variant-numeric: tabular-nums; overflow-wrap: anywhere; min-width: 0; }
    .main { min-height: 24px; display: flex; align-items: center; min-width: 0; }
    .label { max-width: 25%; min-width: 0; overflow-wrap: anywhere; }
    .label-leading { margin-right: 4px; }
    .label-trailing { margin-left: 4px; }
    .icon { flex: 0 0 24px; width: 24px; height: 24px; }
    .line { flex: 1 1 0; min-width: 0; height: 15px; margin: 0 8px; }
    .line svg { display: block; width: 100%; height: 15px; overflow: visible; }
    .line path { stroke-width: 1; fill: none; stroke: var(--energy-line-color); }
    .line .flow-dot { stroke-width: 6; stroke-linecap: round; animation: energy-flow var(--flow-duration) linear infinite; animation-direction: var(--flow-direction); }
    /* SVG user units track the viewBox, independent of the rendered card width. */
    @keyframes energy-flow { from { transform: translateX(0px); } to { transform: translateX(100px); } }
    @container (max-width: 360px) {
      .main { display: grid; grid-template-columns: 24px minmax(0, 1fr) 24px; gap: 4px; }
      .label { max-width: none; margin: 0; }
      .label:empty { display: none; }
      .label-leading { grid-column: 1 / 3; grid-row: 1; }
      .label-trailing { grid-column: 2 / 4; grid-row: 3; text-align: right; }
      .icon-leading { grid-column: 1; grid-row: 2; }
      .line { grid-column: 2; grid-row: 2; margin: 0; }
      .icon-trailing { grid-column: 3; grid-row: 2; }
    }
    @media (prefers-reduced-motion: reduce) { .line .flow-dot { display: none; animation: none; } }
  `,_([b({attribute:!1})],R.prototype,"hass",2),_([I()],R.prototype,"_config",2),R=_([k(L)],R);window.customCards??=[];window.customCards.some(i=>i.type===L)||window.customCards.push({type:L,name:Tt,preview:!0,documentationURL:St,description:"Live power and electrical measurements with animated flow."});console.info(`${L} (${Ct}) is installed`);export{R as EnergyOverviewCard};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
