<template>
  <v-app>
    <div class="start-screen" v-if="start_flg">
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
            <v-text-field
              type="number"
              label="身長"
              v-model="answer_text"
              @keypress="validate"
              @input="value = format(value)"
            ></v-text-field>
          </div>
          <v-row>
            <div v-for="(n, index) in answer_btn_num" :key="n">
              <v-col>
                <v-btn
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
      あなたの消費カロリーは{{ calories }}です。
      {{ answerrrr }}
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
        },
        {
          question_text: "あなたの身長と体重は？",
          btn_num: 1,
          btn_: [{ btn_text: "入力", value: "入力" }],
          text_answer: true,
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
        },
        {
          question_text: "いつまでに終わらせたい？",
          btn_num: 1,
          btn_: [{ btn_text: "入力", value: "入力" }],
          text_answer: true,
        },
        {
          question_text: "エラー回避",
          btn_num: 1,
          btn_: [{ btn_text: "エラー回避", value: "エラー回避" }],
          text_answer: true,
        },
      ],
      question: "",
      question_num: 0,
      answer_btn_num: 0,
      answer_text: "",
      answerrrr: [],
      calories: 0,
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
        this.answerrrr.push(this.answer_text);
        this.answer_text = "";
      } else {
        this.answerrrr.push(answer);
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
      if (this.question_num == 4) {
        this.result_flg = false;
      }
      if (this.answerrrr[0] == 0) {
        this.calories =
          (10 * 70 + 6.25 * this.answerrrr[1] - 5 * 20 + 5) * this.answerrrr[2];
      } else {
        this.calories =
          (10 * 70 + 6.25 * this.answerrrr[1] - 5 * 20 - 161) *
          this.answerrrr[2];
      }
    },
  },
};
</script>