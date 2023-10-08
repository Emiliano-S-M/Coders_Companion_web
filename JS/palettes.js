document.addEventListener("DOMContentLoaded", function () {
    const selectPaleta = document.getElementById("palette-select");
  
    // Define tu objeto de paletas
    const paletas = {
      palette1: {
        name: "Classic mode",
        primaryColor: "#151515",
        secondaryColor: "#A9A9A9",
        tertiaryColor: "#4D4D4D",
        accentColor: "#c1c1c1",
      },
      palette2:{
        name: "Classic Light mode",
        primaryColor: "#e8e8e8",
        secondaryColor: "#868686",
        tertiaryColor: "#f8f8f8",
        accentColor: "#636363",
      },
      palette3: {
        name: "Purple mode",
        primaryColor: "#100412",
        secondaryColor: "#9793B1",
        tertiaryColor: "#615C83",
        accentColor: "#2B183D",
      },
      palette4: {
        name: "Blue-mode",
        primaryColor: "#040D12",
        secondaryColor: "#93B1A6",
        tertiaryColor: "#5C8374",
        accentColor: "#183D3D",
      },
      palette5: {
        name: "Green-mode",
        primaryColor: "#061204",
        secondaryColor: "#ADB193",
        tertiaryColor: "#7F835C",
        accentColor: "#2B3D18",
      },
      palette6: {
        name: "Red-mode",
        primaryColor: "#120904",
        secondaryColor: "#B1939E",
        tertiaryColor: "#835C6B",
        accentColor: "#3D1818",
      },
      palette7: {
        name: "Orange-mode",
        primaryColor: "#1d0907",
        secondaryColor: "#ad6500",
        tertiaryColor: "#af371a",
        accentColor: "#4b170b",
      },
      palette8: {
        name: " Yellow-mode",
        primaryColor: "#1d1a07",
        secondaryColor: "#ada400",
        tertiaryColor: "#8a8012",
        accentColor: "#4b4a0b",
      },
      palette9: {
        name: "VsCODE",
        primaryColor: " #282c34",
        secondaryColor: "#f8f8f2",
        tertiaryColor: "#282c34",
        accentColor: "#44475a",
      },
      palette10: {
        name: "Pink mode",
        primaryColor: "#260013",
        secondaryColor: "#77003c",
        tertiaryColor: "#af0158",
        accentColor: "#660033",
      }
      // Agrega más paletas según sea necesario
    };
  
    // Agrega las opciones al select basadas en el objeto de paletas
    for (const key in paletas) {
      if (paletas.hasOwnProperty(key)) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = paletas[key].name;
        selectPaleta.appendChild(option);
      }
    }
  
    // Escucha el evento "change" del select y actualiza las variables CSS
    selectPaleta.addEventListener("change", function () {
      const selectedPalette = selectPaleta.value;
      const selectedPaletteInfo = paletas[selectedPalette];
  
      // Actualiza las variables CSS
      document.documentElement.style.setProperty("--Primary-color", selectedPaletteInfo.primaryColor);
      document.documentElement.style.setProperty("--Secondary-color", selectedPaletteInfo.secondaryColor);
      document.documentElement.style.setProperty("--Tertiary-color", selectedPaletteInfo.tertiaryColor);
      document.documentElement.style.setProperty("--Accent-color", selectedPaletteInfo.accentColor);

      // Guarda la selección en localStorage
      localStorage.setItem("selectedPalette", selectedPalette);
    });
  
    // Recupera la selección de paleta guardada en localStorage
    const savedPalette = localStorage.getItem("selectedPalette");
    if (savedPalette) {
      selectPaleta.value = savedPalette;
      selectPaleta.dispatchEvent(new Event("change")); // Dispara el evento change para aplicar la selección guardada.
    }
  });
  