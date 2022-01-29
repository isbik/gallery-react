import { Grid } from "@mui/material";
import React from "react";
import { Photo } from "../types/shared";
import PhotoCard from "./PhotoCard";

type Props = {
  photos: Photo[];
};

const PhotoList = ({ photos }: Props) => {
  return (
    <Grid container spacing={2} style={{ marginBottom: 20 }}>
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </Grid>
  );
};

export default PhotoList;
