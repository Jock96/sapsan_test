import type { FC } from "react";
import type { IButtonProps } from "./types";
import clsx from "clsx";
import styles from "./Button.module.css";
import { useMediaContext } from "../../contexts";

export const Button: FC<IButtonProps> = ({ children, onClick }) => {
  const { mobile } = useMediaContext();
  return (
    <button
      className={clsx(styles.button, !mobile && styles.hoveredButton)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
