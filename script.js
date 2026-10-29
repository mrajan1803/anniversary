
(() => {
  const envelopeButton = document.getElementById("envelope-button");
  const replayButton = document.getElementById("replay-button");
  const tapHint = document.getElementById("tap-hint");
  const heartLayer = document.getElementById("heart-layer");

  let heartTimer = null;
  let heartStopTimer = null;

  function createHeart() {
    if (!heartLayer) return;

    const heart = document.createElement("span");

    heart.className = "heart";
    heart.textContent = Math.random() > 0.3 ? "♥" : "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.setProperty(
      "--duration",
      `${3 + Math.random() * 3}s`
    );

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
      if (heartTimer) {
        window.clearInterval(heartTimer);
        heartTimer = null;
      }
      heartStopTimer = null;
    }, 8500);
  }

  function openLetter() {
    document.body.classList.add("open");

    if (envelopeButton) {
      envelopeButton.setAttribute("aria-expanded", "true");
      envelopeButton.setAttribute(
        "aria-label",
        "Close your anniversary letter"
      );
    }

    if (tapHint) {
      tapHint.textContent = "A little love, just for you ♥";
    }

    startHearts();
  }

  function closeLetter() {
    document.body.classList.remove("open");

    if (envelopeButton) {
      envelopeButton.setAttribute("aria-expanded", "false");
      envelopeButton.setAttribute(
        "aria-label",
        "Open your anniversary letter"
      );
    }

    if (tapHint) {
      tapHint.textContent = "↗ Tap the envelope to open your letter";
    }

    if (heartTimer) {
      window.clearInterval(heartTimer);
      heartTimer = null;
    }

    if (heartStopTimer) {
      window.clearTimeout(heartStopTimer);
      heartStopTimer = null;
    }
  }

  if (envelopeButton) {
    envelopeButton.addEventListener("click", () => {
      if (document.body.classList.contains("open")) {
        closeLetter();
      } else {
        openLetter();
      }
    });
  }

  if (replayButton) {
    replayButton.addEventListener("click", () => {
      closeLetter();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      window.setTimeout(openLetter, 450);
    });
  }
})();
