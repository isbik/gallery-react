import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import AlbumSelect from "./components/AlbumSelect";
import ImageModal from "./components/ImageModal";
import { Photo } from "./types/shared";

const PER_PAGE = 12;

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [albumId, setAlbumId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
      });
  }, []);

  const filterByAlbum = useMemo(() => {
    return photos.filter(({ albumId: id }) =>
      albumId ? albumId === id : true
    );
  }, [albumId, photos]);

  const queriedPhotos = useMemo(() => {
    return photos
      .filter(({ albumId: id }) => (albumId ? albumId === id : true))
      .slice((page - 1) * PER_PAGE, PER_PAGE * page);
  }, [page, photos, albumId]);

  const allAlbumIds = useMemo(() => {
    let result = new Set();

    photos.forEach(({ id }) => result.add(id));

    return Array.from(result) as number[];
  }, [photos]);

  const pagesCount = useMemo(() => {
    return Math.ceil(filterByAlbum.length / PER_PAGE);
  }, [filterByAlbum.length]);

  const handleDelete = (photoId: number) => {
    if (queriedPhotos.length === 1) {
      setPage(Math.max(1, page - 1));
    }
    setPhotos((prev) => {
      return prev.filter(({ id }) => id !== photoId);
    });
  };

  const handleAlbumIdChange = (_: any, value: number | null) => {
    setAlbumId(value);
  };

  return (
    <Container>
      <ImageModal
        image={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      <AlbumSelect
        // @ts-ignore
        onChange={handleAlbumIdChange}
        options={allAlbumIds}
      />

      <Grid container spacing={2}>
        {queriedPhotos.map((photo) => (
          <Grid key={photo.id} xs={12} sm={6} md={3} lg={2} item spacing={3}>
            <Card>
              <CardHeader
                action={
                  <>
                    <Button
                      onClick={() => setSelectedPhoto(photo)}
                      variant="contained"
                    >
                      View
                    </Button>
                    <Button onClick={() => handleDelete(photo.id)}>
                      Delete
                    </Button>
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
        ))}
      </Grid>
      <Pagination
        page={page}
        onChange={(_, value) => setPage(value)}
        count={pagesCount}
        variant="outlined"
        shape="rounded"
      />
    </Container>
  );
}

export default App;
