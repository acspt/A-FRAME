AFRAME.registerComponent('door', {
  init: function () {
    this.el.addEventListener('click', this.toggleDoor.bind(this));
    this.isOpen = false;
    console.log("register")
  },

  toggleDoor: function () {
    console.log(this)
    if (this.isOpen) {
      this.el.setAttribute('rotation', '0 0 0');
      this.isOpen = false;
    } else {
      this.el.setAttribute('rotation', '0 135 0');
      this.isOpen = true;
    }
  }
});
console.log("script")