import { forwardRef, useEffect, useState } from "react";
import { useMediaContext } from "../../contexts";
import type { ImageProps } from "./types";
import styles from "./Image.module.css";
import clsx from "clsx";
import { ImageModal } from "../ImageModal";
import { IMAGE_DIMENSIONS } from "./constants";

const ImageComponent = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src = "",
      fullImageSrc = "",
      alt,
      className,
      scaleOnClick = true,
      width,
      height,
      style,
      cover = true,
      ...props
    },
    ref
  ) => {
    const { mobile } = useMediaContext();

    const [loading, setLoading] = useState(props.loading);

    const handleLoad = () => {
      if (props.loading === undefined) setLoading(false);
    };

    useEffect(() => {
      setLoading(props.loading);
    }, [props.loading]);

    const [open, setOpen] = useState(false);
    const toggleModal = () => setOpen((prev) => !prev);

    const dimensions = IMAGE_DIMENSIONS[mobile ? "mobile" : "desktop"];

    return (
      <>
        <img
          ref={ref}
          className={clsx(
            styles.image,
            mobile && styles.mobileImage,
            open && styles.interactedImage,
            cover && styles.coveredImage,
            className
          )}
          style={style}
          onLoad={handleLoad}
          onClick={scaleOnClick ? toggleModal : undefined}
          src={loading ? undefined : src}
          alt={loading ? "" : alt}
          width={width ?? dimensions.width}
          height={height ?? dimensions.height}
        />
        {scaleOnClick && (
          <ImageModal open={open} onClose={toggleModal} src={fullImageSrc} alt={alt} />
        )}
      </>
    );
  }
);

export { ImageComponent as Image };
