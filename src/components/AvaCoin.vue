<template>
<div class="coin mx-2 mt-3" @click="toggleCard">
  <t-card v-bind:class="{ 'bg-gray-200': isExpanded }">
      <template v-slot:header>
        <div class="flex justify-between coin__header">
          <div class="flex justify-between coin__info">
            <div class="coin__logo">
              <img :src="imgSrc" height="20">
            </div>
            <div class="flex flex-col justify-between coin__name">
              <h1>{{displayName}}</h1>
              <small class="coin__price"><b>{{ volume | bilions }}</b> last 24h volume</small>
            </div>
          </div>
          <div class="coin__numbers">
            <div class="flex flex-col items-end justify-between coin__name">
              <p class="mb-1">{{price | currency }}</p>
              <h1 class="coin__change" v-bind:class="{ 'text-red-600': change < 0, 'text-green-600': change > 0 }">{{ change | decimals(1) | sign | percent }}</h1>
            </div>
          </div>
        </div>
    </template>
    <template v-slot:default v-if="isExpanded">
      <div class="p-4">
        <t-alert v-if="error">
          {{error}}
        </t-alert>
        <div v-else>
          <!-- sparkline graph: {{sparkline_data}} -->
          <ava-chart :data="graphData" :id="id" :price="price"></ava-chart>
        </div>
      </div>
    </template>
  </t-card>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CoinDataService from "./../utils/CoinDataService";
import { Coin } from '@/store/coin'
import AvaChart from './AvaChart.vue';

@Component({
  components: {
    AvaChart,
  }
})
export default class AvaCoin extends Vue {
  private isExpanded: Boolean = false;

  @Prop({ required: true })
  id!: string;
  @Prop({ default: '' })
  name!: string;
  @Prop({ default: '' })
  symbol!: string;
  @Prop({ default: ''})
  imgSrc!: string;
  @Prop({ default: 0})
  price!: number;
  @Prop({ default: 0})
  change!: number;
  @Prop({ default: 0})
  volume!: number;

  isLoading = false;
  error = null;
  sparkline_data = [];
  graphData = {};

  get displayName(): string {
    if(this.symbol) {
      return this.name + ' (' + this.symbol.toUpperCase() + ')';
    } else {
      return this.name;
    }
  }

  async toggleCard() {
    this.isExpanded = !this.isExpanded
    if(this.isExpanded) {
      this.isLoading = true;
      try {
        this.sparkline_data = await Coin.FetchCoinSparklineData(this.id)
        const now = new Date().getTime();
        this.graphData = this.sparkline_data.map(function(p:number, i:number) {
            return {
              x: now - 3600000 * i,
              y: parseInt(p.toFixed(2)),
            } 
          });

      } catch (e) {
        this.error = e;
      }

    }
  }

}
</script>

<style scoped lang="scss">
h1 {
  margin: 0;
}
.coin {
  cursor: pointer;
  margin-bottom: 0.3rem;

  .coin__logo img {
    margin-right: 1rem;
    max-height: 3rem;
  }
}
</style>
