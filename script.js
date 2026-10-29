
(() => {
  const experience = document.getElementById("letter-experience");
  const openButton = document.getElementById("open-button");
  const buttonLabel = document.getElementById("button-label");
  const letter = document.getElementById("love-letter");
  const replayButton = document.getElementById("replay-button");
  const heartLayer = document.getElementById("heart-layer");

  let heartTimer = null;
  let heartStopTimer = null;

  if (!experience || !openButton || !letter) return;

  function createHeart() {
    if (!heartLayer) return;

    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = Math.random() > 0.3 ? "♥" : "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.setProperty("--duration", `${3 + Math.random() * 3}s`);

    heartLayer.appendChild(heart);

    window.setTimeout(() => heart.remove(), 6500);
  }

  function startHearts() {
    for (let i = 0; i < 12; i++) {
      window.setTimeout(createHeart, i * 120);
    }

    if (heartTimer) window.clearInterval(heartTimer);
    if (heartStopTimer) window.clearTimeout(heartStopTimer);

    heartTimer = window.setInterval(createHeart, 450);

    heartStopTimer = window.setTimeout(() => {
      window.clearInterval(heartTimer);
      heartTimer = null;
      heartStopTimer = null;
    }, 8500);
  }

  function stopHearts() {
    if (heartTimer) {
      window.clearInterval(heartTimer);
      heartTimer = null;
    }

    if (heartStopTimer) {
      window.clearTimeout(heartStopTimer);
      heartStopTimer = null;
    }
  }

  function openLetter() {
    experience.classList.add("is-open");
    openButton.setAttribute("aria-expanded", "true");
    letter.setAttribute("aria-hidden", "false");
    letter.inert = false;
    buttonLabel.textContent = "Close my letter";
    startHearts();

    window.setTimeout(() => {
      if (experience.classList.contains("is-open")) {
        letter.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }
    }, 500);
  }

  function closeLetter() {
    experience.classList.remove("is-open");
    openButton.setAttribute("aria-expanded", "false");
    letter.setAttribute("aria-hidden", "true");
    letter.inert = true;
    buttonLabel.textContent = "Open my letter";
    stopHearts();
  }

  openButton.addEventListener("click", () => {
    if (experience.classList.contains("is-open")) {
      closeLetter();
    } else {
      openLetter();
    }
  });

  if (replayButton) {
    replayButton.addEventListener("click", () => {
      closeLetter();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      window.setTimeout(openLetter, 500);
    });
  }
})();
