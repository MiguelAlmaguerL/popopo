document.addEventListener('DOMContentLoaded', function () {
  const inputBusqueda = document.getElementById('inputBusqueda');
  const resultados = document.getElementById('resultados');
  const searchWrapper = document.querySelector('.search-wrapper');

  const productos = [
    'Zoro Roronoa',
    'Gojo Satoru',
    'Tanjiro Kamado',
    'Eren Yeager',
    'Rem - Re:Zero'
  ];

  function redirigirBusqueda(texto) {
    const query = encodeURIComponent(texto.trim());
    if (query !== '') {
      window.location.href = `buscar.php?query=${query}`;
    }
  }

  // === ESCRITORIO ===
  if (inputBusqueda) {
    inputBusqueda.addEventListener('input', function () {
      const valor = this.value.trim().toLowerCase();
      resultados.innerHTML = '';

      if (valor !== '') {
        const filtrados = productos.filter(p => p.toLowerCase().includes(valor));

        if (filtrados.length > 0) {
          resultados.style.display = 'block';
          filtrados.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = producto;
            li.classList.add('list-group-item');
            resultados.appendChild(li);

            li.addEventListener('click', () => {
              inputBusqueda.value = producto;
              resultados.innerHTML = '';
              resultados.style.display = 'none';
              redirigirBusqueda(producto);
            });
          });

          if (searchWrapper) {
            resultados.style.width = `${inputBusqueda.offsetWidth}px`;
            resultados.style.top = `${inputBusqueda.offsetTop + inputBusqueda.offsetHeight}px`;
            resultados.style.left = `${inputBusqueda.offsetLeft}px`;
          }
        } else {
          resultados.style.display = 'none';
        }
      } else {
        resultados.style.display = 'none';
      }
    });

    inputBusqueda.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        redirigirBusqueda(this.value);
        resultados.style.display = 'none';
      }
    });
  }

  document.addEventListener('click', function (e) {
    if (!inputBusqueda.contains(e.target) && !resultados.contains(e.target)) {
      resultados.style.display = 'none';
    }
  });

  // === MÓVIL ===
  const iconoLupa = document.querySelector('.search-btn img');
  const mobileSearchContainer = document.getElementById('mobile-search-container');
  const inputBusquedaMobile = document.getElementById('mobileInputBusqueda');
  const resultadosMobile = document.getElementById('mobileResultados');

  if (iconoLupa && mobileSearchContainer && inputBusquedaMobile) {
    iconoLupa.addEventListener('click', () => {
      const estiloInputEscritorio = inputBusqueda ? window.getComputedStyle(inputBusqueda).display : 'none';
      const isDesktopVisible = estiloInputEscritorio !== 'none';

      // --- Modo escritorio ---
      if (isDesktopVisible) {
        const texto = inputBusqueda.value.trim();
        if (texto !== '') {
          redirigirBusqueda(texto);
          resultados.style.display = 'none';
        } else {
          inputBusqueda.focus();
        }
        return;
      }

      // --- Modo móvil ---
      const visible = mobileSearchContainer.style.display === 'block';

      if (visible) {
        const texto = inputBusquedaMobile.value.trim();
        if (texto !== '') {
          redirigirBusqueda(texto);
          resultadosMobile.innerHTML = '';
          return;
        }
      }

      mobileSearchContainer.style.display = visible ? 'none' : 'block';
      if (!visible) inputBusquedaMobile.focus();
    });

    inputBusquedaMobile.addEventListener('input', function () {
      const valor = this.value.trim().toLowerCase();
      resultadosMobile.innerHTML = '';

      if (valor !== '') {
        const filtrados = productos.filter(p => p.toLowerCase().includes(valor));

        if (filtrados.length > 0) {
          filtrados.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = producto;
            li.classList.add('list-group-item');
            resultadosMobile.appendChild(li);

            li.addEventListener('click', () => {
              inputBusquedaMobile.value = producto;
              resultadosMobile.innerHTML = '';
              redirigirBusqueda(producto);
            });
          });
        }
      }
    });

    inputBusquedaMobile.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        redirigirBusqueda(this.value);
        resultadosMobile.innerHTML = '';
      }
    });

    document.addEventListener('click', function (e) {
      if (!mobileSearchContainer.contains(e.target) && !iconoLupa.contains(e.target)) {
        mobileSearchContainer.style.display = 'none';
      }
    });
  }
});