import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function App() {
  // Thay thế chuỗi này bằng Client ID thực tế từ Google Console của bạn
  const clientId = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

  const handleSuccess = (credentialResponse) => {
    console.log("Đăng nhập thành công từ Google:", credentialResponse);
    
    // credentialResponse.credential chính là chuỗi JWT (ID Token)
    const token = credentialResponse.credential;
    
    // Giải mã JWT để lấy thông tin user
    const userDetails = jwtDecode(token);
    console.log("Thông tin người dùng:", userDetails);
    
    // Bạn có thể lấy các trường cụ thể như:
    // userDetails.name (Tên), userDetails.email (Email), userDetails.picture (Avatar)
    alert(`Chào mừng ${userDetails.name}!`);
  };

  const handleError = () => {
    console.log('Đăng nhập thất bại');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h2>Đăng nhập với Google</h2>
        
        {/* Nút đăng nhập chuẩn của Google */}
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap // Bật tính năng "One Tap" gợi ý đăng nhập nhanh góc màn hình nếu muốn
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;