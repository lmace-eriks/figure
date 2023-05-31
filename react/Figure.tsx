import React, { useEffect, useRef, useState } from 'react';

// Styles V1
import styles from "./styles.css";

interface FigureProps {
  imgSrc: string
  mobileImgSrc: string
  caption: string
  alt: string
  loadingPriority: boolean
  blockClass: string
  desktopWidth: number
  desktopHeight: number
  mobileWidth: number
  mobileHeight: number
}

interface linkObject {
  url: string
  newTab: Boolean
}

const Figure: StorefrontFunctionComponent<FigureProps> = ({ imgSrc, mobileImgSrc, caption, alt, loadingPriority, blockClass, desktopWidth, desktopHeight, mobileWidth, mobileHeight }) => {

  const blockClassFormat = blockClass ? `--${blockClass}` : "";

  const ImageTag = () => (
    // @ts-expect-error
    <img src={imgSrc} alt={alt ? alt : ""} loading={loadingPriority ? "eager" : "lazy"} fetchPriority={loadingPriority ? "high" : "low"} className={blockClass ? `${styles.figureImage} ${styles.figureImage}${blockClassFormat}` : `${styles.figureImage}`} width={desktopWidth} height={desktopHeight} />
  );

  const PictureTag = () => (
    <picture>
      {/* @ts-expect-error */}
      <source media="(min-width:1026px)" srcSet={imgSrc} width={desktopWidth} height={desktopHeight} />
      {/* @ts-expect-error */}
      <source media="(max-width:1025px)" srcSet={mobileImgSrc} width={mobileWidth} height={mobileHeight} />
      <ImageTag />
    </picture>
  );

  const Caption = () => (
    <figcaption className={blockClass ? `${styles.figureCaption} ${styles.figureCaption}${blockClassFormat}` : `${styles.figureCaption}`}>
      <span className={blockClass ? `${styles.figureCaptionText} ${styles.figureCaptionText}${blockClassFormat}` : `${styles.figureCaptionText}`}>{caption}</span>
    </figcaption>
  );

  const FigureImage = () => (
    <figure className={blockClass ? `${styles.figureTag} ${styles.figureTag}${blockClassFormat}` : `${styles.figureTag}`}>
      {mobileImgSrc ? <PictureTag /> : <ImageTag />}
      {caption && <Caption />}
    </figure>
  );

  return <FigureImage />;

}

Figure.schema = {
  title: "Image Figure",
  type: "object",
  properties: {
    imgSrc: {
      title: "Desktop Image",
      type: "string",
      widget: { "ui:widget": "image-uploader" }
    },
    desktopWidth: {
      title: "Desktop Image Width",
      type: "number",
    },
    desktopHeight: {
      title: "Desktop Image Height",
      type: "number"
    },
    mobileImgSrc: {
      title: "Mobile Image",
      type: "string",
      widget: { "ui:widget": "image-uploader" }
    },
    mobileWidth: {
      title: "Mobile Image Width",
      type: "number"
    },
    mobileHeight: {
      title: "Mobile Image Height",
      type: "number"
    },
    caption: {
      title: "Image Caption",
      description: "Optional - Text rendered below the image. No Markdown accepted.",
      type: "string",
      widget: { "ui:widget": "textarea" }
    },
    alt: {
      title: "Alt Text",
      description: "Optional - Used for the Alt Text attribute.",
      type: "string",
      widget: { "ui:widget": "textarea" }
    },
    loadingPriority: {
      title: "Loading Priority",
      type: "boolean"
    }
  }
}

export default Figure;