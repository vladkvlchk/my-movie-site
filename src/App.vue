<template>
  <div id="app">
    <Header v-if="showHeader" />

    <router-view />

    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Header, Footer } from "@/components";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
  },
  computed: {
    showHeader(): boolean {
      return this.$route.meta.showHeader !== false;
    },
  },
});
</script>
