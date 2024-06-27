import { DEFAULT_ERROR, BASE_CLIENT_ID, DEFAULT_PAGE } from "./constants";
import { Endpoints } from "./endpoints";
import type {
  IGetPhotos,
  IGetPhotosResponseResult,
  IPhotosInfo,
} from "./types";

export class ApiInstance {
  private _clientId = BASE_CLIENT_ID;

  constructor(baseClientId?: string) {
    if (baseClientId) {
      this._clientId = baseClientId;
    }
  }

  async getPhotos({ query, page = DEFAULT_PAGE }: IGetPhotos) {
    const url = Endpoints.searchPhotos({
      query,
      page,
      clientId: this._clientId,
    });

    return fetch(url)
      .then((response) => {
        return response
          .json()
          .then<IPhotosInfo>((result) => {
            const { results, total, total_pages } =
              result as IGetPhotosResponseResult;

            return {
              list: results
                .filter(({ urls }) => !!urls.full || !!urls.thumb)
                .map((result) => ({
                  ...result,
                  urlFull: result.urls.full,
                  urlThumb: result.urls.thumb,
                })),
              total,
              totalPages: total_pages,
            };
          })
          .catch((error) => {
            console.error("Response to JSON parse error: ", error);
            return DEFAULT_ERROR;
          });
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
        return DEFAULT_ERROR;
      });
  }
}

const api = new ApiInstance();

export default api;
