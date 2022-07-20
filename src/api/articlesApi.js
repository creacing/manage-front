import request from '@/utils/request.js'

const ArticlesApi = {}

ArticlesApi.queryAllArticles = (params)=>{
  return request({
    url: '/get_posts',
    method: 'get',
    params: params,
  })
}

ArticlesApi.createArticle = (params)=>{
  return request({
    url: '/create_post',
    method: 'get',
    params: params,
  })
}

export default ArticlesApi