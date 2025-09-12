/* ===== SEÇÃO: TOGGLE ICON NAVBAR ===== */
// Seleciona o ícone do menu e a navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Alterna o ícone e a visibilidade do menu ao clicar
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x'); // Alterna ícone do menu
  navbar.classList.toggle('active'); // Mostra/oculta navbar
};

/* ===== SEÇÃO: SCROLL SECTIONS ACTIVE LINK ===== */
// Destaca o link da seção atual no menu
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY; // Posição atual do scroll
    let offset = sec.offsetTop - 150; // Posição da seção com margem
    let height = sec.offsetHeight; // Altura da seção
    let id = sec.getAttribute('id'); // ID da seção

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active'); // Remove destaque
        document
          .querySelector('header nav a[href*=' + id + ']')
          .classList.add('active'); // Adiciona destaque
      });
    }
  });

  /* ===== SEÇÃO: STICKY NAVBAR ===== */
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100); // Fixa cabeçalho
};

/* ===== SEÇÃO: FECHAR MENU AO CLICAR NO LINK ===== */
// Fecha o menu mobile ao clicar em um link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  });
});

/* ===== SEÇÃO: SCROLL REVEAL ===== */
// Configurações padrão
ScrollReveal({
  // reset: true, // Reseta animação ao voltar
  distance: '80px',
  duration: 2000,
  delay: 200
});

// Elementos revelados de diferentes direções
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* ===== SEÇÃO: TYPED.JS (TEXTO DIGITADO) ===== */
const typed = new Typed('.multiple-text', {
  strings: ['Analista de Sistemas', 'Analista de Suporte', 'Analista de Soluções'],
  typeSpeed: 90,
  backSpeed: 90,
  backDelay: 1000,
  loop: true
});

/* ===== SEÇÃO: ENVIAR EMAIL ===== */
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Evita recarregar a página

  // Coleta dados do formulário
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Seleciona elementos de mensagem
  const msgElem = document.getElementById("responseMsg");
  const iconElem = msgElem.querySelector(".icon");
  const textElem = msgElem.querySelector(".text");

  try {
    const res = await fetch("/send_email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // Processa resposta
    const data = await res.json();

    // Remove classes anteriores
    msgElem.className = "";

    // Define estilo conforme status
    if (data.status === "success") {
      msgElem.classList.add("success");
      iconElem.textContent = "✅";
      e.target.reset();
    } else {
      msgElem.classList.add("error");
      iconElem.textContent = "❌";
    }

    textElem.textContent = data.message;
    msgElem.classList.add("show");

    setTimeout(() => {
      msgElem.classList.remove("show");
    }, 4000);

  } catch {
    msgElem.className = "error show";
    iconElem.textContent = "❌";
    textElem.textContent = "Erro de conexão com o servidor.";
    setTimeout(() => {
      msgElem.classList.remove("show");
    }, 4000);
  }
});

// Configuração inicial do ScrollReveal
ScrollReveal().reveal('#responseMsg', {
  origin: 'bottom',       // vem de baixo
  distance: '30px',       // deslocamento
  duration: 600,          // tempo da animação
  delay: 100,             // pequeno atraso
  easing: 'ease-out',
  reset: true             // para que possa animar novamente se aparecer de novo
});
