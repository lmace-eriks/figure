# Figure

## What This App Does
Renders an `<picture>` and `<img>` tag inside a `<figure>` tag with an optional `<figcaption>` tag to aid in SEO.

## VTEX Block Example

```
"figure#photo-1": {
    "props": {
      "imgSrc": "absolute-path-to-desktop-image.jpg",
      "mobileImgSrc": "absolute-path-to-mobile-image.jpg",
      "caption": "This is the Caption text.",
      "alt": "This is the Alt Text",
      "link": {
        "url": "/this-is-the-link",
        "newTab": true
      }
    }
  }
```

## Required Props
- imgSrc - This is the default / desktop image source. Must be absolute path.

## Optional Props
- mobileImgSrc - Mobile optimized image source. Must be absolute path. Breakpoint between Desktop and Mobile is 1025px.

- caption - Caption for the image. Renders in a grey / white box beneath the image by default.

- alt - Text here will render in the `<img>` 'alt' and 'title' attribute.

- link - Object containing "url" and "newTab" properties.
    - url - URL to follow when image is clicked. Absolute or relative path.
    - newTab - If true, link opens in new tab.

- blockClass - Operates as normal VTEX blockClass property

## Dom Example
```
<div class="eriksbikeshop-figure-1-x-figureContainer">
    <div class="eriksbikeshop-figure-1-x-figureWrapper">
        <figure role="img" class="eriksbikeshop-figure-1-x-figureTag">
            <a href="/this-is-the-link" target="_self" rel="noreferrer">
                <picture>
                    <source media="(min-width:1026px)" srcset="absolute-path-to-desktop-image.jpg">
                    <source media="(max-width:1025px)" srcset="absolute-path-to-mobile-image.jpg"><img
                        src="absolute-path-to-desktop-image.jpg" alt="This is the Alt Text" title="This is the Alt Text"
                        class="eriksbikeshop-figure-1-x-figureImage" crossorigin="anonymous">
                </picture>
            </a>
            <figcaption class="eriksbikeshop-figure-1-x-figureCaption">
                <span class="eriksbikeshop-figure-1-x-figureCaptionText">This is the Caption text.</span>
            </figcaption>
        </figure>
    </div>
</div>
```