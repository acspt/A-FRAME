---
title: Proximity detection
---

# Proximity Detection


<div class="example-container">
  Example <code>10-proximity-01</code> (<a href="examples/10-proximity-01.html" target="_blank">open in new tab</a> | <a href="https://github.com/acspt/A-FRAME/blob/main/aframe-course-jorge-cardoso/examples/10-proximity-01.html" target="_blank">view source</a>)
  <iframe src="examples/10-proximity-01.html" width="100%" height="400" loading="lazy" allow="autoplay; fullscreen; xr-spatial-tracking"></iframe>
</div>


The proximity trigger component, allows objects to be informed when another object is in proximity. By default, it tracks the proximity of the camera, i.e., the user, to an object. The `<script>` to include is:

```html
<script src="https://acspt.github.io/A-FRAME/aframe-course-jorge-cardoso/proximity-trigger.js"></script>
```

The proximity trigger will send two events:

* `playerenter`: when the user has entered the proximity radius.

* `playerleave`: when the user has left the proximity radius.

In the following example, the proximity trigger is defined with a radius of 2 (`distance: 2`). When the user enters that radius, the `playerenter` event is triggered and it will in turn start the animation:

```html
<a-box proximity-trigger="distance: 2" position="-1 1.6 -3" color="#ff0000" 
      animation="property: position; dur: 2000; from: -1 1.6 -3; to: -1 1.6 -10;  startEvents: playerenter;" >
</a-box>  
```


## Doors

<div class="example-container">
  Example <code>10-proximity-03</code> (<a href="examples/10-proximity-03.html" target="_blank">open in new tab</a> | <a href="https://github.com/acspt/A-FRAME/blob/main/aframe-course-jorge-cardoso/examples/10-proximity-03.html" target="_blank">view source</a>)
  <iframe src="examples/10-proximity-03.html" width="100%" height="400" loading="lazy" allow="autoplay; fullscreen; xr-spatial-tracking"></iframe>
</div>

## Videos that play when you get close

Proximity can also be used to play media. In the following example there are several videos in the scene, and each one only plays (with sound) when the user is closer than 2 metres. The links in the top left corner teleport the user to the front of each video.

This example uses its own component, `proximity-autoplay`, defined in the file `10-proximity-04-videos.js`:

```html
<a-assets>
  <video id="video1" src="https://cdn.aframe.io/videos/bunny.mp4" crossorigin="anonymous" loop muted playsinline></video>
</a-assets>

<a-video src="#video1" position="0 1.5 -5" width="1.5" height="2" proximity-autoplay="distance: 2"></a-video>
```

Browsers only allow videos to play with sound after the user interacts with the page (for example, clicking one of the teleportation links).

<div class="example-container">
  Example <code>10-proximity-04-videos</code> (<a href="examples/10-proximity-04-videos.html" target="_blank">open in new tab</a> | <a href="https://github.com/acspt/A-FRAME/blob/main/aframe-course-jorge-cardoso/examples/10-proximity-04-videos.html" target="_blank">view source</a>)
  <iframe src="examples/10-proximity-04-videos.html" width="100%" height="400" loading="lazy" allow="autoplay; fullscreen; xr-spatial-tracking"></iframe>
</div>

## References
