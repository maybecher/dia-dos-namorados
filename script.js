/**
 * ==========================================================================
 * SCRIPT PRINCIPAL — DIA DOS NAMORADOS (ESTÉTICA SKATE + REGGAETON / Y2K)
 * Lógica funcional para:
 * 1. Player Y2K MP3 integrado com Áudio Local (fallback automático de Autoplay)
 * 2. Contador Emocional preciso desde 23/11/2024
 * 3. Biscoito da Sorte interativo com quebra 3D e frases Bad Bunny / CBJR
 * 4. Fita Cassete com síntese de áudio Web Audio API e mensagem secreta
 * 5. Animação de Canvas (fagulhas de fundo e explosão de corações no presente)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURAÇÕES DO SITE ---
    const CONFIG = {
        startDateStr: '2024-11-23T00:00:00', // Dia 23 de Novembro de 2024
        
        // Banco de Frases Concisas Crossover (CBJR & Bad Bunny)
        fortunes: [
            "“eu te quero do jeito que você é.” 🖤 (Dona do Meu Pensamento)",
            "“eu vou fazer de tudo pra te encontrar.” 🛹 (Lugar ao Sol)",
            "“yo contigo me siento bien.” 🌴 (Ojitos Lindos)",
            "“tú eres mi suerte.” 🍀 (Ojitos Lindos)",
            "“tus ojos son mi lugar favorito.” 👁️ (Ojitos Lindos)",
            "“você virou meu pensamento favorito.” 🎧",
            "“seu sorriso ainda bagunça meus planos.” ⚡",
            "“te encontrar foi tipo ouvir a música certa no momento certo da vida.” 🌃",
            "“seremos donos do nosso amanhã se estivermos em sintonia.” 📼",
            "“tem gente que passa pela vida. você ficou.” ❤️"
        ],
        
        colors: {
            red: '#bd081c',
            redDark: '#7a000c',
            cream: '#f4f3ef',
            creamMuted: 'rgba(244, 243, 239, 0.4)'
        }
    };

    // ==========================================================================
    // 1. MOTOR DE ÁUDIO LOCAL (HTML5 AUDIO API)
    // ==========================================================================
    
    const localAudio = document.getElementById('local-audio');
    let isPlaying = false;
    let audioInitiated = false;
    
    const playBtn = document.getElementById('y2k-play');
    const pauseBtn = document.getElementById('y2k-pause');
    const visualizerBars = document.querySelectorAll('.y2k-bar');
    const y2kPlayer = document.getElementById('y2k-player');
    const statusIndicator = document.querySelector('.y2k-status-indicator');

    // --- FUNÇÕES DE CONTROLE (AÇÕES SIMPLES) ---
    function playMusic() {
        if (!localAudio) return;
        localAudio.play().catch(err => {
            console.log("Autoplay bloqueado pelo navegador. Aguardando interação do usuário.", err);
        });
    }

    function pauseMusic() {
        if (!localAudio) return;
        localAudio.pause();
    }

    // --- EVENTOS DO ÁUDIO (FONTE DE VERDADE PARA O ESTADO DA UI) ---
    // Sincroniza a interface corretamente mesmo quando o browser suspende o autoplay (iOS/Android)
    localAudio.addEventListener('play', () => {
        isPlaying = true;
        y2kPlayer.classList.add('playing');
        playBtn.style.color = CONFIG.colors.red;
        pauseBtn.style.color = '#fff';
        statusIndicator.textContent = '⚡ ONLINE';
        startVisualizer();
    });

    localAudio.addEventListener('pause', () => {
        isPlaying = false;
        y2kPlayer.classList.remove('playing');
        playBtn.style.color = '#fff';
        pauseBtn.style.color = CONFIG.colors.red;
        statusIndicator.textContent = '⏸ PAUSADO';
        stopVisualizer();
    });

    localAudio.addEventListener('error', () => {
        statusIndicator.textContent = '⚠️ ERRO MP3';
        y2kPlayer.classList.remove('playing');
        stopVisualizer();
        console.warn('Erro ao carregar o áudio local. Verifique o caminho do arquivo MP3.');
    });

    // --- BOTÕES DO PLAYER ---
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audioInitiated = true;
        playMusic();
    });

    pauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        pauseMusic();
    });

    // Botão Prev (⏮): reinicia a faixa do início
    document.getElementById('y2k-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        if (!localAudio) return;
        localAudio.currentTime = 0;
        if (!isPlaying) {
            audioInitiated = true;
            playMusic();
        }
    });

    // Botão Next (⏭): retorna ao início do loop (trilha única)
    document.getElementById('y2k-next').addEventListener('click', (e) => {
        e.stopPropagation();
        if (localAudio) localAudio.currentTime = 0;
    });

    // Toggle mute ao clicar no status do LCD
    statusIndicator.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!localAudio) return;
        localAudio.muted = !localAudio.muted;
        statusIndicator.textContent = localAudio.muted
            ? '🔇 MUTADO'
            : (isPlaying ? '⚡ ONLINE' : '⏸ PAUSADO');
    });

    // --- AUTOPLAY NO PRIMEIRO CLIQUE DO USUÁRIO ---
    // Ativa o áudio imediatamente quando a namorada clica em qualquer lugar da tela
    document.addEventListener('click', () => {
        if (!audioInitiated) {
            audioInitiated = true;
            playMusic();
        }
    }, { once: true });


    // --- CONTROLE DO EQUALIZADOR VISUAL ---
    let visualizerInterval = null;

    function startVisualizer() {
        if (visualizerInterval) clearInterval(visualizerInterval);

        visualizerInterval = setInterval(() => {
            visualizerBars.forEach(bar => {
                const heightPercent = Math.floor(Math.random() * 85) + 15;
                bar.style.height = `${heightPercent}%`;
            });
        }, 120);
    }

    function stopVisualizer() {
        if (visualizerInterval) clearInterval(visualizerInterval);
        visualizerBars.forEach(bar => {
            bar.style.height = '4px';
        });
    }


    // ==========================================================================
    // 2. CONTADOR EMOCIONAL (DESDE 23/11/2024)
    // ==========================================================================
    
    const countDays = document.getElementById('count-days');
    const countHours = document.getElementById('count-hours');
    const countMinutes = document.getElementById('count-minutes');
    const countSeconds = document.getElementById('count-seconds');
    
    const startDate = new Date(CONFIG.startDateStr).getTime();

    function updateCounter() {
        const now = new Date().getTime();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countDays.textContent = days;
        countHours.textContent = hours < 10 ? '0' + hours : hours;
        countMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        countSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateCounter();
    setInterval(updateCounter, 1000);


    // ==========================================================================
    // 3. BISCOITO DA SORTE INTERATIVO (❤️🥠)
    // ==========================================================================
    
    const fortuneCookie = document.getElementById('fortune-cookie');
    const openCookieBtn = document.getElementById('open-cookie-btn');
    const cookiePaper = document.getElementById('cookie-paper');
    const cookieText = document.getElementById('cookie-text');
    let isCookieBroken = false;

    function handleCookieClick() {
        if (isCookieBroken) {
            fortuneCookie.classList.remove('broken');
            cookiePaper.classList.remove('revealed');
            isCookieBroken = false;
            openCookieBtn.textContent = 'abrir biscoito da sorte';
            
            createSparks(
                fortuneCookie.getBoundingClientRect().left + fortuneCookie.offsetWidth / 2,
                fortuneCookie.getBoundingClientRect().top + fortuneCookie.offsetHeight / 2,
                10
            );
            return;
        }

        playCrackSound();

        fortuneCookie.classList.add('broken');
        isCookieBroken = true;

        const randomPhrase = CONFIG.fortunes[Math.floor(Math.random() * CONFIG.fortunes.length)];
        cookieText.textContent = randomPhrase;

        setTimeout(() => {
            cookiePaper.classList.add('revealed');
            openCookieBtn.textContent = 'pegar outro biscoito';
            
            const rect = fortuneCookie.getBoundingClientRect();
            createSparks(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                25,
                false
            );
        }, 350);
    }

    openCookieBtn.addEventListener('click', handleCookieClick);
    fortuneCookie.addEventListener('click', handleCookieClick);

    function playCrackSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
            
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
            console.log("Audio crack blocked/not supported");
        }
    }


    // ==========================================================================
    // 4. FITA CASSETE INTERATIVA (📼 COM MENSAGEM ESCONDIDA & ÁUDIO REALISTA)
    // ==========================================================================
    
    const cassette = document.getElementById('interactive-cassette');
    const cassetteSecret = document.getElementById('cassette-secret');
    let isCassettePlaying = false;

    cassette.addEventListener('click', () => {
        if (isCassettePlaying) return;

        isCassettePlaying = true;
        playTapeMechanicalSound();

        cassette.classList.add('spinning');
        
        setTimeout(() => {
            cassetteSecret.classList.add('revealed');
            
            const rect = cassette.getBoundingClientRect();
            createSparks(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                15,
                true
            );
        }, 600);

        setTimeout(() => {
            cassette.classList.remove('spinning');
            isCassettePlaying = false;
        }, 4000);
    });

    document.getElementById('close-secret-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        cassetteSecret.classList.remove('revealed');
    });

    function playTapeMechanicalSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            
            const clickOsc = ctx.createOscillator();
            const clickGain = ctx.createGain();
            clickOsc.type = 'triangle';
            clickOsc.frequency.setValueAtTime(160, ctx.currentTime);
            clickOsc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.12);
            clickGain.gain.setValueAtTime(0.25, ctx.currentTime);
            clickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
            clickOsc.connect(clickGain);
            clickGain.connect(ctx.destination);
            clickOsc.start();
            clickOsc.stop(ctx.currentTime + 0.12);
            
            setTimeout(() => {
                const motorOsc = ctx.createOscillator();
                const motorGain = ctx.createGain();
                motorOsc.type = 'sine';
                motorOsc.frequency.setValueAtTime(55, ctx.currentTime);
                motorGain.gain.setValueAtTime(0.08, ctx.currentTime);
                motorGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
                motorOsc.connect(motorGain);
                motorGain.connect(ctx.destination);
                motorOsc.start();
                motorOsc.stop(ctx.currentTime + 0.5);
            }, 60);
        } catch (e) {
            console.log("Web Audio não suportado/bloqueado");
        }
    }


    // ==========================================================================
    // 5. CANVAS DE PARTÍCULAS DE FUNDO (FAGULHAS VINTAGE)
    // ==========================================================================
    
    const bgCanvas = document.getElementById('particles-canvas');
    const bgCtx = bgCanvas.getContext('2d');
    let bgParticles = [];
    let bgWidth, bgHeight;

    function resizeBgCanvas() {
        bgWidth = bgCanvas.width = window.innerWidth;
        bgHeight = bgCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeBgCanvas);
    resizeBgCanvas();

    class BgParticle {
        constructor() {
            this.reset();
            this.y = Math.random() * bgHeight;
        }

        reset() {
            this.x = Math.random() * bgWidth;
            this.y = bgHeight + Math.random() * 20;
            this.size = Math.random() * 2.2 + 0.5;
            this.speedY = -(Math.random() * 0.7 + 0.3);
            this.speedX = Math.sin(Math.random() * 3) * 0.2;
            this.opacity = Math.random() * 0.7 + 0.1;
            this.color = Math.random() > 0.4 ? CONFIG.colors.red : CONFIG.colors.cream;
            this.wobbleSpeed = Math.random() * 0.015 + 0.005;
            this.wobbleValue = Math.random() * 100;
        }

        update() {
            this.y += this.speedY;
            this.wobbleValue += this.wobbleSpeed;
            this.x += this.speedX + Math.sin(this.wobbleValue) * 0.2;
            
            if (this.y < bgHeight * 0.25) {
                this.opacity -= 0.006;
            }

            if (this.y < 0 || this.opacity <= 0) {
                this.reset();
            }
        }

        draw() {
            bgCtx.beginPath();
            bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            bgCtx.fillStyle = this.color;
            bgCtx.globalAlpha = Math.max(0, this.opacity);
            
            if (this.color === CONFIG.colors.red) {
                bgCtx.shadowBlur = 5;
                bgCtx.shadowColor = CONFIG.colors.red;
            } else {
                bgCtx.shadowBlur = 0;
            }
            
            bgCtx.fill();
        }
    }

    const maxBgParticles = Math.min(50, Math.floor(window.innerWidth / 10));
    for (let i = 0; i < maxBgParticles; i++) {
        bgParticles.push(new BgParticle());
    }

    function animateBgParticles() {
        bgCtx.clearRect(0, 0, bgWidth, bgHeight);
        bgCtx.shadowBlur = 0;
        bgCtx.globalAlpha = 1;
        
        bgParticles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animateBgParticles);
    }
    animateBgParticles();


    // ==========================================================================
    // 6. EFEITO PARALLAX 3D TILT NA POLAROID
    // ==========================================================================
    
    const polaroidFrame = document.querySelector('.polaroid-float');
    
    if (polaroidFrame) {
        const photoSection = document.querySelector('.photo-section');
        
        photoSection.addEventListener('mousemove', (e) => {
            const rect = photoSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateY = ((x / rect.width) - 0.5) * 20;
            const rotateX = -(((y / rect.height) - 0.5) * 20);
            
            polaroidFrame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04) translateY(-5px)`;
            polaroidFrame.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)';
        });
        
        photoSection.addEventListener('mouseleave', () => {
            polaroidFrame.style.transform = 'rotate(-3deg) scale(1) translateY(0)';
            polaroidFrame.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                if (giftOverlay.classList.contains('is-hidden')) {
                    const tiltX = Math.min(Math.max(e.beta, -30), 30) / 3.5;
                    const tiltY = Math.min(Math.max(e.gamma, -30), 30) / 3.5;
                    polaroidFrame.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotate(-3deg)`;
                }
            }, true);
        }
    }


    // ==========================================================================
    // 7. ANIMAÇÃO DE ADESIVOS (STICKERS)
    // ==========================================================================
    
    const stickers = document.querySelectorAll('.sticker');
    
    stickers.forEach(sticker => {
        sticker.addEventListener('click', () => {
            sticker.classList.add('pop-animation');
            createSparks(
                sticker.getBoundingClientRect().left + sticker.offsetWidth / 2,
                sticker.getBoundingClientRect().top + sticker.offsetHeight / 2,
                8,
                true
            );
            setTimeout(() => {
                sticker.classList.remove('pop-animation');
            }, 500);
        });
    });


    // ==========================================================================
    // 8. MODAL / OVERLAY DO VALE TATUAGEM COM EXPLOSÃO DE CANVA
    // ==========================================================================
    
    const giftOverlay = document.getElementById('gift-overlay');
    const openGiftBtn = document.getElementById('open-gift-btn');
    const closeGiftBtn = document.getElementById('close-gift-btn');
    const overlayCanvas = document.getElementById('overlay-canvas');
    const overlayCtx = overlayCanvas.getContext('2d');
    let overlayParticles = [];

    function resizeOverlayCanvas() {
        overlayCanvas.width = window.innerWidth;
        overlayCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeOverlayCanvas);
    resizeOverlayCanvas();

    class OverlayParticle {
        constructor(x, y, isHeart = false) {
            this.x = x;
            this.y = y;
            this.isHeart = isHeart || Math.random() > 0.7; // 30% corações
            
            const angle = Math.random() * Math.PI * 2;
            const force = Math.random() * 4.5 + 1.8;
            this.vx = Math.cos(angle) * force;
            this.vy = Math.sin(angle) * force - (this.isHeart ? 1.2 : 0.4);
            
            this.size = Math.random() * (this.isHeart ? 11 : 4.5) + 3;
            this.alpha = 1;
            this.decay = Math.random() * 0.014 + 0.01;
            this.color = Math.random() > 0.3 ? CONFIG.colors.red : CONFIG.colors.cream;
            this.rotation = Math.random() * Math.PI;
            this.rotSpeed = (Math.random() - 0.5) * 0.08;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05;
            this.vx *= 0.98;
            this.alpha -= this.decay;
            this.rotation += this.rotSpeed;
        }

        draw() {
            overlayCtx.globalAlpha = Math.max(0, this.alpha);
            overlayCtx.save();
            overlayCtx.translate(this.x, this.y);
            overlayCtx.rotate(this.rotation);
            
            if (this.isHeart) {
                overlayCtx.beginPath();
                const d = this.size;
                overlayCtx.moveTo(0, d / 4);
                overlayCtx.bezierCurveTo(d / 2, -d / 2, d, 0, 0, d * 0.85);
                overlayCtx.bezierCurveTo(-d, 0, -d / 2, -d / 2, 0, d / 4);
                overlayCtx.fillStyle = CONFIG.colors.red;
                overlayCtx.shadowBlur = 6;
                overlayCtx.shadowColor = CONFIG.colors.red;
                overlayCtx.fill();
            } else {
                overlayCtx.beginPath();
                if (Math.random() > 0.5) {
                    overlayCtx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                } else {
                    const s = this.size;
                    overlayCtx.moveTo(0, -s);
                    overlayCtx.quadraticCurveTo(0, 0, s, 0);
                    overlayCtx.quadraticCurveTo(0, 0, 0, s);
                    overlayCtx.quadraticCurveTo(0, 0, -s, 0);
                    overlayCtx.quadraticCurveTo(0, 0, 0, -s);
                }
                overlayCtx.fillStyle = this.color;
                overlayCtx.shadowBlur = 4;
                overlayCtx.shadowColor = this.color;
                overlayCtx.fill();
            }
            overlayCtx.restore();
        }
    }

    function createSparks(x, y, count = 35, forceHearts = false) {
        resizeOverlayCanvas();
        for (let i = 0; i < count; i++) {
            overlayParticles.push(new OverlayParticle(x, y, forceHearts));
        }
    }

    function animateOverlayParticles() {
        if (overlayParticles.length === 0) {
            overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
            requestAnimationFrame(animateOverlayParticles);
            return;
        }

        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        overlayCtx.shadowBlur = 0;
        
        for (let i = overlayParticles.length - 1; i >= 0; i--) {
            const p = overlayParticles[i];
            p.update();
            p.draw();
            
            if (p.alpha <= 0) {
                overlayParticles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animateOverlayParticles);
    }
    animateOverlayParticles();

    function openGift() {
        giftOverlay.classList.remove('is-hidden');
        document.body.style.overflow = 'hidden';
        
        resizeOverlayCanvas();
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        createSparks(centerX, centerY - 40, 45, true);
        
        setTimeout(() => {
            createSparks(centerX - 80, centerY, 15, false);
            createSparks(centerX + 80, centerY, 15, false);
        }, 250);

        audioInitiated = true;
        playMusic();

        closeGiftBtn.focus();
    }

    function closeGift() {
        giftOverlay.classList.add('is-hidden');
        document.body.style.overflow = '';
        overlayParticles = [];
        openGiftBtn.focus();
    }

    openGiftBtn.addEventListener('click', openGift);
    closeGiftBtn.addEventListener('click', closeGift);

    giftOverlay.addEventListener('click', (e) => {
        if (e.target === giftOverlay || e.target.classList.contains('gift-inner')) {
            closeGift();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !giftOverlay.classList.contains('is-hidden')) {
            closeGift();
        }
    });


    // ==========================================================================
    // 9. REVEAL SUAVE NO SCROLL
    // ==========================================================================
    
    const scrollElements = document.querySelectorAll('.y2k-mp3-player, .retro-scoreboard, .lyric-block, .fortune-cookie-section, .message-section, .cassette-section, .action-section');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    scrollElements.forEach(el => {
        el.classList.add('scroll-hidden');
        revealObserver.observe(el);
    });

});
