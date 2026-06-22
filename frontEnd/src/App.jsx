import { RouterProvider } from 'react-router-dom'
import {router} from './page/index'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import {handleSilentRefresh} from './page/config.js'
import { LoadingProvider } from './LoadingContext.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      await handleSilentRefresh()
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
    <LoadingProvider>
      <Toaster richColors position="top-right"/>
      <RouterProvider router={router} />
    </LoadingProvider>
    </>
  );
}

export default App
