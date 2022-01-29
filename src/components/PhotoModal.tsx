import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { Photo } from "../types/shared";

type Props = {
  photo: Photo | null;
  onClose: () => void;
};

const Image = styled("img")({
  width: "100%",
  height: "calc(100vh - 64px)",
  objectFit: "cover",
});

const PhotoModal = ({ photo, onClose }: Props) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog fullScreen open={!!photo} onClose={handleClose}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <Image src={photo?.url} alt={photo?.title} loading="lazy" />
    </Dialog>
  );
};
export default PhotoModal;
