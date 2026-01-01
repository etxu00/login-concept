const $themes = document.querySelectorAll("input[name='theme']");

if (localStorage.getItem("theme")) {
  $themes.forEach($theme => $theme.checked = $theme.id === localStorage.getItem("theme"));
}

window.addEventListener("DOMContentLoaded", () => {
  const $inputPassword = document.querySelector("#password");
  const $body = document.querySelector("body");
  const $imgLogo = document.querySelector("img");
  const $inputUsername = document.querySelector("#username");
  const $form = document.querySelector("form");
  const $button = document.querySelector("button");

  $form.addEventListener("submit", event => {
    event.preventDefault();
    event.stopPropagation();
    $button.disabled = true;
    $body.classList.add("loading");
    setTimeout(() => {
      $button.disabled = false;
      $body.classList.remove("loading");
    }, 3000);
  });

  $themes.forEach($theme => {
    $theme.addEventListener("change", event => {
      const theme = event.target.id;
      localStorage.setItem("theme", theme);
      window.location.reload();
    });
  });

  // Usamos 'input' para capturar cualquier cambio (teclado, pegado, etc.)
  $inputPassword.addEventListener("input", event => {
    const password = $inputPassword.value;
    const $mask = document.querySelector("#password_mask");
    const $children = $mask.children;

    // 1. Actualizar o crear nuevos caracteres
    for (let i = 0; i < password.length; i++) {
      const char = password[i];
      if ($children[i]) {
        // Si el elemento ya existe, solo actualizamos su contenido si es necesario
        // pero NO lo recreamos, evitando que la animación se reinicie.
        if ($children[i].textContent !== char) {
          $children[i].textContent = char;
        }
      } else {
        // Si no existe, lo creamos (esto disparará la animación solo para este nuevo elemento)
        const $new = document.createElement("i");
        $new.textContent = char;
        $mask.appendChild($new);
      }
    }

    // 2. Eliminar caracteres excedentes (si se borró texto)
    while ($children.length > password.length) {
      $mask.removeChild($mask.lastChild);
    }
  });

  const onLogoLoaded = () => {
    $body.classList.add("logo-upload-complete");
    setTimeout(() => $inputUsername.focus(), 1750);
  };

  $imgLogo.addEventListener("error", () => $imgLogo.remove());

  // Verificamos si ya terminó de cargar
  if ($imgLogo.complete) {
    onLogoLoaded();
  } else {
    // Si no, esperamos al evento
    $imgLogo.addEventListener("load", onLogoLoaded);
  }
});