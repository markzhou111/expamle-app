import request from '@/utils/request'

// 登录
export function apiLogin(data) {
  return request({
    url: '/Home/LoginYz',
    method: 'post',
    data
  })
}

// 上传图片
export function apiUploadImg(data) {
  return request({
    url: '/Newclass/ajax/image.ashx',
    method: 'post',
    data
  })
}

// 新增图库
export function apiNewPic(data) {
  return request({
    url: '/Forum/AddForumPhoto',
    method: 'post',
    data
  })
}