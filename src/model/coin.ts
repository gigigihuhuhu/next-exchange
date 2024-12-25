interface CoinRestDTO {
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

interface CoinWsDTO {
  type: string;
  code: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  acc_trade_price: number;
  change: string;
  change_price: number;
  signed_change_price: number;
  change_rate: number;
  signed_change_rate: number;
  ask_bid: string;
  trade_volume: number;
  acc_trade_volume: number;
  trade_date: string;
  trade_time: string;
  trade_timestamp: number;
  acc_ask_volume: number;
  acc_bid_volume: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  market_state: string;
  is_trading_suspended: boolean;
  delisting_date: string | null;
  market_warning: string;
  timestamp: number;
  acc_trade_price_24h: number;
  acc_trade_volume_24h: number;
  stream_type: string;
}
export class Coin {
  [key: string]: string | number | (() => string);

  constructor(
    public market: string = '-',
    public high_price: number = 0,
    public low_price: number = 0,
    public trade_price: number = 0,
    public change: string = '-',
    public signed_change_price: number = 0,
    public signed_change_rate: number = 0,
    public acc_trade_price_24h: number = 0,
    public acc_trade_volume_24h: number = 0,
  ) {}

  static fromRestDTO(data: CoinRestDTO): Coin {
    return new Coin(
      data.market,
      data.high_price,
      data.low_price,
      data.trade_price,
      data.change,
      data.signed_change_price,
      data.signed_change_rate,
      data.acc_trade_price_24h,
      data.acc_trade_volume_24h,
    );
  }

  static fromWsDTO(data: CoinWsDTO): Coin {
    return new Coin(
      data.code,
      data.high_price,
      data.low_price,
      data.trade_price,
      data.change,
      data.signed_change_price,
      data.signed_change_rate,
      data.acc_trade_price_24h,
      data.acc_trade_volume_24h,
    );
  }

  currencyType(): string {
    return this.market.split("-")[0];
  }

  coinCode(): string {
    return this.market.split("-")[1];
  }
}

export class Coins {
  constructor(private coins: { [market: string]: Coin }) {}

  static fromDTO(data: Array<CoinRestDTO>) {
    const newCoins: { [market: string]: Coin } = {};
    data.forEach((coinDTO) => {
      newCoins[coinDTO.market] = Coin.fromRestDTO(coinDTO);
    });
    return new Coins(newCoins);
  }

  findCoin(market: string) {
    return this.coins[market];
  }

  updateCoin(updateCoin: Coin) {
    this.coins[updateCoin.market] = updateCoin;
    return new Coins({ ...this.coins });
  }
}
