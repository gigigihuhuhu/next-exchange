import { coinCodeToNameMapper } from "@/data/sample-data";

interface CoinDTO {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  change: string;
  change_price: number;
  change_rate: number;
  signed_change_price: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  timestamp: number;
}

export class Coin {
  market: string;
  tradeDate: string;
  tradeTime: string;
  tradeDateKst: string;
  tradeTimeKst: string;
  tradeTimestamp: number;
  openingPrice: number;
  highPrice: number;
  lowPrice: number;
  tradePrice: number;
  prevClosingPrice: number;
  change: string;
  changePrice: number;
  changeRate: number;
  signedChangePrice: number;
  signedChangeRate: number;
  tradeVolume: number;
  accTradePrice: number;
  accTradePrice24h: number;
  accTradeVolume: number;
  accTradeVolume24h: number;
  highest52WeekPrice: number;
  highest52WeekDate: string;
  lowest52WeekPrice: number;
  lowest52WeekDate: string;
  timestamp: number;

  constructor(data: CoinDTO) {
    this.market = data.market;
    this.tradeDate = data.trade_date;
    this.tradeTime = data.trade_time;
    this.tradeDateKst = data.trade_date_kst;
    this.tradeTimeKst = data.trade_time_kst;
    this.tradeTimestamp = data.trade_timestamp;
    this.openingPrice = data.opening_price;
    this.highPrice = data.high_price;
    this.lowPrice = data.low_price;
    this.tradePrice = data.trade_price;
    this.prevClosingPrice = data.prev_closing_price;
    this.change = data.change;
    this.changePrice = data.change_price;
    this.changeRate = data.change_rate;
    this.signedChangePrice = data.signed_change_price;
    this.signedChangeRate = data.signed_change_rate;
    this.tradeVolume = data.trade_volume;
    this.accTradePrice = data.acc_trade_price;
    this.accTradePrice24h = data.acc_trade_price_24h;
    this.accTradeVolume = data.acc_trade_volume;
    this.accTradeVolume24h = data.acc_trade_volume_24h;
    this.highest52WeekPrice = data.highest_52_week_price;
    this.highest52WeekDate = data.highest_52_week_date;
    this.lowest52WeekPrice = data.lowest_52_week_price;
    this.lowest52WeekDate = data.lowest_52_week_date;
    this.timestamp = data.timestamp;
  }

  currencyType(): string {
    return this.market.split("-")[0];
  }

  coinCode(): string {
    return this.market.split("-")[1];
  }

  coinName(locale: string) {
    const coinCode = this.coinCode();
    return coinCodeToNameMapper[coinCode][locale as "en" | "kr"];
  }

  static fromApiData(data: CoinDTO): Coin {
    return new Coin(data);
  }
}
