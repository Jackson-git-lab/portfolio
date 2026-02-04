// JAVASCRIPT - INTERACTIONS ET ANIMATIONS

// Attendre que la page soit complètement chargée
document.addEventListener('DOMContentLoaded', function() {
    
    // RECUPERER LES ELEMENTS DU DOM
    const contactModal = document.getElementById('contactModal');
    const messageModal = document.getElementById('messageModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    const contactBtn = document.getElementById('contactBtn');
    const passionBtn = document.getElementById('passionBtn');
    
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // Elements du menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // MENU MOBILE HAMBURGER
    menuToggle.addEventListener('click', function() {
        // Basculer la classe 'active' sur le bouton et le menu
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Empêcher le scroll du body quand le menu est ouvert
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fermer le menu mobile au clic sur un lien
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Fermer le menu mobile si on clique en dehors
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // FONCTION POUR AFFICHER LE MODAL DE MESSAGE
    function showMessageModal(title, message) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        messageModal.style.display = 'block';
    }
    
    // FONCTION POUR AFFICHER LE MODAL DE CONTACT
    function showContactModal() {
        contactModal.style.display = 'block';
        // Réinitialiser le formulaire
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
    }
    
    // FONCTION POUR FERMER LES MODALS
    function hideModal(modal) {
        modal.style.display = 'none';
    }
    
    // BOUTON "ME CONTACTER" - Affiche le formulaire
    contactBtn.addEventListener('click', function() {
        showContactModal();
    });
    
    // BOUTON "ÉCHANGER ENSEMBLE" - Affiche un message
    passionBtn.addEventListener('click', function() {
        showMessageModal(
            'Apprenons ensemble',
            'Super ! Vous apprenez aussi la programmation ? On peut échanger nos expériences, partager des ressources et progresser ensemble. N\'hésitez pas à me contacter en utilisant le formulaire de contact !'
        );
    });
    
    // SOUMISSION DU FORMULAIRE DE CONTACT
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simulation d'envoi 
        console.log('Formulaire soumis:', { name, email, message });
        
        // Masquer le formulaire et afficher le message de succès
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Fermer automatiquement après 4 secondes
        setTimeout(function() {
            hideModal(contactModal);
        }, 4000);
    });
    
    // FERMER LES MODALS AU CLIC SUR LE X
    closeModals.forEach(function(closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });
    
    // FERMER LES MODALS AU CLIC EN DEHORS
    window.addEventListener('click', function(event) {
        if (event.target === contactModal) {
            hideModal(contactModal);
        }
        if (event.target === messageModal) {
            hideModal(messageModal);
        }
    });
    
    // ANIMATION DES BARRES DE COMPETENCES
    function animateSkills() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(function(skill) {
            const targetWidth = skill.getAttribute('data-width') || skill.style.width;
            skill.style.width = '0';
            
            setTimeout(function() {
                skill.style.width = targetWidth + '%';
            }, 100);
        });
    }
     
    // OBSERVER POUR ANIMER AU SCROLL
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Animer les compétences quand la section est visible
                if (entry.target.classList.contains('about-skills')) {
                    animateSkills();
                }
                
                // Ajouter une classe pour les animations CSS
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observer les sections à animer
    const sectionsToAnimate = document.querySelectorAll('.about-skills, .goal-card, .passion-intro');
    sectionsToAnimate.forEach(function(section) {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // SMOOTH SCROLL POUR LA NAVIGATION
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 80px pour la navbar fixe
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // EFFET DE PARALLAXE LEGER SUR LE HERO
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });
    
    // ANIMATION D'ENTREE AU CHARGEMENT
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
    
    // VALIDATION DU FORMULAIRE EN TEMPS REEL
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const emailValue = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailValue && !emailRegex.test(emailValue)) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '#2196F3';
            }
        });
    }
    
    // COMPTEUR D'ANIMATION POUR LES CARTES
    const goalCards = document.querySelectorAll('.goal-card');
    
    goalCards.forEach(function(card, index) {
        card.style.animationDelay = (index * 0.1) + 's';
    });
    
    
    console.log('Portfolio chargé avec succès ! 🚀');
});

// STYLE POUR L'OPACITÉ INITIALE DU BODY
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';