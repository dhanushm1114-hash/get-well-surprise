
import './style.css';
import gsap from 'gsap';

const app = document.querySelector('#app');

// ==========================================
// 1. WELCOME SCREEN
// ==========================================

app.innerHTML = `
  <div class="background-hearts" id="hearts"></div>

  <main class="welcome-page">
    <div class="top-label">
      <span class="sparkle">✦</span>
      A LITTLE SURPRISE FOR YOU
      <span class="sparkle">✦</span>
    </div>

    <section class="welcome-card">
      <div class="illustration">
        <div class="sunshine">☀️</div>
        <div class="bear">🧸</div>
        <div class="flower flower-one">🌼</div>
        <div class="flower flower-two">🌷</div>
        <div class="heart">💗</div>
      </div>

      <div class="card-content">
        <p class="small-heading">HEY, YOU!</p>

        <h1>
          Sending you<br>
          <span>Lots of Love & Healing</span>
        </h1>

        <p class="description">
          Someone is thinking about you and wishing
          you a speedy recovery. So here's a little
          surprise to make your day brighter!
        </p>

        <div class="divider">
          <span>♡</span>
        </div>

        <button class="start-button" id="startButton">
          Open Your Surprise
          <span>♡</span>
        </button>

        <p class="footer-note">
          Made with love, just for you
        </p>
      </div>
    </section>

    <p class="bottom-text">
      ✨ Better days are coming. Take your time. ✨
    </p>
  </main>
`;

const heartContainer = document.querySelector('#hearts');

