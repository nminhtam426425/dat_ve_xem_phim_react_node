import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiUserService, customeFetch } from '../config'
import { toast } from 'sonner'

export default function VNPayReturn() {
    const location = useLocation()
    const navigate = useNavigate()
    const isCalled = useRef(false)
    const [status, setStatus] = useState(' đang xử lý kết quả giao dịch...')

    useEffect(() => {
        if(isCalled.current) return
        const queryParams = location.search

        const verify = async () => {
            try{
                setStatus('Thanh toán thành công! Hệ thống đang chuyển hướng...')
                const res = await customeFetch(apiUserService.baseURL+`/payments/vnpay/verify-payment${queryParams}`,'non-authen','GET')
                isCalled.current = true
                if(res.ok){
                    const data = await res.json()
                    if(data.success){
                        toast.success("Đặt vé thành công !")
                        navigate('/user/history')
                    }
                    else{
                        console.log("heeh")
                        toast.error("Bạn đã hủy giao dịch !")
                        navigate('/')
                    }
                }
                else{
                    const data = await res.json()
                    console.log(data)
                    toast.error("Đặt vé thất bại !")
                    navigate('/')
                }
            }
            catch(err){
                console.log(err)
            }
        } 
        
        verify()
        
    }, [location.pathname, location.search, navigate])

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Kết quả thanh toán</h2>
            <p>{status}</p>
        </div>
    );
}