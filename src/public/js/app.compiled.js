/* Ouija v0.0.1, built Thu May 07 2015 19:21:04 */var Interface={chatEnabled:!0,chatActive:!1,menuActive:!1,printDebug:function(a){$("#debug").text(a),$("#debug").removeClass("hidden")},toggleMenuDisplay:function(){this.chatActive&&this.toggleChat(),$("#nav-toggle").toggleClass("active"),$(".menu").toggleClass("hidden"),$(".version").toggleClass("hidden"),this.menuActive=this.menuActive?!1:!0},toggleChatDisplay:function(){!this.menuActive&&this.chatEnabled&&($(".chat-input").toggleClass("hidden"),$(".chat-input input").val(""),document.querySelector(".chat-input input").focus(),this.chatActive=this.chatActive?!1:!0)},toggleChat:function(){$(".chat-messages").toggleClass("hidden"),$("#menu-toggle-chat").toggleClass("disabled");var a=this.chatEnabled?"Disabled":"Enabled";$(".chat-toggle-text").text(a),this.chatEnabled=this.chatEnabled?!1:!0},hideChatMessage:function(){$(".chat-messages :last-child").remove()},printChatMessage:function(a){void 0!==a&&""!==a&&($(".chat-messages").prepend('<span class="message">'+a+"</span>"),$(".chat-messages span").length>5&&this.hideChatMessage())},toggleMenuItem:function(a){$(a).toggleClass("disabled")},init:function(){_this=this,$("#nav-toggle").on("click",function(){_this.toggleMenuDisplay()}),$(document).on("keyup",function(a){switch(a.keyCode){case 13:if(_this.chatActive&&!_this.menuActive){var b=$(".chat-input input").val();WebSockets.broadcast("chat",{message:b}),_this.printChatMessage(b),_this.toggleChatDisplay()}else _this.toggleChatDisplay();break;case 27:_this.chatActive?_this.toggleChatDisplay():_this.toggleMenuDisplay();break;default:return}}),function a(){setTimeout(function(){_this.hideChatMessage(),a()},4e4)}(),$("#menu-toggle-chat").on("click",function(){_this.toggleChat()}),$("#menu-new").on("click",function(){WebSockets.generateRoom(),console.log(WebSockets.room)}),$("#menu-leave").on("click",function(){WebSockets.leaveRoom()}),$("#menu-join").on("click",function(){})}},Sampler={assetRoot:null,assetCount:99,assetsLoaded:0,preloadComplete:!1,sounds:{q:"S01.wav",w:"S02.wav",e:"S03.wav",r:"S04.wav",t:"S05.wav",y:"S06.wav",u:"S07.wav",i:"S08.wav",o:"S09.wav",p:"S10.wav",a:"S11.wav",s:"S12.wav",d:"S13.wav",f:"S14.wav",g:"S15.wav",h:"S16.wav",j:"S17.wav",k:"S18.wav",l:"S19.wav",z:"S20.wav",x:"S21.wav",c:"S22.wav",v:"S23.wav",b:"S24.wav",n:"S25.wav",m:"S26.wav",Q:"S27.wav",W:"S28.wav",E:"S29.wav",R:"S30.wav",T:"S31.wav",Y:"S32.wav",U:"S33.wav",I:"S34.wav",O:"S35.wav",P:"S36.wav",A:"S37.wav",S:"S38.wav",D:"S39.wav",F:"S40.wav",G:"S41.wav",H:"S42.wav",J:"S43.wav",K:"S44.wav",L:"S45.wav",Z:"S46.wav",X:"S47.wav",C:"S48.wav",V:"S49.wav",B:"S50.wav",N:"S51.wav",M:"S52.wav"},videos:{q:"01.webm",w:"02.webm",e:"03.webm",r:"04.webm",t:"05.webm",y:"06.webm",u:"07.webm",i:"08.webm",o:"09.webm",p:"10.webm",a:"11.webm",s:"12.webm",d:"13.webm",f:"14.webm",g:"15.webm",h:"16.webm",j:"17.webm",k:"18.webm",l:"19.webm",z:"20.webm",x:"21.webm",c:"22.webm",v:"23.webm",b:"24.webm",n:"25.webm",m:"26.webm",Q:"27.webm",W:"28.webm",E:"29.webm",R:"30.webm",T:"31.webm",Y:"32.webm",U:"33.webm",I:"34.webm",O:"35.webm",P:"36.webm",A:"37.webm",S:"38.webm",D:"39.webm",F:"40.webm",G:"41.webm",H:"42.webm",J:"43.webm",K:"44.webm",L:"45.webm",Z:"46.webm",X:"47.webm",C:"48.webm",V:"49.webm",B:"50.webm",N:"51.webm",M:"52.webm"},backgroundVideoElement:document.getElementById("#video-bg"),backgroundVideoOverlayElement:document.getElementById("#video-overlay"),loadCheck:function(a){Sampler.assetsLoaded++,Interface.printDebug("Loading: "+a),Sampler.assetsLoaded>=Sampler.assetCount&&(Sampler.preloadComplete=!0,$(".loading, #debug").addClass("hidden"),$("#nav-toggle").addClass("show"),Interface.toggleMenuDisplay())},preloadAudio:function(a){var b=new Audio;return $(b).on("canplaythrough",function(){Sampler.loadCheck(a)},!1),b.src=a,b},preloadVideo:function(a){var b=document.createElement("source");b.src=a,b.type="video/webm";var c=document.createElement("video");return c.appendChild(b),$(c).attr("id","video-overlay"),$(c).on("canplaythrough",function(){Sampler.loadCheck(a)},!1),c},playAudio:function(a){if(this.preloadComplete){var b=document.createElement("audio");$(b).attr("autoplay","autoplay"),$(b).attr("src",this.sounds[a].src)}},playVideo:function(a){this.preloadComplete&&($("#video-wrapper").html(this.videos[a].outerHTML),$("#video-wrapper video").attr("autoplay","autoplay"),$("#video-wrapper video").attr("loop","loop"))},pauseVideo:function(){this.backgroundVideoOverlayElement.pause()},init:function(a){if(void 0===a)return void console.warn("Audio and video asset source undefined");this.assetRoot=a;for(var b in this.sounds)if(this.hasOwnProperty("sounds")){var c=this.sounds[b];this.sounds[b]=this.preloadAudio(this.assetRoot+"/audio/"+c)}for(var b in this.videos)if(this.hasOwnProperty("videos")){var c=this.videos[b];this.videos[b]=this.preloadVideo(this.assetRoot+"/video/"+c)}$(document).on("keypress",function(a){var b=String.fromCharCode(a.which);!Interface.chatActive&&Sampler.sounds.hasOwnProperty(b)&&(WebSockets.broadcast("trigger",{key:b}),setTimeout(Sampler.playAudio(b),300),setTimeout(Sampler.playVideo(b),300))})}},WebSockets={host:"",socket:null,room:null,generateGuid:function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()},broadcast:function(a,b){this.room&&(b.room=this.room),b=JSON.stringify(b),this.socket.emit(a,b)},joinRoom:function(a){return void 0===a?void console.warn("Please specify a room to join"):(this.room=a,this.socket.emit("join",this.room),void Interface.toggleMenuItem("#menu-leave"))},leaveRoom:function(){this.room=null,this.socket.emit("leave",this.room),Interface.toggleMenuItem("#menu-leave")},generateRoom:function(){return this.room=this.generateGuid(),this.joinRoom(this.room),this.room},init:function(a){return void 0===a?void console.warn("No URI provided for server"):(this.host=a,this.socket=io.connect(this.host),this.socket.on("trigger",function(a){var b=JSON.parse(a);setTimeout(Sampler.playAudio(b.key),300),setTimeout(Sampler.playVideo(b.key),300)}),void this.socket.on("chat",function(a){var b=JSON.parse(a);Interface.printChatMessage(b.message)}))}};$(document).ready(function(){WebSockets.init("http://tomhumphris.com:8080"),Sampler.init("/public"),Interface.init()});