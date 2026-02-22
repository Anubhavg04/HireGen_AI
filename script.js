// ===============================
// Reveal Animations (IntersectionObserver)
// ===============================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===============================
// Smooth Scroll for Navigation
// ===============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===============================
// Staggered reveal for cards
// ===============================
const revealBatch = (selector, delay = 100) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, i) => {
    el.style.transitionDelay = `${i * delay}ms`;
  });
};

revealBatch(".grid .glass");
revealBatch(".feature-card");

// ===============================
// Hero Text Reveal Animation
// ===============================
const heroHeader = document.querySelector(".hero h1");
if (heroHeader) {
  heroHeader.style.opacity = "0";
  heroHeader.style.transform = "translateY(20px)";

  setTimeout(() => {
    heroHeader.style.transition = "all 1s cubic-bezier(0.4, 0, 0.2, 1)";
    heroHeader.style.opacity = "1";
    heroHeader.style.transform = "translateY(0)";
  }, 200);
}

// ===============================
// Confetti
// ===============================
function createConfetti() {
  const colors = ["#FF6B00", "#FFA366", "#FFFFFF", "#FF3D00"];
  const container = document.body;

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.position = "fixed";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";
    confetti.style.zIndex = "9999";
    confetti.style.borderRadius = "50%";
    container.appendChild(confetti);

    const animation = confetti.animate(
      [
        { transform: "translate3d(0,0,0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate3d(${(Math.random() - 0.5) * 200}px, 100vh, 0) rotate(${Math.random() * 360}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 2000 + 1000,
        easing: "cubic-bezier(0, .9, .57, 1)",
      }
    );

    animation.onfinish = () => confetti.remove();
  }
}

// ===============================
// ✅ WAITLIST -> Google Apps Script Web App (REAL POST)
// ===============================
// 1) Deploy your Apps Script as Web App
// 2) Paste the /exec URL below
const ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbwSBgyJNU3VSuSRDfNoveMeToemfCRM2esJWohBfPfZxQAJ6f88HCKRz7kQEY4TE4ud/exec";

const waitlistForm = document.getElementById("waitlist-form");
const successMessage = document.getElementById("success-message");

if (waitlistForm) {
  waitlistForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input = waitlistForm.querySelector('input[type="email"]');
    const button = waitlistForm.querySelector('button[type="submit"]');
    const email = (input?.value || "").trim();

    if (!email || !email.includes("@")) return;

    // Loading state
    button.classList.add("loading");
    button.disabled = true;

    try {
      const res = await fetch(ENDPOINT_URL, {
        method: "POST",
        // Apps Script is happiest with text/plain for JSON body
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ email, source: "website" }),
      });

      const raw = await res.text();
      console.log("Apps Script raw response:", raw);

      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        data = { ok: false, error: raw };
      }

      if (!data.ok) throw new Error(data.error || "Unknown Apps Script error");

      // UI success
      button.classList.remove("loading");
      button.innerHTML = "<span>✓ Joined</span>";
      button.style.background = "#00C853";

      waitlistForm.style.opacity = "0.5";
      waitlistForm.style.pointerEvents = "none";
      if (successMessage) successMessage.style.display = "block";

      createConfetti();
    } catch (err) {
      console.error("Waitlist submit failed:", err);
      alert("Submit failed: " + (err?.message || err));

      // Revert button
      button.classList.remove("loading");
      button.disabled = false;
    }
  });
}