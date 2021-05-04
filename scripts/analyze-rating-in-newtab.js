(()=>{"use strict";var e={4007:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.fetchPlayerGrade=n.getPlayerName=n.getChartType=n.getChartDifficulty=n.getChartLevel=n.getSongName=void 0;const o=t(5503);n.getSongName=function(e){return o.normalizeSongName(e.getElementsByClassName("music_name_block")[0].innerText)},n.getChartLevel=function(e){return e.getElementsByClassName("music_lv_block")[0].innerText},n.getChartDifficulty=function(e){if(!e.classList.contains("pointer")){const n=e.querySelector(".pointer");e=n||e}const n=e.className.match(/music_([a-z]+)_score_back/)[1].toUpperCase();return 0===n.indexOf("RE")?"Re:MASTER":n},n.getChartType=function(e){return e.id?e.id.includes("sta_")?0:1:e.querySelector("img:nth-child(2)").src.includes("_standard")?0:1},n.getPlayerName=function(e){var n,t;return e.className.includes("friend_vs_friend_block")?null===(n=e.querySelector(".t_l"))||void 0===n?void 0:n.innerText:null===(t=e.querySelector(".name_block"))||void 0===t?void 0:t.innerText},n.fetchPlayerGrade=function(e){const n=e.querySelector(".user_data_block_line ~ img.h_25");if(n){const e=n.src.lastIndexOf("grade_");return n.src.substring(e+6,e+8)}return null}},2847:function(e,n,t){var o=this&&this.__awaiter||function(e,n,t,o){return new(t||(t=Promise))((function(r,i){function a(e){try{s(o.next(e))}catch(e){i(e)}}function c(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((o=o.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.fetchScores=n.SELF_SCORE_URLS=void 0;const r=t(4007),i=t(4871);n.SELF_SCORE_URLS=new Map([["Re:MASTER","/maimai-mobile/record/musicGenre/search/?genre=99&diff=4"],["MASTER","/maimai-mobile/record/musicGenre/search/?genre=99&diff=3"],["EXPERT","/maimai-mobile/record/musicGenre/search/?genre=99&diff=2"],["ADVANCED","/maimai-mobile/record/musicGenre/search/?genre=99&diff=1"]]),n.fetchScores=function(e,t){return o(this,void 0,void 0,(function*(){const o=n.SELF_SCORE_URLS.get(e);if(!o)return;const a=yield i.fetchPage(o),c=a.querySelectorAll(".main_wrapper.t_c .m_15"),s={genre:"",scoreList:t};return c.forEach((n=>function(e,n,t){const o=e.classList.contains("screw_block"),i=e.classList.contains("w_450")&&e.classList.contains("m_15")&&e.classList.contains("p_r")&&e.classList.contains("f_0");if(o)t.genre=e.innerText;else if(i){const o=r.getSongName(e),i=r.getChartLevel(e),a=1===r.getChartType(e)?"DX":"STANDARD",c=function(e){const n=e.querySelector(".music_score_block.w_120");return n&&n.innerText}(e);if(!c)return;t.scoreList.push([o,t.genre,n,i,a,c].join("\t"))}}(n,e,s))),a}))}},1735:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.LANG=void 0;const t=new URLSearchParams(location.search);let o="en";t.get("hl")?o=t.get("hl").startsWith("zh")?"zh":"en":navigator.language.startsWith("zh")&&(o="zh"),n.LANG=o},6016:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.statusText=void 0;const o={zh:{advStart:"🕓 下載黃譜成績中…",advDone:"✔ 黃譜成績下載完畢！",expStart:"🕓 下載紅譜成績中…",expDone:"✔ 紅譜成績下載完畢！",masStart:"🕓 下載紫譜成績中…",masDone:"✔ 紫譜成績下載完畢！",remStart:"🕓 下載白譜成績中…",remDone:"✔ 白譜成績下載完畢！"},en:{advStart:"🕓 Downloading Advanced scores…",advDone:"✔ Advanced scores downloaded!",expStart:"🕓 Downloading Expert scores…",expDone:"✔ Expert scores downloaded!",masStart:"🕓 Downloading Master scores…",masDone:"✔ Master scores downloaded!",remStart:"🕓 Downloading Re:Master scores…",remDone:"✔ Re:Master scores downloaded!"}}[t(1735).LANG];n.statusText=function(e,n){switch(e){case"Re:MASTER":return n?o.remDone:o.remStart;case"MASTER":return n?o.masDone:o.masStart;case"EXPERT":return n?o.expDone:o.expStart;case"ADVANCED":return n?o.advDone:o.advStart}return""}},7377:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.getScriptHost=void 0,n.getScriptHost=function(e){const n=Array.from(document.querySelectorAll("script"));for(;n.length;){const t=n.pop();if(t.src.includes(e)){const e=new URL(t.src),n=e.pathname;return e.origin+n.substring(0,n.lastIndexOf("/scripts"))}}return"https://myjian.github.io/mai-tools"}},5503:function(e,n,t){var o=this&&this.__awaiter||function(e,n,t,o){return new(t||(t=Promise))((function(r,i){function a(e){try{s(o.next(e))}catch(e){i(e)}}function c(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((o=o.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.isNicoNicoLink=n.getSongNickname=n.getSongIdx=n.normalizeSongName=n.RATING_TARGET_SONG_NAME_PREFIX=n.DX_SONG_NAME_SUFFIX=void 0;const r=t(4871);n.DX_SONG_NAME_SUFFIX=" [DX]",n.RATING_TARGET_SONG_NAME_PREFIX="▶ ",n.normalizeSongName=function(e){return"D✪N’T  ST✪P  R✪CKIN’"===e?"D✪N’T ST✪P R✪CKIN’":e.replace(/" \+ '/g,"").replace(/' \+ "/g,"")},n.getSongIdx=function(e){return e.getElementsByTagName("form")[0].elements.namedItem("idx").value},n.getSongNickname=function(e,t,o){return"Link"===e&&(e=t.includes("niconico")?"Link(nico)":"Link(org)"),o?e+n.DX_SONG_NAME_SUFFIX:e};let i={};n.isNicoNicoLink=function(e){return o(this,void 0,void 0,(function*(){if(i.nico===e)return!0;if(i.original===e)return!1;const n=(yield r.fetchPage("/maimai-mobile/record/musicDetail/?"+new URLSearchParams([["idx",e]]).toString())).body.querySelector(".m_10.m_t_5.t_r.f_12").innerText.includes("niconico");return console.log("Link (idx: "+e+") "+(n?"is niconico":"is original")),n?i.nico=e:i.original=e,n}))}},4871:function(e,n,t){var o=this&&this.__awaiter||function(e,n,t,o){return new(t||(t=Promise))((function(r,i){function a(e){try{s(o.next(e))}catch(e){i(e)}}function c(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((o=o.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.getPostMessageFunc=n.fetchNewSongs=n.fetchAllSongs=n.fetchGameVersion=n.fetchPage=n.handleError=n.ALLOWED_ORIGINS=void 0;const r=t(4007),i=t(2847),a=t(5503);function c(e){return o(this,void 0,void 0,(function*(){const n=yield fetch(e),t=yield n.text();return(new DOMParser).parseFromString(t,"text/html")}))}function s(e){return o(this,void 0,void 0,(function*(){const n=Array.from(e.querySelectorAll(".w_450.m_15.f_0")),t=[];for(const e of n){const n=a.getSongIdx(e),o=r.getSongName(e),i=r.getChartType(e);let c;"Link"===o&&(c=(yield a.isNicoNicoLink(n))?"Link(nico)":"Link(org)"),t.push({dx:i,name:o,nickname:c})}return t}))}n.ALLOWED_ORIGINS=["https://cdpn.io","https://myjian.github.io","http://localhost:8080"],n.handleError=function(e){alert(e)},n.fetchPage=c,n.fetchGameVersion=function e(n){return o(this,void 0,void 0,(function*(){const t=n.querySelector("select[name=version] option:last-of-type");return t?t.value:e(n=yield c("/maimai-mobile/record/musicVersion/"))}))},n.fetchAllSongs=function(e){return o(this,void 0,void 0,(function*(){if(!e){const n=i.SELF_SCORE_URLS.get("MASTER");e=yield c(n)}return yield s(e)}))},n.fetchNewSongs=function(e){return o(this,void 0,void 0,(function*(){const n=yield c(`/maimai-mobile/record/musicVersion/search/?version=${e}&diff=0`);return yield s(n)}))},n.getPostMessageFunc=function(e,n){return(t,o)=>{const r={action:t,payload:o};e.postMessage(r,n)}}},2690:function(e,n,t){var o=this&&this.__awaiter||function(e,n,t,o){return new(t||(t=Promise))((function(r,i){function a(e){try{s(o.next(e))}catch(e){i(e)}}function c(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((o=o.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0});const r=t(4007),i=t(2847),a=t(1735),c=t(6016),s=t(7377),l=t(4871);!function(){const e=s.getScriptHost("analyze-rating-in-newtab")+"/rating-calculator/",n={zh:{pleaseLogIn:"請登入 maimai NET",analyze:"分析 Rating"},en:{pleaseLogIn:"Please log in to maimai DX NET.",analyze:"Analyze Rating"}}[a.LANG],t=location.pathname.includes("friend");!function(){const a=location.host;if("maimaidx-eng.com"!==a&&"maimaidx.jp"!==a)return void l.handleError(n.pleaseLogIn);const s=t?null:r.getPlayerName(document.body),u=s?e+"?"+new URLSearchParams({playerName:s}):e;let d;navigator.userAgent.startsWith("Mozilla/5.0 (iP")?function(e){const t=document.body.querySelector(".basic_block.p_10.f_0");if(!t)return;let o=document.querySelector(".analyzeLink");o&&o.remove(),o=document.createElement("a"),o.className="analyzeLink f_14",o.style.color="#1477e6",o.target="selfRating",o.append(n.analyze,document.createElement("br")),o.href=e,location.pathname.indexOf("/maimai-mobile/playerData/")>=0?(o.className+=" f_l",document.querySelector(".m_5.m_t_10.t_r.f_12").insertAdjacentElement("afterbegin",o)):location.pathname.indexOf("/maimai-mobile/home/")>=0?(o.className+=" d_b",document.querySelector(".comment_block.f_l.f_12").insertAdjacentElement("afterbegin",o)):t.querySelector(".name_block").parentElement.append(o)}(u):window.open(u,"selfRating"),window.ratingCalcMsgListener&&window.removeEventListener("message",window.ratingCalcMsgListener),window.ratingCalcMsgListener=e=>{if(console.log(e.origin,e.data),l.ALLOWED_ORIGINS.includes(e.origin)){const n=l.getPostMessageFunc(e.source,e.origin);"ready"===e.data?d=function(e){return o(this,void 0,void 0,(function*(){let n;const o=yield l.fetchGameVersion(document.body);e("gameVersion",o);const a=t?null:r.fetchPlayerGrade(document.body);a&&e("playerGrade",a);const s=[];for(const t of i.SELF_SCORE_URLS.keys()){e("appendPlayerScore",c.statusText(t,!1));const o=yield i.fetchScores(t,s);"MASTER"===t&&(n=o),e("appendPlayerScore",c.statusText(t,!0))}return e("replacePlayerScore",""),e("appendPlayerScore",s.join("\n")),e("calculateRating",""),n}))}(n):"fetchNewSongs"===e.data.action?l.fetchNewSongs(e.data.payload).then((e=>n("newSongs",e))):"fetchAllSongs"===e.data.action&&d.then((e=>l.fetchAllSongs(e).then((e=>n("allSongs",e)))))}},window.addEventListener("message",window.ratingCalcMsgListener)}()}()}},n={};!function t(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={exports:{}};return e[o].call(i.exports,i,i.exports,t),i.exports}(2690)})();