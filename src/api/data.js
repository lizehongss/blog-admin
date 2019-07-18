import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}

// 上传文章
export const postArticle = ({ title, keyword, descript, content, tag }) => {
  const data = {
    title,
    keyword,
    descript,
    content,
    tag
  }
  return axios.request({
    url: 'article',
    data,
    method: 'post'
  })
}
// 获取文章列表
export const getArticle = (params) => {
  return axios.request({
    url: 'article',
    params,
    method: 'get'
  })
}
// 获取标签Id
export const postTag = ({ name, descript }) => {
  const data = { name, descript }
  return axios.request({
    url: 'tag',
    data,
    method: 'post'
  })
}
// 获取文章详情
export const getArticleDetail = (id) => {
  return axios.request({
    url: 'article_detail/' + id,
    method: 'get'
  })
}
// 删除文章
export const deleteArticle = (id) => {
  return axios.request({
    url: 'article/' + id,
    method: 'delete'
  })
}
// 修改文章状态
export const patchArticle = (id, data) => {
  return axios.request({
    url: 'article/' + id,
    data,
    method: 'patch'
  })
}
// 修改文章
export const editArticle = (id, data) => {
  return axios.request({
    url: 'article/' + id,
    method: 'put',
    data
  })
}
