// ============================================
// INICIALIZACIÓN PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("🎂 Página de Sandi cargada - ¡Feliz 19!");
    
    // 1. PARTÍCULAS
    initParticles();
    
    // 2. COUNTDOWN
    initCountdown();
    
    // 3. MODO FIESTA
    initPartyMode();
    
    // 4. NAVEGACIÓN
    initNavigation();
    
    // 5. GALERÍA
    initGallery();
    
    // 6. TRIVIA
    initTrivia();
    
    // 7. SORPRESA
    initSurprise();
    
    // 8. MENSAJES
    initMessages();
    
    // 9. EFECTOS ESPECIALES
    initSpecialEffects();
    
    // 10. REPRODUCTOR DE MÚSICA - ¡NUEVO Y FUNCIONAL!
    initMusicPlayer();
    // 11. LAYOUT GALERÍA DE VIDEO (auto)
    initVideoGalleryLayout();
    // 12. AUTOPLAY VIDEOS (muted to satisfy browser policies)
    initVideoAutoplay();
});

// ============================================
// AUTOPLAY VIDEO GALLERY
// ============================================
function initVideoAutoplay() {
    const gallery = document.querySelector('.video-gallery');
    if (!gallery) return;

    const videos = gallery.querySelectorAll('video');
    if (!videos || videos.length === 0) return;

    // Try to autoplay each video muted. Browsers allow muted autoplay.
    videos.forEach(video => {
        try {
            video.muted = true;
            video.playsInline = true;
            video.autoplay = true;
            // set preload to metadata to avoid double requests
            video.setAttribute('preload', 'metadata');
            // attempt to play; if blocked, it will fail silently
            const p = video.play();
            if (p && p.then) p.catch(() => {});
        } catch (e) {
            console.warn('Autoplay attempt failed for a video', e);
        }
    });

    // On first user gesture, unmute all videos so sound works
    function onFirstGesture() {
        videos.forEach(v => {
            try {
                v.muted = false;
            } catch (e) {}
        });
        window.removeEventListener('click', onFirstGesture);
        window.removeEventListener('keydown', onFirstGesture);
    }

    window.addEventListener('click', onFirstGesture);
    window.addEventListener('keydown', onFirstGesture);
}

// ============================================
// 1. PARTÍCULAS (igual que antes)
// ============================================

function initParticles() {
    if (typeof particlesJS === 'function') {
        particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: ["#ff0080", "#00bcd4", "#ffeb3b"] },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
}

// ============================================
// 2. COUNTDOWN (igual que antes)
// ============================================

function initCountdown() {
    function updateCountdown() {
        const targetDate = new Date("2024-10-15T00:00:00").getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const daysEl = document.getElementById("days");
            const hoursEl = document.getElementById("hours");
            const minutesEl = document.getElementById("minutes");
            const secondsEl = document.getElementById("seconds");
            
            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        } else {
            const countdownEl = document.getElementById("countdown");
            if (countdownEl) {
                countdownEl.innerHTML = "<h2>¡HOY ES EL GRAN DÍA! 🎉</h2>";
            }
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// ============================================
// 3. MODO FIESTA (igual que antes)
// ============================================

function initPartyMode() {
    const partyModeBtn = document.getElementById("partyModeBtn");
    if (!partyModeBtn) return;
    
    let partyMode = false;

    partyModeBtn.addEventListener("click", function() {
        partyMode = !partyMode;
        document.body.classList.toggle("party-mode");
        
        if (partyMode) {
            partyModeBtn.innerHTML = '<i class="fas fa-times"></i> APAGAR FIESTA';
            // Agregar más confetti
            for (let i = 0; i < 50; i++) {
                createConfetti();
            }
            // Sonido de fiesta
            playPartySound();
        } else {
            partyModeBtn.innerHTML = '<i class="fas fa-party-horn"></i> MODO FIESTA';
        }
    });

    function createConfetti() {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.width = Math.random() * 15 + 5 + "px";
        confetti.style.height = Math.random() * 15 + 5 + "px";
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
        
        const hero = document.querySelector(".hero");
        if (hero) {
            hero.appendChild(confetti);
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 5000);
        }
    }
}

// ============================================
// 4. NAVEGACIÓN SUAVE (igual que antes)
// ============================================

function initNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });
}

