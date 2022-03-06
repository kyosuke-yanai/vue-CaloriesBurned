<template>
  <v-app>
    <v-row class="ma-0 contents">
      <div class="start" v-if="start_flg">
        <div class="screen">
          <h1>消費カロリー診断</h1>
          <p class="text-h6">診断を始める！</p>
          <v-btn color="success" @click="start"> START </v-btn>
        </div>
      </div>

      <div class="main" v-if="!start_flg && result_flg">
        <div class="screen">
          <div class="question-area">
            <h1>{{ question }}</h1>
          </div>
          <div class="answer-area">
            <div v-if="text_answer_flg == questions[question_num].text_answer">
              <div
                v-for="(n, index) in questions[question_num].text_answer_fields"
                :key="n"
              >
                <v-text-field
                  :type="questions[question_num].text_type"
                  :label="n"
                  v-model="answer_texts[index]"
                  @keypress="validate"
                  @input="value = format(value)"
                ></v-text-field>
              </div>
            </div>
            <v-row class="ma-0" justify="center">
              <div v-for="(n, index) in answer_btn_num" :key="n">
                <v-col>
                  <v-btn
                    :disabled="questions[question_num].activateSubmit_flg"
                    color="success"
                    @click="next(questions[question_num].btn_[index].value)"
                  >
                    {{ questions[question_num].btn_[index].btn_text }}
                  </v-btn>
                </v-col>
              </div>
            </v-row>
            <p>{{ question_num + 1 }}/{{ questions.length - 1 }}</p>
          </div>
        </div>
      </div>

      <div class="result" v-if="!result_flg">
        <div class="screen">
          <h1>
            あなたの1日の消費カロリーは{{ calories.toFixed(1) }}Kcalです。
          </h1>

          <div class="twitter_share">
            <button @click="twitterShare">
              <v-icon color="cyan">mdi-twitter</v-icon>ツイッターでシェアする
            </button>
          </div>
        </div>
      </div>
    </v-row>

    <div class="about-back pb-10">
      <v-col cols="12" class="pa-0">
        <v-btn text color="success" @click="about_back">
          {{ about_back_btn }}
        </v-btn>
      </v-col>
    </div>

    <v-dialog v-model="about_dialog" width="500">
      <v-card>
        <v-card-title>このサイトについて</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-sheet class="pa-3">
            <div class="body-1">
              <p>このサイトで算出される～～～</p>
            </div>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      start_flg: true,
      result_flg: true,
      text_answer_flg: true,
      about_dialog: false,
      questions: [
        {
          question_text: "あなたの性別は？",
          btn_num: 2,
          btn_: [
            { btn_text: "男", value: 0 },
            { btn_text: "女", value: 1 },
          ],
          text_answer: false,
          activateSubmit_flg: false,
        },
        {
          question_text: "あなたの身長と体重は？",
          btn_num: 1,
          btn_: [{ btn_text: "入力", value: "入力" }],
          text_answer: true,
          text_type: "number",
          text_answer_fields: ["身長(cm)", "体重(kg)", "年齢(歳)"],
          activateSubmit_flg: true,
        },
        {
          question_text: "あなたの活動レベルは？",
          btn_num: 4,
          btn_: [
            { btn_text: "がっつり", value: 1.8 },
            { btn_text: "普通", value: 1.5 },
            { btn_text: "そこそこ", value: 1.4 },
            { btn_text: "動かない", value: 1.2 },
          ],
          text_answer: false,
          activateSubmit_flg: false,
        },
        {
          question_text: "現状からどうなりたい？",
          btn_num: 3,
          btn_: [
            { btn_text: "増やしたい", value: 0 },
            { btn_text: "減らしたい", value: 1 },
            { btn_text: "現状維持", value: 2 },
          ],
          text_answer: false,
          activateSubmit_flg: false,
        },
        {
          question_text: "エラー回避",
          btn_num: 1,
          btn_: [{ btn_text: "エラー回避", value: "エラー回避" }],
          text_answer: true,
          activateSubmit_flg: false,
        },
      ],
      value: "",
      question: "",
      question_num: 0,
      answer_btn_num: 0,
      answer_texts: [],
      answer_box: [],
      calories: 0.0,
      about_back_btn: "about",
    };
  },
  methods: {
    //診断スタート
    start() {
      this.start_flg = false;
      this.answer_btn_num = this.questions[this.question_num].btn_num;
      this.question = this.questions[this.question_num].question_text;
      this.about_back_btn = "⇐back";
    },
    //
    //次の質問
    next(answer) {
      this.question_num++;
      this.answer_btn_num = this.questions[this.question_num].btn_num;
      this.question = this.questions[this.question_num].question_text;
      //ボタンの値が「入力」(フィールド入力)の場合
      if (answer == "入力") {
        this.answer_box.push(this.answer_texts.map(Number));
      } else {
        this.answer_box.push(answer);
      }
      //
    },
    //
    //aboutかbackかの処理
    about_back() {
      if (this.about_back_btn == "about") {
        this.about_dialog = true;
      } else {
        //前の画面に戻る
        //1問目の場合
        if (this.question_num == 0) {
          this.start_flg = true;
          this.about_back_btn = "about";
          //
        } else {
          this.question_num--;
          this.answer_btn_num = this.questions[this.question_num].btn_num;
          this.question = this.questions[this.question_num].question_text;
          this.answer_box.splice(this.question_num, 1);
        }
        //
      }
    },
    //数字と小数点の入力のみ許可する 参考「https://kntmr.hatenablog.com/entry/2019/01/11/175800」
    validate(e) {
      const charCode = e.which ? e.which : e.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        e.preventDefault();
      } else {
        return true;
      }
    },
    format(val) {
      if (!val) {
        return (this.prevValue = "");
      }
      if (/^([1-9]{1}[0-9]{0,1})(\.\d{0,2})?$/.test(val)) {
        // ##.##
        return (this.prevValue = val);
      }
      if (/\.\d{3,}$/.test(val)) {
        // .### => .##
        return (this.prevValue = (
          Math.floor(parseFloat(val) * Math.pow(10, 2)) / Math.pow(10, 2)
        ).toString());
      }
      return this.prevValue;
    },
    //

    //シェアする画面を設定 参考「https://katonobo.com/vue/twitter-share-button/」
    twitterShare() {
      const shareURL =
        "https://twitter.com/intent/tweet?text=" +
        "私の1日の消費カロリーは" +
        this.calories +
        "kcalでした！" +
        "とりあえず" +
        this.questions[4].btn[this.answer_box[5]].btn_text +
        "！" +
        "%20%23カロリー消費診断アプリ";
      +"&url=" + "https://kyosuke-yanai.github.io/vue-CaloriesBurned/";
      location.href = shareURL;
    },
    //
  },
  watch: {
    //質問が終わったら
    question_num() {
      if (this.question_num == this.questions.length - 1) {
        this.result_flg = false;
        this.answer_box = this.answer_box.flat();
        this.about_back_btn = "about";
        //男性の場合
        if (this.answer_box[0] == 0) {
          this.calories =
            (10 * this.answer_box[2] +
              6.25 * this.answer_box[1] -
              5 * this.answer_box[3] +
              5) *
            this.answer_box[4];
          //
        } else {
          //女性の場合
          this.calories =
            (10 * this.answer_box[2] +
              6.25 * this.answer_box[1] -
              5 * this.answer_box[3] -
              161) *
            this.answer_box[4];
        }
        //
      }
      //
    },
    //fieldの数、入力が確認されたら
    answer_texts() {
      if (
        this.answer_texts.length ==
        this.questions[this.question_num].text_answer_fields.length
      ) {
        this.questions[this.question_num].activateSubmit_flg = false;
      }
    },
    //
  },
};
</script>

<style>
.contents {
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  justify-content: center;
}

.screen {
  text-align: center;
}

.about-back {
  position: fixed;
  bottom: 10px;
}

.twitter_share {
  max-width: 1000px;
  margin: auto;
}
</style>