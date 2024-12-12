export const getDisplayPrice = (price: number, currencyTypeCode: string) => {
  switch (currencyTypeCode) {
    case "KRW":
      return makeCommadNumber(price.toString());
    case "BTC":
      return price.toLocaleString("ko-KR", {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8,
      });
    case "USDT":
      return makeCommadNumber(price.toString());
    default:
      return makeCommadNumber(price.toString());
  }
};

export const getDisplayAccTradePrice = (
  price: number,
  currencyTypeCode: string
) => {
  switch (currencyTypeCode) {
    case "KRW":
      return makeCommadNumber(price.toString());
    case "BTC":
      return price.toLocaleString("ko-KR", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
    case "USDT":
      return makeCommadNumber(price.toFixed(0).toString());
    default:
      return makeCommadNumber(price.toString());
  }
};

export const getDisplayAccTradePriceByKRW = (
  price: number,
  currencyTypeCode: string,
  BTCtoKRW: number = 1_4000_0000
) => {
  switch (currencyTypeCode) {
    case "KRW":
      break;
    case "BTC":
      price = price * BTCtoKRW;
      break;
    case "USDT":
      price = price * 1430; // TODO : USDT 환율 API 연동
      break;
    default:
      break;
  }
  if (price >= 1000000) {
    return (
      <>
        <h4>{makeCommadNumber((price / 1000000).toFixed(0))}</h4>
        <h4 className="text-gray-500">백만</h4>
      </>
    );
  } else {
    return (
      <>
        <h4>{makeCommadNumber(price.toFixed(0))}</h4>
      </>
    );
  }
};

export const getDisplayPriceByKRW = (
  price: number,
  currencyTypeCode: string,
  BTCtoKRW: number = 1_4000_0000
) => {
  return makeCommadNumber(
    getPrecisionString(
      exchangeCurrency(price, currencyTypeCode, BTCtoKRW)
    ).toString()
  );
};

const getPrecisionString = (price: number) => {
  if (price >= 1000) {
    return price.toFixed(0);
  } else if (price >= 100) {
    return price.toFixed(1);
  } else if (price >= 10) {
    return price.toFixed(2);
  } else if (price >= 1) {
    return price.toFixed(3);
  } else {
    return price;
  }
};

export const exchangeCurrency = (
  price: number,
  currencyTypeCode: string,
  BTCtoKRW: number
) => {
  switch (currencyTypeCode) {
    case "KRW":
      break;
    case "BTC":
      price = price * BTCtoKRW;
      break;
    case "USDT":
      price = price * 1430; // TODO : USDT 환율 API 연동
      break;
    default:
      break;
  }
  return price;
};

const makeCommadNumber = (num: string) => {
  return num.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};