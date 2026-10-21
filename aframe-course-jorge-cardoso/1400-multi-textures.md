---
title: Multi texture component
previous: 1300-sound
previoustitle: Sound
---

# Multi Texture Component


:::example 1400-multi-textures-01


With the `material` component (or the `src` attribute), a texture is applied to every face of an object in the same way. If we want a different image on each face of a box, we can use the [multisrc component](https://github.com/elbobo/aframe-multisrc-component), created by the A-Frame community. The `<script>` to include is:

```html
<script src="https://cdn.jsdelivr.net/gh/elbobo/aframe-multisrc-component@b6d23310/dist/0.3/aframe-multisrc-component.js"></script>
```

As with other textures, the images should be loaded in the `<a-assets>`:

```html
<a-assets>
  <img id="right" src="assets/multi-textures/right.png" />
  <img id="left" src="assets/multi-textures/left.png" />
  <img id="top" src="assets/multi-textures/top.png" />
  <img id="bottom" src="assets/multi-textures/bottom.png" />
  <img id="front" src="assets/multi-textures/front.png" />
  <img id="back" src="assets/multi-textures/back.png" />
</a-assets>
```

## A texture for every face

To give each face its own texture, we use the `srcs` property with a list of six images, separated by commas. The order of the faces of a box is always the same:

| Index | Face |
|---|---|
| 0 | right |
| 1 | left |
| 2 | top |
| 3 | bottom |
| 4 | front |
| 5 | back |

```html
<a-box
  position="0 1.6 -3"
  multisrc="srcs:#right,#left,#top,#bottom,#front,#back"
></a-box>
```

Be careful not to put spaces after the commas in the `srcs` list, otherwise the component does not find the images.

## A texture for some faces only

To apply a texture only to some faces, we use the properties `src0` to `src5`, where the number is the index of the face (see the table above). The faces without a texture use the color of the material:

```html
<a-box
  position="0 1.6 -3"
  color="#4CC3D9"
  multisrc="src2: #top; src4: #front"
></a-box>
```

:::example 1400-multi-textures-02-some-faces

Notice that the `color` also tints the faces that have a texture. To keep the original colors of the images, use a white color (`#FFFFFF`, the default) and apply color only through the textures.


## References
* multisrc component: https://github.com/elbobo/aframe-multisrc-component
* Textures in A-Frame: https://aframe.io/docs/1.0.0/components/material.html
