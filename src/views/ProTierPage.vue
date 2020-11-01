<template>
  <div class="page page--pro">
    <coin-list-pro></coin-list-pro>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CoinListPro from '../components/lists/CoinListPro.vue'

@Component({
  components: {
    CoinListPro
  }
})
export default class ProTierPage extends Vue {

}
</script>

<style scoped lang="scss">
h1 {
  margin: 0;
}
</style>