// ============================================
// 5. GALERÍA INTERACTIVA (igual que antes)
// ============================================

function initGallery() {
    // Galería interactiva
    const galleryImages = document.querySelectorAll(".gallery-img");
    galleryImages.forEach(img => {
        img.addEventListener("click", function() {
            const modal = document.createElement("div");
            modal.style.position = "fixed";
            modal.style.top = "0";
            modal.style.left = "0";
            modal.style.width = "100%";
            modal.style.height = "100%";
            modal.style.backgroundColor = "rgba(0,0,0,0.9)";
            modal.style.zIndex = "10000";
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";
            
            const modalImg = document.createElement("img");
            modalImg.src = this.src;
            modalImg.style.maxWidth = "90%";
            modalImg.style.maxHeight = "90%";
            modalImg.style.borderRadius = "10px";
            modalImg.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.addEventListener("click", function() {
                document.body.removeChild(modal);
            });
        });
    });

    // Controles de galería
    let currentGalleryIndex = 0;
    const photoCards = document.querySelectorAll(".photo-card");

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    
    if (nextBtn) {
        nextBtn.addEventListener("click", function() {
            if (photoCards.length > 0) {
                photoCards[currentGalleryIndex].style.display = "none";
                currentGalleryIndex = (currentGalleryIndex + 1) % photoCards.length;
                photoCards[currentGalleryIndex].style.display = "block";
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener("click", function() {
            if (photoCards.length > 0) {
                photoCards[currentGalleryIndex].style.display = "none";
                currentGalleryIndex = (currentGalleryIndex - 1 + photoCards.length) % photoCards.length;
                photoCards[currentGalleryIndex].style.display = "block";
            }
        });
    }
}

// ============================================
// 6. TRIVIA GAME (igual que antes)
// ============================================

function initTrivia() {
    const questions = [
        {
            question: "¿A Sandra le gusta usar mas de vestimenta .......?",
            options: ["Faldas", "Pantalones", "Shorts", "Vestidos"],
            correct: 0
        },
        {
            question: "¿Qué música le gusta más a Sandra?",
            options: ["Rock", "Pop", "Reggaetón", "Baladas"],
            correct: 1
        },
        {
            question: "¿Cuál es su comida favorita?",
            options: ["Pizza", "Sushi", "Hamburguesa", "Tacos"],
            correct: 1
        },
        {
            question: "¿Que materias le gusta enseñar mas?",
            options: ["Lenguaje", "Teatro", "Matemáticas", "Ninguno"],
            correct: 2
        },
        {
            question: "¿Cuál es su sueño más grande?",
            options: ["Viajar por el mundo", "Tener su negocio", "Ser famosa", "Ninguno"],
            correct: 0
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function loadQuestion() {
        const q = questions[currentQuestion];
        const questionEl = document.getElementById("question");
        if (questionEl) {
            questionEl.textContent = q.question;
        }
        
        const options = document.querySelectorAll(".option");
        options.forEach((option, index) => {
            option.textContent = q.options[index];
            option.classList.remove("correct", "wrong");
            option.disabled = false;
        });
        
        updateProgress();
    }

    function updateProgress() {
        const scoreEl = document.getElementById("score");
        const progressEl = document.getElementById("triviaProgress");
        
        if (scoreEl) scoreEl.textContent = score;
        if (progressEl) progressEl.value = currentQuestion;
    }

    document.querySelectorAll(".option").forEach((option, index) => {
        option.addEventListener("click", function() {
            const correctIndex = questions[currentQuestion].correct;
            
            if (index === correctIndex) {
                this.classList.add("correct");
                score++;
                showNotification("¡Correcto! 🎉", "success");
            } else {
                this.classList.add("wrong");
                const correctOption = document.querySelectorAll(".option")[correctIndex];
                if (correctOption) {
                    correctOption.classList.add("correct");
                }
                showNotification("¡Ups! No es correcto 😅", "error");
            }
            
            document.querySelectorAll(".option").forEach(opt => opt.disabled = true);
            
            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    loadQuestion();
                } else {
                    endTrivia();
                }
            }, 2000);
        });
    });

    const restartBtn = document.getElementById("restartTrivia");
    if (restartBtn) {
        restartBtn.addEventListener("click", function() {
            currentQuestion = 0;
            score = 0;
            loadQuestion();
        });
    }

    function endTrivia() {
        const questionEl = document.getElementById("question");
        const optionsEl = document.querySelector(".options");
        
        if (questionEl) {
            questionEl.textContent = `¡Juego terminado! Obtuviste ${score} de ${questions.length} puntos`;
        }
        
        if (optionsEl) {
            optionsEl.style.display = "none";
        }
        
        if (score >= 4) {
            showNotification("¡Eres un experto en Sandra! 🏆", "success");
        } else if (score >= 2) {
            showNotification("¡Buen trabajo! Conoces bastante 👍", "info");
        } else {
            showNotification("¡Necesitas conocer más a Sandra! 😉", "warning");
        }
    }

    // Cargar primera pregunta
    loadQuestion();
}

// ============================================
// 7. SORPRESA (igual que antes)
// ============================================

function initSurprise() {
    const revealBtn = document.getElementById("revealBtn");
    if (!revealBtn) return;
    
    revealBtn.addEventListener("click", function() {
        const secretMessages = [
            "🎉 ¡Sorpresa! Eres la persona más increíble que conocemos.",
            "✨ En cada momento a tu lado, la vida es más bonita.",
            "💖 Tu sonrisa ilumina hasta el día más gris.",
            "🌟 Tienes un corazón de oro y una fuerza admirable.",
            "🎂 Que tus 19 sean el inicio del mejor año de tu vida.",
            "🥳 ¡Eres pura energía positiva y alegría contagiosa!",
            "🎁 El mejor regalo eres tú en nuestras vidas.",
            "🔥 Tu pasión y determinación inspiran a todos.",
            "🌈 Que todos tus sueños se hagan realidad este año.",
            "👑 Porque mereces el mundo y mucho más."
        ];
        
        const randomMessage = secretMessages[Math.floor(Math.random() * secretMessages.length)];
        const secretMessageEl = document.getElementById("secretMessage");
        
        if (secretMessageEl) {
            secretMessageEl.textContent = randomMessage;
        }
        
        // Efecto visual
        this.style.background = "linear-gradient(45deg, #ffeb3b, #ff9800)";
        this.innerHTML = '<i class="fas fa-star"></i> ¡SORPRESA REVELADA!';
        this.disabled = true;
        
        showNotification("¡Mensaje secreto revelado! ✨", "success");
    });
}

// ============================================
// 8. MENSAJES (igual que antes)
// ============================================

function initMessages() {
    const addMessageBtn = document.getElementById("addMessageBtn");
    if (!addMessageBtn) return;
    
    addMessageBtn.addEventListener("click", function() {
        const name = prompt("¿Tu nombre?");
        if (!name) return;
        
        const message = prompt("¿Tu mensaje para Sandra?");
        if (!message) return;
        
        const messagesContainer = document.querySelector(".messages-container");
        if (messagesContainer) {
            const newMessage = document.createElement("div");
            newMessage.classList.add("message-card");
            newMessage.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="message-content">
                    <h4>${name}</h4>
                    <p>${message}</p>
                </div>
            `;
            
            messagesContainer.appendChild(newMessage);
            showNotification("¡Mensaje añadido! 👍", "success");
        }
    });
}

// ============================================
// 9. EFECTOS ESPECIALES (igual que antes)
// ============================================

function initSpecialEffects() {
    // Easter Egg: teclas S-A-N-D-R-A
    let sandraCode = [];
    const secretCode = "sandra";
    
    document.addEventListener("keydown", function(e) {
        sandraCode.push(e.key.toLowerCase());
        if (sandraCode.length > 6) sandraCode.shift();
        
        if (sandraCode.join("") === secretCode) {
            revealEasterEgg();
        }
    });

    function revealEasterEgg() {
        showNotification("¡Easter Egg descubierto! 🥚✨", "success");
        
        // Efecto especial
        document.body.style.animation = "partyBg 1s infinite";
        
        // Mostrar mensaje secreto
        const secretMessageEl = document.getElementById("secretMessage");
        if (secretMessageEl) {
            secretMessageEl.textContent = 
                "SANDRA: Eres más especial de lo que imaginas. Tu risa es contagiosa, tu corazón es enorme y tu futuro es brillante. ¡En tus 19, recuerda que el mundo es tuyo para conquistarlo! Te queremos más de lo que las palabras pueden expresar. 💖🎂🌟";
        }
        
        // Crear lluvia de corazones
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createHeart(), i * 100);
        }
        
        sandraCode = [];
    }

    function createHeart() {
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.style.position = "fixed";
        heart.style.top = "-50px";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 30 + 20 + "px";
        heart.style.zIndex = "1000";
        heart.style.animation = `fallHeart ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 5000);
    }

    // Efecto máquina de escribir para título
    const glitchTitle = document.querySelector(".title-glitch");
    if (glitchTitle) {
        const originalText = glitchTitle.textContent;
        glitchTitle.textContent = "";
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                glitchTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Añadir estilo para corazones
    const style = document.createElement("style");
    style.textContent = `
        @keyframes fallHeart {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes progressMove {
            0% { width: 0%; }
            100% { width: 100%; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// 10. REPRODUCTOR DE MÚSICA - ¡NUEVO Y FUNCIONAL!
// ============================================

let musicPlayer = null;

// Opcional: lista de rutas relativas a archivos de audio.
// Si subiste los MP3 al repositorio en la raíz, usa nombres como 'micancion.mp3'.
// Ejemplo: ['micancion.mp3', 'cancion1.mp3']
// Puedes dejarla vacía y seguir usando el botón "Añadir canciones".
const localTracks = [
    'micancion.mp3',
];

function initMusicPlayer() {
    console.log("🎵 Inicializando reproductor de música...");
    
    // Crear instancia del reproductor
    musicPlayer = new MusicPlayer();
    
    // Configurar controles
    setupPlayerControls();
    
    // Enlazar botones del DOM por id (si existen) para evitar depender solo de onclick inline
    bindPlayerControlsToElements();
    
    console.log("✅ Reproductor de música listo");
}

class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.playlist = [];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        
        // Configurar eventos
        this.setupAudioEvents();
        
        // Inicializar playlist
        this.initializePlaylist();
    }
    
    setupAudioEvents() {
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.nextTrack());
        this.audio.addEventListener('error', (e) => {
            console.error("Error de audio:", e);
            showNotification("Error al reproducir la canción - intentando siguiente", "error");
            setTimeout(() => this.nextTrack(), 300);
        });
    }
    
    initializePlaylist() {
        // PLAYLIST CON URLS QUE SÍ FUNCIONAN
        this.playlist = [
            {
                title: "¡Feliz Cumpleaños!:3 🎂",
                artist: "Para Sandi",
                file: "micancion.mp3",
                cover: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            },
            {
                title: "Música de Fiesta 🎉uwuwuwuwu",
                artist: "¡A celebrar!",
                file: "cancion1.mp3",
                cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            },
            {
                title: "Canción Romántica pa ti jjadkasdjkd💖",
                artist: "Para Sandi",
                file: "cancion2.mp3",
                cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            },
            
        ];
        
        // Añadir archivos locales listados en `localTracks` (rutas relativas)
        try {
            if (typeof localTracks !== 'undefined' && Array.isArray(localTracks) && localTracks.length > 0) {
                localTracks.forEach(p => {
                    // Evitar duplicados simples
                    if (!this.playlist.some(t => t.file === p)) {
                        const name = p.split('/').pop().replace(/\.[^/.]+$/, '');
                        this.playlist.push({
                            title: name,
                            artist: 'Local',
                            file: p,
                            cover: document.getElementById('currentCover') ? document.getElementById('currentCover').src : ''
                        });
                    }
                });
            }
        } catch (e) {
            console.warn('Error añadiendo localTracks:', e);
        }
        
        this.renderPlaylist();
        
        // Cargar primera canción
        if (this.playlist.length > 0) {
            this.loadTrack(0);
        }
    }
    
    async loadTrack(index) {
        if (index < 0 || index >= this.playlist.length) return;
        this.currentTrackIndex = index;
        const track = this.playlist[index];

        console.log(`🎵 Cargando: ${track.title}`);

        // Actualizar interfaz
        const currentTrackEl = document.getElementById('currentTrack');
        const currentArtistEl = document.getElementById('currentArtist');
        const currentCoverEl = document.getElementById('currentCover');

        if (currentTrackEl) currentTrackEl.textContent = track.title;
        if (currentArtistEl) currentArtistEl.textContent = track.artist;
        if (currentCoverEl) currentCoverEl.src = track.cover;

        const src = track.file;
        const isObjectURL = src && src.startsWith('blob:');

        // Evitar comprobar con HEAD recursos cross-origin (CORS puede bloquear la comprobación)
        let shouldHeadCheck = false;
        try {
            const urlObj = new URL(src, location.href);
            shouldHeadCheck = !isObjectURL && urlObj.origin === location.origin;
        } catch (e) {
            shouldHeadCheck = !isObjectURL; // si URL es inválida, intentamos comprobar y capturar error
        }

        if (shouldHeadCheck) {
            // Comprobar existencia del recurso para evitar errores tipo 404/NotSupported
            try {
                const resp = await fetch(src, { method: 'HEAD' });
                if (!resp.ok) {
                    console.warn(`Fuente no accesible (status ${resp.status}): ${src}`);
                    showNotification(`No se encontró: ${track.title} (saltando)`, 'warning');
                    setTimeout(() => this.nextTrack(), 200);
                    return;
                }
            } catch (err) {
                console.warn('Error comprobando fuente:', err, src);
                showNotification(`Error accediendo a ${track.title} (saltando)`, 'warning');
                setTimeout(() => this.nextTrack(), 200);
                return;
            }
        }

        // Asignar y precargar
        this.audio.src = src;
        this.highlightCurrentTrack();
        try {
            this.audio.load();
        } catch (e) {
            console.warn('Error al precargar:', e);
        }
    }
    
    highlightCurrentTrack() {
        const playlistElement = document.getElementById('playlist');
        const playlistItems = document.querySelectorAll('.playlist-item');
        // Preserve current scroll position to avoid the container jumping
        let prevScroll = 0;
        if (playlistElement) prevScroll = playlistElement.scrollTop;

        playlistItems.forEach((item, i) => {
            item.classList.toggle('playing', i === this.currentTrackIndex);
        });

        // Restore scroll
        if (playlistElement) playlistElement.scrollTop = prevScroll;
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        if (!this.audio.src) {
            showNotification('No hay pista cargada', 'warning');
            return;
        }

        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updatePlayButton();
            this.updateAlbumArtAnimation();
            console.log("▶️ Reproduciendo música");
        }).catch(error => {
            console.error("Error al reproducir:", error);
            if (error && (error.name === 'NotAllowedError' || error.name === 'SecurityError')) {
                showNotification('El navegador requiere interacción (haz clic en la página) para activar audio', 'warning');
            } else if (error && error.name === 'NotSupportedError') {
                showNotification('Formato no soportado o archivo dañado, intentando siguiente', 'error');
                setTimeout(() => this.nextTrack(), 300);
            } else {
                showNotification('Error al reproducir la pista', 'error');
            }
        });
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();
        this.updateAlbumArtAnimation();
        console.log("⏸️ Música pausada");
    }
    
    updatePlayButton() {
        const playIcon = document.getElementById('playIcon');
        if (playIcon) {
            playIcon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
    }
    
    updateAlbumArtAnimation() {
        const albumArt = document.querySelector('.album-art-large');
        if (albumArt) {
            if (this.isPlaying) {
                albumArt.classList.add('playing');
                albumArt.classList.remove('paused');
            } else {
                albumArt.classList.remove('playing');
                albumArt.classList.add('paused');
            }
        }
    }
    
    async nextTrack() {
        const nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        await this.loadTrack(nextIndex);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    async previousTrack() {
        const prevIndex = this.currentTrackIndex - 1;
        const newIndex = prevIndex < 0 ? this.playlist.length - 1 : prevIndex;
        await this.loadTrack(newIndex);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    updateProgress() {
        const progressBar = document.getElementById('progressBar');
        const currentTimeEl = document.getElementById('currentTime');
        
        if (this.audio.duration && !isNaN(this.audio.duration)) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            
            if (progressBar) {
                progressBar.value = progress;
            }
            
            if (currentTimeEl) {
                const minutes = Math.floor(this.audio.currentTime / 60);
                const seconds = Math.floor(this.audio.currentTime % 60);
                currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        }
    }
    
    updateDuration() {
        const durationEl = document.getElementById('duration');
        if (this.audio.duration && !isNaN(this.audio.duration) && durationEl) {
            const minutes = Math.floor(this.audio.duration / 60);
            const seconds = Math.floor(this.audio.duration % 60);
            durationEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    setVolume(value) {
        this.audio.volume = value / 100;
        this.updateVolumeIcon(value);
    }
    
    updateVolumeIcon(value) {
        const volumeIcon = document.getElementById('volumeIcon');
        if (!volumeIcon) return;
        
        if (value === 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (value < 50) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    }
    
    toggleMute() {
        this.audio.muted = !this.audio.muted;
        const volumeIcon = document.getElementById('volumeIcon');
        if (volumeIcon) {
            volumeIcon.className = this.audio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        }
    }
    
    renderPlaylist() {
        const playlistElement = document.getElementById('playlist');
        if (!playlistElement) return;
        
        // Preserve scroll position so re-rendering doesn't jump
        const prevScroll = playlistElement.scrollTop;

        playlistElement.innerHTML = '';

        this.playlist.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            item.tabIndex = -1;

            item.addEventListener('click', async (ev) => {
                ev.preventDefault();
                try { ev.currentTarget.blur(); } catch (e) {}
                await this.loadTrack(index);
                this.play();
            });

            const playIconDiv = document.createElement('div');
            playIconDiv.className = 'play-icon';
            playIconDiv.innerHTML = '<i class="fas fa-music"></i>';

            const titleDiv = document.createElement('div');
            titleDiv.className = 'track-title';
            titleDiv.textContent = track.title;

            const durDiv = document.createElement('div');
            durDiv.className = 'track-duration';
            durDiv.textContent = '-:--';

            item.appendChild(playIconDiv);
            item.appendChild(titleDiv);
            item.appendChild(durDiv);

            playlistElement.appendChild(item);
        });

        // Restore previous scroll
        playlistElement.scrollTop = prevScroll;
    }
}

function setupPlayerControls() {
    // Barra de progreso
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.addEventListener('input', function(e) {
            if (musicPlayer.audio.duration && !isNaN(musicPlayer.audio.duration)) {
                const seekTime = (e.target.value / 100) * musicPlayer.audio.duration;
                musicPlayer.audio.currentTime = seekTime;
            }
        });
    }
    
    // Control de volumen
    const volumeBar = document.getElementById('volumeBar');
    if (volumeBar) {
        volumeBar.addEventListener('input', function(e) {
            musicPlayer.setVolume(e.target.value);
        });
        // Establecer volumen inicial
        musicPlayer.setVolume(volumeBar.value);
    }
    
    // Subida de archivos
    const fileUpload = document.getElementById('fileUpload');
    if (fileUpload) {
        fileUpload.addEventListener('change', function(e) {
            const files = Array.from(e.target.files || []);
            if (files.length === 0) return;

            let added = 0;

            files.forEach(file => {
                // Solo aceptar archivos de audio
                if (file.type && file.type.startsWith('audio') || /\.mp3$|\.wav$|\.ogg$/i.test(file.name)) {
                    const objectUrl = URL.createObjectURL(file);
                    // Añadir a la playlist del reproductor
                    if (musicPlayer && Array.isArray(musicPlayer.playlist)) {
                        musicPlayer.playlist.push({
                            title: file.name.replace(/\.[^/.]+$/, ''),
                            artist: 'Local',
                            file: objectUrl,
                            cover: document.getElementById('currentCover') ? document.getElementById('currentCover').src : ''
                        });
                        added++;
                    }
                }
            });

            if (added > 0) {
                showNotification(`${added} archivo(s) añadidos a la playlist`, 'success');
                // Volver a renderizar la playlist y, si no hay pista cargada, cargar la primera nueva
                if (musicPlayer) {
                    musicPlayer.renderPlaylist();
                    if (!musicPlayer.audio.src || musicPlayer.audio.src === '') {
                        musicPlayer.loadTrack(0);
                    }
                }
            } else {
                showNotification('No se añadieron archivos de audio válidos', 'warning');
            }

            // Resetear input para permitir volver a seleccionar los mismos archivos/carpeta
            fileUpload.value = '';
        });
    }
    
    // Teclas de control
    document.addEventListener('keydown', function(e) {
        if (!musicPlayer) return;
        
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                musicPlayer.togglePlay();
                break;
            case 'ArrowRight':
                musicPlayer.nextTrack();
                break;
            case 'ArrowLeft':
                musicPlayer.previousTrack();
                break;
            case 'KeyM':
                musicPlayer.toggleMute();
                break;
        }
    });
}

// Enlaza botones visibles del reproductor a las funciones globales (seguro frente a handlers inline faltantes)
function bindPlayerControlsToElements() {
    const playBtn = document.getElementById('playBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const muteBtn = document.getElementById('muteBtn');

    if (playBtn) {
        playBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!musicPlayer) return;
            // Toggle immediately visual state for responsiveness
            if (musicPlayer.isPlaying) {
                musicPlayer.pause();
            } else {
                musicPlayer.play();
            }
        });
    }
    if (nextBtn) nextBtn.addEventListener('click', nextTrack);
    if (prevBtn) prevBtn.addEventListener('click', previousTrack);
    if (muteBtn) muteBtn.addEventListener('click', toggleMute);
}

// ============================================
// FUNCIONES GLOBALES PARA LOS BOTONES HTML
// ============================================

// Estas funciones son llamadas desde los onclick del HTML
function togglePlay() {
    if (musicPlayer) {
        musicPlayer.togglePlay();
    } else {
        console.error("Reproductor no inicializado");
        showNotification("Recarga la página e intenta de nuevo", "error");
    }
}

function nextTrack() {
    if (musicPlayer) {
        musicPlayer.nextTrack();
    }
}

function previousTrack() {
    if (musicPlayer) {
        musicPlayer.previousTrack();
    }
}

function toggleMute() {
    if (musicPlayer) {
        musicPlayer.toggleMute();
    }
}

// ============================================
// FUNCIONES AUXILIARES (compartidas)
// ============================================

function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.top = "20px";
    notification.style.right = "20px";
    notification.style.padding = "15px 25px";
    notification.style.borderRadius = "10px";
    notification.style.color = "white";
    notification.style.zIndex = "10000";
    notification.style.fontWeight = "bold";
    notification.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
    notification.style.transition = "all 0.3s";
    
    // Colores según tipo
    if (type === "success") {
        notification.style.background = "linear-gradient(45deg, #4caf50, #2e7d32)";
    } else if (type === "error") {
        notification.style.background = "linear-gradient(45deg, #f44336, #c62828)";
    } else if (type === "warning") {
        notification.style.background = "linear-gradient(45deg, #ff9800, #ef6c00)";
    } else if (type === "info") {
        notification.style.background = "linear-gradient(45deg, #2196f3, #0d47a1)";
    } else {
        notification.style.background = "linear-gradient(45deg, #9c27b0, #673ab7)";
    }
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function playPartySound() {
    try {
        const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-happy-crowd-laugh-464.mp3");
        audio.volume = 0.3;
        audio.play().catch(e => {
            console.log("Sonido de fiesta no se pudo reproducir automáticamente");
        });
    } catch (error) {
        console.log("Error con sonido de fiesta:", error);
    }
}
// ============================================
// SOLUCIÓN SIMPLE PARA ACTIVAR AUDIO
// ============================================

// Crear un evento global para activar audio
document.addEventListener('click', function activateAudioOnce() {
    // Solo ejecutar una vez
    document.removeEventListener('click', activateAudioOnce);
    
    console.log("👆 Usuario interactuó - Activando audio...");
    
    // Crear audio silencioso
    const audio = new Audio();
    audio.volume = 0.001;
    
    // Reproducir y pausar inmediatamente
    audio.play().then(() => {
        audio.pause();
        console.log("✅ Audio activado - Listo para reproducir");
        
        // Mostrar mensaje discreto
        const msg = document.createElement('div');
        msg.textContent = '🎵 Audio activado';
        msg.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #4CAF50;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            z-index: 9999;
            opacity: 0;
            animation: fadeInOut 2s ease;
        `;
        
        // Añadir estilo de animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(-10px); }
                20% { opacity: 1; transform: translateY(0); }
                80% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 2000);
        
    }).catch(err => {
        console.log("Audio no se pudo activar:", err);
    });
});

