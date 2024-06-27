import { FC, useEffect, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { Image as ImageComponent, ImageDimension } from "../Image";
import { LAYOUT_OFFSET } from "./constants";
import type { ImageModalPorps } from "./types";
import style from "./ImageModal.module.css";
import { calculateImageDimension } from "./helpers";
import { useMediaContext } from "../../contexts";

export const ImageModal: FC<ImageModalPorps> = ({
  src,
  alt,
  open,
  onClose,
  ...props
}) => {
  const [{ width, height }, setModalSize] = useState<Partial<ImageDimension>>({
    width: props.width,
    height: props.height,
  });

  const { mobile } = useMediaContext();

  useEffect(() => {
    const calculateDimensions = () => {
      if (open) {
        setModalSize(
          calculateImageDimension({
            src,
            offsetHeight: mobile ? window.innerHeight / 2 : LAYOUT_OFFSET,
            offsetWidth: mobile ? undefined : LAYOUT_OFFSET,
          })
        );
      }
    };

    calculateDimensions();

    window.addEventListener("resize", calculateDimensions);

    return () => {
      window.removeEventListener("resize", calculateDimensions);
    };
  }, [open, src, mobile]);

  const modalStyle = useMemo(
    () =>
      mobile
        ? undefined
        : {
            maxWidth: `calc(100% - ${LAYOUT_OFFSET}px)`,
            maxHeight: `calc(100% - ${LAYOUT_OFFSET}px)`,
          },
    [mobile]
  );

  if (!width || !height) return null;

  return (
    <Modal open={open} onClose={onClose} style={modalStyle}>
      <ImageComponent
        scaleOnClick={false}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={style.modalImage}
        style={{
          width,
          height,
        }}
        cover={false}
      />
    </Modal>
  );
};
