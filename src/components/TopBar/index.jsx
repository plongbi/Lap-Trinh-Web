import React from 'react';
// Import thêm Checkbox và FormControlLabel
import { AppBar, Toolbar, Typography, Checkbox, FormControlLabel } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import models from '../../modelData/models';

// Nhận 2 props từ App.jsx
function TopBar({ advancedFeatures, setAdvancedFeatures }) {
  const location = useLocation();
  const path = location.pathname;
  let contextText = "Welcome to Photo App";

  // Kiểm tra đường dẫn URL hiện tại để hiển thị context tương ứng
  if (path.startsWith('/users/')) {
    // Cắt chuỗi URL để lấy userId (ví dụ: /users/12345 -> ['','users','12345'])
    const userId = path.split('/')[2];
    const user = models.userModel(userId);
    if (user) {
      // Nếu đang xem chi tiết, hiển thị tên người dùng
      contextText = `${user.first_name} ${user.last_name}`; 
    }
  } else if (path.startsWith('/photos/')) {
    const userId = path.split('/')[2];
    const user = models.userModel(userId);
    if (user) {
      // Nếu đang xem ảnh, thêm tiền tố "Photos of "
      contextText = `Photos of ${user.first_name} ${user.last_name}`;
    }
  }

  return (
    <AppBar position="static" className="topbar-appBar">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* Góc trái: Tên sinh viên */}
        <Typography variant="h6">
          Phạm Hải Long - B23DCVT258
        </Typography>

        {/* Ở GIỮA: NÚT CHECKBOX CHO ADVANCED FEATURES (EXTRA CREDIT) */}
        <FormControlLabel
          control={
            <Checkbox
              checked={advancedFeatures}
              onChange={(e) => setAdvancedFeatures(e.target.checked)}
              style={{ color: 'white' }} 
            />
          }
          label="Enable Advanced Features"
        />
        
        {/* Góc phải: Ngữ cảnh */}
        <Typography variant="h6">
          {contextText} 
        </Typography>

      </Toolbar>
    </AppBar>
  );
}

export default TopBar;