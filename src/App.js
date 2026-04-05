import './App.css';

import React, { useState } from "react";
// Đổi từ @mui/material sang @material-ui/core cho đồng bộ với dự án
import { Grid, Typography, Paper } from "@material-ui/core"; 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = (props) => {
  const [advancedFeatures, setAdvancedFeatures] = useState(false);
  
  return (
      <Router>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Truyền state và hàm setState xuống TopBar */}
              <TopBar 
                 advancedFeatures={advancedFeatures} 
                 setAdvancedFeatures={setAdvancedFeatures} 
              />
            </Grid>
            <div className="main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="main-grid-item">
                <Routes>
                  {/* THÊM ROUTE NÀY: Tự động chuyển hướng từ "/" sang "/users" */}
                  <Route path="/" element={<Navigate to="/users" replace />} />

                  <Route path="/users/:userId" element={<UserDetail />} />
                  
                  {/* Route hiển thị ảnh (cũ) */}
                  <Route 
                      path="/photos/:userId" 
                      element={<UserPhotos advancedFeatures={advancedFeatures} />} 
                  />
                  
                  {/* THÊM ROUTE NÀY CHO DEEP LINK (Ví dụ: /photos/user123/photo456) */}
                  <Route 
                      path="/photos/:userId/:photoId" 
                      element={<UserPhotos advancedFeatures={advancedFeatures} />} 
                  />
                  
                  <Route path="/users" element={<UserList />} />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
  );
}

export default App;