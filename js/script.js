// Wedding Invitation JavaScript - Interactive Features & Animations

$(document).ready(function () {
    // Initialize all features
    initCountdownTimer();
    initScrollAnimations();
    initInteractiveElements();
    initParallaxEffects();
    initSoundEffects();
});

// Countdown Timer Functionality
function initCountdownTimer() {
    // Set the wedding date (October 13, 2025)
    const weddingDate = new Date('October 13, 2025 20:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Update the countdown display with animation
            animateNumberUpdate('#days', days);
            animateNumberUpdate('#hours', hours);
            animateNumberUpdate('#minutes', minutes);
            animateNumberUpdate('#seconds', seconds);
        } else {
            // Wedding day has arrived!
            $('#countdown').html('<div class="wedding-day-message">🎉 The Big Day is Here! 🎉</div>');
        }
    }

    // Update number values directly without fade-in animation
    function animateNumberUpdate(selector, newValue) {
        const element = $(selector);
        const currentValue = parseInt(element.text());

        if (currentValue !== newValue) {
            element.text(newValue);
        }
    }

    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Scroll Animations
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    $('.event-card, .section-title, .main-message, .venue-btn, .contact-btn').each(function () {
        observer.observe(this);
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Event card hover effects - removed to allow CSS transitions to work smoothly
    $('.event-card').hover(
        function () {
            // Add subtle sound effect (if enabled)
            playHoverSound();
        },
        function () {
            // Hover out - no class manipulation needed
        }
    );

    // Button click effects
    $('.venue-btn, .contact-btn').on('click', function () {
        $(this).addClass('button-click');
        setTimeout(() => {
            $(this).removeClass('button-click');
        }, 200);
        playClickSound();
    });

    // Ganesh image click effect
    $('.ganesh-image').on('click', function () {
        $(this).addClass('ganesh-blessing');
        setTimeout(() => {
            $(this).removeClass('ganesh-blessing');
        }, 1000);
        showBlessingMessage();
    });

    // Countdown timer pulse effect
    setInterval(() => {
        $('.time-unit').addClass('timer-pulse');
        setTimeout(() => {
            $('.time-unit').removeClass('timer-pulse');
        }, 500);
    }, 10000); // Every 10 seconds
}

// Parallax Effects
function initParallaxEffects() {
    $(window).on('scroll', function () {
        const scrolled = $(window).scrollTop();
        const parallaxSpeed = 0.5;

        // Parallax effect for background elements
        $('.floating-hearts').css('transform', `translateY(${scrolled * parallaxSpeed}px)`);
        $('.sparkles').css('transform', `translateY(${scrolled * -parallaxSpeed}px)`);

        // Fade in/out effect for main container
        const container = $('.invitation-container');
        const containerTop = container.offset().top;
        const windowHeight = $(window).height();

        if (scrolled > containerTop - windowHeight) {
            container.addClass('container-visible');
        }
    });
}

// Sound Effects (Optional - can be disabled)
function initSoundEffects() {
    // Create audio context for sound effects
    let audioContext;

    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
        return;
    }

    // Enable sound on first user interaction
    $(document).one('click touchstart', function () {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    });
}

function playHoverSound() {
    // Subtle hover sound effect
    if (typeof audioContext !== 'undefined' && audioContext.state === 'running') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

function playClickSound() {
    // Click sound effect
    if (typeof audioContext !== 'undefined' && audioContext.state === 'running') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.2);

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
}

// Blessing Message Effect
function showBlessingMessage() {
    const blessingMessages = [
        "Jai Ganesha! 🙏",
        "Blessings for the couple! ✨",
        "May Lord Ganesha bless this union! 🕉️",
        "Divine blessings! 🌟"
    ];

    const randomMessage = blessingMessages[Math.floor(Math.random() * blessingMessages.length)];

    // Create temporary blessing message
    const blessingDiv = $('<div class="blessing-message">' + randomMessage + '</div>');
    $('body').append(blessingDiv);

    // Animate the message
    blessingDiv.css({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(212, 175, 55, 0.95)',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '25px',
        fontSize: '1.2rem',
        fontWeight: '600',
        zIndex: 9999,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        opacity: 0,
        scale: 0.5
    });

    // Animate in
    blessingDiv.animate({
        opacity: 1
    }, 300).css('transform', 'translate(-50%, -50%) scale(1)');

    // Animate out and remove
    setTimeout(() => {
        blessingDiv.animate({
            opacity: 0
        }, 300, function () {
            $(this).remove();
        }).css('transform', 'translate(-50%, -50%) scale(0.5)');
    }, 2000);
}

// Utility Functions
function formatTime(value) {
    return value < 10 ? '0' + value : value;
}

// Add CSS for JavaScript animations
const additionalCSS = `
    
    .button-click {
        transform: scale(0.95) !important;
    }
    
    .ganesh-blessing {
        animation: ganeshGlow 1s ease-in-out;
    }
    
    @keyframes ganeshGlow {
        0%, 100% { 
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            filter: brightness(1);
        }
        50% { 
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.8);
            filter: brightness(1.2);
        }
    }
    
    .timer-pulse {
        animation: timerPulse 0.5s ease-in-out;
    }
    
    @keyframes timerPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .container-visible {
        animation: containerFadeIn 1s ease-out;
    }
    
    @keyframes containerFadeIn {
        from { opacity: 0.8; }
        to { opacity: 1; }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .wedding-day-message {
        font-family: 'Dancing Script', cursive;
        font-size: 2rem;
        color: #8B0000;
        text-align: center;
        padding: 20px;
        background: linear-gradient(135deg, #F4E4BC, #FFF8DC);
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        animation: celebration 2s ease-in-out infinite;
    }
    
    @keyframes celebration {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .blessing-message {
        font-family: 'Dancing Script', cursive;
        animation: blessingFloat 2s ease-in-out;
    }
    
    @keyframes blessingFloat {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        20% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
    }
`;

// Inject additional CSS
$('<style>').text(additionalCSS).appendTo('head');

// Performance optimization
$(window).on('load', function () {
    // Preload critical images
    const criticalImages = [
        './assets/img/ganesh.png',
        './assets/img/favicon.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Add loaded class to body for any final animations
    $('body').addClass('page-loaded');
});

// Error handling
window.addEventListener('error', function (e) {
    console.log('JavaScript error:', e.error);
    // Gracefully handle errors without breaking the invitation
});

// Mobile touch optimizations
if ('ontouchstart' in window) {
    $('body').addClass('touch-device');

    // Add touch-specific styles
    $('<style>').text(`
        .touch-device .event-card:hover {
            transform: none;
        }
        .touch-device .venue-btn:hover,
        .touch-device .contact-btn:hover {
            transform: none;
        }
    `).appendTo('head');
}
