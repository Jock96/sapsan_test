import type { FC, PropsWithChildren } from "react";
import styles from "./Page.module.css";
import clsx from "clsx";
import { useMediaContext } from "../../contexts";

export const Page: FC<PropsWithChildren> = ({ children }) => {
  const { mobile } = useMediaContext();

  return (
    <div
      className={clsx(
        styles.page,
        mobile ? styles.mobilePage : styles.desktopPage
      )}
    >
      {children}
    </div>
  );
};
