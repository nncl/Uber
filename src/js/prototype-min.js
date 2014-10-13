function $(){var e=new Array;for(var t=0;t<arguments.length;t++){var n=arguments[t];if(typeof n=="string")n=document.getElementById(n);if(arguments.length==1)return n;e.push(n)}return e}function $H(e){var t=Object.extend({},e||{});Object.extend(t,Enumerable);Object.extend(t,Hash);return t}var Prototype={Version:"1.4.0",ScriptFragment:"(?:<script.*?>)((\n|\r|.)*?)(?:</script>)",emptyFunction:function(){},K:function(e){return e}};var Class={create:function(){return function(){this.initialize.apply(this,arguments)}}};var Abstract=new Object;Object.extend=function(e,t){for(property in t){e[property]=t[property]}return e};Object.inspect=function(e){try{if(e==undefined)return"undefined";if(e==null)return"null";return e.inspect?e.inspect():e.toString()}catch(t){if(t instanceof RangeError)return"...";throw t}};Function.prototype.bind=function(){var e=this,t=$A(arguments),n=t.shift();return function(){return e.apply(n,t.concat($A(arguments)))}};Function.prototype.bindAsEventListener=function(e){var t=this;return function(n){return t.call(e,n||window.event)}};Object.extend(Number.prototype,{toColorPart:function(){var e=this.toString(16);if(this<16)return"0"+e;return e},succ:function(){return this+1},times:function(e){$R(0,this,true).each(e);return this}});var Try={these:function(){var e;for(var t=0;t<arguments.length;t++){var n=arguments[t];try{e=n();break}catch(r){}}return e}};var PeriodicalExecuter=Class.create();PeriodicalExecuter.prototype={initialize:function(e,t){this.callback=e;this.frequency=t;this.currentlyExecuting=false;this.registerCallback()},registerCallback:function(){setInterval(this.onTimerEvent.bind(this),this.frequency*1e3)},onTimerEvent:function(){if(!this.currentlyExecuting){try{this.currentlyExecuting=true;this.callback()}finally{this.currentlyExecuting=false}}}};Object.extend(String.prototype,{stripTags:function(){return this.replace(/<\/?[^>]+>/gi,"")},stripScripts:function(){return this.replace(new RegExp(Prototype.ScriptFragment,"img"),"")},extractScripts:function(){var e=new RegExp(Prototype.ScriptFragment,"img");var t=new RegExp(Prototype.ScriptFragment,"im");return(this.match(e)||[]).map(function(e){return(e.match(t)||["",""])[1]})},evalScripts:function(){return this.extractScripts().map(eval)},escapeHTML:function(){var e=document.createElement("div");var t=document.createTextNode(this);e.appendChild(t);return e.innerHTML},unescapeHTML:function(){var e=document.createElement("div");e.innerHTML=this.stripTags();return e.childNodes[0]?e.childNodes[0].nodeValue:""},toQueryParams:function(){var e=this.match(/^\??(.*)$/)[1].split("&");return e.inject({},function(e,t){var n=t.split("=");e[n[0]]=n[1];return e})},toArray:function(){return this.split("")},camelize:function(){var e=this.split("-");if(e.length==1)return e[0];var t=this.indexOf("-")==0?e[0].charAt(0).toUpperCase()+e[0].substring(1):e[0];for(var n=1,r=e.length;n<r;n++){var i=e[n];t+=i.charAt(0).toUpperCase()+i.substring(1)}return t},inspect:function(){return"'"+this.replace("\\","\\\\").replace("'","\\'")+"'"}});String.prototype.parseQuery=String.prototype.toQueryParams;var $break=new Object;var $continue=new Object;var Enumerable={each:function(e){var t=0;try{this._each(function(n){try{e(n,t++)}catch(r){if(r!=$continue)throw r}})}catch(n){if(n!=$break)throw n}},all:function(e){var t=true;this.each(function(n,r){t=t&&!!(e||Prototype.K)(n,r);if(!t)throw $break});return t},any:function(e){var t=true;this.each(function(n,r){if(t=!!(e||Prototype.K)(n,r))throw $break});return t},collect:function(e){var t=[];this.each(function(n,r){t.push(e(n,r))});return t},detect:function(e){var t;this.each(function(n,r){if(e(n,r)){t=n;throw $break}});return t},findAll:function(e){var t=[];this.each(function(n,r){if(e(n,r))t.push(n)});return t},grep:function(e,t){var n=[];this.each(function(r,i){var s=r.toString();if(s.match(e))n.push((t||Prototype.K)(r,i))});return n},include:function(e){var t=false;this.each(function(n){if(n==e){t=true;throw $break}});return t},inject:function(e,t){this.each(function(n,r){e=t(e,n,r)});return e},invoke:function(e){var t=$A(arguments).slice(1);return this.collect(function(n){return n[e].apply(n,t)})},max:function(e){var t;this.each(function(n,r){n=(e||Prototype.K)(n,r);if(n>=(t||n))t=n});return t},min:function(e){var t;this.each(function(n,r){n=(e||Prototype.K)(n,r);if(n<=(t||n))t=n});return t},partition:function(e){var t=[],n=[];this.each(function(r,i){((e||Prototype.K)(r,i)?t:n).push(r)});return[t,n]},pluck:function(e){var t=[];this.each(function(n,r){t.push(n[e])});return t},reject:function(e){var t=[];this.each(function(n,r){if(!e(n,r))t.push(n)});return t},sortBy:function(e){return this.collect(function(t,n){return{value:t,criteria:e(t,n)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;return n<r?-1:n>r?1:0}).pluck("value")},toArray:function(){return this.collect(Prototype.K)},zip:function(){var e=Prototype.K,t=$A(arguments);if(typeof t.last()=="function")e=t.pop();var n=[this].concat(t).map($A);return this.map(function(t,r){e(t=n.pluck(r));return t})},inspect:function(){return"#<Enumerable:"+this.toArray().inspect()+">"}};Object.extend(Enumerable,{map:Enumerable.collect,find:Enumerable.detect,select:Enumerable.findAll,member:Enumerable.include,entries:Enumerable.toArray});var $A=Array.from=function(e){if(!e)return[];if(e.toArray){return e.toArray()}else{var t=[];for(var n=0;n<e.length;n++)t.push(e[n]);return t}};Object.extend(Array.prototype,Enumerable);Array.prototype._reverse=Array.prototype.reverse;Object.extend(Array.prototype,{_each:function(e){for(var t=0;t<this.length;t++)e(this[t])},clear:function(){this.length=0;return this},first:function(){return this[0]},last:function(){return this[this.length-1]},compact:function(){return this.select(function(e){return e!=undefined||e!=null})},flatten:function(){return this.inject([],function(e,t){return e.concat(t.constructor==Array?t.flatten():[t])})},without:function(){var e=$A(arguments);return this.select(function(t){return!e.include(t)})},indexOf:function(e){for(var t=0;t<this.length;t++)if(this[t]==e)return t;return-1},reverse:function(e){return(e!==false?this:this.toArray())._reverse()},shift:function(){var e=this[0];for(var t=0;t<this.length-1;t++)this[t]=this[t+1];this.length--;return e},inspect:function(){return"["+this.map(Object.inspect).join(", ")+"]"}});var Hash={_each:function(e){for(key in this){var t=this[key];if(typeof t=="function")continue;var n=[key,t];n.key=key;n.value=t;e(n)}},keys:function(){return this.pluck("key")},values:function(){return this.pluck("value")},merge:function(e){return $H(e).inject($H(this),function(e,t){e[t.key]=t.value;return e})},toQueryString:function(){return this.map(function(e){return e.map(encodeURIComponent).join("=")}).join("&")},inspect:function(){return"#<Hash:{"+this.map(function(e){return e.map(Object.inspect).join(": ")}).join(", ")+"}>"}};ObjectRange=Class.create();Object.extend(ObjectRange.prototype,Enumerable);Object.extend(ObjectRange.prototype,{initialize:function(e,t,n){this.start=e;this.end=t;this.exclusive=n},_each:function(e){var t=this.start;do{e(t);t=t.succ()}while(this.include(t))},include:function(e){if(e<this.start)return false;if(this.exclusive)return e<this.end;return e<=this.end}});var $R=function(e,t,n){return new ObjectRange(e,t,n)};var Ajax={getTransport:function(){return Try.these(function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new XMLHttpRequest})||false},activeRequestCount:0};Ajax.Responders={responders:[],_each:function(e){this.responders._each(e)},register:function(e){if(!this.include(e))this.responders.push(e)},unregister:function(e){this.responders=this.responders.without(e)},dispatch:function(e,t,n,r){this.each(function(i){if(i[e]&&typeof i[e]=="function"){try{i[e].apply(i,[t,n,r])}catch(s){}}})}};Object.extend(Ajax.Responders,Enumerable);Ajax.Responders.register({onCreate:function(){Ajax.activeRequestCount++},onComplete:function(){Ajax.activeRequestCount--}});Ajax.Base=function(){};Ajax.Base.prototype={setOptions:function(e){this.options={method:"post",asynchronous:true,parameters:""};Object.extend(this.options,e||{})},responseIsSuccess:function(){return this.transport.status==undefined||this.transport.status==0||this.transport.status>=200&&this.transport.status<300},responseIsFailure:function(){return!this.responseIsSuccess()}};Ajax.Request=Class.create();Ajax.Request.Events=["Uninitialized","Loading","Loaded","Interactive","Complete"];Ajax.Request.prototype=Object.extend(new Ajax.Base,{initialize:function(e,t){this.transport=Ajax.getTransport();this.setOptions(t);this.request(e)},request:function(e){var t=this.options.parameters||"";if(t.length>0)t+="&_=";try{this.url=e;if(this.options.method=="get"&&t.length>0)this.url+=(this.url.match(/\?/)?"&":"?")+t;Ajax.Responders.dispatch("onCreate",this,this.transport);this.transport.open(this.options.method,this.url,this.options.asynchronous);if(this.options.asynchronous){this.transport.onreadystatechange=this.onStateChange.bind(this);setTimeout(function(){this.respondToReadyState(1)}.bind(this),10)}this.setRequestHeaders();var n=this.options.postBody?this.options.postBody:t;this.transport.send(this.options.method=="post"?n:null)}catch(r){this.dispatchException(r)}},setRequestHeaders:function(){var e=["X-Requested-With","XMLHttpRequest","X-Prototype-Version",Prototype.Version];if(this.options.method=="post"){e.push("Content-type","application/x-www-form-urlencoded");if(this.transport.overrideMimeType)e.push("Connection","close")}if(this.options.requestHeaders)e.push.apply(e,this.options.requestHeaders);for(var t=0;t<e.length;t+=2)this.transport.setRequestHeader(e[t],e[t+1])},onStateChange:function(){var e=this.transport.readyState;if(e!=1)this.respondToReadyState(this.transport.readyState)},header:function(e){try{return this.transport.getResponseHeader(e)}catch(t){}},evalJSON:function(){try{return eval(this.header("X-JSON"))}catch(e){}},evalResponse:function(){try{return eval(this.transport.responseText)}catch(e){this.dispatchException(e)}},respondToReadyState:function(e){var t=Ajax.Request.Events[e];var n=this.transport,r=this.evalJSON();if(t=="Complete"){try{(this.options["on"+this.transport.status]||this.options["on"+(this.responseIsSuccess()?"Success":"Failure")]||Prototype.emptyFunction)(n,r)}catch(i){this.dispatchException(i)}if((this.header("Content-type")||"").match(/^text\/javascript/i))this.evalResponse()}try{(this.options["on"+t]||Prototype.emptyFunction)(n,r);Ajax.Responders.dispatch("on"+t,this,n,r)}catch(i){this.dispatchException(i)}if(t=="Complete")this.transport.onreadystatechange=Prototype.emptyFunction},dispatchException:function(e){(this.options.onException||Prototype.emptyFunction)(this,e);Ajax.Responders.dispatch("onException",this,e)}});Ajax.Updater=Class.create();Object.extend(Object.extend(Ajax.Updater.prototype,Ajax.Request.prototype),{initialize:function(e,t,n){this.containers={success:e.success?$(e.success):$(e),failure:e.failure?$(e.failure):e.success?null:$(e)};this.transport=Ajax.getTransport();this.setOptions(n);var r=this.options.onComplete||Prototype.emptyFunction;this.options.onComplete=function(e,t){this.updateContent();r(e,t)}.bind(this);this.request(t)},updateContent:function(){var e=this.responseIsSuccess()?this.containers.success:this.containers.failure;var t=this.transport.responseText;if(!this.options.evalScripts)t=t.stripScripts();if(e){if(this.options.insertion){new this.options.insertion(e,t)}else{Element.update(e,t)}}if(this.responseIsSuccess()){if(this.onComplete)setTimeout(this.onComplete.bind(this),10)}}});Ajax.PeriodicalUpdater=Class.create();Ajax.PeriodicalUpdater.prototype=Object.extend(new Ajax.Base,{initialize:function(e,t,n){this.setOptions(n);this.onComplete=this.options.onComplete;this.frequency=this.options.frequency||2;this.decay=this.options.decay||1;this.updater={};this.container=e;this.url=t;this.start()},start:function(){this.options.onComplete=this.updateComplete.bind(this);this.onTimerEvent()},stop:function(){this.updater.onComplete=undefined;clearTimeout(this.timer);(this.onComplete||Prototype.emptyFunction).apply(this,arguments)},updateComplete:function(e){if(this.options.decay){this.decay=e.responseText==this.lastText?this.decay*this.options.decay:1;this.lastText=e.responseText}this.timer=setTimeout(this.onTimerEvent.bind(this),this.decay*this.frequency*1e3)},onTimerEvent:function(){this.updater=new Ajax.Updater(this.container,this.url,this.options)}});document.getElementsByClassName=function(e,t){var n=($(t)||document.body).getElementsByTagName("*");return $A(n).inject([],function(t,n){if(n.className.match(new RegExp("(^|\\s)"+e+"(\\s|$)")))t.push(n);return t})};if(!window.Element){var Element=new Object}Object.extend(Element,{visible:function(e){return $(e).style.display!="none"},toggle:function(){for(var e=0;e<arguments.length;e++){var t=$(arguments[e]);Element[Element.visible(t)?"hide":"show"](t)}},hide:function(){for(var e=0;e<arguments.length;e++){var t=$(arguments[e]);t.style.display="none"}},show:function(){for(var e=0;e<arguments.length;e++){var t=$(arguments[e]);t.style.display=""}},remove:function(e){e=$(e);e.parentNode.removeChild(e)},update:function(e,t){$(e).innerHTML=t.stripScripts();setTimeout(function(){t.evalScripts()},10)},getHeight:function(e){e=$(e);return e.offsetHeight},classNames:function(e){return new Element.ClassNames(e)},hasClassName:function(e,t){if(!(e=$(e)))return;return Element.classNames(e).include(t)},addClassName:function(e,t){if(!(e=$(e)))return;return Element.classNames(e).add(t)},removeClassName:function(e,t){if(!(e=$(e)))return;return Element.classNames(e).remove(t)},cleanWhitespace:function(e){e=$(e);for(var t=0;t<e.childNodes.length;t++){var n=e.childNodes[t];if(n.nodeType==3&&!/\S/.test(n.nodeValue))Element.remove(n)}},empty:function(e){return $(e).innerHTML.match(/^\s*$/)},scrollTo:function(e){e=$(e);var t=e.x?e.x:e.offsetLeft,n=e.y?e.y:e.offsetTop;window.scrollTo(t,n)},getStyle:function(e,t){e=$(e);var n=e.style[t.camelize()];if(!n){if(document.defaultView&&document.defaultView.getComputedStyle){var r=document.defaultView.getComputedStyle(e,null);n=r?r.getPropertyValue(t):null}else if(e.currentStyle){n=e.currentStyle[t.camelize()]}}if(window.opera&&["left","top","right","bottom"].include(t))if(Element.getStyle(e,"position")=="static")n="auto";return n=="auto"?null:n},setStyle:function(e,t){e=$(e);for(name in t)e.style[name.camelize()]=t[name]},getDimensions:function(e){e=$(e);if(Element.getStyle(e,"display")!="none")return{width:e.offsetWidth,height:e.offsetHeight};var t=e.style;var n=t.visibility;var r=t.position;t.visibility="hidden";t.position="absolute";t.display="";var i=e.clientWidth;var s=e.clientHeight;t.display="none";t.position=r;t.visibility=n;return{width:i,height:s}},makePositioned:function(e){e=$(e);var t=Element.getStyle(e,"position");if(t=="static"||!t){e._madePositioned=true;e.style.position="relative";if(window.opera){e.style.top=0;e.style.left=0}}},undoPositioned:function(e){e=$(e);if(e._madePositioned){e._madePositioned=undefined;e.style.position=e.style.top=e.style.left=e.style.bottom=e.style.right=""}},makeClipping:function(e){e=$(e);if(e._overflow)return;e._overflow=e.style.overflow;if((Element.getStyle(e,"overflow")||"visible")!="hidden")e.style.overflow="hidden"},undoClipping:function(e){e=$(e);if(e._overflow)return;e.style.overflow=e._overflow;e._overflow=undefined}});var Toggle=new Object;Toggle.display=Element.toggle;Abstract.Insertion=function(e){this.adjacency=e};Abstract.Insertion.prototype={initialize:function(e,t){this.element=$(e);this.content=t.stripScripts();if(this.adjacency&&this.element.insertAdjacentHTML){try{this.element.insertAdjacentHTML(this.adjacency,this.content)}catch(n){if(this.element.tagName.toLowerCase()=="tbody"){this.insertContent(this.contentFromAnonymousTable())}else{throw n}}}else{this.range=this.element.ownerDocument.createRange();if(this.initializeRange)this.initializeRange();this.insertContent([this.range.createContextualFragment(this.content)])}setTimeout(function(){t.evalScripts()},10)},contentFromAnonymousTable:function(){var e=document.createElement("div");e.innerHTML="<table><tbody>"+this.content+"</tbody></table>";return $A(e.childNodes[0].childNodes[0].childNodes)}};var Insertion=new Object;Insertion.Before=Class.create();Insertion.Before.prototype=Object.extend(new Abstract.Insertion("beforeBegin"),{initializeRange:function(){this.range.setStartBefore(this.element)},insertContent:function(e){e.each(function(e){this.element.parentNode.insertBefore(e,this.element)}.bind(this))}});Insertion.Top=Class.create();Insertion.Top.prototype=Object.extend(new Abstract.Insertion("afterBegin"),{initializeRange:function(){this.range.selectNodeContents(this.element);this.range.collapse(true)},insertContent:function(e){e.reverse(false).each(function(e){this.element.insertBefore(e,this.element.firstChild)}.bind(this))}});Insertion.Bottom=Class.create();Insertion.Bottom.prototype=Object.extend(new Abstract.Insertion("beforeEnd"),{initializeRange:function(){this.range.selectNodeContents(this.element);this.range.collapse(this.element)},insertContent:function(e){e.each(function(e){this.element.appendChild(e)}.bind(this))}});Insertion.After=Class.create();Insertion.After.prototype=Object.extend(new Abstract.Insertion("afterEnd"),{initializeRange:function(){this.range.setStartAfter(this.element)},insertContent:function(e){e.each(function(e){this.element.parentNode.insertBefore(e,this.element.nextSibling)}.bind(this))}});Element.ClassNames=Class.create();Element.ClassNames.prototype={initialize:function(e){this.element=$(e)},_each:function(e){this.element.className.split(/\s+/).select(function(e){return e.length>0})._each(e)},set:function(e){this.element.className=e},add:function(e){if(this.include(e))return;this.set(this.toArray().concat(e).join(" "))},remove:function(e){if(!this.include(e))return;this.set(this.select(function(t){return t!=e}).join(" "))},toString:function(){return this.toArray().join(" ")}};Object.extend(Element.ClassNames.prototype,Enumerable);var Field={clear:function(){for(var e=0;e<arguments.length;e++)$(arguments[e]).value=""},focus:function(e){$(e).focus()},present:function(){for(var e=0;e<arguments.length;e++)if($(arguments[e]).value=="")return false;return true},select:function(e){$(e).select()},activate:function(e){e=$(e);e.focus();if(e.select)e.select()}};var Form={serialize:function(e){var t=Form.getElements($(e));var n=new Array;for(var r=0;r<t.length;r++){var i=Form.Element.serialize(t[r]);if(i)n.push(i)}return n.join("&")},getElements:function(e){e=$(e);var t=new Array;for(tagName in Form.Element.Serializers){var n=e.getElementsByTagName(tagName);for(var r=0;r<n.length;r++)t.push(n[r])}return t},getInputs:function(e,t,n){e=$(e);var r=e.getElementsByTagName("input");if(!t&&!n)return r;var i=new Array;for(var s=0;s<r.length;s++){var o=r[s];if(t&&o.type!=t||n&&o.name!=n)continue;i.push(o)}return i},disable:function(e){var t=Form.getElements(e);for(var n=0;n<t.length;n++){var r=t[n];r.blur();r.disabled="true"}},enable:function(e){var t=Form.getElements(e);for(var n=0;n<t.length;n++){var r=t[n];r.disabled=""}},findFirstElement:function(e){return Form.getElements(e).find(function(e){return e.type!="hidden"&&!e.disabled&&["input","select","textarea"].include(e.tagName.toLowerCase())})},focusFirstElement:function(e){Field.activate(Form.findFirstElement(e))},reset:function(e){$(e).reset()}};Form.Element={serialize:function(e){e=$(e);var t=e.tagName.toLowerCase();var n=Form.Element.Serializers[t](e);if(n){var r=encodeURIComponent(n[0]);if(r.length==0)return;if(n[1].constructor!=Array)n[1]=[n[1]];return n[1].map(function(e){return r+"="+encodeURIComponent(e)}).join("&")}},getValue:function(e){e=$(e);var t=e.tagName.toLowerCase();var n=Form.Element.Serializers[t](e);if(n)return n[1]}};Form.Element.Serializers={input:function(e){switch(e.type.toLowerCase()){case"submit":case"hidden":case"password":case"text":return Form.Element.Serializers.textarea(e);case"checkbox":case"radio":return Form.Element.Serializers.inputSelector(e)}return false},inputSelector:function(e){if(e.checked)return[e.name,e.value]},textarea:function(e){return[e.name,e.value]},select:function(e){return Form.Element.Serializers[e.type=="select-one"?"selectOne":"selectMany"](e)},selectOne:function(e){var t="",n,r=e.selectedIndex;if(r>=0){n=e.options[r];t=n.value;if(!t&&!("value"in n))t=n.text}return[e.name,t]},selectMany:function(e){var t=new Array;for(var n=0;n<e.length;n++){var r=e.options[n];if(r.selected){var i=r.value;if(!i&&!("value"in r))i=r.text;t.push(i)}}return[e.name,t]}};var $F=Form.Element.getValue;Abstract.TimedObserver=function(){};Abstract.TimedObserver.prototype={initialize:function(e,t,n){this.frequency=t;this.element=$(e);this.callback=n;this.lastValue=this.getValue();this.registerCallback()},registerCallback:function(){setInterval(this.onTimerEvent.bind(this),this.frequency*1e3)},onTimerEvent:function(){var e=this.getValue();if(this.lastValue!=e){this.callback(this.element,e);this.lastValue=e}}};Form.Element.Observer=Class.create();Form.Element.Observer.prototype=Object.extend(new Abstract.TimedObserver,{getValue:function(){return Form.Element.getValue(this.element)}});Form.Observer=Class.create();Form.Observer.prototype=Object.extend(new Abstract.TimedObserver,{getValue:function(){return Form.serialize(this.element)}});Abstract.EventObserver=function(){};Abstract.EventObserver.prototype={initialize:function(e,t){this.element=$(e);this.callback=t;this.lastValue=this.getValue();if(this.element.tagName.toLowerCase()=="form")this.registerFormCallbacks();else this.registerCallback(this.element)},onElementEvent:function(){var e=this.getValue();if(this.lastValue!=e){this.callback(this.element,e);this.lastValue=e}},registerFormCallbacks:function(){var e=Form.getElements(this.element);for(var t=0;t<e.length;t++)this.registerCallback(e[t])},registerCallback:function(e){if(e.type){switch(e.type.toLowerCase()){case"checkbox":case"radio":Event.observe(e,"click",this.onElementEvent.bind(this));break;case"password":case"text":case"textarea":case"select-one":case"select-multiple":Event.observe(e,"change",this.onElementEvent.bind(this));break}}}};Form.Element.EventObserver=Class.create();Form.Element.EventObserver.prototype=Object.extend(new Abstract.EventObserver,{getValue:function(){return Form.Element.getValue(this.element)}});Form.EventObserver=Class.create();Form.EventObserver.prototype=Object.extend(new Abstract.EventObserver,{getValue:function(){return Form.serialize(this.element)}});if(!window.Event){var Event=new Object}Object.extend(Event,{KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,element:function(e){return e.target||e.srcElement},isLeftClick:function(e){return e.which&&e.which==1||e.button&&e.button==1},pointerX:function(e){return e.pageX||e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)},pointerY:function(e){return e.pageY||e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)},stop:function(e){if(e.preventDefault){e.preventDefault();e.stopPropagation()}else{e.returnValue=false;e.cancelBubble=true}},findElement:function(e,t){var n=Event.element(e);while(n.parentNode&&(!n.tagName||n.tagName.toUpperCase()!=t.toUpperCase()))n=n.parentNode;return n},observers:false,_observeAndCache:function(e,t,n,r){if(!this.observers)this.observers=[];if(e.addEventListener){this.observers.push([e,t,n,r]);e.addEventListener(t,n,r)}else if(e.attachEvent){this.observers.push([e,t,n,r]);e.attachEvent("on"+t,n)}},unloadCache:function(){if(!Event.observers)return;for(var e=0;e<Event.observers.length;e++){Event.stopObserving.apply(this,Event.observers[e]);Event.observers[e][0]=null}Event.observers=false},observe:function(e,t,n,r){var e=$(e);r=r||false;if(t=="keypress"&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||e.attachEvent))t="keydown";this._observeAndCache(e,t,n,r)},stopObserving:function(e,t,n,r){var e=$(e);r=r||false;if(t=="keypress"&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||e.detachEvent))t="keydown";if(e.removeEventListener){e.removeEventListener(t,n,r)}else if(e.detachEvent){e.detachEvent("on"+t,n)}}});Event.observe(window,"unload",Event.unloadCache,false);var Position={includeScrollOffsets:false,prepare:function(){this.deltaX=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;this.deltaY=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},realOffset:function(e){var t=0,n=0;do{t+=e.scrollTop||0;n+=e.scrollLeft||0;e=e.parentNode}while(e);return[n,t]},cumulativeOffset:function(e){var t=0,n=0;do{t+=e.offsetTop||0;n+=e.offsetLeft||0;e=e.offsetParent}while(e);return[n,t]},positionedOffset:function(e){var t=0,n=0;do{t+=e.offsetTop||0;n+=e.offsetLeft||0;e=e.offsetParent;if(e){p=Element.getStyle(e,"position");if(p=="relative"||p=="absolute")break}}while(e);return[n,t]},offsetParent:function(e){if(e.offsetParent)return e.offsetParent;if(e==document.body)return e;while((e=e.parentNode)&&e!=document.body)if(Element.getStyle(e,"position")!="static")return e;return document.body},within:function(e,t,n){if(this.includeScrollOffsets)return this.withinIncludingScrolloffsets(e,t,n);this.xcomp=t;this.ycomp=n;this.offset=this.cumulativeOffset(e);return n>=this.offset[1]&&n<this.offset[1]+e.offsetHeight&&t>=this.offset[0]&&t<this.offset[0]+e.offsetWidth},withinIncludingScrolloffsets:function(e,t,n){var r=this.realOffset(e);this.xcomp=t+r[0]-this.deltaX;this.ycomp=n+r[1]-this.deltaY;this.offset=this.cumulativeOffset(e);return this.ycomp>=this.offset[1]&&this.ycomp<this.offset[1]+e.offsetHeight&&this.xcomp>=this.offset[0]&&this.xcomp<this.offset[0]+e.offsetWidth},overlap:function(e,t){if(!e)return 0;if(e=="vertical")return(this.offset[1]+t.offsetHeight-this.ycomp)/t.offsetHeight;if(e=="horizontal")return(this.offset[0]+t.offsetWidth-this.xcomp)/t.offsetWidth},clone:function(e,t){e=$(e);t=$(t);t.style.position="absolute";var n=this.cumulativeOffset(e);t.style.top=n[1]+"px";t.style.left=n[0]+"px";t.style.width=e.offsetWidth+"px";t.style.height=e.offsetHeight+"px"},page:function(e){var t=0,n=0;var r=e;do{t+=r.offsetTop||0;n+=r.offsetLeft||0;if(r.offsetParent==document.body)if(Element.getStyle(r,"position")=="absolute")break}while(r=r.offsetParent);r=e;do{t-=r.scrollTop||0;n-=r.scrollLeft||0}while(r=r.parentNode);return[n,t]},clone:function(e,t){var n=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},arguments[2]||{});e=$(e);var r=Position.page(e);t=$(t);var i=[0,0];var s=null;if(Element.getStyle(t,"position")=="absolute"){s=Position.offsetParent(t);i=Position.page(s)}if(s==document.body){i[0]-=document.body.offsetLeft;i[1]-=document.body.offsetTop}if(n.setLeft)t.style.left=r[0]-i[0]+n.offsetLeft+"px";if(n.setTop)t.style.top=r[1]-i[1]+n.offsetTop+"px";if(n.setWidth)t.style.width=e.offsetWidth+"px";if(n.setHeight)t.style.height=e.offsetHeight+"px"},absolutize:function(e){e=$(e);if(e.style.position=="absolute")return;Position.prepare();var t=Position.positionedOffset(e);var n=t[1];var r=t[0];var i=e.clientWidth;var s=e.clientHeight;e._originalLeft=r-parseFloat(e.style.left||0);e._originalTop=n-parseFloat(e.style.top||0);e._originalWidth=e.style.width;e._originalHeight=e.style.height;e.style.position="absolute";e.style.top=n+"px";e.style.left=r+"px";e.style.width=i+"px";e.style.height=s+"px";},relativize:function(e){e=$(e);if(e.style.position=="relative")return;Position.prepare();e.style.position="relative";var t=parseFloat(e.style.top||0)-(e._originalTop||0);var n=parseFloat(e.style.left||0)-(e._originalLeft||0);e.style.top=t+"px";e.style.left=n+"px";e.style.height=e._originalHeight;e.style.width=e._originalWidth}};if(/Konqueror|Safari|KHTML/.test(navigator.userAgent)){Position.cumulativeOffset=function(e){var t=0,n=0;do{t+=e.offsetTop||0;n+=e.offsetLeft||0;if(e.offsetParent==document.body)if(Element.getStyle(e,"position")=="absolute")break;e=e.offsetParent}while(e);return[n,t]}}