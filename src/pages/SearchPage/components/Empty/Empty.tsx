import type { FC } from "react";
import { ERROR_RESULT, EMPTY_RESULT } from "./constants";
import styles from "./Empty.module.css";
import type { EmptyProps } from "./types";

export const Empty: FC<EmptyProps> = ({ error }) => (
  <span className={error ? styles.error : styles.empty}>
    {error ? ERROR_RESULT : EMPTY_RESULT}
  </span>
);
