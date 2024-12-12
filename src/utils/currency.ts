export const getDisplayPrice = (price: number, currencyTypeCode: string) => {
  switch (currencyTypeCode) {
    case "KRW":
      return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    case "BTC":
      return price.toLocaleString("ko-KR", {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8,
      });
    case "USDT":
      return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    default:
      return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
};
