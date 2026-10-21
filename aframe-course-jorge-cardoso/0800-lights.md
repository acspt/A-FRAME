---
title: Lights
---


# Lights
Lighting is a fundamental aspect of a 3-dimensional environment. After all, without light we would not see anything. In the previous chapter, we have not worried about lighting because A-Frame provides it by default. However, if we want to create a richer environment, we will need to add and configure lights beyond the default ones.

By default, if we don't explicitly add a light to our scene, A-Frame will add the following:
```html
<a-light type="ambient" color="#BBB"></a-light>

<a-light
  type="directional"
  color="#FFF"
  intensity="0.6"
  position="-0.5 1 1"
></a-light>
```

These correspond to an ambient light with light gray color and a directional light positioned just behind the user, a bit to the left.

:::example 0800-lights-01-default  Default lights in A-Frame


There are various kinds of lights. In the example, you can see three types: ambient, point, and directional lights. 

Note that the `intensity` attribute on all of them is set to zero (light is turned off), except on the point light. Try setting the intensity to 1 to see the effect of each type of light.

Also, it is good at this point to introduce the A-Frame inspector to manipulate the lights interactively.

Open the example in a new tab and then press `<ctrl> + <alt> + i`.


After you adjusted the light, you can copy the values of the attributes back to your code.

1. Use the inspector to change the point light so that it illuminates objects from the right side


## Ambient light
:::youtube _26KGnN1xws  Changing ambient light with A-Frame Visual Inspector


## Directional light
:::youtube TZInZbx8Ypg Moving directional light with A-Frame Visual Inspector


  
## References

* Lights
  * `<a-light>`: https://aframe.io/docs/0.8.0/primitives/a-light.html
* Text
  * `<a-text>`: https://aframe.io/docs/0.8.0/primitives/a-text.html
* Using the A-Frame Inspector
  * https://aframe.io/docs/0.8.0/introduction/visual-inspector-and-dev-tools.html