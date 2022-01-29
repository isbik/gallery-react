import { Container, Pagination } from "@mui/material";
import { useContext } from "react";
import AlbumSelect from "./components/AlbumSelect";
import PhotoList from "./components/PhotoList";
import PhotoModal from "./components/PhotoModal";
import { PhotoContext } from "./context/PhotoContext";

const App = () => {
  const {
    photos,
    selectedPhoto,
    albumIds,
    setSelectedPhoto,
    selectAlbumId,
    page,
    pagesCount,
    setPage,
  } = useContext(PhotoContext);

  return (
    <Container>
      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      <AlbumSelect
        onChange={(_, value) => selectAlbumId(value)}
        options={albumIds}
        getOptionLabel={(option) => option.toString()}
        style={{
          marginBottom: 20,
        }}
      />

      <PhotoList photos={photos} />

      <Pagination
        page={page}
        onChange={(_, value) => setPage(value)}
        count={pagesCount}
        variant="outlined"
        shape="rounded"
      />
    </Container>
  );
};

export default App;
