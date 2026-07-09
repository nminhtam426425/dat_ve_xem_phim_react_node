import React, { createContext, useContext, useState } from 'react'

const LoadingContext = createContext(null)
import {Loader2} from 'lucide-react'

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("Đang tải dữ liệu phiên làm việc...")
    const [userInfo, setUserInfo] = useState(null)

    const showLoading = (msg = "Đang xử lý...") => {
      setMessage(msg)
      setIsLoading(true)
    };
  
    const hideLoading = () => setIsLoading(false)
  
    return (
      <LoadingContext.Provider value={{ userInfo,showLoading,hideLoading,setUserInfo }}>
        {children}
        {isLoading && (
          <div style={{ 
            position: 'fixed', 
            top: 0, left: 0, 
            width: '100vw', height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 999
          }}>
             <div className='py-12 px-4 flex align-center justify-center rounded text-white' style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <Loader2 className="animate-spin"/><h3>{message}</h3>
            </div>
          </div>
        )}
  
      </LoadingContext.Provider>
    )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading phải được sử dụng bên trong LoadingProvider")
  }
  return context
}