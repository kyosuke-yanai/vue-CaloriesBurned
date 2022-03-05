<template>
  <v-app>
    <v-row>
      <v-col>
        <v-btn color="secondary" height="80" width="160"> imgが入る予定 </v-btn>
      </v-col>
    </v-row>

    <v-main>
      <Questions />
    </v-main>

    <v-footer padless fixed>
      <v-col class="text-center" cols="12"> © KYOSUKE YANAI </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Questions from "./components/Questions";

export default {
  name: "App",

  components: {
    Questions,
  },
};
</script>
