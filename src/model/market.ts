export interface MarketDTO {
  market: string;
  korean_name: string;
  english_name: string;
}

export class Market {
  marketCode: string;
  koreanName: string;
  englishName: string;

  static fromDTO(data: MarketDTO) {
    return new Market({
      marketCode: data.market,
      koreanName: data.korean_name,
      englishName: data.english_name,
    });
  }

  constructor({
    marketCode,
    koreanName,
    englishName,
  }: {
    marketCode: string;
    koreanName: string;
    englishName: string;
  }) {
    this.marketCode = marketCode;
    this.koreanName = koreanName;
    this.englishName = englishName;
  }

  static getDefaultMarket() {
    return new Market({
      marketCode: "KRW-BTC",
      koreanName: "비트코인",
      englishName: "Bitcoin",
    });
  }
}

export class Markets {
  markets: Array<Market>;

  constructor(data: Array<MarketDTO>) {
    this.markets = data.map((marketDTO) => Market.fromDTO(marketDTO));
  }

  findMarket(marketCode: string) {
    return this.markets.find((a) => a.marketCode == marketCode);
  }
}
