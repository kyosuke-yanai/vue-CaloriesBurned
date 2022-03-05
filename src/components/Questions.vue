<template>
  <v-app>
    <div class="start-screen" v-if="start_flg">
      <h1>消費カロリー診断</h1>
      <p class="text-h6">診断を始める！</p>
      <v-btn color="success" @click="start"> START </v-btn>
    </div>

    <div class="main-screen">
      <div v-if="!start_flg && result_flg">
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
                v-bind:type="questions[question_num].text_type"
                v-bind:label="n"
                v-model="answer_texts[index]"
                @keypress="validate"
                @input="value = format(value)"
              ></v-text-field>
            </div>
          </div>
          <v-row>
            <div v-for="(n, index) in answer_btn_num" :key="n">
              <v-col>
                <v-btn
                  v-bind:disabled="questions[question_num].activateSubmit_flg"
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

    <div class="result_screen" v-if="!result_flg">
      あなたの1日の消費カロリーは{{ calories.toFixed(1) }}Kcalです。
      {{ answer_box }}
    </div>
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
          text_answer_fields: ["身長", "体重", "年齢"],
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
    };
  },
  methods: {
    start() {
      this.start_flg = false;
      this.answer_btn_num = this.questions[this.question_num].btn_num;
      this.question = this.questions[this.question_num].question_text;
    },
    next(answer) {
      this.question_num++;
      this.answer_btn_num = this.questions[this.question_num].btn_num;
      this.question = this.questions[this.question_num].question_text;
      if (answer == "入力") {
        this.answer_box.push(this.answer_texts.map(Number));
        this.answer_texts = "";
      } else {
        this.answer_box.push(answer);
      }
    },
    //参考 数字と小数点の入力のみ許可する「https://kntmr.hatenablog.com/entry/2019/01/11/175800」
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
    //参考
  },
  watch: {
    question_num() {
      if (this.question_num == this.questions.length - 1) {
        this.result_flg = false;
      }
      this.answer_box = this.answer_box.flat();
      //男性の場合
      if (this.answer_box[0] == 0) {
        this.calories =
          (10 * this.answer_box[2] +
            6.25 * this.answer_box[1] -
            5 * this.answer_box[3] +
            5) *
          this.answer_box[4];
      } else {
        //女性の場合
        this.calories =
          (10 * this.answer_box[2] +
            6.25 * this.answer_box[1] -
            5 * this.answer_box[3] -
            161) *
          this.answer_box[4];
      }
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
  },
};
</script>