<template>
  <div id="app" >
      <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  mounted() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
</script>
<style src="./assets/styles/main.css"></style>
