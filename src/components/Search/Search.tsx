import {
  type ChangeEventHandler,
  type FC,
  useRef,
  useState,
  useEffect,
  MouseEventHandler,
  useCallback,
} from "react";
import type { ISearchProps } from "./types";
import styles from "./Search.module.css";
import { ClearIcon, SearchIcon } from "../Icons";
import clsx from "clsx";

export const Search: FC<ISearchProps> = ({
  value,
  onChange,
  showIcon = true,
  clearable = true,
  className,
  onClear,
  ...props
}) => {
  const [placeholder, setPlaceholder] = useState(props.placeholder);

  const handleFocus = () => {
    setPlaceholder(undefined);
  };

  const handleBlur = useCallback(() => {
    setPlaceholder(props.placeholder);
  }, [props.placeholder]);

  useEffect(() => {
    handleBlur();
  }, [props.placeholder, handleBlur]);

  const ref = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const handleClick: MouseEventHandler<HTMLDivElement> = ({ target }) => {
    if (clearButtonRef.current?.contains(target as Node)) {
      ref.current?.blur();
    } else {
      ref.current?.focus();
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onChange(target.value);
  };

  const handleClear = () => {
    onChange("");
    handleBlur();

    if (onClear) {
      onClear();
    }
  };

  const isClearButtonExist = clearable || !!onClear;

  return (
    <div className={clsx(styles.container, className)} onClick={handleClick}>
      {showIcon && (
        <div className={styles.iconContainer}>
          <SearchIcon className={styles.icon} />
        </div>
      )}
      <input
        ref={ref}
        className={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {isClearButtonExist && (
        <button
          ref={clearButtonRef}
          className={styles.iconContainer}
          onClick={handleClear}
        >
          <ClearIcon className={styles.icon} />
        </button>
      )}
    </div>
  );
};
