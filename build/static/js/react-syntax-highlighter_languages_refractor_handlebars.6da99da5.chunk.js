"use strict";(self.webpackChunkCloud_FE=self.webpackChunkCloud_FE||[]).push([[3846,3047],{4490:(e,n,a)=>{var t=a(595);function s(e){e.register(t),function(e){e.languages.handlebars={comment:/\{\{![\s\S]*?\}\}/,delimiter:{pattern:/^\{\{\{?|\}\}\}?$/,alias:"punctuation"},string:/(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,boolean:/\b(?:false|true)\b/,block:{pattern:/^(\s*(?:~\s*)?)[#\/]\S+?(?=\s*(?:~\s*)?$|\s)/,lookbehind:!0,alias:"keyword"},brackets:{pattern:/\[[^\]]+\]/,inside:{punctuation:/\[|\]/,variable:/[\s\S]+/}},punctuation:/[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,variable:/[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/},e.hooks.add("before-tokenize",(function(n){e.languages["markup-templating"].buildPlaceholders(n,"handlebars",/\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g)})),e.hooks.add("after-tokenize",(function(n){e.languages["markup-templating"].tokenizePlaceholders(n,"handlebars")})),e.languages.hbs=e.languages.handlebars}(e)}e.exports=s,s.displayName="handlebars",s.aliases=["hbs"]},595:e=>{function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(a,t,s,r){if(a.language===t){var o=a.tokenStack=[];a.code=a.code.replace(s,(function(e){if("function"===typeof r&&!r(e))return e;for(var s,l=o.length;-1!==a.code.indexOf(s=n(t,l));)++l;return o[l]=e,s})),a.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(a,t){if(a.language===t&&a.tokenStack){a.grammar=e.languages[t];var s=0,r=Object.keys(a.tokenStack);!function o(l){for(var i=0;i<l.length&&!(s>=r.length);i++){var u=l[i];if("string"===typeof u||u.content&&"string"===typeof u.content){var c=r[s],g=a.tokenStack[c],p="string"===typeof u?u:u.content,d=n(t,c),f=p.indexOf(d);if(f>-1){++s;var k=p.substring(0,f),b=new e.Token(t,e.tokenize(g,a.grammar),"language-"+t,g),h=p.substring(f+d.length),m=[];k&&m.push.apply(m,o([k])),m.push(b),h&&m.push.apply(m,o([h])),"string"===typeof u?l.splice.apply(l,[i,1].concat(m)):u.content=m}}else u.content&&o(u.content)}return l}(a.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_handlebars.6da99da5.chunk.js.map