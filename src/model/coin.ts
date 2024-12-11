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
  constructor(
    public market: string,
    public tradeDate: string,
    public tradeTime: string,
    public tradeDateKst: string,
    public tradeTimeKst: string,
    public tradeTimestamp: number,
    public openingPrice: number,
    public highPrice: number,
    public lowPrice: number,
    public tradePrice: number,
    public prevClosingPrice: number,
    public change: string,
    public changePrice: number,
    public changeRate: number,
    public signedChangePrice: number,
    public signedChangeRate: number,
    public tradeVolume: number,
    public accTradePrice: number,
    public accTradePrice24h: number,
    public accTradeVolume: number,
    public accTradeVolume24h: number,
    public highest52WeekPrice: number,
    public highest52WeekDate: string,
    public lowest52WeekPrice: number,
    public lowest52WeekDate: string,
    public timestamp: number
  ) {}

  static fromDTO(data: CoinDTO): Coin {
    return new Coin(
      data.market,
      data.trade_date,
      data.trade_time,
      data.trade_date_kst,
      data.trade_time_kst,
      data.trade_timestamp,
      data.opening_price,
      data.high_price,
      data.low_price,
      data.trade_price,
      data.prev_closing_price,
      data.change,
      data.change_price,
      data.change_rate,
      data.signed_change_price,
      data.signed_change_rate,
      data.trade_volume,
      data.acc_trade_price,
      data.acc_trade_price_24h,
      data.acc_trade_volume,
      data.acc_trade_volume_24h,
      data.highest_52_week_price,
      data.highest_52_week_date,
      data.lowest_52_week_price,
      data.lowest_52_week_date,
      data.timestamp
    );
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
}

export class Coins {
  constructor(private coins: { [market : string] : Coin ;}) {}

  static fromDTO(data: Array<CoinDTO>) {
    const newCoins: { [market : string] : Coin ;} = {}
    data.forEach((coinDTO) => { newCoins[coinDTO.market] = Coin.fromDTO(coinDTO); });
    return new Coins(newCoins);
  }

  findCoin(marketCode: string) {
    return this.coins[marketCode];
  }
}
