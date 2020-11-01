<template>
  <div class="pb-4">
    <ava-hero-header :count="filteredCoins.length"></ava-hero-header>
    <div class="flex justify-between bg-primary">
      <div class="mx-2 mb-2 w-full">
        <t-input placeholder="🔍 Search your coin ..." :value="searchValue" @keyup="filterCoins" name="search" variant="demo" class="search--input p-1 pl-2 md:pl-4 w-full" />
      </div>
    </div>
    <ava-coin v-for="coin in filteredCoins" :key="coin.id" :id="coin.id" :name="coin.name" :symbol="coin.symbol" :imgSrc="coin.image" :price="coin.current_price" :volume="coin.total_volume" :change="coin.price_change_percentage_24h">
    </ava-coin>
    <loading-card v-if="scrolledToBottom || isLoading"></loading-card>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Watch,
    Vue
  } from "vue-property-decorator";
  import CoinDataService from "../../utils/CoinDataService";
  import {
    ICoin
  } from "../../utils/interfaces"
  import {
    namespace
  } from 'vuex-class';
  import AvaCoin from '../AvaCoin.vue'
  import AvaHeroHeader from '../AvaHeroHeader.vue'
  import LoadingCard from '../LoadingCard.vue'
  import {
    Coin
  } from '@/store/coin'
  import {
    Route
  } from 'vue-router';
  import {
    filter
  } from 'vue/types/umd';
  @Component({
    components: {
      AvaHeroHeader,
      AvaCoin,
      LoadingCard
    }
  })
  export default class CoinList extends Vue {
    expandedCoin: any = null;
    page: number = 1;
    scrolledToBottom: boolean = false;
    isLoading: boolean = true;
    isFetching: boolean = false;
    rate: string = '10';
    searchValue: string = '';
    get allCoins() {
      return Coin.coins || [];
    }
    get filteredCoins() {
      if (this.searchValue) {
        return this.allCoins.filter(c => c.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1 || c.symbol.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
      }
      return this.allCoins || [];
    }
    @Watch('searchValue')
    async filterCoins(newFilter: KeyboardEvent) {
      if (newFilter && newFilter.target) {
        this.searchValue = (newFilter.target as any).value.toString();
      }
    }
    @Watch('scrolledToBottom')
    async fetchNewItems(newVal: boolean) {
      if (this.scrolledToBottom) {
        this.scrolledToBottom = false
        console.log("SHOULF FETCH NEW ITEMS NOW ...");
        this.isFetching = true;
        await Coin.FetchNextPage(parseInt(this.rate));
        this.isFetching = false;
      }
    }
    @Watch('$route', {
      immediate: true,
      deep: true
    })
    onRouteChange(newRoute: Route) {
      if (newRoute.query && newRoute.query.r) {
        console.log(newRoute)
        this.rate = newRoute.query.r.toString();
      }
    }
    async mounted() {
      await Coin.GetInitialCoins(parseInt(this.rate));
      this.listenToScroll();
    }
    listenToScroll() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight > document.documentElement.offsetHeight - 5;
        if (bottomOfWindow) {
          this.scrolledToBottom = true // replace it with your code
        }
      }
    }
  }
</script>

<style scoped>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  .search--input {
    font-size: 1.5rem;
  }
</style>
