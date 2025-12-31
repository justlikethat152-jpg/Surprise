// script.js

/* =========================================
   1. GLOBAL HELPERS & BACKGROUND
   ========================================= */

// Create Background Hearts ONCE
const bgContainer = document.getElementById('bgHearts');
const heartSymbols = ['❤', '💖', '💕', '💗'];

function createBgHearts() {
    for(let i=0; i<20; i++) {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's'; 
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        bgContainer.appendChild(heart);
    }
}
createBgHearts();

// Particle Burst Effect Helper
function createBurst(x, y, count = 10) {
    for(let i=0; i<count; i++) {
        const p = document.createElement('div');
        p.innerText = '❤';
        p.classList.add('particle');
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.fontSize = '20px';
        p.style.color = '#fff';
        
        const tx = (Math.random() - 0.5) * 200 + 'px';
        const ty = (Math.random() - 0.5) * 200 + 'px';
        p.style.setProperty('--tx', tx);
        p.style.setProperty('--ty', ty);
        
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1000);
    }
}

/* =========================================
   2. MASTER NAVIGATION FUNCTION
   ========================================= */
function showBlock(blockId) {
    document.querySelectorAll('.app-block').forEach(block => {
        block.classList.remove('active-block');
        block.classList.add('hidden-block');
    });

    setTimeout(() => {
        const target = document.getElementById(blockId);
        target.classList.remove('hidden-block');
        target.classList.add('active-block');

        if(blockId === 'block3') initBlock3();
    }, 100);
}

/* =========================================
   3. BLOCK 1 LOGIC (Cuteness Meter)
   ========================================= */
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const btnPage1 = document.getElementById('btnPage1');
const btnPage2 = document.getElementById('btnPage2');
const meterWrapper = document.getElementById('meterWrapper');
const meterBar = document.getElementById('meterBar');
const meterText = document.getElementById('meterText');
const finalMsg = document.getElementById('finalMsg');
const text2 = document.getElementById('text2');

btnPage1.addEventListener('click', (e) => {
    createBurst(e.clientX, e.clientY);
    setTimeout(() => {
        page1.style.opacity = '0';
        page1.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            page1.classList.add('hidden');
            page2.classList.remove('hidden');
            text2.style.animation = 'popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            btnPage2.style.animation = 'popIn 0.8s ease forwards 0.5s';
            btnPage2.style.opacity = '0'; 
            btnPage2.style.animationFillMode = 'forwards';
        }, 500);
    }, 300);
});

btnPage2.addEventListener('click', () => {
    btnPage2.style.display = 'none';
    meterWrapper.style.display = 'block';
    setTimeout(() => {
        meterWrapper.style.opacity = '1';
        meterWrapper.style.transform = 'scale(1)';
        meterWrapper.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        startMeter();
    }, 50);
});

function startMeter() {
    let width = 0;
    const interval = setInterval(() => {
        width++;
        meterBar.style.width = Math.min(width, 100) + '%';
        meterText.innerText = width + '%';

        if (width % 10 === 0) {
            const rect = meterWrapper.getBoundingClientRect();
            createBurst(rect.left + (rect.width * (width/120)), rect.top, 3);
            meterWrapper.style.transform = 'scale(1.05)';
            setTimeout(() => meterWrapper.style.transform = 'scale(1)', 100);
        }

        if (width === 100) {
            meterText.innerText = "Cuteness Overloaded 💥";
            meterBar.style.background = "linear-gradient(90deg, #ff0844, #ff0844)";
        }
        if (width > 100) {
            meterWrapper.classList.add('broken');
            meterBar.style.width = '100%'; 
        }
        if (width >= 120) {
            clearInterval(interval);
            triggerBreak();
        }
    }, 30);
}

function triggerBreak() {
    meterText.innerText = "Oh no… it broke! 🤯";
    const rect = meterWrapper.getBoundingClientRect();
    createBurst(rect.left + rect.width/2, rect.top + rect.height/2, 30);
    setTimeout(() => {
        meterWrapper.style.display = 'none';
        text2.style.display = 'none';
        finalMsg.style.display = 'block';
        finalMsg.style.animation = 'popIn 0.8s ease forwards';
    }, 1500);
}

/* =========================================
   4. BLOCK 2 LOGIC (Heart Reveal)
   ========================================= */
const openBtn = document.getElementById('openBtn');
const heart = document.getElementById('mainHeart');
const wrap = document.getElementById('interfaceWrapper');
const reveal = document.getElementById('revealContainer');
const msg = document.querySelector('.reveal-msg');
const imgs = document.querySelectorAll('.reveal-img');
let triggered = false;

