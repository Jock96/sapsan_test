export interface IFetcher {
  onFetchMore: () => Promise<void>;
}

export interface FetchMoreObserverProps extends IFetcher {
  intersectionObserverInit?: IntersectionObserverInit;
}
