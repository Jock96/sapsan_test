export interface IGetPhotos {
  query: string;
  page?: number;
}

export interface IPhotosEndpointGenerator extends Required<IGetPhotos> {
  clientId: string;
}

interface IPhotoUrl {
  full: string;
  thumb: string;
}

interface IPhotoData {
  id: string;
  urls: IPhotoUrl;
}

export interface IGetPhotosResponseResult {
  results: IPhotoData[];
  total: number;
  total_pages: number;
}

export interface IError {
  message: string;
}

export interface IPhoto {
  id: IPhotoData["id"];
  urlThumb: IPhotoUrl["thumb"];
  urlFull: IPhotoUrl["full"];
}

export interface IPhotosInfo {
  list: IPhoto[];
  total: number;
  totalPages: number;
}
