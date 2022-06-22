import request from './../utils/request.js'

const ArticlesApi = {}

ArticlesApi.queryAllArticles = (param)=>{
  return request({
    url: '/',
    method: 'get',
    param: param,
  })
}
export default ArticlesApi