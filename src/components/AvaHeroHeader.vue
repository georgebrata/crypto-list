<template>
    <div class="list__header w-screen pt-3 pb-2 mb-0 text-white" style="position: sticky; top: 0px;z-index: 999;">
      <div class="flex justify-between lg:py-4 px-3">
        <div class="flex flex-col">
            <div class="flex flex-col">
            <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Showing <b>top {{count}} cryptocurrencies </b></h1> 
            </div>
            <h4 class="text-base mt-1 sm:text-xl md:text-xl lg:text-2xl xl:text-3xl"><b>📅 for {{today}}</b></h4>
            <!-- <h4 class="hidden md:block mt-3 text-base md:text-xl"><b>Best performing global cryptocurrencies</b> ranked by market capitalization, <b>available for you to buy</b> right now 📈</h4> -->
        </div>
        <!-- <img alt="Vue logo" src="./../assets/logo.svg" style="max-height: 9vh;"> -->
        <span class="mt-3 ml-4 text-base text-right md:text-base"> Load <t-select
                :placeholder="placeholder"
                :options="rates"
                @input="rateChanged"
            ></t-select> coins</span>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop({ default: 10})
  count!: number;

  isRateEditable: boolean = false;

  rates = [10, 25, 50, 100];

  get placeholder() {
      return this.$route.query && this.$route.query.r ? this.$route.query.r.toString() : '10';
  }

  get today() {
      let options = { month: 'long', day: 'numeric' };
      return new Date().toLocaleDateString('en-US', options);
  }

  rateChanged(rate:number) {
      const query = { ...this.$route.query, r: rate.toString() };
      this.$router.replace({ query });
  }
}
</script>
