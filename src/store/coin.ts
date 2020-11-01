import { ICoin } from '../utils/interfaces';
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import CoinDataService from '../utils/CoinDataService'
import { Dictionary } from 'vue-router/types/router';

export interface ICoinsModuleState {
  error: string
  coins: ICoin[]
  currentPage: number
}

@Module({ dynamic: true, store, name: 'coin' })
class CoinsModule extends VuexModule implements ICoinsModuleState {
  public currentPage: number = 1;
  public error: string = ''
  public coins: ICoin[] = []
  private coinsById = {};

  @Mutation
  private SET_COINS(coins: ICoin[]) {
    this.coins = coins
  }

  @Mutation
  private APPEND_COINS(coins: ICoin[]) {
    coins.forEach(coin => {
      let existingCoinIndex = this.coins.findIndex(c => c.id === coin.id);
      if(existingCoinIndex === -1) {
        this.coins.push(coin)
      }
    })
    console.log("APPEND COINS FINISHED", coins.length, this.coins.length)
  }

  @Mutation
  private UPDATE_PAGE(delta: number) {
    this.currentPage = this.currentPage + delta;
  }

  @Mutation
  private UPDATE_COIN_DATA(id: string, data: number[]) {
    let cIndex = this.coins.findIndex(coin => coin.id === id);
    if(cIndex>-1) {
      this.coins[cIndex].sparkline_data = data
    }
  }

  @Action
  public async GetInitialCoins(perPage?: number) {
    let response;
    try {
      response = await CoinDataService.getCoins(1, perPage);
      if(response && response.data && response.data.length > 0) {
        this.SET_COINS(response.data)
      }
    } catch (e) {
      throw Error('Something went wrong, please try again later ....')
    }
  }

  @Action
  public async FetchNextPage(perPage?: number) {
    let response;
    try {
      response = await CoinDataService.getCoins(this.currentPage + 1, perPage);
      if(response && response.data && response.data.length > 0) {
        this.UPDATE_PAGE(+1)
        this.APPEND_COINS(response.data)
      }
    } catch (e) {
      throw Error('Something went wrong, please try again later ....')
    }
  }

  @Action
  public async FetchCoinSparklineData(id: string) {
    let existingCoinIndex = this.coins.findIndex(c => c.id === id && c.sparkline_data);
    if(existingCoinIndex > -1) {
      return this.coins[existingCoinIndex].sparkline_data;
    } else {
      let response;
      try {
        response = await CoinDataService.getSparklineData(id);
        console.log('data response: ', response.data[0].sparkline_in_7d.price)
        if(response && response.data) {
          this.UPDATE_COIN_DATA(id, response.data[0].sparkline_in_7d.price)
          return response.data[0].sparkline_in_7d.price;
        }
      } catch (e) {
        throw Error('Something went wrong, please try again later ....')
      }
    }
  }
}

export const Coin = getModule(CoinsModule)
