import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData'; // Import hàm fetch vừa viết

function UserList() {
  // Khởi tạo state để lưu danh sách người dùng
  const [users, setUsers] = useState(null);

  // Dùng useEffect để gọi API 1 lần duy nhất khi component mount
  useEffect(() => {
    fetchModel('/user/list')
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.log("Lỗi khi tải danh sách người dùng:", err));
  }, []);

  // Hiển thị trạng thái loading nếu dữ liệu chưa về
  if (!users) return <Typography>Loading users...</Typography>;

  return (
    <div>
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem button component={Link} to={`/users/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;