import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { PhotoContext } from "../context/PhotoContext";
import { Photo } from "../types/shared";

type Props = {
  photo: Photo;
};

const PhotoCard = ({ photo }: Props) => {
  const { setSelectedPhoto, deletePhoto } = useContext(PhotoContext);
  
  return (
    <Grid key={photo.id} xs={12} sm={6} md={3} lg={2} item spacing={3}>
      <Card style={{ height: "100%" }}>
        <CardHeader
          action={
            <>
              <Button
                onClick={() => setSelectedPhoto(photo)}
                variant="contained"
              >
                View
              </Button>
              <Button onClick={() => deletePhoto(photo.id)}>Delete</Button>
            </>
          }
        />
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={photo.thumbnailUrl}
            alt="green iguana"
          />
          <CardContent>
            <Typography component="p">{photo.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
export default PhotoCard;