for (let i = 0; i < 22; i++) {
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = ['♡', '♥', '✦'][i % 3];

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 20}px`;
  heart.style.animationDuration = `${7 + Math.random() * 9}s`;
  heart.style.animationDelay = `${Math.random() * 8}s`;

  heartContainer.appendChild(heart);
}

gsap.from('.top-label', {
  y: -25,
  opacity: 0,
  duration: 1
});

gsap.from('.welcome-card', {
  y: 45,
  opacity: 0,
  scale: 0.96,
  duration: 1.2,
  ease: 'power3.out',
  delay: 0.2
});

gsap.to('.bear', {
  y: -9,
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

gsap.to('.heart', {
  scale: 1.2,
  duration: 0.8,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

// ==========================================
// 2. PERSONALIZATION SCREEN
// ==========================================

document.querySelector('#startButton').addEventListener('click', () => {
  app.innerHTML = `
    <main class="details-page">
      <section class="details-card">
        <div class="details-icon">💌</div>

        <p class="small-heading">LET'S MAKE IT PERSONAL</p>

        <h1>A little something<br>just for you!</h1>

        <p class="description">
          First, tell me who this special surprise is for.
        </p>

        <form id="detailsForm">
          <label for="friendName">Your friend's name</label>
          <input
            id="friendName"
            type="text"
            placeholder="Enter their name..."
            required
          />

          <label for="senderName">Your name</label>
          <input
            id="senderName"
            type="text"
            placeholder="Enter your name..."
            required
          />

          <button class="start-button" type="submit">
            Continue ♡
          </button>
        </form>
      </section>
    </main>
  `;

  gsap.from('.details-card', {
    y: 35,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });

  document.querySelector('#detailsForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const friend = document.querySelector('#friendName').value.trim();
    const sender = document.querySelector('#senderName').value.trim();

    if (!friend || !sender) {
      alert('Please enter both names!');
      return;
    }

    sessionStorage.setItem('friendName', friend);
    sessionStorage.setItem('senderName', sender);

    showBalloonScreen();
  });
});

// ==========================================
// 3. BALLOON WISHES SCREEN
// ==========================================

function showBalloonScreen() {
  const friend = sessionStorage.getItem('friendName');

  const wishes = [
    "Sending you a big hug! 🤗",
    "Rest well and take care! 🌸",
    "You are stronger than you think! 💪",
    "Wishing you brighter days ahead! ☀️",
    "Can't wait to see you smile again! 💗"
  ];

  let popped = 0;

  app.innerHTML = `
    <main class="balloon-page">
      <p class="small-heading">A LITTLE LOVE FOR YOU</p>

      <h1>Hey ${friend}! 💗</h1>

      <p class="description">
        I've hidden 5 little wishes inside these balloons.
        Pop them all to discover your surprise!
      </p>

      <p class="progress-text">
        Wishes discovered: <span id="progress">0</span>/5
      </p>

      <div class="balloon-container">
        ${wishes.map((wish, i) => `
          <button class="balloon balloon-${i + 1}"
            data-index="${i}"
            aria-label="Pop balloon ${i + 1}">
            <span class="balloon-emoji">🎈</span>
          </button>
        `).join('')}
      </div>

      <div id="wish-message" class="wish-message">
        Tap a balloon to reveal your wish 💌
      </div>

      <div id="finish-message" hidden>
        <h2>You found all my wishes! 💕</h2>
        <p>Remember, you are loved more than you know.</p>

        <button class="start-button" id="memoriesButton">
          See Our Memories ♡
        </button>
      </div>
    </main>
  `;

  gsap.from('.balloon-page', {
    opacity: 0,
    y: 30,
    duration: 0.8
  });

  gsap.to('.balloon', {
    y: -15,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    stagger: 0.2,
    ease: 'sine.inOut'
  });

  document.querySelectorAll('.balloon').forEach(button => {
    button.addEventListener('click', () => {
      if (button.disabled) return;

      const index = Number(button.dataset.index);

      button.disabled = true;
      popped++;

      gsap.to(button, {
        scale: 1.8,
        opacity: 0,
        duration: 0.35,
        ease: 'back.in',
        onComplete: () => button.remove()
      });

      document.querySelector('#progress').textContent = popped;

      document.querySelector('#wish-message').textContent =
        wishes[index];

      if (popped === 5) {
        setTimeout(() => {
          document.querySelector('#finish-message').hidden = false;

          document.querySelector('#memoriesButton')
            .addEventListener('click', showMemoriesScreen);

          gsap.from('#finish-message', {
            opacity: 0,
            y: 25,
            duration: 0.8
          });
        }, 500);
      }
    });
  });
}

// ==========================================
// 4. MEMORIES PHOTO UPLOAD SCREEN
// ==========================================

function showMemoriesScreen() {
  const friend = sessionStorage.getItem('friendName');
  const sender = sessionStorage.getItem('senderName');

  app.innerHTML = `
    <main class="memories-page">
      <section class="memories-card">
        <div class="details-icon">📸</div>

        <p class="small-heading">LITTLE MOMENTS, BIG MEMORIES</p>

        <h1>Our Memories 💗</h1>

        <p class="description">
          ${friend}, every moment with you is special.
          Here are some memories to make you smile.
        </p>

        <div class="upload-area">
          <label for="photoUpload" class="upload-button">
            <span>＋</span>
            Add Our Photos
            <small>Choose multiple photos from your device</small>
          </label>

          <input
            type="file"
            id="photoUpload"
            accept="image/*"
            multiple
            hidden
          />
        </div>

        <div id="photoGallery" class="photo-gallery">
          <p class="empty-message">
            Your beautiful memories will appear here ✨
          </p>
        </div>

        <button class="start-button" id="letterButton">
          Continue to Your Letter ♡
        </button>

        <p class="footer-note">
          Made with love by ${sender} 💕
        </p>
      </section>
    </main>
  `;

  gsap.from('.memories-card', {
    opacity: 0,
    y: 30,
    duration: 0.8
  });

  const upload = document.querySelector('#photoUpload');
  const gallery = document.querySelector('#photoGallery');

  let selectedPhotos = [];

  function renderGallery() {
    gallery.innerHTML = selectedPhotos.length
      ? selectedPhotos.map((file, index) => `
          <div class="photo-item">
            <img
              src="${URL.createObjectURL(file)}"
              alt="Our memory ${index + 1}"
            />
            <button
              class="remove-photo"
              data-index="${index}"
              aria-label="Remove photo"
            >×</button>
          </div>
        `).join('')
      : '<p class="empty-message">Your beautiful memories will appear here ✨</p>';

    gallery.querySelectorAll('.remove-photo').forEach(button => {
      button.addEventListener('click', () => {
        selectedPhotos.splice(Number(button.dataset.index), 1);
        renderGallery();
      });
    });
  }

  upload.addEventListener('change', (event) => {
    const files = Array.from(event.target.files);

    const validFiles = files.filter(file =>
      file.type.startsWith('image/')
    );

    if (selectedPhotos.length + validFiles.length > 12) {
      alert('You can upload a maximum of 12 photos.');
      upload.value = '';
      return;
    }

    selectedPhotos.push(...validFiles);
    renderGallery();
    upload.value = '';
  });

  document.querySelector('#letterButton').addEventListener('click', () => {
    window.memoryPhotos = selectedPhotos;
    showLetterScreen();
  });
}

// ==========================================
// 5. PERSONAL LETTER SCREEN
// ==========================================

function showLetterScreen() {
  const friend = sessionStorage.getItem('friendName');
  const sender = sessionStorage.getItem('senderName');

  app.innerHTML = `
    <main class="details-page">
      <section class="details-card">
        <div class="details-icon">💌</div>

        <p class="small-heading">A MESSAGE FROM THE HEART</p>

        <h1>A Little Letter<br>For ${friend}</h1>

        <p class="description">
          Write something special to make their day brighter.
        </p>

        <textarea
          id="personalLetter"
          placeholder="Dear ${friend}, I just wanted to tell you..."
          rows="7"
          style="width:100%; padding:15px; margin-top:25px;
          border:1px solid #efd5de; border-radius:12px;
          font-family:inherit; resize:vertical;"
        ></textarea>

        <button class="start-button" id="saveLetter"
          style="margin-top:20px;">
          Save My Letter ♡
        </button>
      </section>
    </main>
  `;

  gsap.from('.details-card', {
    opacity: 0,
    y: 30,
    duration: 0.8
  });

  document.querySelector('#saveLetter').addEventListener('click', () => {
    const letter = document.querySelector('#personalLetter').value.trim();

    if (!letter) {
      alert('Please write your letter first!');
      return;
    }

    sessionStorage.setItem('personalLetter', letter);
    showPinSetupScreen();
  });
}

// ==========================================
// 6. PIN SETUP SCREEN
// ==========================================

function showPinSetupScreen() {
  app.innerHTML = `
    <main class="details-page">
      <section class="details-card">
        <div class="details-icon">🔐</div>

        <p class="small-heading">A LITTLE SECRET</p>

        <h1>Protect Your Letter</h1>

        <p class="description">
          Create a secret 4-digit PIN.
          Only someone who knows the PIN can open your letter.
        </p>

        <input
          id="createPin"
          type="password"
          inputmode="numeric"
          maxlength="4"
          placeholder="Enter 4-digit PIN"
          style="width:100%;padding:16px;margin-top:30px;
          border:1px solid #efd5de;border-radius:12px;
          text-align:center;font-size:22px;letter-spacing:8px;"
        />

        <button class="start-button" id="lockLetter"
          style="margin-top:25px;">
          Lock My Letter 🔒
        </button>
      </section>
    </main>
  `;

  gsap.from('.details-card', {
    opacity: 0,
    y: 30,
    duration: 0.8
  });

  document.querySelector('#lockLetter').addEventListener('click', () => {
    const pin = document.querySelector('#createPin').value;

    if (!/^\d{4}$/.test(pin)) {
      alert('Please enter exactly 4 digits!');
      return;
    }

    sessionStorage.setItem('letterPin', pin);
    showFinalScreen();
  });
}

// ==========================================
// 7. LOCKED LETTER SCREEN
// ==========================================

function showFinalScreen() {
  const friend = sessionStorage.getItem('friendName');
  const sender = sessionStorage.getItem('senderName');

  app.innerHTML = `
    <main class="details-page">
      <section class="details-card">
        <div class="details-icon">💌</div>

        <p class="small-heading">ONE LAST SURPRISE</p>

        <h1>Something Special<br>For ${friend}</h1>

        <p class="description">
          ${sender} has written you a little letter.
          But there's one tiny secret!
        </p>

        <div id="lockedEnvelope" style="margin:30px 0;">
          <div id="envelope" style="font-size:100px;">
            💌
          </div>
          <p style="color:#bd7790;font-weight:600;">
            Your letter is waiting for you...
          </p>
        </div>

        <label for="unlockPin" style="display:block;margin-bottom:12px;">
          Enter your secret PIN
        </label>

        <input
          id="unlockPin"
          type="password"
          inputmode="numeric"
          maxlength="4"
          placeholder="4-digit PIN"
          style="width:100%;padding:16px;
          border:1px solid #efd5de;border-radius:12px;
          text-align:center;font-size:22px;letter-spacing:8px;"
        />

        <button class="start-button" id="openLetter"
          style="margin-top:20px;">
          Open My Letter ♡
        </button>

        <p id="pinError" style="color:#d16d82;margin-top:15px;"></p>

        <div id="letterContent" hidden>
          <h2 style="font-family:'Playfair Display',serif;
          color:#bd7790;margin:20px 0;">
            A Letter For You 💗
          </h2>

          <p id="letterText"
          style="white-space:pre-wrap;line-height:1.9;
          color:#86636e;text-align:left;"></p>

          <p style="margin-top:25px;color:#bd7790;">
            With lots of love,<br>${sender} ❤️
          </p>

          <button class="start-button" id="finalSurpriseButton"
            style="margin-top:25px;">
            Open Your Final Surprise 🌸
          </button>
        </div>
      </section>
    </main>
  `;

  gsap.from('.details-card', {
    opacity: 0,
    y: 30,
    duration: 0.8
  });

  document.querySelector('#openLetter').addEventListener('click', () => {
    const enteredPin = document.querySelector('#unlockPin').value;
    const savedPin = sessionStorage.getItem('letterPin');

    if (enteredPin !== savedPin) {
      document.querySelector('#pinError').textContent =
        'Oops! Incorrect PIN. Try again 💗';
      return;
    }

    document.querySelector('#pinError').textContent = '';

    gsap.to('#envelope', {
      rotation: 15,
      scale: 1.2,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        document.querySelector('#envelope').textContent = '💖';
        document.querySelector('#letterContent').hidden = false;

        document.querySelector('#letterText').textContent =
          sessionStorage.getItem('personalLetter');

        gsap.from('#letterContent', {
          opacity: 0,
          y: 30,
          duration: 1
        });

        document.querySelector('#finalSurpriseButton')
          .addEventListener('click', showCelebrationScreen);
      }
    });
  });
}

// ==========================================
// 8. FINAL GET WELL SOON CELEBRATION
// ==========================================

function showCelebrationScreen() {
  const friend = sessionStorage.getItem('friendName');
  const sender = sessionStorage.getItem('senderName');

  const photos = window.memoryPhotos || [];

  app.innerHTML = `
    <div id="celebrationHearts"></div>

    <main class="celebration-page">
      <div class="celebration-content">
        <div class="celebration-flower">🌷</div>

        <p class="small-heading">
          A SPECIAL MESSAGE JUST FOR YOU
        </p>

        <h1>
          Get Well Soon,<br>
          <span>${friend}!</span> 💗
        </h1>

        <div class="big-heart">💖</div>

        <p class="celebration-message">
          I wish I could take away all your pain
          and replace it with happiness.
          Until then, sending you endless hugs,
          love and positive energy.
        </p>

        <h2 class="healing-heading">
          Better Days Are Coming ☀️
        </h2>

        <p class="sender-message">
          Take care, rest well and keep smiling.
          The world needs your beautiful smile!
        </p>

        <p class="signature">
          With lots of love,<br>
          ${sender} ❤️
        </p>

        ${photos.length ? `
          <section class="final-memories">
            <h2>Our Little Memories 📸</h2>
            <div class="final-photo-gallery">
              ${photos.map((file, i) => `
                <img
                  src="${URL.createObjectURL(file)}"
                  alt="Memory ${i + 1}"
                />
              `).join('')}
            </div>
          </section>
        ` : ''}

        <div class="music-area">
          <button id="musicButton" class="music-button">
            ♫ Play Music
          </button>

          <audio id="backgroundMusic" loop preload="auto">
            <source src="/music/soft-music.mp3" type="audio/mpeg">
          </audio>
        </div>

        <p class="final-footer">
          Made with endless love, just for you ✨
        </p>
      </div>
    </main>
  `;

  // Floating celebration hearts
  const heartContainer = document.querySelector('#celebrationHearts');

  for (let i = 0; i < 35; i++) {
    const heart = document.createElement('span');

    heart.className = 'celebration-heart';
    heart.textContent = ['💗', '🌸', '♡', '✨'][i % 4];

    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (6 + Math.random() * 8) + 's';
    heart.style.animationDelay = Math.random() * 6 + 's';

    heartContainer.appendChild(heart);
  }

  // Celebration animations
  gsap.from('.celebration-content', {
    opacity: 0,
    y: 50,
    scale: 0.95,
    duration: 1.3,
    ease: 'power3.out'
  });

  gsap.to('.big-heart', {
    scale: 1.18,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // ========================================
  // AUTOMATIC BACKGROUND MUSIC
  // ========================================

  const music = document.querySelector('#backgroundMusic');
  const musicButton = document.querySelector('#musicButton');

  async function startBackgroundMusic() {
    try {
      await music.play();
      musicButton.textContent = 'Ⅱ Pause Music';
    } catch (error) {
      console.log('Browser blocked autoplay:', error);
      musicButton.textContent = '♫ Tap to Play Music';
    }
  }

  // Try to play music when the final screen opens.
  startBackgroundMusic();

  // Play/pause button as a fallback.
  musicButton.addEventListener('click', async () => {
    if (music.paused) {
      await startBackgroundMusic();
    } else {
      music.pause();
      musicButton.textContent = '♫ Play Music';
    }
  });
}
