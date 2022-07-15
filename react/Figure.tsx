import React from 'react';

// Styles V1
import styles from "./styles.css";

interface FigureProps {
  imgSrc: string
  mobileImgSrc: string
  link?: linkObject
  caption: string
  alt: string
  blockClass: string
  hero: Boolean
}

interface linkObject {
  url: string
  newTab: Boolean
}

const Figure: StorefrontFunctionComponent<FigureProps> = ({ imgSrc, mobileImgSrc, caption, alt, link, hero, blockClass }) => {
  // If imgSrc is blank, do not render 
  if (!imgSrc) return <></>

  const blockClassFormat = blockClass ? `--${blockClass}` : "";

  // Picture tag if Mobile image source is present, Image tag if absent
  const imageReturn = (
    <>
      {mobileImgSrc &&
        <picture>
          <source media="(min-width:1026px)" srcSet={imgSrc} />
          <source media="(max-width:1025px)" srcSet={mobileImgSrc} />
          <img src={imgSrc} alt={alt ? alt : ""} loading="lazy" className={blockClass ? `${styles.figureImage} ${styles.figureImage}${blockClassFormat}` : `${styles.figureImage}`} />
        </picture>
      }
      {!mobileImgSrc &&
        <img src={imgSrc} alt={alt ? alt : ""} loading="lazy" className={blockClass ? `${styles.figureImage} ${styles.figureImage}${blockClassFormat}` : `${styles.figureImage}`} />
      }
    </>
  )

  // Boolean for anchor tag conditional render
  const url = link ? !!link.url : !!"";

  return (
    <div className={blockClass ? `${styles.figureContainer} ${styles.figureContainer}${blockClassFormat}` : `${styles.figureContainer}`}>
      <div style={hero && { backgroundImage: `url("${mobileImgSrc || imgSrc}")` }} className={blockClass ? `${styles.figureWrapper} ${styles.figureWrapper}${blockClassFormat}` : `${styles.figureWrapper}`}>
        <figure role="img" className={blockClass ? `${styles.figureTag} ${styles.figureTag}${blockClassFormat}` : `${styles.figureTag}`}>
          {url && link ? <a href={link.url} target={link.newTab ? "_blank" : "_self"} rel="noreferrer">{imageReturn}</a> : <>{imageReturn}</>}
          {caption && <figcaption className={blockClass ? `${styles.figureCaption} ${styles.figureCaption}${blockClassFormat}` : `${styles.figureCaption}`}>
            <span className={blockClass ? `${styles.figureCaptionText} ${styles.figureCaptionText}${blockClassFormat}` : `${styles.figureCaptionText}`}>{caption}</span>
          </figcaption>}
        </figure>
      </div>
    </div>
  )
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
    mobileImgSrc: {
      title: "Mobile Image Source",
      description: "Optional - Absolute Path to Mobile optimized image.",
      type: "string"
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