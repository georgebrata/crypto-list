import http from "./http";

class CoinDataService {
  getCoins(page?: number, perPage?:number) {
    page = page || 1;
    perPage = perPage || 20;
    
    return http.get(`/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}`);

  }

  getSparklineData(id: string) {
    //curl -X GET "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=true" -H "accept: application/json"
    return http.get(`/api/v3/coins/markets?vs_currency=USD&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=true`);
  }

  // get(id: string) {
  //   return http.get(`/tutorials/${id}`);
  // }

  // create(data: any) {
  //   return http.post("/tutorials", data);
  // }

  // update(id: string, data: any) {
  //   return http.put(`/tutorials/${id}`, data);
  // }

  // delete(id: string) {
  //   return http.delete(`/tutorials/${id}`);
  // }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title: string) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new CoinDataService();