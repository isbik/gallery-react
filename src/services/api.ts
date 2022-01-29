import { Photo } from "../types/shared";

const API_URL = "http://jsonplaceholder.typicode.com";

export const getPhotos = (): Promise<Photo[]> => {
  return fetch(API_URL + "/photos").then((res) => res.json());
};
