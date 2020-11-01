<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop({required: false, type: String}) readonly msg: string = 'Hello world!';
}
</script>

<style scoped lang="scss">
h1 {
  margin: 0;
}
</style>
