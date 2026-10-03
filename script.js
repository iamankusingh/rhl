gsap.registerPlugin(ScrollTrigger);

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileDrawer = document.getElementById("mobile-drawer");
const mobileLinks = document.querySelectorAll(".mobile-link");
const menuIcon = document.querySelector(".menu-icon");
let menuOpen = false;

mobileMenuBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    mobileDrawer.classList.remove("translate-x-full");
    document.body.classList.add("overflow-hidden");
    menuIcon.innerHTML =
      '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
  } else {
    mobileDrawer.classList.add("translate-x-full");
    document.body.classList.remove("overflow-hidden");
    menuIcon.innerHTML =
      '<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>';
  }
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuOpen = false;
    mobileDrawer.classList.add("translate-x-full");
    document.body.classList.remove("overflow-hidden");
    menuIcon.innerHTML =
      '<line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line>';
  });
});

// Sticky Navbar Transition
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add(
      "bg-white/95",
      "backdrop-blur-md",
      "shadow-sm",
      "py-3",
      "border-slate-100",
    );
    navbar.classList.remove("bg-transparent", "py-4", "border-transparent");
  } else {
    navbar.classList.add("bg-transparent", "py-4", "border-transparent");
    navbar.classList.remove(
      "bg-white/95",
      "backdrop-blur-md",
      "shadow-sm",
      "py-3",
      "border-slate-100",
    );
  }
});

// GSAP Animations

// 1. Hero Load-in
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.from(".hero-line", {
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  delay: 0.2,
}).from(
  ".hero-elem",
  {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
  },
  "-=0.6",
);

// 2. Parallax on hero image
gsap.to(".hero-parallax", {
  yPercent: 15,
  ease: "none",
  scrollTrigger: {
    trigger: "#home",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// 3. Scroll Reveals
const revealElements = document.querySelectorAll(".reveal-up");
revealElements.forEach((elem) => {
  gsap.to(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 85%",
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  });
});

// 4. Counters
const counters = document.querySelectorAll(".counter");
counters.forEach((counter) => {
  const target = +counter.getAttribute("data-target");

  ScrollTrigger.create({
    trigger: counter,
    start: "top 90%",
    once: true,
    onEnter: () => {
      gsap.to(counter, {
        innerHTML: target,
        duration: 2.5,
        snap: { innerHTML: 1 },
        ease: "power2.out",
      });
    },
  });
});

// Form Submission Simulation
document.getElementById("quote-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML =
    '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...';
  btn.disabled = true;
  btn.classList.add("opacity-80", "cursor-not-allowed");

  setTimeout(() => {
    const successMsg = document.getElementById("form-success");
    successMsg.classList.remove("hidden");

    // Reset button
    btn.innerHTML = originalText;
    btn.disabled = false;
    btn.classList.remove("opacity-80", "cursor-not-allowed");
    this.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMsg.classList.add("hidden");
    }, 5000);
  }, 1500);
});
