import type { FC } from "react";
import type { IModalProps } from "./types";
import styles from "./Modal.module.css";
import { CloseIcon } from "../Icons";
import { createPortal } from "react-dom";
import { ROOT_ID } from "../../app";
import { useMediaContext } from "../../contexts";
import clsx from "clsx";

export const Modal: FC<IModalProps> = ({ open, onClose, style, children }) => {
  const { mobile } = useMediaContext();

  if (!open) return null;

  return createPortal(
    <div className={clsx(styles.subtrate, mobile && styles.mobileSubtrate)}>
      <div className={styles.closeButton} onClick={onClose}>
        <CloseIcon />
      </div>
      <div className={styles.modal} style={style}>
        {children}
      </div>
    </div>,
    document?.getElementById(ROOT_ID) ?? document.body
  );
};
