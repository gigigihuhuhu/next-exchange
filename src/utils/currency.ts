export const getDisplayPrice = (price: number, currencyTypeCode: string) => {
  switch (currencyTypeCode) {
    case "KRW":
      return makeCommadNumber(price.toString())
    case "BTC":
      return price.toLocaleString("ko-KR", {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8,
      });
    case "USDT":
      return makeCommadNumber(price.toString())
    default:
      return makeCommadNumber(price.toString())
  }
};


export const getDisplayAccTradePrice = (price: number, currencyTypeCode: string) => {
  switch (currencyTypeCode) {
    case "KRW":
      return makeCommadNumber(price.toString())
    case "BTC":
      return price.toLocaleString("ko-KR", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
    case "USDT":
      return makeCommadNumber(price.toFixed(0).toString())
    default:
      return makeCommadNumber(price.toString())
  }
}

const makeCommadNumber = (num:string) => {
  return num.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}