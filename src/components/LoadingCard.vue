<template>
  <div class="my-4 py-4">
    <div class="py-4">
          <div class="flex justify-center align-items-center py-4">
            <div class="loader"></div>
          </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CoinDataService from "./../utils/CoinDataService";

@Component
export default class LoadingCard extends Vue {}
</script>

<style scoped lang="scss">
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid var(--primary);
  width: 120px;
  height: 120px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
