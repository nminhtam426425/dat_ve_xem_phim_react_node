import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { toast } from 'sonner'

import {getAccessToken} from '../config.js'
import LoginAdmin from './LoginAdmin.jsx'
import MovieManager from './MovieManager'
import AccountManager from './AccountManager'
import ShowtimeManager from './ShowtimeManager'
import TicketManager from '../staff/TicketManager'
import QrCodeManager from '../staff/QrCodeManager'
import TheaterManager from './TheaterManager'
import Profile from './Profile.jsx'
import Home from './Home'
import VoucherManager from './VoucherManager'
import CategoryManager from './CategoryManager.jsx'
import TypeTheaterManager from './TypeTheaterManager.jsx'
import InfomationBranch from "./InfomationBranch.jsx"

const ProtectedRoute = ({ allowedRoles }) => {
    const token = getAccessToken()

    if(allowedRoles.includes('user') && !token)
        return <Navigate to="/login" replace />

    if (!token) {
        toast.error("Vui lòng đăng nhập")
        return <Navigate to="/login/internal" replace />
    }
        
    try {
        const decoded = jwtDecode(token)

        if (allowedRoles.includes(decoded.role)) 
            return <Outlet />
        else {
            toast.error("Vui lòng thử lại sau !")
            return <Navigate to="/login/internal" replace />
        }
    } catch (error) {
        console.error("Token không hợp lệ:", error)
        return <Navigate to="/login/internal" replace />
    }
}

export {
    ProtectedRoute,
    LoginAdmin,
    MovieManager,
    AccountManager,
    ShowtimeManager,
    TicketManager,
    QrCodeManager,
    Home,
    TheaterManager,
    Profile,
    VoucherManager,
    CategoryManager,
    TypeTheaterManager,
    InfomationBranch
}