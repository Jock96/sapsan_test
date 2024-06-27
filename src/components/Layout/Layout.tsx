import type { FC, PropsWithChildren } from "react";
import styles from "./Layout.module.css";

export const Layout: FC<PropsWithChildren> = ({ children }) => <div className={styles.layout}>{children}</div>
