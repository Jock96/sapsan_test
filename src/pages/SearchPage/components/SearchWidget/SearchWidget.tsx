import { forwardRef } from "react";
import { Button, Search } from "../../../../components";
import { useMediaContext } from "../../../../contexts";
import { useKeyDown, useUrlStatePrams } from "../../../../hooks";
import { SEARCH_LABEL, SEARCH_PLACEHOLDER } from "./constants";
import styles from "./SearchWidget.module.css";
import clsx from "clsx";
import { ISearchWidgetProps } from "./types";
import { SEARCH_STATE_KEY } from "../../constants";

export const SearchWidget = forwardRef<HTMLDivElement, ISearchWidgetProps>(
  ({ activeSearch, onClear, onApply }, ref) => {
    const [search, setSearch] = useUrlStatePrams<string>({
      paramsName: SEARCH_STATE_KEY,
      initialState: "",
    });

    const { mobile } = useMediaContext();

    const handleClearOnKeyDown = () => {
      setSearch("");
      onClear();
    };

    const handleChange = (value: string) => {
      setSearch(value);
    };

    const handleApply = () => {
      onApply(search ?? "");
    };

    useKeyDown(handleApply, ["Enter"]);
    useKeyDown(handleClearOnKeyDown, ["Escape"]);

    return (
      <div
        ref={ref}
        className={clsx(
          styles.searchWidget,
          activeSearch && styles.activeSearchWidget,
          activeSearch && mobile && styles.mobileActiveSearchWidget
        )}
      >
        <Search
          className={clsx(
            styles.searchInput,
            mobile && styles.mobileSearchInput
          )}
          value={search}
          onChange={handleChange}
          placeholder={SEARCH_PLACEHOLDER}
          onClear={onClear}
        />
        <Button onClick={handleApply}>{SEARCH_LABEL}</Button>
      </div>
    );
  }
);
