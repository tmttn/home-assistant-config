"use strict";(self.webpackChunkhacs_frontend=self.webpackChunkhacs_frontend||[]).push([[9101,3265],{68927:function(e,t,n){var r=n(22858).A,a=n(33994).A;n.a(e,function(){var e=r(a().mark((function e(r,i){var o,s,l,c,d,u,h,p;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n.d(t,{PE:function(){return p}}),o=n(82386),n.n(o),s=n(39805),n.n(s),l=n(13265),c=n(48248),d=n(23285),!(u=r([l])).then){e.next=17;break}return e.next=13,u;case 13:e.t1=e.sent,e.t0=(0,e.t1)(),e.next=18;break;case 17:e.t0=u;case 18:l=e.t0[0],h=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],p=function(e){return e.first_weekday===d.zt.language?"weekInfo"in Intl.Locale.prototype?new Intl.Locale(e.language).weekInfo.firstDay%7:(0,c.S)(e.language)%7:h.includes(e.first_weekday)?h.indexOf(e.first_weekday):1},function(e){var t=p(e);return h[t]},i(),e.next=28;break;case 25:e.prev=25,e.t2=e.catch(0),i(e.t2);case 28:case"end":return e.stop()}}),e,null,[[0,25]])})));return function(t,n){return e.apply(this,arguments)}}())},7356:function(e,t,n){var r=n(22858).A,a=n(33994).A;n.a(e,function(){var e=r(a().mark((function e(r,i){var o,s,l,c,d,u,h;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n.d(t,{K:function(){return h}}),o=n(13265),s=n(94100),l=n(74076),!(c=r([o,l])).then){e.next=13;break}return e.next=9,c;case 9:e.t1=e.sent,e.t0=(0,e.t1)(),e.next=14;break;case 13:e.t0=c;case 14:d=e.t0,o=d[0],l=d[1],u=(0,s.A)((function(e){return new Intl.RelativeTimeFormat(e.language,{numeric:"auto"})})),h=function(e,t,n){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=(0,l.x)(e,n,t);return r?u(t).format(a.value,a.unit):Intl.NumberFormat(t.language,{style:"unit",unit:a.unit,unitDisplay:"long"}).format(Math.abs(a.value))},i(),e.next=25;break;case 22:e.prev=22,e.t2=e.catch(0),i(e.t2);case 25:case"end":return e.stop()}}),e,null,[[0,22]])})));return function(t,n){return e.apply(this,arguments)}}())},13593:function(e,t,n){function r(e){var t=e.language||"en";return e.translationMetadata.translations[t]&&e.translationMetadata.translations[t].isRTL||!1}function a(e){return i(r(e))}function i(e){return e?"rtl":"ltr"}n.d(t,{Vc:function(){return a},qC:function(){return r}})},74076:function(e,t,n){var r=n(22858).A,a=n(33994).A;n.a(e,function(){var e=r(a().mark((function e(r,i){var o,s,l,c,d,u,h,p,f,m,v;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Date.now(),n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=Object.assign(Object.assign({},v),r||{}),i=(+e-+t)/h;if(Math.abs(i)<a.second)return{value:Math.round(i),unit:"second"};var o=i/p;if(Math.abs(o)<a.minute)return{value:Math.round(o),unit:"minute"};var u=i/f;if(Math.abs(u)<a.hour)return{value:Math.round(u),unit:"hour"};var m=new Date(e),y=new Date(t);m.setHours(0,0,0,0),y.setHours(0,0,0,0);var g=(0,s.c)(m,y);if(0===g)return{value:Math.round(u),unit:"hour"};if(Math.abs(g)<a.day)return{value:g,unit:"day"};var _=(0,d.PE)(n),k=(0,l.k)(m,{weekStartsOn:_}),x=(0,l.k)(y,{weekStartsOn:_}),b=(0,c.I)(k,x);if(0===b)return{value:g,unit:"day"};if(Math.abs(b)<a.week)return{value:b,unit:"week"};var w=m.getFullYear()-y.getFullYear(),A=12*w+m.getMonth()-y.getMonth();return 0===A?{value:b,unit:"week"}:Math.abs(A)<a.month||0===w?{value:A,unit:"month"}:{value:Math.round(w),unit:"year"}},n.d(t,{x:function(){return m}}),o=n(26098),n.n(o),s=n(31195),l=n(24085),c=n(97334),d=n(68927),!(u=r([d])).then){e.next=17;break}return e.next=13,u;case 13:e.t1=e.sent,e.t0=(0,e.t1)(),e.next=18;break;case 17:e.t0=u;case 18:d=e.t0[0],h=1e3,f=60*(p=60),v={second:45,minute:45,hour:22,day:5,week:4,month:11},i(),e.next=29;break;case 26:e.prev=26,e.t2=e.catch(0),i(e.t2);case 29:case"end":return e.stop()}}),e,null,[[0,26]])})));return function(t,n){return e.apply(this,arguments)}}())},34095:function(e,t,n){var r,a=n(64599),i=n(35806),o=n(71008),s=n(62193),l=n(2816),c=n(27927),d=(n(81027),n(72606)),u=n(66360),h=n(29818),p=n(49141);(0,c.A)([(0,h.EM)("ha-button")],(function(e,t){var n=function(t){function n(){var t;(0,o.A)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return t=(0,s.A)(this,n,[].concat(a)),e(t),t}return(0,l.A)(n,t),(0,i.A)(n)}(t);return{F:n,d:[{kind:"field",static:!0,key:"styles",value:function(){return[p.R,(0,u.AH)(r||(r=(0,a.A)(["::slotted([slot=icon]){margin-inline-start:0px;margin-inline-end:8px;direction:var(--direction);display:block}.mdc-button{height:var(--button-height,36px)}.trailing-icon{display:flex}.slot-container{overflow:var(--button-slot-container-overflow,visible)}"])))]}}]}}),d.$)},45876:function(e,t,n){var r,a=n(64599),i=n(41981),o=n(35806),s=n(71008),l=n(62193),c=n(2816),d=n(27927),u=n(35890),h=(n(81027),n(99322)),p=n(66360),f=n(29818);(0,d.A)([(0,f.EM)("ha-circular-progress")],(function(e,t){var n=function(t){function n(){var t;(0,s.A)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return t=(0,l.A)(this,n,[].concat(a)),e(t),t}return(0,c.A)(n,t),(0,o.A)(n)}(t);return{F:n,d:[{kind:"field",decorators:[(0,f.MZ)({attribute:"aria-label",type:String})],key:"ariaLabel",value:function(){return"Loading"}},{kind:"field",decorators:[(0,f.MZ)()],key:"size",value:function(){return"medium"}},{kind:"method",key:"updated",value:function(e){if((0,u.A)(n,"updated",this,3)([e]),e.has("size"))switch(this.size){case"tiny":this.style.setProperty("--md-circular-progress-size","16px");break;case"small":this.style.setProperty("--md-circular-progress-size","28px");break;case"medium":this.style.setProperty("--md-circular-progress-size","48px");break;case"large":this.style.setProperty("--md-circular-progress-size","68px")}}},{kind:"field",static:!0,key:"styles",value:function(){return[].concat((0,i.A)((0,u.A)(n,"styles",this)),[(0,p.AH)(r||(r=(0,a.A)([":host{--md-sys-color-primary:var(--primary-color);--md-circular-progress-size:48px}"])))])}}]}}),h.U)},91933:function(e,t,n){var r,a,i,o,s,l=n(33994),c=n(22858),d=n(64599),u=n(35806),h=n(71008),p=n(62193),f=n(2816),m=n(27927),v=n(35890),y=(n(81027),n(66360)),g=n(29818),_=n(65520),k=n(50880),x=n(37968),b=(n(83859),"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z");(0,m.A)([(0,g.EM)("ha-expansion-panel")],(function(e,t){var n,m=function(t){function n(){var t;(0,h.A)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return t=(0,p.A)(this,n,[].concat(a)),e(t),t}return(0,f.A)(n,t),(0,u.A)(n)}(t);return{F:m,d:[{kind:"field",decorators:[(0,g.MZ)({type:Boolean,reflect:!0})],key:"expanded",value:function(){return!1}},{kind:"field",decorators:[(0,g.MZ)({type:Boolean,reflect:!0})],key:"outlined",value:function(){return!1}},{kind:"field",decorators:[(0,g.MZ)({type:Boolean,reflect:!0})],key:"leftChevron",value:function(){return!1}},{kind:"field",decorators:[(0,g.MZ)({type:Boolean,reflect:!0})],key:"noCollapse",value:function(){return!1}},{kind:"field",decorators:[(0,g.MZ)()],key:"header",value:void 0},{kind:"field",decorators:[(0,g.MZ)()],key:"secondary",value:void 0},{kind:"field",decorators:[(0,g.wk)()],key:"_showContent",value:function(){return this.expanded}},{kind:"field",decorators:[(0,g.P)(".container")],key:"_container",value:void 0},{kind:"method",key:"render",value:function(){return(0,y.qy)(r||(r=(0,d.A)([' <div class="top ','"> <div id="summary" class="','" @click="','" @keydown="','" @focus="','" @blur="','" role="button" tabindex="','" aria-expanded="','" aria-controls="sect1"> ',' <slot name="header"> <div class="header"> ',' <slot class="secondary" name="secondary">',"</slot> </div> </slot> ",' <slot name="icons"></slot> </div> </div> <div class="container ','" @transitionend="','" role="region" aria-labelledby="summary" aria-hidden="','" tabindex="-1"> '," </div> "])),(0,_.H)({expanded:this.expanded}),(0,_.H)({noCollapse:this.noCollapse}),this._toggleContainer,this._toggleContainer,this._focusChanged,this._focusChanged,this.noCollapse?-1:0,this.expanded,this.leftChevron&&!this.noCollapse?(0,y.qy)(a||(a=(0,d.A)([' <ha-svg-icon .path="','" class="summary-icon ','"></ha-svg-icon> '])),b,(0,_.H)({expanded:this.expanded})):"",this.header,this.secondary,this.leftChevron||this.noCollapse?"":(0,y.qy)(i||(i=(0,d.A)([' <ha-svg-icon .path="','" class="summary-icon ','"></ha-svg-icon> '])),b,(0,_.H)({expanded:this.expanded})),(0,_.H)({expanded:this.expanded}),this._handleTransitionEnd,!this.expanded,this._showContent?(0,y.qy)(o||(o=(0,d.A)(["<slot></slot>"]))):"")}},{kind:"method",key:"willUpdate",value:function(e){var t=this;(0,v.A)(m,"willUpdate",this,3)([e]),e.has("expanded")&&(this._showContent=this.expanded,setTimeout((function(){t._container.style.overflow=t.expanded?"initial":"hidden"}),300))}},{kind:"method",key:"_handleTransitionEnd",value:function(){this._container.style.removeProperty("height"),this._container.style.overflow=this.expanded?"initial":"hidden",this._showContent=this.expanded}},{kind:"method",key:"_toggleContainer",value:(n=(0,c.A)((0,l.A)().mark((function e(t){var n,r,a=this;return(0,l.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.defaultPrevented){e.next=2;break}return e.abrupt("return");case 2:if("keydown"!==t.type||"Enter"===t.key||" "===t.key){e.next=4;break}return e.abrupt("return");case 4:if(t.preventDefault(),!this.noCollapse){e.next=7;break}return e.abrupt("return");case 7:if(n=!this.expanded,(0,k.r)(this,"expanded-will-change",{expanded:n}),this._container.style.overflow="hidden",!n){e.next=14;break}return this._showContent=!0,e.next=14,(0,x.E)();case 14:r=this._container.scrollHeight,this._container.style.height="".concat(r,"px"),n||setTimeout((function(){a._container.style.height="0px"}),0),this.expanded=n,(0,k.r)(this,"expanded-changed",{expanded:this.expanded});case 19:case"end":return e.stop()}}),e,this)}))),function(e){return n.apply(this,arguments)})},{kind:"method",key:"_focusChanged",value:function(e){this.noCollapse||this.shadowRoot.querySelector(".top").classList.toggle("focused","focus"===e.type)}},{kind:"get",static:!0,key:"styles",value:function(){return(0,y.AH)(s||(s=(0,d.A)([":host{display:block}.top{display:flex;align-items:center;border-radius:var(--ha-card-border-radius,12px)}.top.expanded{border-bottom-left-radius:0px;border-bottom-right-radius:0px}.top.focused{background:var(--input-fill-color)}:host([outlined]){box-shadow:none;border-width:1px;border-style:solid;border-color:var(--outline-color);border-radius:var(--ha-card-border-radius,12px)}.summary-icon{transition:transform 150ms cubic-bezier(.4, 0, .2, 1);direction:var(--direction);margin-left:8px;margin-inline-start:8px;margin-inline-end:initial}:host([leftchevron]) .summary-icon{margin-left:0;margin-right:8px;margin-inline-start:0;margin-inline-end:8px}#summary{flex:1;display:flex;padding:var(--expansion-panel-summary-padding,0 8px);min-height:48px;align-items:center;cursor:pointer;overflow:hidden;font-weight:500;outline:0}#summary.noCollapse{cursor:default}.summary-icon.expanded{transform:rotate(180deg)}.header,::slotted([slot=header]){flex:1}.container{padding:var(--expansion-panel-content-padding,0 8px);overflow:hidden;transition:height .3s cubic-bezier(.4, 0, .2, 1);height:0px}.container.expanded{height:auto}.secondary{display:block;color:var(--secondary-text-color);font-size:12px}"])))}}]}}),y.WF)},27783:function(e,t,n){var r,a,i,o=n(64599),s=n(35806),l=n(71008),c=n(62193),d=n(2816),u=n(27927),h=n(35890),p=(n(81027),n(30116)),f=n(43389),m=n(66360),v=n(29818);(0,u.A)([(0,v.EM)("ha-list-item")],(function(e,t){var n=function(t){function n(){var t;(0,l.A)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return t=(0,c.A)(this,n,[].concat(a)),e(t),t}return(0,d.A)(n,t),(0,s.A)(n)}(t);return{F:n,d:[{kind:"method",key:"renderRipple",value:function(){return this.noninteractive?"":(0,h.A)(n,"renderRipple",this,3)([])}},{kind:"get",static:!0,key:"styles",value:function(){return[f.R,(0,m.AH)(r||(r=(0,o.A)([":host{padding-left:var(--mdc-list-side-padding-left,var(--mdc-list-side-padding,20px));padding-inline-start:var(--mdc-list-side-padding-left,var(--mdc-list-side-padding,20px));padding-right:var(--mdc-list-side-padding-right,var(--mdc-list-side-padding,20px));padding-inline-end:var(--mdc-list-side-padding-right,var(--mdc-list-side-padding,20px))}:host([graphic=avatar]:not([twoLine])),:host([graphic=icon]:not([twoLine])){height:48px}span.material-icons:first-of-type{margin-inline-start:0px!important;margin-inline-end:var(--mdc-list-item-graphic-margin,16px)!important;direction:var(--direction)!important}span.material-icons:last-of-type{margin-inline-start:auto!important;margin-inline-end:0px!important;direction:var(--direction)!important}.mdc-deprecated-list-item__meta{display:var(--mdc-list-item-meta-display);align-items:center;flex-shrink:0}:host([graphic=icon]:not([twoline])) .mdc-deprecated-list-item__graphic{margin-inline-end:var(--mdc-list-item-graphic-margin,20px)!important}:host([multiline-secondary]){height:auto}:host([multiline-secondary]) .mdc-deprecated-list-item__text{padding:8px 0}:host([multiline-secondary]) .mdc-deprecated-list-item__secondary-text{text-overflow:initial;white-space:normal;overflow:auto;display:inline-block;margin-top:10px}:host([multiline-secondary]) .mdc-deprecated-list-item__primary-text{margin-top:10px}:host([multiline-secondary]) .mdc-deprecated-list-item__secondary-text::before{display:none}:host([multiline-secondary]) .mdc-deprecated-list-item__primary-text::before{display:none}:host([disabled]){color:var(--disabled-text-color)}:host([noninteractive]){pointer-events:unset}"]))),"rtl"===document.dir?(0,m.AH)(a||(a=(0,o.A)(["span.material-icons:first-of-type,span.material-icons:last-of-type{direction:rtl!important;--direction:rtl}"]))):(0,m.AH)(i||(i=(0,o.A)([""])))]}}]}}),p.J)},9101:function(e,t,n){var r=n(22858).A,a=n(33994).A;n.a(e,function(){var e=r(a().mark((function e(r,i){var o,s,l,c,d,u,h,p,f,m,v,y,g,_,k,x,b,w,A,P,M,C,z,q,L,Z,R,D,F,H,I,T,E,V,S,K,O,j,B,N,W,J,U,$,G,Y,Q,X,ee;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n.r(t),n.d(t,{HacsDonwloadDialog:function(){return ee},ReleaseItem:function(){return X}}),o=n(33994),s=n(22858),l=n(64599),c=n(35806),d=n(71008),u=n(62193),h=n(2816),p=n(27927),f=n(81027),n.n(f),m=n(82386),n.n(m),v=n(97741),n.n(v),y=n(50693),n.n(y),g=n(16891),n.n(g),n(72606),_=n(46072),k=n(66360),x=n(29818),b=n(94100),w=n(50880),A=n(61582),P=n(13593),n(77477),n(34095),n(45876),n(66287),n(91933),n(88606),n(27783),M=n(7356),C=n(75548),z=n(80765),q=n(17540),L=n(25401),Z=n(6753),R=n(810),!(D=r([_,M])).then){e.next=51;break}return e.next=47,D;case 47:e.t1=e.sent,e.t0=(0,e.t1)(),e.next=52;break;case 51:e.t0=D;case 52:F=e.t0,_=F[0],M=F[1],X=(0,p.A)([(0,x.EM)("release-item")],(function(e,t){var n=function(t){function n(){var t;(0,d.A)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return t=(0,u.A)(this,n,[].concat(a)),e(t),t}return(0,h.A)(n,t),(0,c.A)(n)}(t);return{F:n,d:[{kind:"field",decorators:[(0,x.MZ)({attribute:!1})],key:"locale",value:void 0},{kind:"field",decorators:[(0,x.MZ)({attribute:!1})],key:"release",value:void 0},{kind:"method",key:"render",value:function(){return(0,k.qy)(H||(H=(0,l.A)([" <span> "," ",' </span> <span class="secondary"> '," "," </span> "])),this.release.tag,this.release.prerelease?(0,k.qy)(I||(I=(0,l.A)(['<span class="pre-release">pre-release</span>']))):k.s6,(0,M.K)(new Date(this.release.published_at),this.locale),this.release.name&&this.release.name!==this.release.tag?(0,k.qy)(T||(T=(0,l.A)([" - ",""])),this.release.name):k.s6)}},{kind:"get",static:!0,key:"styles",value:function(){return(0,k.AH)(E||(E=(0,l.A)([":host{display:flex;flex-direction:column}.secondary{font-size:.8em;color:var(--secondary-text-color);font-style:italic}.pre-release{background-color:var(--accent-color);padding:2px 4px;font-size:.8em;font-weight:600;border-radius:12px;margin:0 2px;color:var(--secondary-background-color)}"])))}}]}}),k.WF),ee=(0,p.A)([(0,x.EM)("hacs-download-dialog")],(function(e,t){var n,r,a,i,p=function(t){function n(){var t;(0,d.A)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return t=(0,u.A)(this,n,[].concat(a)),e(t),t}return(0,h.A)(n,t),(0,c.A)(n)}(t);return{F:p,d:[{kind:"field",decorators:[(0,x.MZ)({attribute:!1})],key:"hass",value:void 0},{kind:"field",decorators:[(0,x.wk)()],key:"_waiting",value:function(){return!0}},{kind:"field",decorators:[(0,x.wk)()],key:"_installing",value:function(){return!1}},{kind:"field",decorators:[(0,x.wk)()],key:"_error",value:void 0},{kind:"field",decorators:[(0,x.wk)()],key:"_releases",value:void 0},{kind:"field",decorators:[(0,x.wk)()],key:"_repository",value:void 0},{kind:"field",decorators:[(0,x.wk)()],key:"_dialogParams",value:void 0},{kind:"field",decorators:[(0,x.wk)()],key:"_selectedVersion",value:void 0},{kind:"method",key:"showDialog",value:(i=(0,s.A)((0,o.A)().mark((function e(t){var n=this;return(0,o.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._dialogParams=t,this._waiting=!1,!t.repository){e.next=6;break}this._repository=t.repository,e.next=8;break;case 6:return e.next=8,this._fetchRepository();case 8:return this._repository&&"commit"!==this._repository.version_or_commit&&(this._selectedVersion=this._repository.available_version),this._releases=void 0,(0,L.zl)(this.hass,(function(e){n._error=e,n._installing=!1}),z.a.ERROR),e.next=13,this.updateComplete;case 13:case"end":return e.stop()}}),e,this)}))),function(e){return i.apply(this,arguments)})},{kind:"method",key:"closeDialog",value:function(){this._dialogParams=void 0,this._repository=void 0,this._error=void 0,this._installing=!1,this._waiting=!1,this._releases=void 0,this._selectedVersion=void 0,(0,w.r)(this,"dialog-closed",{dialog:this.localName})}},{kind:"field",key:"_getInstallPath",value:function(){return(0,b.A)((function(e){var t=e.local_path;return["template","theme","python_script"].includes(e.category)&&(t="".concat(t,"/").concat(e.file_name)),t}))}},{kind:"method",key:"_fetchRepository",value:(a=(0,s.A)((0,o.A)().mark((function e(){return(0,o.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,q.vA)(this.hass,this._dialogParams.repositoryId);case 3:this._repository=e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),this._error=e.t0;case 9:case"end":return e.stop()}}),e,this,[[0,6]])}))),function(){return a.apply(this,arguments)})},{kind:"method",key:"render",value:function(){var e,t=this;if(!this._dialogParams)return k.s6;if(!this._repository)return(0,k.qy)(V||(V=(0,l.A)([' <ha-dialog open scrimClickAction escapeKeyAction heading="Loading..."> <div class="loading"> <ha-circular-progress indeterminate></ha-circular-progress> '," </div> </ha-dialog> "])),this._error?(0,k.qy)(S||(S=(0,l.A)(['<ha-alert alert-type="error" .rtl="','"> '," </ha-alert>"])),(0,P.qC)(this.hass),this._error.message||this._error):k.s6);var n=this._getInstallPath(this._repository);return(0,k.qy)(K||(K=(0,l.A)([' <ha-dialog open scrimClickAction escapeKeyAction .heading="','" @closed="','"> <div class="content"> <p> ',' </p> <div class="note"> '," "," "," </div> "," "," ",' </div> <mwc-button slot="secondaryAction" @click="','" dialogInitialFocus> ',' </mwc-button> <mwc-button slot="primaryAction" ?disabled="','" @click="','"> '," </mwc-button> </ha-dialog> "])),this._repository.name,this.closeDialog,this._dialogParams.hacs.localize("commit"===this._repository.version_or_commit?"dialog_download.will_download_commit":"dialog_download.will_download_version",{ref:(0,k.qy)(O||(O=(0,l.A)([" <code>","</code> "])),this._selectedVersion||this._repository.available_version)}),this._dialogParams.hacs.localize("dialog_download.note_downloaded",{location:(0,k.qy)(j||(j=(0,l.A)(["<code>'","'</code>"])),n)}),"plugin"===this._repository.category&&"storage"!==this._dialogParams.hacs.info.lovelace_mode?(0,k.qy)(B||(B=(0,l.A)([" <p>",'</p> <pre class="frontend-resource">\n                url: ',"\n                type: module\n                </pre> "])),this._dialogParams.hacs.localize("dialog_download.lovelace_instruction"),(0,R.J)({repository:this._repository})):k.s6,"integration"===this._repository.category?(0,k.qy)(N||(N=(0,l.A)(["<p>","</p>"])),this._dialogParams.hacs.localize("dialog_download.restart")):k.s6,this._selectedVersion?(0,k.qy)(W||(W=(0,l.A)(['<ha-expansion-panel @expanded-changed="','" .header="','"> <p>',"</p> "," </ha-expansion-panel>"])),this._fetchReleases,this._dialogParams.hacs.localize("dialog_download.different_version"),this._dialogParams.hacs.localize("dialog_download.release_warning"),void 0===this._releases?this._dialogParams.hacs.localize("dialog_download.fetching_releases"):0===this._releases.length?this._dialogParams.hacs.localize("dialog_download.no_releases"):(0,k.qy)(J||(J=(0,l.A)(['<ha-form @value-changed="','" .computeLabel="','" .schema="','"></ha-form>'])),this._versionChanged,this._computeLabel,[{name:"release",selector:{select:{mode:"dropdown",options:null===(e=this._releases)||void 0===e?void 0:e.map((function(e){return{value:e.tag,label:(0,k.qy)(U||(U=(0,l.A)(['<release-item .locale="','" .release="','"> '," </release-item>"])),t.hass.locale,e,e.tag)}}))}}}])):k.s6,this._error?(0,k.qy)($||($=(0,l.A)(['<ha-alert alert-type="error" .rtl="','"> '," </ha-alert>"])),(0,P.qC)(this.hass),this._error.message||this._error):k.s6,this._installing?(0,k.qy)(G||(G=(0,l.A)(["<mwc-linear-progress indeterminate></mwc-linear-progress>"]))):k.s6,this.closeDialog,this._dialogParams.hacs.localize("common.cancel"),this._waiting||this._installing,this._installRepository,this._dialogParams.hacs.localize("common.download"))}},{kind:"field",key:"_computeLabel",value:function(){var e=this;return function(t){return"release"===t.name?e._dialogParams.hacs.localize("dialog_download.release"):t.name}}},{kind:"method",key:"_installRepository",value:(r=(0,s.A)((0,o.A)().mark((function e(){return(0,o.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._repository){e.next=2;break}return e.abrupt("return");case 2:if(!this._waiting){e.next=5;break}return this._error="Waiting to update repository information, try later.",e.abrupt("return");case 5:if(!this._installing){e.next=8;break}return this._error="Already installing, please wait.",e.abrupt("return");case 8:return this._installing=!0,this._error=void 0,e.prev=10,e.next=13,(0,q.l1)(this.hass,String(this._repository.id),this._selectedVersion||this._repository.available_version);case 13:e.next=20;break;case 15:return e.prev=15,e.t0=e.catch(10),this._error=e.t0||{message:"Could not download repository, check core logs for more information."},this._installing=!1,e.abrupt("return");case 20:this._dialogParams.hacs.log.debug(this._repository.category,"_installRepository"),this._dialogParams.hacs.log.debug(this._dialogParams.hacs.info.lovelace_mode,"_installRepository"),this._installing=!1,"plugin"===this._repository.category&&(0,C.dk)(this,{title:this._dialogParams.hacs.localize("common.reload"),text:(0,k.qy)(Y||(Y=(0,l.A)(["","<br>",""])),this._dialogParams.hacs.localize("dialog.reload.description"),this._dialogParams.hacs.localize("dialog.reload.confirm")),dismissText:this._dialogParams.hacs.localize("common.cancel"),confirmText:this._dialogParams.hacs.localize("common.reload"),confirm:function(){A.G.location.href=A.G.location.href}}),void 0===this._error&&this.closeDialog();case 25:case"end":return e.stop()}}),e,this,[[10,15]])}))),function(){return r.apply(this,arguments)})},{kind:"method",key:"_fetchReleases",value:(n=(0,s.A)((0,o.A)().mark((function e(){return(0,o.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===this._releases){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,(0,q.$q)(this.hass,this._repository.id);case 5:this._releases=e.sent,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),this._error=e.t0;case 11:case"end":return e.stop()}}),e,this,[[2,8]])}))),function(){return n.apply(this,arguments)})},{kind:"method",key:"_versionChanged",value:function(e){this._selectedVersion=e.detail.value.release}},{kind:"get",static:!0,key:"styles",value:function(){return[Z.k,(0,k.AH)(Q||(Q=(0,l.A)([".note{margin-top:12px}pre{white-space:pre-line;user-select:all;padding:8px}mwc-linear-progress{margin-bottom:-8px;margin-top:4px}ha-expansion-panel{background-color:var(--secondary-background-color);padding:8px}.loading{text-align:center;padding:16px}"])))]}}]}}),k.WF),i(),e.next=63;break;case 60:e.prev=60,e.t2=e.catch(0),i(e.t2);case 63:case"end":return e.stop()}}),e,null,[[0,60]])})));return function(t,n){return e.apply(this,arguments)}}())},17540:function(e,t,n){n.d(t,{$q:function(){return s},l1:function(){return o},vA:function(){return i}});var r=n(33994),a=n(22858),i=function(){var e=(0,a.A)((0,r.A)().mark((function e(t,n){return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.connection.sendMessagePromise({type:"hacs/repository/info",repository_id:n}));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),o=function(){var e=(0,a.A)((0,r.A)().mark((function e(t,n,a){return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.connection.sendMessagePromise({type:"hacs/repository/download",repository:n,version:a}));case 1:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),s=function(){var e=(0,a.A)((0,r.A)().mark((function e(t,n){return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.connection.sendMessagePromise({type:"hacs/repository/releases",repository_id:n}));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},13265:function(e,t,n){var r=n(22858).A,a=n(33994).A;n.a(e,function(){var e=r(a().mark((function e(t,r){var i,o,s,l,c,d,u,h,p,f,m,v,y,g,_,k,x,b,w;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i=n(33994),o=n(22858),s=n(95737),n.n(s),l=n(89655),n.n(l),c=n(39790),n.n(c),d=n(66457),n.n(d),u=n(99019),n.n(u),h=n(96858),n.n(h),p=n(4604),f=n(41344),m=n(51141),v=n(5269),y=n(12124),g=n(78008),_=n(12653),k=n(74264),x=n(65842),b=n(44129),w=function(){var e=(0,o.A)((0,i.A)().mark((function e(){var t,r;return(0,i.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=(0,x.wb)(),r=[],!(0,m.Z)()){e.next=5;break}return e.next=5,Promise.all([n.e(7500),n.e(9699)]).then(n.bind(n,59699));case 5:if(!(0,y.Z)()){e.next=8;break}return e.next=8,Promise.all([n.e(7555),n.e(7500),n.e(548)]).then(n.bind(n,70548));case 8:if((0,p.Z)(t)&&r.push(Promise.all([n.e(7555),n.e(3028)]).then(n.bind(n,43028)).then((function(){return(0,b.T)()}))),(0,f.Z6)(t)&&r.push(Promise.all([n.e(7555),n.e(4904)]).then(n.bind(n,24904))),(0,v.Z)(t)&&r.push(Promise.all([n.e(7555),n.e(307)]).then(n.bind(n,70307))),(0,g.Z)(t)&&r.push(Promise.all([n.e(7555),n.e(6336)]).then(n.bind(n,56336))),(0,_.Z)(t)&&r.push(Promise.all([n.e(7555),n.e(27)]).then(n.bind(n,50027)).then((function(){return n.e(9135).then(n.t.bind(n,99135,23))}))),(0,k.Z)(t)&&r.push(Promise.all([n.e(7555),n.e(6368)]).then(n.bind(n,36368))),0!==r.length){e.next=16;break}return e.abrupt("return");case 16:return e.next=18,Promise.all(r).then((function(){return(0,b.K)(t)}));case 18:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),e.next=28,w();case 28:r(),e.next=34;break;case 31:e.prev=31,e.t0=e.catch(0),r(e.t0);case 34:case"end":return e.stop()}}),e,null,[[0,31]])})));return function(t,n){return e.apply(this,arguments)}}(),1)},44129:function(e,t,n){n.d(t,{K:function(){return l},T:function(){return c}});var r=n(33994),a=n(22858),i=(n(81027),n(95737),n(97741),n(39790),n(66457),n(74268),n(24545),n(51855),n(82130),n(31743),n(22328),n(4959),n(62435),n(99019),n(96858),["DateTimeFormat","DisplayNames","ListFormat","NumberFormat","RelativeTimeFormat"]),o=new Set,s=function(){var e=(0,a.A)((0,r.A)().mark((function e(t,n){var a,i,o,s=arguments;return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i=s.length>2&&void 0!==s[2]?s[2]:"__addLocaleData","function"!=typeof(null===(a=Intl[t])||void 0===a?void 0:a[i])){e.next=12;break}return e.next=4,fetch("".concat("/hacsfiles/frontend/static/","locale-data/intl-").concat(t.toLowerCase(),"/").concat(n,".json"));case 4:if(!(o=e.sent).ok){e.next=12;break}return e.t0=Intl[t],e.t1=i,e.next=10,o.json();case 10:e.t2=e.sent,e.t0[e.t1].call(e.t0,e.t2);case 12:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),l=function(){var e=(0,a.A)((0,r.A)().mark((function e(t){return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!o.has(t)){e.next=2;break}return e.abrupt("return");case 2:return o.add(t),e.next=5,Promise.all(i.map((function(e){return s(e,t)})));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),c=function(){return s("DateTimeFormat","add-all-tz","__addTZData")}},810:function(e,t,n){n.d(t,{J:function(){return r}});n(81027);var r=function(e){return"/hacsfiles/".concat(e.repository.full_name.split("/")[1],"/").concat(e.repository.file_name)}}}]);
//# sourceMappingURL=9101.R-fR4N7iPkI.js.map