function triggerReveal() {
    if(triggered) return;
    triggered = true;
    wrap.classList.add('fade-out');
    setTimeout(() => {
        wrap.style.display = 'none';
        reveal.style.display = 'flex';
        setTimeout(() => msg.classList.add('show'), 150);
        imgs.forEach((img,i) => {
            setTimeout(() => img.classList.add('show'), 900+i*450);
        });
    }, 800);
}

openBtn.onclick = triggerReveal;
heart.onclick = triggerReveal;

/* =========================================
   5. BLOCK 3 LOGIC (Final App)
   ========================================= */
let currentLevel = 1; 
const caption = document.getElementById('mainCaption');
const menuCards = [
    document.getElementById('cardReveal'),
    document.getElementById('cardMemories'),
    document.getElementById('cardLetter'),
    document.getElementById('cardVoice')
];

function initBlock3() {
    setTimeout(() => {
        menuCards.forEach((c, i) => {
            setTimeout(() => {
                c.style.opacity = '1';
                c.style.transform = 'translateY(0)';
            }, i * 150);
        });
    }, 500);
}

function openSection(level) {
    if(level > currentLevel) return;
    document.getElementById('mainMenu').style.display = 'none';
    caption.style.opacity = '0'; 
    document.getElementById('section-' + level).classList.add('section-active');
    if(level === 2) startMemories();
}

function finishSection(level) {
    document.getElementById('section-' + level).classList.remove('section-active');
    document.getElementById('mainMenu').style.display = 'flex';
    caption.style.opacity = '1';

    if(level === currentLevel && level < 4) {
        currentLevel++;
        menuCards[currentLevel-1].classList.remove('locked');
        menuCards[currentLevel-1].classList.add('active-glow');
        menuCards[currentLevel-2].classList.remove('active-glow');
    } else if (level === 4) {
        document.getElementById('finalNextBtn').style.display = 'block';
        menuCards.forEach(c => c.style.display = 'none'); 
        caption.innerHTML = "You've seen it all...<br>One last thing 💗";
    }
}

// B3: Reveal Game
let revealCount = 0;
function activateReveal(card) {
    if(card.classList.contains('expanded')) {
        card.classList.remove('expanded');
        card.querySelector('.front-text').style.display = 'block';
        card.querySelector('.card-content').style.display = 'none';
        document.querySelectorAll('.reveal-card').forEach(c => c.classList.remove('dimmed'));
        return;
    }
    document.querySelectorAll('.reveal-card').forEach(c => { if(c !== card) c.classList.add('dimmed'); });
    card.classList.add('expanded');
    card.classList.add('visited');
    card.querySelector('.front-text').style.display = 'none';
    card.querySelector('.card-content').style.display = 'flex';

    const lines = card.querySelectorAll('.reveal-line');
    lines.forEach((line, i) => {
        setTimeout(() => line.classList.add('visible'), 400 + (i * 600));
    });

    if(!card.dataset.opened) {
        card.dataset.opened = "true";
        revealCount++;
        if(revealCount === 5) {
            setTimeout(() => { document.getElementById('nextBtn1').style.display = 'block'; }, 2000);
        }
    }
}

// B3: Memories (FIXED)
const memoriesContent = [
    { 
        src: "assets/images/mem1.jpg", 
        caption: "One of my favorite moments of 2025 💖" 
    },
    { 
        src: "assets/images/mem2.jpg", 
        caption: "This smile made my 2025 brighter ✨" 
    },
    { 
        src: "assets/images/mem3.jpg", 
        caption: "Remember this day? 🥺" 
    }
];

let memIndex = 0;

function startMemories() {
    document.getElementById('memoriesIntro').classList.remove('hidden');
    document.getElementById('memoryViewer').classList.add('hidden');
    document.getElementById('memoriesOutro').classList.add('hidden');
    document.getElementById('nextBtn2').style.display = 'none';
    memIndex = 0;
    setTimeout(() => {
        document.getElementById('memoriesIntro').classList.add('hidden');
        document.getElementById('memoryViewer').classList.remove('hidden');
        loadMemory(0);
    }, 3000);
}

function loadMemory(index) {
    if(index >= memoriesContent.length) { endMemories(); return; }
    const photo = document.getElementById('memPhoto');
    const cap = document.getElementById('memCaption');
    
    // FIX: Using direct path
    const finalSrc = memoriesContent[index].src;

    photo.classList.remove('active');
    setTimeout(() => {
        photo.src = finalSrc; 
        cap.innerText = memoriesContent[index].caption;
        photo.classList.add('active');
    }, 500);
}
document.getElementById('memPhoto').addEventListener('click', () => { memIndex++; loadMemory(memIndex); });

