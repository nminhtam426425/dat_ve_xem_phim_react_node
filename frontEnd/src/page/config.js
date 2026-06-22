import {getAccessToken, setAccessToken} from './tokenStore'
import {useNavigate} from 'react-router-dom'
import {notPassValidFormMovie, messageErrorFormMovie} from './validateForm'
import Pusher from 'pusher-js'

const branch = 'CINESTU'

const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  forceTLS: true
})

const apiUserService = {
  baseURL: import.meta.env.VITE_BE || 'http://localhost:3001'
}

const customeFetch = async (url, type, method, body={}) => {
  let res = null
  const token = getAccessToken()
  
  if(!token && type == 'authen')
    return {}

  const options = {
      method: method,
      headers: {
          "Content-Type": "application/json"
      }
  }
  // Bật cấu hình gửi kèm token trong Cookie
  options.credentials = 'include'

  if (type === 'authen' && token) 
      options.headers["Authorization"] = `Bearer ${token}`

  if (body && (method === 'POST' || method === 'PUT')) 
      options.body = body

  try {
      res = await fetch(url, options)

      if (res.status === 401) {
        try {
            const refreshResponse = await fetch(apiUserService+'/auth/refreshToken', {
              method: 'POST',
              credentials: 'include' // Bắt buộc phải có để gửi cookie đi kèm theo refreshToken
            })
      
            if (refreshResponse.ok) {
              const data = await refreshResponse.json()
              const newAccessToken = data.token
      
              setAccessToken(newAccessToken)
      
              options.headers['Authorization'] = `Bearer ${newAccessToken}`
      
              res = await fetch(url, options)
            } else {
              setAccessToken(null)
              window.location.href = '/'
            }
          } catch (error) {
            setAccessToken(null)
            window.location.href = '/'
          }
      }
  } catch (err) {
      console.error("Fetch error:", err)
  }
  return res
}

const handleInputOnChange = (e, setState, setError, setNotPassValid) => {
  const { id, value } = e.target
  
  if(setError){
    const idInputError = id + '_0'
    let errorMessage = ""
  
    if (notPassValidFormMovie(idInputError, value)) 
      errorMessage = messageErrorFormMovie(idInputError)
  
    setError(preErrors => {
      const nextErrors = {
        ...preErrors,
        [idInputError]: errorMessage
      };
  
      // Kiểm tra toàn bộ form xem có lỗi nào không (bỏ qua khoảng trắng dư thừa nếu có)
      const isValid = Object.values(nextErrors).every(err => err.trim() === "");
      
      // Nếu VALID hoàn toàn (isValid = true) thì NOT_PASS = false (cho phép nhấn nút)
      setNotPassValid(!isValid)
  
      return nextErrors
    })
  }
  setState(pre => ({
    ...pre,
    [id]: value
  }))
}

const handleSilentRefresh = async () => {
  try {
    const response = await fetch(apiUserService.baseURL+'/auth/refreshToken', {
      method: 'POST',
      credentials: 'include', 
    })

    if (response.ok) {
      const data = await response.json()
      setAccessToken(data.token)
      return data.token
    }
  } catch (error) {
    console.error("Không thể tự động refresh token:", error)
  }
  return null
}

const useLogout = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await fetch(apiUserService.baseURL + '/auth/logout', {
                method: 'POST',
                credentials: 'include', // BẮT BUỘC: Để trình duyệt gửi cookie lên cho server xóa
            })

            if (response.ok) {
                console.log("Xóa session ở server thành công.")
            }
        } catch (error) {
            console.error("Lỗi khi gọi API logout:", error)
        } finally {
            setAccessToken(null);
            navigate('/', { replace: true })
        }
    }

    return handleLogout
}

// hàm dùng để add dữ liệu dùng định dạng vào để render
// setDatas: hàm setState của mảng ban đầu
// data: đối tượng mới để thêm vào mảng
const handleAddData = (setDatas, data) => {
  setDatas(pre => [data, ...pre])
}

// xử lý cho việc hoán đổi giá trị
// chỉ áp dụng cho đối tượng update cùng định dạng
const updateData = (itemUpdate, keyOfDataForUpdate, key, data) => {
  if(itemUpdate[keyOfDataForUpdate] == key){
    for(let i in data){
      itemUpdate[i] = data[i]
    }
  }
  return itemUpdate
}

// hàm dùng để update lại mảng trong phần quản lý của admin
// setDatas: hàm setState của mảng ban đầu
// key: khóa chính dùng để tìm đối tượng (yêu cầu: trùng với key của data)
// keyValue: giá trị khóa cần tìm
// data: chứa giá trị cần update 
const handleUpdateData = (setDatas, key, keyValue, data) => {
  setDatas(pre => pre.map( item => {
    return updateData(item, key, keyValue, data)
  }))
}

// setDatas: hàm setState của mảng ban đầu
// key: khóa chính dùng để tìm đối tượng (yêu cầu: trùng với key của data)
// keyValue: giá trị khóa cần tìm để xóa
const handleDeleteData = (setDatas, key, keyValue) => {
  console.log(key, keyValue)
  setDatas(pre => pre.filter( item => item[key] !== keyValue))
}

// file: là đối tượng chứa dữ liệu từ input type file: props files[0] - 1 ảnh
const uploadCloudinary = async (image) => {
    const formData = new FormData();
    let cloud_name = import.meta.env.VITE_CLOUD_NAME
    let preset =  import.meta.env.VITE_UPLOAD_PRESET
    formData.append('file', image)
    formData.append('upload_preset', preset)
    let response = {}

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await res.json()

      response = {
        url: data.secure_url, 
        publicId: data.public_id 
      }

    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error)
    } 
    return response
}

export {
    branch,
    apiUserService,
    pusher,
    customeFetch,
    handleInputOnChange,
    setAccessToken,
    getAccessToken,
    handleSilentRefresh,
    handleAddData,
    handleDeleteData,
    handleUpdateData,
    uploadCloudinary,
    useLogout
}
