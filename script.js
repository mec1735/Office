document.addEventListener('DOMContentLoaded', function () {
    // Abas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Animação entrada
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const animatedElements = document.querySelectorAll('.feature-card, .main-title, .subtitle, .device-text, .license-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Paralaxe mouse
    document.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const macbookMockup = document.querySelector('.macbook-mockup');
        if (macbookMockup) {
            macbookMockup.style.transform = `perspective(1000px) rotateY(${(mouseX - 0.5) * 20 - 15}deg) rotateX(${(mouseY - 0.5) * 20 + 5}deg)`;
        }

        const floatingMacbook = document.querySelector('.floating-macbook');
        if (floatingMacbook) {
            floatingMacbook.style.transform = `translate(${(mouseX - 0.5) * 10}px, ${(mouseY - 0.5) * 10}px)`;
        }
    });

    // Ripple efeito nos botões
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            ripple.classList.add('ripple');
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Logo animação
    const logoCircle = document.querySelector('.logo-circle');
    if (logoCircle) {
        logoCircle.addEventListener('mouseenter', () => logoCircle.style.animationDuration = '2s');
        logoCircle.addEventListener('mouseleave', () => logoCircle.style.animationDuration = '6s');
    }

    // Animação carregamento
    setTimeout(() => document.body.classList.add('loaded'), 100);

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// ✅ WhatsApp com link curto (limpo, sem código antigo)
function openWhatsApp() {
    window.open("https://w.app/r8kbbw", "_blank");
}

// ✅ Link de download
function downloadProgram(version) {
    const msg = encodeURIComponent('Aproveite a promoção e obtenha a licença.');
    const link = `https://drive.google.com/file/d/1J5iHu7BK8jmmj47J4L2v43rTEzHVYyhK/view?usp=drivesdk#:~:text=na%20Mac%20App-,Store,-6%20apps%20neste?text=${msg}`;

    if (version === 'mac_until_12') {
        alert("Download para Mac até 12 iniciado!\n\nClick em OK.");
    } else if (version === 'mac_12_onwards') {
        alert("Download para Mac 12 em diante iniciado!\n\nClick em OK.");
    }

    window.open(link, "_blank");
}

// Botão de suporte
function openSupport() {
    openWhatsApp();
}

// ✅ CSS embutido
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
