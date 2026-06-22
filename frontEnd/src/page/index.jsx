import { createBrowserRouter, ScrollRestoration } from 'react-router-dom'
import {Home, Login, Register, ListShowtime, DetailMovie, ProfileUser, TicketChoice, Payment} from './user/index.jsx'
import {
  LoginAdmin, 
  MovieManager,
  AccountManager,
  ShowtimeManager,
  TheaterManager,
  TicketManager,
  QrCodeManager,
  Home as HomeAdmin,
  ProtectedRoute,
  Profile,
  VoucherManager
} 
from './admin/index.jsx'
import {Home as HomeStaff} from './staff/index.jsx'
import {branch, customeFetch, apiUserService} from './config.js'



const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login/> ,
    },
    {
      path: '/register',
      element: <Register/> ,
    },
    {
      path: '/login/internal',
      element: <LoginAdmin/> ,
    },
    {
      path: '/danh-sach',
      element: <>
        <ListShowtime/>
        <ScrollRestoration />
      </>
    },
    {
      path: '/chi-tiet',
      element: <>
        <DetailMovie/>
        <ScrollRestoration />
      </>
    },
    {
      path: '/user/profile/test',
      element: <>
        <ProfileUser/>
        <ScrollRestoration />
      </>
    },
    {
      path: '/chon-ghe',
      element: <>
        <TicketChoice/>
        <ScrollRestoration />
      </>
    },
    {
      path: '/thanh-toan',
      element: <>
        <Payment/>
        <ScrollRestoration />
      </>
    },
    // {
    //   element: <ProtectedRoute allowedRoles={['user']}/>,
    //   children: [
    //     {
    //       path: '/user/profile',
    //       element: <ProfileUser/> ,
    //     }
    //   ]
    // },
    {
      element: <ProtectedRoute allowedRoles={['staff']}/>,
      children: [
        {
          path: '/staff/ticket',
          element: <TicketManager/> ,
        }, 
        {
          path: '/staff/qr-code',
          element: <QrCodeManager/> ,
        },
        {
          path: '/staff',
          element: <HomeStaff/> ,
        }
      ]
    },
    {
      element: <ProtectedRoute allowedRoles={['admin']} />, 
      children: [
        {
          path: '/admin',
          element: <HomeAdmin/> ,
        },
        {
          path: '/admin/movie',
          element: <MovieManager/> ,
        },
        {
          path: '/admin/account',
          element: <AccountManager/> ,
        },
        {
          path: '/admin/showtime',
          element: <ShowtimeManager/> ,
        },
        {
          path: '/admin/theater',
          element: <TheaterManager/> ,
        },
        {
          path: '/admin/profile',
          element: <Profile/> ,
        },
        {
          path: '/admin/voucher',
          element: <VoucherManager/> ,
        },
      ],
    },
    {
      path: '*',
      element: <h1 className="text-center text-[30px] mt-[20%]">404 - Không tìm thấy trang</h1>
    }
]);

export {
    router,
    branch,
    apiUserService,
    customeFetch
} 