const flowContent = {
  open: {
    step: "Step 1",
    title: "User opens website",
    text: "The workflow begins when a user navigates to a page, clicks a link, scans a URL, or opens content that may need review."
  },
  observe: {
    step: "Step 2",
    title: "Extension observes page context",
    text: "The browser layer collects the minimum context needed for a safety decision, such as destination, interaction source, and visible page cues."
  },
  signals: {
    step: "Step 3",
    title: "URL and page signals are evaluated",
    text: "Signals are normalized into a user-safety decision pipeline. Public documentation avoids exact rule thresholds, datasets, and proprietary implementation details."
  },
  engine: {
    step: "Step 4",
    title: "Private Detection Engine",
    text: "Risk scoring logic is withheld. This proprietary signal evaluation layer is intentionally not publicly disclosed because the product may be commercially released."
  },
  verdict: {
    step: "Step 5",
    title: "Warning or safe status is shown",
    text: "The product converts the decision into a practical user experience: safe status, warning page, overlay, or mobile result."
  },
  decision: {
    step: "Step 6",
    title: "User decides action",
    text: "Users receive clear context so they can return to safety, report an issue, or proceed only when they understand the risk."
  }
};

const flowNodes = document.querySelectorAll(".flow-node");
const flowKicker = document.querySelector("#flow-kicker");
const flowTitle = document.querySelector("#flow-title");
const flowText = document.querySelector("#flow-text");

flowNodes.forEach((node) => {
  node.addEventListener("click", () => {
    const content = flowContent[node.dataset.node];
    flowNodes.forEach((item) => item.classList.remove("active"));
    node.classList.add("active");
    flowKicker.textContent = content.step;
    flowTitle.textContent = content.title;
    flowText.textContent = content.text;
  });
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    document.querySelectorAll(".tab").forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-selected", item === tab ? "true" : "false");
    });
    document.querySelectorAll(".gallery").forEach((gallery) => {
      gallery.classList.toggle("active", gallery.id === `${target}-gallery`);
    });
  });
});

document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const panel = trigger.nextElementSibling;
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
  });
});

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  siteNav.classList.toggle("open", !expanded);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const header = document.querySelector(".site-header");
const setHeaderState = () => {
  header.dataset.elevated = window.scrollY > 12 ? "true" : "false";
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

// Scroll Animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal-on-scroll").forEach((section) => {
  observer.observe(section);
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  // Apply saved theme on load
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }

  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
}
