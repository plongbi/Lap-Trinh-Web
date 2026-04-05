import React, { useState, useEffect } from 'react';
import { Typography, Button, Paper } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

function UserDetail(props) {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  // Khi userId trên URL thay đổi, useEffect sẽ chạy lại để fetch dữ liệu người mới
  useEffect(() => {
    fetchModel(`/user/${userId}`)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log("Lỗi khi tải chi tiết người dùng:", err));
  }, [userId]); // Dependency array chứa userId

  if (!user) return <Typography>Loading user details...</Typography>;

  return (
    <Paper style={{ padding: '20px', margin: '10px' }}>
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      
      <Typography variant="body1"><strong>Location:</strong> {user.location}</Typography>
      <Typography variant="body1"><strong>Occupation:</strong> {user.occupation}</Typography>
      <Typography variant="body1"><strong>Description:</strong> {user.description}</Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/photos/${user._id}`}
        style={{ marginTop: '20px' }}
      >
        View Photos
      </Button>
    </Paper>
  );
}

export default UserDetail;