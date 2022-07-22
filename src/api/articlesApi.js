import request from '@/utils/request.js'

const ArticlesApi = {}

ArticlesApi.queryAllArticles = (params) => {
    return request({
        url: '/get_posts',
        method: 'get',
        params: params,
    })
}

ArticlesApi.createArticle = (params) => {
    return request({
        url: '/create_post',
        method: 'get',
        params: params,
    })
}

ArticlesApi.downloadArticle = (params) => {
    return request({
        url: '/download_posts',
        method: 'get',
        params: params,
    })
}

ArticlesApi.uploadArticle = (params) => {
  return request({
      url: '/upload_posts',
      method: 'post',
      params: params,
  })
}

export default ArticlesApi