// También activar con tecla espacio (disparar un click correctamente)
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        // Crear y despachar un evento click para activar audio en navegadores
        document.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }
});

// Intento de autoplay en mute y overlay para permitir activar sonido fácil para visitantes
function tryAutoplayMuted() {
    // Si no existe el reproductor aún, intentar después
    if (!musicPlayer || !musicPlayer.audio) return;

    try {
        // Forzar mute temporalmente y reproducir
        musicPlayer.audio.muted = true;
        musicPlayer.audio.play().then(() => {
            console.log('Autoplay silencioso iniciado');
            // Si se reproduce en mute, reflejar estado visual (no marcamos isPlaying hasta que el usuario desmute)
            showAutoplayOverlay();
        }).catch(err => {
            console.log('Autoplay silencioso no permitido:', err);
            // Mostrar overlay igualmente para guiar al usuario
            showAutoplayOverlay();
        });
    } catch (e) {
        console.log('Autoplay muted error:', e);
        showAutoplayOverlay();
    }
}

function showAutoplayOverlay() {
    // Si ya existe, no crear otra
    if (document.getElementById('autoplayOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'autoplayOverlay';
    overlay.style.cssText = `position: fixed; inset: 0; display:flex;align-items:center;justify-content:center;z-index:10001;background:rgba(0,0,0,0.45);`;

    const box = document.createElement('div');
    box.style.cssText = 'background:linear-gradient(45deg,#ff0080,#ff8c00);padding:30px;border-radius:12px;color:white;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.5);';
    box.innerHTML = `<h3 style="margin-bottom:10px">Toca para activar sonido</h3><p style="margin-bottom:15px">Haz clic una vez para escuchar la música con sonido.</p>`;

    const btn = document.createElement('button');
    btn.textContent = 'Activar audio';
    btn.style.cssText = 'background:white;color:#ff0080;border:none;padding:10px 18px;border-radius:8px;font-weight:bold;cursor:pointer';
    btn.addEventListener('click', function() {
        if (musicPlayer && musicPlayer.audio) {
            musicPlayer.audio.muted = false;
            musicPlayer.play();
        }
        overlay.remove();
    });

    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

// ============================================
// VIDEO GALLERY LAYOUT: aplica .alternate según ancho
// ============================================
function initVideoGalleryLayout() {
    const gallery = document.querySelector('.video-gallery');
    if (!gallery) return;

    function applyLayout() {
        const w = window.innerWidth;
        // medium screens: use alternate (2 arriba + 1 centrado abajo)
        if (w >= 769 && w <= 1024) {
            gallery.classList.add('alternate');
        } else {
            gallery.classList.remove('alternate');
        }
    }

    applyLayout();

    let resizeTimer = null;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(applyLayout, 120);
    });
}

// ============================================
// INICIALIZACIÓN ADICIONAL PARA COMPATIBILIDAD
// ============================================

// Asegurar que las funciones estén disponibles globalmente
window.togglePlay = togglePlay;
window.nextTrack = nextTrack;
window.previousTrack = previousTrack;
window.toggleMute = toggleMute;


console.log("✨ ¡Script de Sandi completamente cargado y listo! 🎂");
