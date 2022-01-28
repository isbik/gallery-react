import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { Photo } from "../types/shared";

type Props = {
  image: Photo | null;
  onClose: () => void;
};

const Image = styled("img")({
  width: "100%",
  height: "calc(100vh - 64px)",
  objectFit: "cover",
});

const ImageModal = ({ image, onClose }: Props) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog fullScreen open={!!image} onClose={handleClose}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <Image src={image?.url} alt={image?.title} loading="lazy" />
    </Dialog>
  );
};
export default ImageModal;
