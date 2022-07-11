// import request from "./request.js"
// const stocks = ['sh600519']

// const requestStock = (stockId) => {
//     return request({
//         url: `http://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=${stockId}&scale=15&ma=no&datalen=1023`,
//         method: "get",
//         data: '',
//     });
// }
// export const getStockInfo = async(stockId = 'sh600519') => {
//     return await requestStock(stockId)
// }