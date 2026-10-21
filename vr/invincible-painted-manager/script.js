  function setScene2() {
    // console.log('kkk')
    document.getElementById('scene1').setAttribute('visible', 'false')
    document.getElementById('scene2').setAttribute('visible', 'true')
    // document.querySelector('#ambient2').emit('aaa');
    // document.querySelector('#fading-cube').emit('fade');
  }
  function setScene1() {
    // console.log('kkk')
    document.getElementById('scene2').setAttribute('visible', 'false')
    document.getElementById('scene1').setAttribute('visible', 'true')
    // document.querySelector('#ambient1').emit('aaa');
    // document.querySelector('#fading-cube').emit('fade');
  }
