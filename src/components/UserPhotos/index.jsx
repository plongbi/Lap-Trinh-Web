import React, { useEffect } from 'react';
import { Typography, Card, CardMedia, CardContent, Button, Box } from '@material-ui/core';
import { useParams, useNavigate } from 'react-router-dom';
import models from '../../modelData/models';

function UserPhotos({ advancedFeatures }) {
  const { userId, photoId } = useParams();
  const navigate = useNavigate();
  
  // Lấy dữ liệu ảnh của user từ file models
  const photos = models.photoOfUserModel(userId);

  // Xử lý Deep Link: Nếu bật chế độ Advanced mà trên URL chưa có ID ảnh,
  // tự động chuyển hướng (redirect) về bức ảnh đầu tiên của user đó.
  useEffect(() => {
    if (advancedFeatures && photos && photos.length > 0 && !photoId) {
      navigate(`/photos/${userId}/${photos[0]._id}`, { replace: true });
    }
  }, [advancedFeatures, photos, photoId, userId, navigate]);

  // Nếu không tìm thấy ảnh nào
  if (!photos || photos.length === 0) {
    return <Typography variant="h6">This user has no photos.</Typography>;
  }

  // ==========================================
  // GIAO DIỆN NÂNG CAO (1 ẢNH + NÚT NEXT/PREV)
  // ==========================================
  if (advancedFeatures) {
    // Tìm vị trí của ảnh hiện tại trong mảng
    let currentIndex = photos.findIndex(p => p._id === photoId);
    if (currentIndex === -1) currentIndex = 0; // Mặc định là ảnh đầu tiên nếu lỗi

    const currentPhoto = photos[currentIndex];

    // Hàm chuyển ảnh
    const handleNext = () => {
      if (currentIndex < photos.length - 1) {
        navigate(`/photos/${userId}/${photos[currentIndex + 1]._id}`);
      }
    };

    const handlePrev = () => {
      if (currentIndex > 0) {
        navigate(`/photos/${userId}/${photos[currentIndex - 1]._id}`);
      }
    };

    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Photo {currentIndex + 1} of {photos.length}
        </Typography>

        <Card style={{ maxWidth: 600, marginBottom: 20, width: '100%' }}>
          <CardMedia
            component="img"
            image={`/images/${currentPhoto.file_name}`}
            alt="User photo"
            style={{ maxHeight: 500, objectFit: 'contain' }} // Giữ tỷ lệ ảnh đẹp
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Posted: {currentPhoto.date_time}
            </Typography>
            
            <Typography variant="subtitle1" style={{ marginTop: '10px' }}>Comments:</Typography>
            {currentPhoto.comments ? (
              currentPhoto.comments.map(c => (
                <Box key={c._id} marginY={1}>
                  <Typography variant="body2" color="primary" component="span">
                    {c.user.first_name} {c.user.last_name}: 
                  </Typography>
                  <Typography variant="body2" component="span"> {c.comment}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2">No comments.</Typography>
            )}
          </CardContent>
        </Card>

        {/* Hai nút điều hướng (Stepper) */}
        <Box display="flex" style={{ gap: '16px' }}>
          <Button 
             variant="contained" 
             color="primary"
             disabled={currentIndex === 0} // Vô hiệu hóa nút Prev nếu là ảnh đầu tiên
             onClick={handlePrev}
          >
            Previous
          </Button>
          <Button 
             variant="contained" 
             color="primary"
             disabled={currentIndex === photos.length - 1} // Vô hiệu hóa nút Next nếu là ảnh cuối
             onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Box>
    );
  }

  // ==========================================
  // GIAO DIỆN BÌNH THƯỜNG (HIỂN THỊ TẤT CẢ ẢNH)
  // ==========================================
  return (
    <div>
      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: 30 }}>
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt="User photo"
            style={{ maxHeight: 500, objectFit: 'contain' }}
          />
          <CardContent>
             <Typography variant="body2" color="textSecondary">
                Posted: {photo.date_time}
             </Typography>

             <Typography variant="subtitle1" style={{ marginTop: '10px' }}>Comments:</Typography>
             {photo.comments ? (
               photo.comments.map(c => (
                 <Box key={c._id} marginY={1}>
                   <Typography variant="body2" color="primary" component="span">
                     {c.user.first_name} {c.user.last_name}: 
                   </Typography>
                   <Typography variant="body2" component="span"> {c.comment}</Typography>
                 </Box>
               ))
             ) : (
               <Typography variant="body2">No comments.</Typography>
             )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;