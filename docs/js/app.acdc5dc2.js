(function(){"use strict";var t={248:function(t,e,n){var s=n(144),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-row",{staticClass:"ma-0"},[n("v-col",{staticClass:"pa-0"},[n("v-btn",{attrs:{color:"secondary",height:"80px"}},[t._v(" imgが入る予定 ")])],1)],1),n("v-main",[n("Questions")],1),n("v-footer",{attrs:{padless:"",fixed:""}},[n("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[t._v(" © KYOSUKE YANAI ")])],1)],1)},a=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-row",{staticClass:"ma-0 contents"},[t.start_flg?n("div",{staticClass:"start"},[n("div",{staticClass:"screen"},[n("h1",[t._v("消費カロリー診断")]),n("p",{staticClass:"text-h6"},[t._v("診断を始める！")]),n("v-btn",{attrs:{color:"success"},on:{click:t.start}},[t._v(" START ")])],1)]):t._e(),!t.start_flg&&t.result_flg?n("div",{staticClass:"main"},[n("div",{staticClass:"screen"},[n("div",{staticClass:"question-area"},[n("h1",[t._v(t._s(t.question))])]),n("div",{staticClass:"answer-area"},[t.text_answer_flg==t.questions[t.question_num].text_answer?n("div",t._l(t.questions[t.question_num].text_answer_fields,(function(e,s){return n("div",{key:e},[n("v-text-field",{attrs:{type:t.questions[t.question_num].text_type,label:e},on:{keypress:t.validate,input:function(e){t.value=t.format(t.value)}},model:{value:t.answer_texts[s],callback:function(e){t.$set(t.answer_texts,s,e)},expression:"answer_texts[index]"}})],1)})),0):t._e(),n("v-row",{staticClass:"ma-0",attrs:{justify:"center"}},t._l(t.answer_btn_num,(function(e,s){return n("div",{key:e},[n("v-col",[n("v-btn",{attrs:{disabled:t.questions[t.question_num].activateSubmit_flg,color:"success"},on:{click:function(e){return t.next(t.questions[t.question_num].btn_[s].value)}}},[t._v(" "+t._s(t.questions[t.question_num].btn_[s].btn_text)+" ")])],1)],1)})),0),n("p",[t._v(t._s(t.question_num+1)+"/"+t._s(t.questions.length-1))])],1)])]):t._e(),t.result_flg?t._e():n("div",{staticClass:"result"},[n("div",{staticClass:"screen"},[n("h1",[t._v(" あなたの1日の消費カロリーは"+t._s(t.calories.toFixed(1))+"Kcalです。 ")]),n("div",{staticClass:"twitter_share"},[n("button",{on:{click:t.twitterShare}},[t._v("ツイッターでシェアする")])])])])]),n("div",{staticClass:"about-back pb-10"},[n("v-col",{staticClass:"pa-0",attrs:{cols:"12"}},[n("v-btn",{attrs:{text:"",color:"success"},on:{click:t.about_back}},[t._v(" "+t._s(t.about_back_btn)+" ")])],1)],1),n("v-dialog",{attrs:{width:"500"},model:{value:t.about_dialog,callback:function(e){t.about_dialog=e},expression:"about_dialog"}},[n("v-card",[n("v-card-title",[t._v("このサイトについて")]),n("v-divider"),n("v-card-text",[n("v-sheet",{staticClass:"pa-3"},[n("div",{staticClass:"body-1"},[n("p",[t._v("このサイトで算出される～～～")])])])],1)],1)],1)],1)},u=[],r={name:"app",data(){return{start_flg:!0,result_flg:!0,text_answer_flg:!0,about_dialog:!1,questions:[{question_text:"あなたの性別は？",btn_num:2,btn_:[{btn_text:"男",value:0},{btn_text:"女",value:1}],text_answer:!1,activateSubmit_flg:!1},{question_text:"あなたの身長と体重は？",btn_num:1,btn_:[{btn_text:"入力",value:"入力"}],text_answer:!0,text_type:"number",text_answer_fields:["身長(cm)","体重(kg)","年齢(歳)"],activateSubmit_flg:!0},{question_text:"あなたの活動レベルは？",btn_num:4,btn_:[{btn_text:"がっつり",value:1.8},{btn_text:"普通",value:1.5},{btn_text:"そこそこ",value:1.4},{btn_text:"動かない",value:1.2}],text_answer:!1,activateSubmit_flg:!1},{question_text:"現状からどうなりたい？",btn_num:3,btn_:[{btn_text:"増やしたい",value:0},{btn_text:"減らしたい",value:1},{btn_text:"現状維持",value:2}],text_answer:!1,activateSubmit_flg:!1},{question_text:"エラー回避",btn_num:1,btn_:[{btn_text:"エラー回避",value:"エラー回避"}],text_answer:!0,activateSubmit_flg:!1}],value:"",question:"",question_num:0,answer_btn_num:0,answer_texts:[],answer_box:[],calories:0,about_back_btn:"about"}},methods:{start(){this.start_flg=!1,this.answer_btn_num=this.questions[this.question_num].btn_num,this.question=this.questions[this.question_num].question_text,this.about_back_btn="◀back"},next(t){this.question_num++,this.answer_btn_num=this.questions[this.question_num].btn_num,this.question=this.questions[this.question_num].question_text,"入力"==t?this.answer_box.push(this.answer_texts.map(Number)):this.answer_box.push(t)},about_back(){"about"==this.about_back_btn?this.about_dialog=!0:0==this.question_num?(this.start_flg=!0,this.about_back_btn="about"):(this.question_num--,this.answer_btn_num=this.questions[this.question_num].btn_num,this.question=this.questions[this.question_num].question_text,this.answer_box.splice(this.question_num,1))},validate(t){const e=t.which?t.which:t.keyCode;if(!(e>31&&(e<48||e>57)&&46!==e))return!0;t.preventDefault()},format(t){return t?/^([1-9]{1}[0-9]{0,1})(\.\d{0,2})?$/.test(t)?this.prevValue=t:/\.\d{3,}$/.test(t)?this.prevValue=(Math.floor(parseFloat(t)*Math.pow(10,2))/Math.pow(10,2)).toString():this.prevValue:this.prevValue=""},twitterShare(){const t="https://twitter.com/intent/tweet";location.href=t}},watch:{question_num(){this.question_num==this.questions.length-1&&(this.result_flg=!1,this.answer_box=this.answer_box.flat(),this.about_back_btn="about",0==this.answer_box[0]?this.calories=(10*this.answer_box[2]+6.25*this.answer_box[1]-5*this.answer_box[3]+5)*this.answer_box[4]:this.calories=(10*this.answer_box[2]+6.25*this.answer_box[1]-5*this.answer_box[3]-161)*this.answer_box[4])},answer_texts(){this.answer_texts.length==this.questions[this.question_num].text_answer_fields.length&&(this.questions[this.question_num].activateSubmit_flg=!1)}}},_=r,l=n(1),c=n(453),b=n.n(c),v=n(303),h=n(174),f=n(26),x=n(255),d=n(24),m=n(609),p=n(596),w=n(894),q=n(363),g=n(711),y=(0,l.Z)(_,o,u,!1,null,null,null),C=y.exports;b()(y,{VApp:v.Z,VBtn:h.Z,VCard:f.Z,VCardText:x.ZB,VCardTitle:x.EB,VCol:d.Z,VDialog:m.Z,VDivider:p.Z,VRow:w.Z,VSheet:q.Z,VTextField:g.Z});var k={name:"App",components:{Questions:C}},Z=k,V=n(12),S=n(21),O=(0,l.Z)(Z,i,a,!1,null,null,null),T=O.exports;b()(O,{VApp:v.Z,VBtn:h.Z,VCol:d.Z,VFooter:V.Z,VMain:S.Z,VRow:w.Z});var j=n(482);s.Z.use(j.Z);var M=new j.Z({});s.Z.config.productionTip=!1,new s.Z({vuetify:M,render:t=>t(T)}).$mount("#app")}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var a=e[s]={exports:{}};return t[s](a,a.exports,n),a.exports}n.m=t,function(){var t=[];n.O=function(e,s,i,a){if(!s){var o=1/0;for(l=0;l<t.length;l++){s=t[l][0],i=t[l][1],a=t[l][2];for(var u=!0,r=0;r<s.length;r++)(!1&a||o>=a)&&Object.keys(n.O).every((function(t){return n.O[t](s[r])}))?s.splice(r--,1):(u=!1,a<o&&(o=a));if(u){t.splice(l--,1);var _=i();void 0!==_&&(e=_)}}return e}a=a||0;for(var l=t.length;l>0&&t[l-1][2]>a;l--)t[l]=t[l-1];t[l]=[s,i,a]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,s){var i,a,o=s[0],u=s[1],r=s[2],_=0;if(o.some((function(e){return 0!==t[e]}))){for(i in u)n.o(u,i)&&(n.m[i]=u[i]);if(r)var l=r(n)}for(e&&e(s);_<o.length;_++)a=o[_],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(l)},s=self["webpackChunkmysite"]=self["webpackChunkmysite"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=n.O(void 0,[998],(function(){return n(248)}));s=n.O(s)})();
//# sourceMappingURL=app.acdc5dc2.js.map