import { BASER_URL } from "./constants";
import type { IPhotosEndpointGenerator } from "./types";

class EndpointsInstance {
  private _baserUrl = BASER_URL;

  constructor(baseUrl?: string) {
    if (baseUrl) {
        this._baserUrl = baseUrl;
    }
  }

  searchPhotos({ query, page = 1, clientId }: IPhotosEndpointGenerator) {
    const url = new URL(this._baserUrl);

    url.searchParams.append("client_id", clientId);
    url.searchParams.append("query", query);
    url.searchParams.append("page", page.toString());

    return decodeURI(url.toString());
  }
}

export const Endpoints = new EndpointsInstance();
