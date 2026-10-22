// Código do projeto que estava dentro de index.html (passou para este ficheiro).

// ---- bloco 1 (antes no <head>) ----
// see issue https://github.com/networked-aframe/networked-aframe/issues/267
NAF.schemas.getComponentsOriginal = NAF.schemas.getComponents;
NAF.schemas.getComponents = (template) => {
  if (!NAF.schemas.hasTemplate('#avatar-template')) {
    NAF.schemas.add({
      template: '#avatar-template',
      components: [
        'position',
        'rotation',
        {
          selector: '.head',
          component: 'material',
          property: 'color'
        }
      ]
    });
  }
  const components = NAF.schemas.getComponentsOriginal(template);
  return components;
};
    

// ---- bloco 2 (antes no <body>) ----
// Define custom schema for syncing avatar color, set by random-color
// NAF.schemas.add({
//   template: '#avatar-template',
//   components: [
//     'position',
//     'rotation',
//     {
//       selector: '.head',
//       component: 'material',
//       property: 'color'
//     }
//   ]
// });

// Called by Networked-Aframe when connected to server
function onConnect() {
  console.log('onConnect', new Date());
}
    
