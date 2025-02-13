document.addEventListener("DOMContentLoaded", () => {
    const encenderBtn = document.getElementById("encender-luz");
    const apagarBtn = document.getElementById("apagar-luz");
    const estadoLuz = document.getElementById("estado-luz");
  
    // Obtener el estado actual de la luz
    fetch("https://acuario-backend.onrender.com/api/luz")
      .then(response => response.json())
      .then(data => {
        estadoLuz.textContent = `Estado: ${data.estado ? "Encendida" : "Apagada"}`;
      });
  
    // Encender la luz
    encenderBtn.addEventListener("click", () => {
      fetch("https://acuario-backend.onrender.com/api/luz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: true }),
      })
      .then(() => location.reload());
    });
  
    // Apagar la luz
    apagarBtn.addEventListener("click", () => {
      fetch("https://acuario-backend.onrender.com/api/luz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: false }),
      })
      .then(() => location.reload());
    });
  });