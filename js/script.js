// NIKAHFLIX Wedding Invitation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loadingScreen = document.getElementById('loading-screen');
    const mainContainer = document.getElementById('main-container');
    const musicBtn = document.getElementById('musicBtn');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const netflixNav = document.querySelector('.netflix-nav');
    
    // Music control state
    let isPlaying = false;
    
    // Initialize loading screen
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContainer.classList.remove('hidden');
            initializeAnimations();
        }, 500);
    }, 3000);
    
    // Start invitation function
    window.startInvitation = function() {
        document.getElementById('couple').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Show navigation
        setTimeout(() => {
            netflixNav.classList.add('visible');
        }, 500);
        
        // Try to play music
        if (backgroundMusic.src) {
            playMusic();
        }
    };
    
    // Music control
    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });
    
    function playMusic() {
        if (backgroundMusic.src) {
            backgroundMusic.play().then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<span class="music-icon">⏸️</span>';
            }).catch(error => {
                console.log('Error playing music:', error);
                // Show message about music file
                showMusicMessage();
            });
        } else {
            showMusicMessage();
        }
    }
    
    function pauseMusic() {
        backgroundMusic.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
    }
    
    function showMusicMessage() { 
               alert("Untuk memutar musik, silakan pastikan file audio 'AdmeshAnugrahTerindah.mp3' ada di folder audio/");    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
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
    
    // Scroll animations
    function initializeAnimations() {
        const animatedElements = document.querySelectorAll('.section, .couple-card, .story-item, .event-card, .gallery-item');
        
        animatedElements.forEach(element => {
            element.classList.add('animate-on-scroll');
        });
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Navbar scroll behavior
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show/hide navbar based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            netflixNav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            if (netflixNav.classList.contains('visible')) {
                netflixNav.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
        
        // Change navbar background on scroll
        if (scrollTop > 50) {
            netflixNav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            netflixNav.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });
    
    // Gallery lightbox effect
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Here you can add lightbox functionality
            // For now, just show an alert
            alert('Lightbox akan menampilkan gambar dalam ukuran penuh. Tambahkan gambar ke placeholder ini.');
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Countdown Timer
    const countdownDate = new Date("August 9, 2025 10:00:00").getTime();
    
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").innerHTML = String(days).padStart(2, '0');
        document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("days").innerHTML = "00";
            document.getElementById("hours").innerHTML = "00";
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerHTML = "00";
            document.querySelector(".movie-subtitle").innerHTML = "Our Story Has Begun!";
            document.querySelector(".movie-meta").style.display = "none";
            document.querySelector(".countdown-timer").style.display = "none";
        }
    }, 1000);
    
    // Add typing effect to movie title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = "";
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize typing effect after loading
    setTimeout(() => {
        const movieTitle = document.querySelector(".movie-title");
        if (movieTitle) {
            const originalText = movieTitle.textContent;
            typeWriter(movieTitle, originalText, 150);
        }
    }, 3500);
    
    // Add click sound effect
    function playClickSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            // Silently fail if Web Audio API is not supported
        }
    }
    
    // Add click sound to buttons
    document.querySelectorAll('button, .nav-link, .location-btn').forEach(element => {
        element.addEventListener('click', playClickSound);
    });
    
    // Auto-play music attempt on user interaction
    let userInteracted = false;
    
    function enableAutoPlay() {
        if (!userInteracted) {
            userInteracted = true;
            // Try to play music after user interaction
            setTimeout(() => {
                if (!isPlaying && backgroundMusic.src) {
                    playMusic();
                }
            }, 1000);
        }
    }
    
    // Listen for user interactions
    ['click', 'touchstart', 'keydown'].forEach(event => {
        document.addEventListener(event, enableAutoPlay, { once: true });
    });
    
    // Add Netflix-style loading dots
    function addLoadingDots() {
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) {
            let dots = '';
            setInterval(() => {
                dots = dots.length >= 3 ? '' : dots + '.';
                loadingText.textContent = `Loading your love story${dots}`;
            }, 500);
        }
    }
    
    addLoadingDots();
    
    // Console Easter Egg
    console.log(`
    🎬 NIKAHFLIX WEDDING INVITATION 🎬
    
    Putri & Recky
    09 Agustus 2025
    
    "Sebelum Hari H"
    
    Made with ❤️ and Netflix vibes
    
    Placeholder images and videos ready for your content!
    `);
    

});

