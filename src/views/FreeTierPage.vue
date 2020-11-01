<template>
  <div class="page page--free">
    <!-- <img alt="Vue logo" src="../assets/logo.svg" height="50"> -->
    <!-- <t-alert class="mb-4" show>
      Want more in-depth insights for your crypto portfolio?<router-link to="/pro" class="ml-1 text-red-600 hover:underline">Become Pro now</router-link> 🚀
    </t-alert> -->
    <coin-list></coin-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CoinList from '../components/lists/CoinList.vue'

@Component({
  components: {
    CoinList
  }
})
export default class FreeTierPage extends Vue {
  handleScroll(e:any) {
    console.log(e)
  }
}
</script>

<style scoped lang="scss">

</style>