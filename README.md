# Figure

## What This App Does
Renders an `<picture>` and `<img>` tag inside a `<figure>` tag with an optional `<figcaption>` tag to aid in SEO.

The "imgSet" object defines both a "desktop" and "mobile" image source for optimizing download speeds for different devices.

## VTEX Block Example

```
"figure#photo-1": {
    "props": {
      "blockClass": "my-photo-blockclass"
      "imgSet": {
        "desktop": "absolute-path-to-desktop-image.jpg",
        "mobile": "absolute-path-to-mobile-image.jpg"
      },
      "imgSrc": "absolute-path-to-default-image.jpg",
      "caption": "The text you want below the image",
      "alt": "Alt, Title and ARIA Text"
    }
  }
```

## Required Props
- imgSrc - This is the fallback / default image source. Must be absolute path.

## Optional Props
- imgSet - Desktop optimized image source and Mobile optimized image source. Breakpoint between Desktop and Mobile is 1025px.

- caption - Caption for the image. Renders in a grey / white box beneath the image by default.

- alt - Text here will render in the `<img>` 'alt', 'title' attribute and the `<figure>` 'ARIA-label' attribute.

## Dom Example
```
<div class="accountname-figure-1-x-figureContainer">
    <div class="accountname-figure-1-x-figureWrapper">
        <figure role="img" aria-label="The Alt Text" class="accountname-figure-1-x-figureTag">
            <picture>
                <source media="(min-width:1026px)" srcset="absolute-path.jpg">
                <source media="(max-width:1025px)" srcset="absolute-path.jpg">
                <img src="absolute-path.jpg" alt="The Alt Text" title="The Alt Text" class="accountname-figure-1-x-figureImage" crossorigin="anonymous">
            </picture>
            <figcaption class="accountname-figure-1-x-figureCaption">
                <span class="accountname-figure-1-x-figureCaptionText">You'll want at least 1 inch between you, and the top bar of the bike.</span>
            </figcaption>
        </figure>
    </div>
</div>
```