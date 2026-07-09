let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token
}

export const getAccessToken = () => {
  return accessToken
}

// dùng cho trường hợp đặt vé mà không cần đăng nhập
// xóa khi thanh toán
export const getTmpId = () => {
  return localStorage.getItem('tmpIdUser')
}

export const  setTmpId = (tmpIdUser) => {
  localStorage.setItem('tmpIdUser', tmpIdUser)
}