function endMemories() {
    document.getElementById('memoryViewer').classList.add('hidden');
    document.getElementById('memoriesOutro').classList.remove('hidden');
    setTimeout(() => { document.getElementById('nextBtn2').style.display = 'block'; }, 1000);
}

// B3: Letter
function openEnvelope() {
    document.getElementById('envelope').classList.add('open');
    setTimeout(() => {
        document.getElementById('envelope').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('envelope').style.display = 'none';
            document.getElementById('letterView').style.display = 'flex';
            startLetterReveal();
        }, 500);
    }, 1200);
}
function startLetterReveal() {
    const lines = document.querySelectorAll('#letterTextContainer .letter-line');
    lines.forEach((line, i) => {
        setTimeout(() => {
            line.classList.add('visible');
            if(i === lines.length -1) {
                setTimeout(() => { document.getElementById('nextBtn3').style.display = 'block'; }, 1000);
            }
        }, 500 + (i * 800));
    });
}


/* --- 6. VOICE LOGIC (Buttons Appear Immediately) --- */
let currentAudioPart = 0; // 0=idle, 1=part1, 2=part2, 3=done

function playContinuousAudio() {
    const track1 = document.getElementById('audio1');
    const track2 = document.getElementById('audio2');
    const playBtn = document.getElementById('mainPlayBtn');
    const status = document.getElementById('audioStatus');
    const controls = document.getElementById('voiceControls');

    // --- CHANGE: Show "Replay" & "Next" buttons IMMEDIATELY ---
    controls.style.display = 'flex'; 
    controls.style.opacity = '1';

    // PAUSE LOGIC (If already playing)
    if(currentAudioPart === 1 && !track1.paused) {
        track1.pause();
        playBtn.innerHTML = "▶";
        playBtn.style.animation = "pulseBtn 2s infinite";
        status.innerText = "Paused Part 1";
        return;
    }
    if(currentAudioPart === 2 && !track2.paused) {
        track2.pause();
        playBtn.innerHTML = "▶";
        playBtn.style.animation = "pulseBtn 2s infinite";
        status.innerText = "Paused Part 2";
        return;
    }

    // PLAY LOGIC
    if(currentAudioPart === 0 || currentAudioPart === 1 || currentAudioPart === 3) {
        currentAudioPart = 1;
        
        // Reset tracks in case of replay
        track1.currentTime = 0;
        track2.currentTime = 0;

        track1.play().catch(e => alert("Please tap the screen first!"));
        playBtn.innerHTML = "⏸";
        playBtn.style.animation = "none";
        status.innerText = "Playing Part 1...";

        // When Track 1 ends -> Play Track 2
        track1.onended = () => {
            currentAudioPart = 2;
            track2.play();
            status.innerText = "Playing Part 2...";
        };

        // When Track 2 ends
        track2.onended = () => {
            currentAudioPart = 3; // Done
            playBtn.innerHTML = "✔";
            status.innerText = "Finished 💗";
        };

    } else if (currentAudioPart === 2) {
        // Resume Part 2
        track2.play();
        playBtn.innerHTML = "⏸";
        playBtn.style.animation = "none";
        status.innerText = "Playing Part 2...";
    }
}

function replayFullAudio() {
    // Stop everything
    const track1 = document.getElementById('audio1');
    const track2 = document.getElementById('audio2');
    track1.pause(); track1.currentTime = 0;
    track2.pause(); track2.currentTime = 0;
    
    // Reset state and play again
    currentAudioPart = 0;
    playContinuousAudio();
}

function goToFinalDirectly() {
    stopAllAudio();
    
    // Hide Section 4 (Voice)
    document.getElementById('section-4').classList.remove('section-active');
    document.getElementById('section-4').classList.add('hidden-block');

    // Hide Menu & Caption
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('mainCaption').style.display = 'none';
    
    // Show Final Section Directly
    showFinalScreen();
}

function stopAllAudio() {
    const track1 = document.getElementById('audio1');
    const track2 = document.getElementById('audio2');
    if(track1) { track1.pause(); }
    if(track2) { track2.pause(); }
}

// B3: Final
function showFinalScreen() {
    document.getElementById('section-final').classList.add('section-active');
    document.getElementById('finalContent').style.display = 'flex';
    
    setTimeout(() => {
        document.getElementById('finalImg').style.opacity = '1';
        document.getElementById('finalImg').style.transform = 'scale(1)';
    }, 500);
    setTimeout(() => { document.getElementById('finalCaption').style.opacity = '1'; }, 1500);
    setTimeout(() => { document.getElementById('finalOpts').style.opacity = '1'; }, 2500);
}