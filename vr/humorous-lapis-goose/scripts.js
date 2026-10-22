// Código do projeto que estava dentro de index.html (passou para este ficheiro).

// ---- bloco 1 (antes no <head>) ----
// WebXR requires https: to work so ensure redirected if needed.
if (
  location.hostname !== "localhost" &&
  window.location.protocol === "http:"
)
  window.location.protocol = "https:";
    
