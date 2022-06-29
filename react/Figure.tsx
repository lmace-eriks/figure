import React from 'react';

// Styles V1
import styles from "./styles.css";

interface FigureProps {
  imgSet: imgSetObject
  imgSrc: string
  link?: linkObject
  caption: string
  alt: string
  blockClass: string
}

interface imgSetObject {
  desktop: string
  mobile: string
}

interface linkObject {
  url: string
  newTab: Boolean
}

const Figure: StorefrontFunctionComponent<FigureProps> = ({ imgSet, imgSrc, caption, alt, link, blockClass }) => {

  const blockClassFormat = blockClass ? `--${blockClass}` : "";

  const imageReturn = (
    <>
      {imgSet &&
        <picture>
          <source media="(min-width:1026px)" srcSet={imgSet.desktop} />
          <source media="(max-width:1025px)" srcSet={imgSet.mobile} />
          <img src={imgSrc || imgSet.desktop} alt={alt} title={alt} className={blockClass ? `${styles.figureImage} ${styles.figureImage}${blockClassFormat}` : `${styles.figureImage}`} />
        </picture>
      }
      {!imgSet &&
        <img src={imgSrc} alt={alt} title={alt} className={blockClass ? `${styles.figureImage} ${styles.figureImage}${blockClassFormat}` : `${styles.figureImage}`} />
      }
    </>
  )

  if (!imgSrc) return <></>

  return (
    <div className={blockClass ? `${styles.figureContainer} ${styles.figureContainer}${blockClassFormat}` : `${styles.figureContainer}`}>
      <div className={blockClass ? `${styles.figureWrapper} ${styles.figureWrapper}${blockClassFormat}` : `${styles.figureWrapper}`}>
        <figure role="img" aria-label={alt} className={blockClass ? `${styles.figureTag} ${styles.figureTag}${blockClassFormat}` : `${styles.figureTag}`}>
          {link && link ? <a href={link.url} target={link.newTab ? "_blank" : "_self"} rel="noreferrer">{imageReturn}</a> : <>{imageReturn}</>}
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
      title: "Default Image Source",
      description: "REQUIRED - Absolute Path to default image.",
      type: "string"
    },
    imgSet: {
      type: "object",
      title: "Image Set",
      properties: {
        desktop: {
          title: "Desktop Image Source",
          description: "Optional - Image optimized for desktop devices.",
          type: "string"
        },
        mobile: {
          title: "Mobile Image Source",
          description: "Optional - Image optimized for mobile devices.",
          type: "string"
        }
      }
    },
    caption: {
      title: "Image Caption",
      description: "Optional - Text rendered below the image for SEO boost. No Markdown accepted.",
      type: "string"
    },
    alt: {
      title: "Alt Text",
      description: "Optional - Used for Alt, Title and ARIA attributes for screen readers and SEO boost. No Markdown accepted.",
      type: "string"
    }
  }
}

export default Figure;