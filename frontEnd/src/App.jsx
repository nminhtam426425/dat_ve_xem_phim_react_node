import { RouterProvider } from 'react-router-dom'
import {router} from './page/index'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import {handleSilentRefresh, customeFetch, apiUserService} from './page/config.js'
import { useLoading } from './LoadingContext.jsx'

function App() {
 
  const [isLoading, setIsLoading] = useState(true)
  const {setUserInfo} = useLoading()
  useEffect(() => {
    const checkAuth = async () => {
      await handleSilentRefresh()
      const res = await customeFetch(apiUserService.baseURL+'/users','authen','GET')
      if(res.ok){
        const data = await res.json()
        setUserInfo(data)
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, left: 0, 
        width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)', 
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        animation: 'fadeIn .3s ease',
        zIndex: 99
      }}>
          <h3>Đang tải dữ liệu phiên làm việc...</h3>
      </div>
    )
  }

  return (
    <>
      <Toaster richColors position="top-right"/>
      <RouterProvider router={router} />
    </>
  );
}

export default App
