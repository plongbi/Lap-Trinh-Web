import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
} from "@material-ui/core";
import { useParams, useNavigate, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos({ advancedFeatures }) {
  const { userId, photoId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`)
      .then((data) => setPhotos(data))
      .catch(() => setPhotos([]));
  }, [userId]);

  useEffect(() => {
    if (advancedFeatures && photos && photos.length > 0 && !photoId) {
      navigate(`/photos/${userId}/${photos[0]._id}`, { replace: true });
    }
  }, [advancedFeatures, photos, photoId, userId, navigate]);

  if (photos === null) return <Typography>Loading...</Typography>;
  if (photos.length === 0) return <Typography variant="h6">No photos.</Typography>;

  if (advancedFeatures) {
    let currentIndex = photos.findIndex(p => p._id === photoId);
    if (currentIndex === -1) currentIndex = 0;
    const currentPhoto = photos[currentIndex];

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
            style={{ maxHeight: 500, objectFit: 'contain' }}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Posted: {currentPhoto.date_time}
            </Typography>
            
            <Typography variant="subtitle1" style={{ marginTop: '10px' }}>Comments:</Typography>
            {currentPhoto.comments && currentPhoto.comments.length > 0 ? (
              currentPhoto.comments.map(c => (
                <Box key={c._id} marginY={1}>
                  <Typography variant="body2" color="primary" component={Link} to={`/users/${c.user._id}`} style={{ textDecoration: 'none', fontWeight: 'bold' }}>
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

        <Box display="flex" style={{ gap: '16px' }}>
          <Button variant="contained" color="primary" disabled={currentIndex === 0} onClick={handlePrev}>
            Previous
          </Button>
          <Button variant="contained" color="primary" disabled={currentIndex === photos.length - 1} onClick={handleNext}>
            Next
          </Button>
        </Box>
      </Box>
    );
  }

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
             {photo.comments && photo.comments.length > 0 ? (
               photo.comments.map(c => (
                 <Box key={c._id} marginY={1}>
                   <Typography variant="body2" color="primary" component={Link} to={`/users/${c.user._id}`} style={{ textDecoration: 'none', fontWeight: 'bold' }}>
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