/**
 * Arquivo JavaScript para o site de portfólio
 * Implementa funcionalidades interativas e validação de formulário
 */

// Espera o DOM ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    
  // ===== FILTRAGEM DE PROJETOS NO PORTFÓLIO =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  // Adiciona listeners aos botões de filtro na página de portfólio
  if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
          button.addEventListener('click', () => {
              // Remove a classe active de todos os botões
              filterButtons.forEach(btn => btn.classList.remove('active'));
              // Adiciona a classe active ao botão clicado
              button.classList.add('active');
              
              const filterValue = button.getAttribute('data-filter');
              
              // Filtra os itens do portfólio
              portfolioItems.forEach(item => {
                  if (filterValue === 'all') {
                      item.style.display = 'block';
                  } else if (item.getAttribute('data-category') === filterValue) {
                      item.style.display = 'block';
                  } else {
                      item.style.display = 'none';
                  }
              });
          });
      });
  }
  
  // ===== VALIDAÇÃO DO FORMULÁRIO DE CONTATO =====
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();
          
          // Obtém os valores dos campos
          const nome = document.getElementById('nome').value.trim();
          const email = document.getElementById('email').value.trim();
          const assunto = document.getElementById('assunto').value.trim();
          const mensagem = document.getElementById('mensagem').value.trim();
          
          // Validação básica
          let isValid = true;
          let errorMessage = '';
          
          if (nome === '') {
              isValid = false;
              errorMessage += 'Por favor, informe seu nome.\n';
              document.getElementById('nome').classList.add('error');
          } else {
              document.getElementById('nome').classList.remove('error');
          }
          
          if (email === '') {
              isValid = false;
              errorMessage += 'Por favor, informe seu e-mail.\n';
              document.getElementById('email').classList.add('error');
          } else if (!isValidEmail(email)) {
              isValid = false;
              errorMessage += 'Por favor, informe um e-mail válido.\n';
              document.getElementById('email').classList.add('error');
          } else {
              document.getElementById('email').classList.remove('error');
          }
          
          if (assunto === '') {
              isValid = false;
              errorMessage += 'Por favor, informe o assunto.\n';
              document.getElementById('assunto').classList.add('error');
          } else {
              document.getElementById('assunto').classList.remove('error');
          }
          
          if (mensagem === '') {
              isValid = false;
              errorMessage += 'Por favor, escreva sua mensagem.\n';
              document.getElementById('mensagem').classList.add('error');
          } else {
              document.getElementById('mensagem').classList.remove('error');
          }
          
          if (isValid) {
              // Aqui normalmente enviaria os dados para o servidor
              // Como é apenas visual, exibimos uma mensagem de sucesso
              alert('Mensagem enviada com sucesso! Obrigado por entrar em contato.');
              contactForm.reset();
          } else {
              alert(errorMessage);
          }
      });
  }
  
  // Função para validar formato de e-mail
  function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }
  
  // ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          
          // Verifica se é um link de âncora interno
          if (href.startsWith('#') && href.length > 1) {
              e.preventDefault();
              
              const targetElement = document.querySelector(href);
              if (targetElement) {
                  window.scrollTo({
                      top: targetElement.offsetTop,
                      behavior: 'smooth'
                  });
              }
          }
      });
  });
  
  // ===== DESTAQUE DO MENU ATIVO =====
  // Obtém o caminho da página atual
  const currentPage = window.location.pathname.split('/').pop();
  
  // Realça o link de navegação correspondente à página atual
  navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html')) {
          link.classList.add('active');
      } else {
          link.classList.remove('active');
      }
  });
});

// ===== ANIMAÇÃO AO ROLAR A PÁGINA =====
// Implementa animação simples para elementos que entram na viewport
window.addEventListener('scroll', function() {
  const animatedElements = document.querySelectorAll('.skill-card, .portfolio-item, .education-card, .course-card');
  
  animatedElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
          element.classList.add('animated');
      }
  });
});