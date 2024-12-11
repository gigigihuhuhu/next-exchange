export interface MarketDTO {
  market: string;
  korean_name: string;
  english_name: string;
}

export class Market {
  constructor(
    public marketCode: string, 
    public koreanName: string, 
    public englishName: string) {}

  static fromDTO(data: MarketDTO) {
    return new Market(data.market,data.korean_name,data.english_name);
  }

  static fromObject(data: Market) {
    return new Market(data.marketCode,data.koreanName,data.englishName);
  }

  static getDefaultMarket() {
    return new Market("KRW-BTC", "비트코인", "Bitcoin");
  }
}

export class Markets {
  constructor(private markets: Array<Market>) {}

  static fromDTO(data: Array<MarketDTO>) {
    return new Markets(data.map((marketDTO) => Market.fromDTO(marketDTO)));
  }

  findMarket(marketCode: string) {
    return this.markets.find((a) => a.marketCode == marketCode);
  }
}
