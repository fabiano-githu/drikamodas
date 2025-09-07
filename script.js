// Variáveis globais
let currentSlideIndex = 0;
let currentTestimonialIndex = 0;
let slideInterval;
let testimonialInterval;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeTestimonials();
    initializeNavigation();
    initializeDogAvatar();
    initializeScrollEffects();
});

// Funcionalidades do Carrossel
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Auto-play do carrossel
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    // Pausar auto-play quando hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove classe active do slide atual
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Calcula o próximo slide
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // Adiciona classe active ao novo slide
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function currentSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove classe active de todos
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Define o novo índice
    currentSlideIndex = index - 1;
    
    // Adiciona classe active ao slide selecionado
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

// Funcionalidades dos Depoimentos
function initializeTestimonials() {
    // Auto-play dos depoimentos
    testimonialInterval = setInterval(() => {
        nextTestimonial();
    }, 4000);
}

function currentTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    // Remove classe active de todos
    testimonials[currentTestimonialIndex].classList.remove('active');
    dots[currentTestimonialIndex].classList.remove('active');
    
    // Define o novo índice
    currentTestimonialIndex = index - 1;
    
    // Adiciona classe active ao depoimento selecionado
    testimonials[currentTestimonialIndex].classList.add('active');
    dots[currentTestimonialIndex].classList.add('active');
}

function nextTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    // Remove classe active do atual
    testimonials[currentTestimonialIndex].classList.remove('active');
    dots[currentTestimonialIndex].classList.remove('active');
    
    // Próximo depoimento
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    
    // Adiciona classe active ao novo
    testimonials[currentTestimonialIndex].classList.add('active');
    dots[currentTestimonialIndex].classList.add('active');
}

// Navegação Mobile
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll para links internos
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Avatar do Cachorro Interativo
function initializeDogAvatar() {
    const dogAvatar = document.getElementById('dogAvatar');
    let clickCount = 0;
    
    dogAvatar.addEventListener('click', () => {
        clickCount++;
        
        // Diferentes animações baseadas no número de cliques
        switch(clickCount % 4) {
            case 1:
                dogAvatar.style.animation = 'bounce 0.6s ease-in-out';
                showDogMessage('Woof! 🐕');
                break;
            case 2:
                dogAvatar.style.animation = 'spin 0.8s ease-in-out';
                showDogMessage('Que legal! 🎾');
                break;
            case 3:
                dogAvatar.style.animation = 'shake 0.6s ease-in-out';
                showDogMessage('Amo roupinhas! 👕');
                break;
            case 0:
                dogAvatar.style.animation = 'heartbeat 0.8s ease-in-out';
                showDogMessage('Dricamodapet é o máximo! ❤️');
                break;
        }
        
        // Reset da animação após completar
        setTimeout(() => {
            dogAvatar.style.animation = '';
        }, 1000);
    });
    
    // Animação de entrada quando a página carrega
    setTimeout(() => {
        dogAvatar.style.transform = 'translateX(100px)';
        dogAvatar.style.opacity = '0';
        dogAvatar.style.transition = 'all 1s ease-out';
        
        setTimeout(() => {
            dogAvatar.style.transform = 'translateX(0)';
            dogAvatar.style.opacity = '1';
        }, 500);
    }, 2000);
}

function showDogMessage(message) {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.dog-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Cria nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = 'dog-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        bottom: 120px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b6b, #feca57);
        color: white;
        padding: 10px 15px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        z-index: 1001;
        animation: messageSlideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'messageSlideOut 0.3s ease-in';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

// Efeitos de Scroll
function initializeScrollEffects() {
    // Navbar transparente/sólida baseada no scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Animações de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.product-card, .about-text, .about-image');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Funcionalidades adicionais
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.carousel-slide img');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Adicionar CSS para animações extras
const additionalStyles = `
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(0); }
        40% { transform: translateY(-20px); }
        80% { transform: translateY(-10px); }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    @keyframes messageSlideIn {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes messageSlideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(50px);
        }
    }
`;

// Adicionar estilos extras ao head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Função para scroll suave para o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Adicionar botão de voltar ao topo (opcional)
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 120px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollButton);
    
    scrollButton.addEventListener('click', scrollToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(20px)';
        }
    });
}

// Inicializar funcionalidades extras
document.addEventListener('DOMContentLoaded', () => {
    addScrollToTopButton();
    addParallaxEffect();
});

// Prevenção de comportamentos indesejados
document.addEventListener('contextmenu', (e) => {
    // Permitir menu de contexto normalmente
});

// Otimização de performance
let ticking = false;

function updateOnScroll() {
    // Código de scroll otimizado aqui
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg ativado!
        showDogMessage('Código secreto ativado! 🎉');
        document.body.style.animation = 'rainbow 2s ease-in-out';
        
        // Adicionar efeito rainbow
        const rainbowStyle = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        
        const rainbowSheet = document.createElement('style');
        rainbowSheet.textContent = rainbowStyle;
        document.head.appendChild(rainbowSheet);
        
        setTimeout(() => {
            document.body.style.animation = '';
            rainbowSheet.remove();
        }, 2000);
        
        konamiCode = [];
    }
});

