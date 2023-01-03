import React, { useEffect, useRef, useState } from 'react';
import { canUseDOM } from 'vtex.render-runtime';

// Styles V1
import styles from "./styles.css";

interface FigureProps {
  imgSrc: string
  mobileImgSrc: string
  link?: linkObject
  caption: string
  alt: string
  imageLoading: "lazy" | "eager" | undefined
  blockClass: string
  hero: Boolean
  desktopWidth: number
  desktopHeight: number
  mobileWidth: number
  mobileHeight: number
  parents: parentObject
}

interface parentObject {
  container: Boolean
  wrapper: Boolean
}


interface linkObject {
  url: string
  newTab: Boolean
}

const Figure: StorefrontFunctionComponent<FigureProps> = ({ parents, imgSrc, mobileImgSrc, caption, alt, link, hero, imageLoading, blockClass, desktopWidth, desktopHeight, mobileWidth, mobileHeight }) => {
  const openGate = useRef(true);
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    if (!openGate.current || !canUseDOM) return;
    openGate.current = false;

    setIsMobile(window.innerWidth <= 1025);
  })

  const blockClassFormat = blockClass ? `--${blockClass}` : "";

  const FigureImage = () => (
    mobileImgSrc ?
      <picture>
        {/* @ts-expect-error -- width and height do not appear in the definition for <source> yet - LM */}
        <source media="(min-width:1026px)" srcSet={imgSrc} width={desktopWidth} height={desktopHeight} />
        {/* @ts-expect-error */}
        <source media="(max-width:1025px)" srcSet={mobileImgSrc} width={mobileWidth} height={mobileHeight} />
        <img src={imgSrc} alt={alt ? alt : ""} loading={imageLoading} width={isMobile ? mobileWidth : desktopWidth} height={isMobile ? mobileHeight : desktopHeight} className={blockClass ? `${styles.figureImage} ${styles.figureImage}${blockClassFormat}` : `${styles.figureImage}`} />
      </picture>
      :
      <img src={imgSrc} alt={alt ? alt : ""} loading={imageLoading} width={isMobile ? mobileWidth : desktopWidth} height={isMobile ? mobileHeight : desktopHeight} className={blockClass ? `${styles.figureImage} ${styles.figureImage}${blockClassFormat}` : `${styles.figureImage}`} />
  )

  const FigureLink = () => (
    <a href={link?.url} target={link?.newTab ? "_blank" : "_self"} rel="noreferrer">
      <FigureImage />
    </a>
  )

  const Caption = () => (
    <figcaption className={blockClass ? `${styles.figureCaption} ${styles.figureCaption}${blockClassFormat}` : `${styles.figureCaption}`}>
      <span className={blockClass ? `${styles.figureCaptionText} ${styles.figureCaptionText}${blockClassFormat}` : `${styles.figureCaptionText}`}>{caption}</span>
    </figcaption>
  )

  const Container = () => (
    <div className={blockClass ? `${styles.figureContainer} ${styles.figureContainer}${blockClassFormat}` : `${styles.figureContainer}`}>
      {parents.wrapper ? <Wrapper /> : <AppCore />}
    </div>
  )

  const Wrapper = () => (
    <div style={hero && { backgroundImage: `url("${mobileImgSrc || imgSrc}")` }} className={blockClass ? `${styles.figureWrapper} ${styles.figureWrapper}${blockClassFormat}` : `${styles.figureWrapper}`}>
      <AppCore />
    </div>
  )

  const AppCore = () => (
    <figure className={blockClass ? `${styles.figureTag} ${styles.figureTag}${blockClassFormat}` : `${styles.figureTag}`}>
      {link?.url ? <FigureLink /> : <FigureImage />}
      {caption && <Caption />}
    </figure>
  )

  return parents?.container ? <Container /> : parents?.wrapper ? <Wrapper /> : <AppCore />;

}

Figure.schema = {
  title: 'Image Figure',
  description: 'Renders Figure Tag with optional caption for better SEO.',
  type: 'object',
  properties: {
    imgSrc: {
      title: "Desktop Image Source",
      description: "REQUIRED - Absolute Path to Desktop optimized image.",
      type: "string"
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
      title: "Mobile Image Source",
      description: "Optional - Absolute Path to Mobile optimized image.",
      type: "string"
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
      type: "string"
    },
    alt: {
      title: "Alt Text",
      description: "Optional - Used for the Alt Text attribute.",
      type: "string"
    },
    imageLoading: {
      title: "Loading Priority",
      description: "",
      type: "string",
      enum: ["lazy", "eager"],
      default: "lazy"
    },
    link: {
      type: "object",
      title: "Link",
      properties: {
        url: {
          title: "Link URL",
          description: "Optional - Link to follow when image is clicked.",
          type: "string"
        },
        newTab: {
          title: "Open In New Tab?",
          description: "Optional - Defaults to false",
          type: "boolean"
        }
      }
    }
  }
}

export default Figure;