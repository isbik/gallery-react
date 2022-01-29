import { createContext, useEffect, useMemo, useState } from "react";
import { getPhotos } from "../services/api";
import { Photo } from "../types/shared";

const PER_PAGE = 12;

type PhotoContextType = {
  photos: Photo[];
  albumIds: number[];
  pagesCount: number;
  deletePhoto: (id: number) => void;
  selectAlbumId: (id: number) => void;
  selectedPhoto: Photo | null;
  setSelectedPhoto: (photo: Photo | null) => void;
  page: number;
  setPage: (page: number) => void;
};

const PhotoContext = createContext<Required<PhotoContextType>>(
  {} as PhotoContextType
);

const PhotoProvider = (props) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [albumId, setAlbumId] = useState<number | null>(null);

  useEffect(() => {
    getPhotos().then((data) => {
      setPhotos(data);
    });
  }, []);

  const filterByAlbum = useMemo(() => {
    return photos.filter(({ albumId: id }) =>
      albumId ? albumId === id : true
    );
  }, [albumId, photos]);

  const queriedPhotos = useMemo(() => {
    return filterByAlbum.slice((page - 1) * PER_PAGE, PER_PAGE * page);
  }, [filterByAlbum, page]);

  const albumIds = useMemo(() => {
    let result = new Set();

    photos.forEach(({ id }) => result.add(id));

    return Array.from(result) as number[];
  }, [photos]);

  const pagesCount = useMemo(() => {
    return Math.ceil(filterByAlbum.length / PER_PAGE);
  }, [filterByAlbum.length]);

  const deletePhoto = (photoId: number) => {
    if (queriedPhotos.length === 1) {
      setPage(Math.max(1, page - 1));
    }
    
    setPhotos((prev) => {
      return prev.filter(({ id }) => id !== photoId);
    });
  };

  return (
    <PhotoContext.Provider
      value={{
        photos: queriedPhotos,
        albumIds,
        pagesCount,
        deletePhoto,
        selectAlbumId: setAlbumId,
        selectedPhoto,
        setSelectedPhoto,
        page,
        setPage,
      }}
    >
      {props.children}
    </PhotoContext.Provider>
  );
};

export { PhotoContext, PhotoProvider };
