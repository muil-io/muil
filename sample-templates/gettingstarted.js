module.exports=function(A){var e={};function t(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return A[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=A,t.c=e,t.d=function(A,e,r){t.o(A,e)||Object.defineProperty(A,e,{enumerable:!0,get:r})},t.r=function(A){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(A,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(A,"__esModule",{value:!0})},t.t=function(A,e){if(1&e&&(A=t(A)),8&e)return A;if(4&e&&"object"==typeof A&&A&&A.__esModule)return A;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:A}),2&e&&"string"!=typeof A)for(var n in A)t.d(r,n,function(e){return A[e]}.bind(null,n));return r},t.n=function(A){var e=A&&A.__esModule?function(){return A.default}:function(){return A};return t.d(e,"a",e),e},t.o=function(A,e){return Object.prototype.hasOwnProperty.call(A,e)},t.p="",t(t.s=4)}([function(A,e){A.exports=require("react")},function(A,e,t){A.exports={root:"root___aEQF6",logo:"logo___1bcm3",title:"title___2SPTl",text:"text___2SGwK","get-started":"get-started___2Hcub"}},,,function(A,e,t){"use strict";t.r(e);var r=t(0),n=t.n(r),a=(t(1),function(A){var e=A.name;return n.a.createElement("div",{className:"root___aEQF6"},n.a.createElement("div",null,n.a.createElement("img",{src:"data:image/png;base64,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",className:"logo___1bcm3",alt:"logo"})),n.a.createElement("div",{className:"title___2SPTl"},"Welcome to Muil"),n.a.createElement("div",{className:"text___2SGwK"},n.a.createElement("b",null,e),", now that you've set up Muil it's time to write your first template"," ",n.a.createElement("span",{role:"img","aria-label":"fire"},"🔥")),n.a.createElement("a",{href:"https://www.muil.io",target:"_blank",rel:"noopener noreferrer",className:"get-started___2Hcub"},"Get Started →"))});a.displayName="Getting Started Template",a.dynamicProps={name:"John"};e.default=a}]);