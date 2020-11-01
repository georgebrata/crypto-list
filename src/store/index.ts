/* tslint:disable */
import Vue from 'vue'
import Vuex from 'vuex'
import { Coin } from './coin'

Vue.use(Vuex)

export interface IRootState {
  Coin
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<any>({})
