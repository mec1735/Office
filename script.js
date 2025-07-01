// Funcionalidades do site OneDrive para MacBook
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuração das abas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos elementos
    const animatedElements = document.querySelectorAll('.feature-card, .main-title, .subtitle, .device-text, .license-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efeito de paralaxe no mouse
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const macbookMockup = document.querySelector('.macbook-mockup');
        if (macbookMockup) {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            macbookMockup.style.transform = `perspective(1000px) rotateY(${-15 + moveX}deg) rotateX(${5 + moveY}deg)`;
        }
        
        const floatingMacbook = document.querySelector('.floating-macbook');
        if (floatingMacbook) {
            const moveX2 = (mouseX - 0.5) * 10;
            const moveY2 = (mouseY - 0.5) * 10;
            floatingMacbook.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
        }
    });

    // Animação dos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Criar efeito de ripple
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Animação do logo
    const logoCircle = document.querySelector('.logo-circle');
    if (logoCircle) {
        logoCircle.addEventListener('mouseenter', function() {
            this.style.animationDuration = '2s';
        });
        
        logoCircle.addEventListener('mouseleave', function() {
            this.style.animationDuration = '6s';
        });
    }

    // Adicionar classe para animação de carregamento
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Smooth scroll para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Função para download do programa
function downloadProgram(version) {
    let downloadLink = "#"; // Placeholder padrão
    if (version === 'mac_until_12') {
        downloadLink = "https://drive.google.com/drive/folders/1BZPxv9jSrWs87JFkq9IIDcwlG50P_nS8"; // Click em OK
        alert("Download para Mac até 12 iniciado!\n\nClick em OK.");
    } else if (version === 'mac_12_onwards') {
        downloadLink = "https://drive.google.com/drive/folders/1Lo2gtDwXzdaHj9eqKStMjX9HEyXDdos8"; // Click em OK
        alert("Download para Mac 12 em diante iniciado!\n\nClick em OK.");
    }
    window.open(downloadLink, "_blank");
}

// Função para abrir WhatsApp
function openWhatsApp() {
    const phoneNumber = '5562992053928';
    const message = encodeURIComponent('Olá! Gostaria de obter informações sobre o Office para MacBook.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}
// Função para abrir suporte
function openSupport() {
    openWhatsApp();
}

// CSS para o efeito ripple e outras animações
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    /* Animações adicionais para elementos interativos */
    .feature-card:hover .feature-icon-large {
        animation: bounceHover 0.6s ease;
    }
    
    @keyframes bounceHover {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-15px); }
        60% { transform: translateY(-8px); }
    }
    
    .qr-container:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
    
    .floating-macbook:hover .floating-image {
        transform: scale(1.02);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

