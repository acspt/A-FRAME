  AFRAME.registerComponent('extruded-text', {
        schema: {
          text: { type: 'string', default: 'Hello A-Frame!' },
          color: { type: 'color', default: '#00ff00' },
          height: { type: 'number', default: 0.2 },
          rotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
          position: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }
        },
        init: function () {
          const data = this.data;
          const el = this.el;

          // Load a font
          const loader = new THREE.FontLoader();
          loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
            // Create text geometry with specified properties
            const geometry = new THREE.TextGeometry(data.text, {
              font: font,
              size: 1,
              height: data.height,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 0.1,
              bevelSize: 0.1,
              bevelOffset: 0,
              bevelSegments: 5
            });

            // Create a material with the specified color
            const material = new THREE.MeshStandardMaterial({ color: data.color });

            // Create a mesh with the geometry and material
            const mesh = new THREE.Mesh(geometry, material);

            // Set the rotation of the mesh
            mesh.rotation.set(
              THREE.MathUtils.degToRad(data.rotation.x),
              THREE.MathUtils.degToRad(data.rotation.y),
              THREE.MathUtils.degToRad(data.rotation.z)
            );

            // Set the position of the mesh
            mesh.position.set(data.position.x, data.position.y, data.position.z);

            // Add the mesh to the entity
            el.setObject3D('mesh', mesh);

            // Create edges geometry and line material
            const edges = new THREE.EdgesGeometry(geometry);
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
            const line = new THREE.LineSegments(edges, lineMaterial);

            // Set the same position and rotation for the edges
            line.position.copy(mesh.position);
            line.rotation.copy(mesh.rotation);

            // Add the edges to the entity
            //el.setObject3D('line', line);

            // Add ambient light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            el.sceneEl.object3D.add(ambientLight);

            // Add directional light
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(2, 4, 2);
            el.sceneEl.object3D.add(directionalLight);
          });
        }
      });
AFRAME.registerComponent("mirror-entity", {
  schema: {
    target: { type: "selector" },
  },
  init: function () {
    this.mirror = document.createElement("a-entity");
    this.el.sceneEl.appendChild(this.mirror);
  },
  tick: function () {
    const target = this.data.target;
    const mirror = this.mirror;

    if (!target) return;

    // Get the position and rotation of the target entity
    const position = target.object3D.position.clone();
    const rotation = target.object3D.rotation.clone();

    // Invert the position and rotation for the mirror effect
    position.y *= -1;
    rotation.x *= -1;
    rotation.z *= -1;

    // Apply the inverted position and rotation to the mirror entity
    mirror.setAttribute("position", position);
    mirror.setAttribute("rotation", {
      x: THREE.Math.radToDeg(rotation.x),
      y: THREE.Math.radToDeg(rotation.y),
      z: THREE.Math.radToDeg(rotation.z),
    });

    // Copy the geometry and material from the target to the mirror
    mirror.setAttribute("geometry", target.getAttribute("geometry"));
    mirror.setAttribute("material", target.getAttribute("material"));
  },
});
