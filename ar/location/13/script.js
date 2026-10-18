window.onload = () => {
  let testEntitiesAdded = false;
  alert(
    "If testing the lat/lon manual input on a mobile device, please turn off your GPS to avoid the real location being detected."
  );
  const el = document.querySelector("[gps-new-camera]");
  el.addEventListener("gps-camera-update-position", (e) => {
    if (!testEntitiesAdded) {
      alert(
        `Começou a aventura em : lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`
      );

      testEntitiesAdded = true;
    }
  });

  document.getElementById("go").addEventListener("click", (e) => {
    const lat = document.getElementById("lat").value;
    const lon = document.getElementById("lon").value;
    const minacc = document.getElementById("minacc").value;

    el.setAttribute("gps-new-camera", {
      simulateLatitude: lat,
      simulateLongitude: lon,
      positionMinAccuracy: minacc,
    });
  });
};
