document.addEventListener("DOMContentLoaded", function () {
  const zeus = document.querySelector("#zeus");

  zeus.addEventListener("click", function () {
    document.querySelector("#zeus-text").setAttribute("visible", "true");

    setTimeout(() => {
      document.querySelector("#zeus-light").setAttribute("visible", "false");
      document.querySelector("#bussola-light").setAttribute("visible", "true");
      document.querySelector("#bussola").classList.remove("disabled");
    }, 1000);
  });
});