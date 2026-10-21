document.querySelector('#camera').addEventListener('collide', function (e) {
  console.log('Player has collided with body #' + e.detail.body.id);
});