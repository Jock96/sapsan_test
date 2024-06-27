import { type FC, useState, useRef } from "react";
import api, {
  type IPhotosInfo,
  type IError,
  DEFAULT_PAGE,
  DEFAULT_PAGES,
} from "../../api";
import { Page } from "../../components";
import { isOfType } from "../../guards";
import { useUrlStatePrams } from "../../hooks";
import { List, SearchWidget } from "./components";
import { SEARCH_STATE_KEY } from "./constants";

export const SearchPage: FC = () => {
  const [search] = useUrlStatePrams<string>({
    paramsName: SEARCH_STATE_KEY,
    initialState: "",
  });

  const [pages, setPages] = useState(DEFAULT_PAGES);
  const [nextPage, setNextPage] = useState(DEFAULT_PAGE);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [activeSearch, setActiveSearch] = useState(false);
  const [photos, setPhotos] = useState<IPhotosInfo["list"]>([]);

  const toggleLoading = () => setLoading((prev) => !prev);

  const dropAll = () => {
    setPhotos([]);
    setPages(DEFAULT_PAGES);
    setNextPage(DEFAULT_PAGE);
  };

  const handleClear = () => {
    setActiveSearch(false);
    dropAll();
  };

  const handleError = (error: IError) => {
    setError(true);
    dropAll();

    if (error) {
      console.error(error);
    }
  };

  const handleApply = (query: string, joinResult = false, resetPage = true) => {
    if (query) {
      toggleLoading();
      setActiveSearch(true);

      const page = resetPage ? DEFAULT_PAGE : nextPage;

      return api
        .getPhotos({ query, page })
        .then((result) => {
          if (isOfType<IError>(result, ["message"])) {
            handleError(result);
          } else {
            const { list, totalPages } = result;

            setPhotos((prev) => (joinResult ? [...prev, ...list] : list));
            setPages(totalPages);

            if (page <= totalPages) {
              setNextPage(page + 1);
            }

            setError(false);
          }
        })
        .catch(handleError)
        .finally(() => {
          toggleLoading();
        });
    }

    dropAll();

    return Promise.resolve();
  };

  const canFetchMore =
    !loading && !!photos.length && nextPage <= pages && !!search;

  const handleFetchMore = () => {
    if (!canFetchMore) return Promise.resolve();

    return handleApply(search, true, false);
  };

  const searchWidgetRef = useRef<HTMLDivElement>(null);

  return (
    <Page>
      <SearchWidget
        onClear={handleClear}
        onApply={handleApply}
        activeSearch={activeSearch}
        ref={searchWidgetRef}
      />
      {activeSearch && (
        <List
          loading={loading}
          error={error}
          photos={photos}
          onFetchMore={handleFetchMore}
          canFetchMore={canFetchMore}
          offset={searchWidgetRef?.current?.clientHeight}
        />
      )}
    </Page>
  );
};
