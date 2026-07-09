import { createBrowserRouter, ScrollRestoration } from 'react-router-dom'
import {Home, Login, Register, ListShowtime, DetailMovie, ProfileUser, TicketChoice, HistoryUser, VoucherUser, ListVoucherExchange,AboutUs} from './user/index.jsx'
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
  VoucherManager,
  CategoryManager,
  TypeTheaterManager,
  InfomationBranch
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
      path: '/thong-tin-rap',
      element: <AboutUs />,
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
      path: '/chon-ghe',
      element: <>
        <TicketChoice/>
        <ScrollRestoration />
      </>
    },
    {
      path: '/doi-thuong',
      element: <>
        <ListVoucherExchange/>
        <ScrollRestoration />
      </>
    },
    {
      element: <ProtectedRoute allowedRoles={['user']}/>,
      children: [
        {
          path: '/user/profile',
          element: <ProfileUser/> ,
        },
        {
          path: '/user/history',
          element: <HistoryUser/> ,
        },
        {
          path: '/user/my-voucher',
          element: <VoucherUser/> ,
        }
      ]
    },
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
          path: '/staff/profile',
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
        {
          path: '/admin/categories',
          element: <CategoryManager/> ,
        },
        {
          path: '/admin/type-theater',
          element: <TypeTheaterManager/> ,
        },
        {
          path: '/admin/about-us',
          element: <InfomationBranch/> ,
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