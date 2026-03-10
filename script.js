"use strict";

/*
  ==========================================================
  EASY EDIT SECTION
  Update your profile content and links here.
  ==========================================================
*/
const PROFILE_CONFIG = {
  // EDIT: Your display name
  name: "Cyro",

  // EDIT: Your one-line bio
  bio: "Art Of Being • Implicit",

  // EDIT: Profile image URL (use local path like ./images/avatar.jpg if preferred)
  profileImage: "./assets/profile.jpg",

  // EDIT: Footer text
  footerText: "",
};

/*
  ==========================================================
  EASY EDIT SECTION: SOCIAL LINKS
  Add, remove, or reorder items below.
  iconKey options: twitter, youtube, twitch, telegram, abstract, trading
  ==========================================================
*/
const ICON_SVGS = {
  twitter:
    '<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.188L24 22.847h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.04L6.486 3.24H4.298z"/></svg>',
  youtube:
    '<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3.1 3.1 0 0 0-2.2-2.2C19.2 3.5 12 3.5 12 3.5s-7.2 0-9.3.5A3.1 3.1 0 0 0 .5 6.2 32.7 32.7 0 0 0 0 12a32.7 32.7 0 0 0 .5 5.8 3.1 3.1 0 0 0 2.2 2.2c2.1.5 9.3.5 9.3.5s7.2 0 9.3-.5a3.1 3.1 0 0 0 2.2-2.2A32.7 32.7 0 0 0 24 12a32.7 32.7 0 0 0-.5-5.8ZM9.6 15.5V8.5l6.1 3.5Z"/></svg>',
  twitch:
    '<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M3 2 1 6v14h5v3h3l3-3h4l7-7V2H3Zm18 10-4 4h-5l-3 3v-3H5V4h16v8Zm-4-5h-2v5h2V7Zm-5 0h-2v5h2V7Z"/></svg>',
  telegram:
    '<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M21.5 3.5 2.8 10.7c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.7c.2.7.1 1 1 .8l2.7-2.6 5.7 4.2c1 .6 1.7.3 2-.9l3.4-16.1c.4-1.5-.6-2.2-1.8-1.6ZM8.1 13.5l10.7-6.8c.5-.3 1-.1.6.2l-8.9 8-.3 3.2-2.1-4.6Z"/></svg>',
  abstract:
    '<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M3 6.2 8.6 3h6.8L9.8 6.2Zm6.8 3.9L15.4 7h5.6l-5.6 3.1Zm-6.8 0L8.6 7h4.8L7.8 10.1Zm6.8 3.8L15.4 11h5.6l-5.6 3.1Zm-6.8 0L8.6 11h4.8L7.8 13.9Zm6.8 3.9 5.6-3.1h5.6L15.4 17.8Zm-6.8 0 5.6-3.1h4.8L7.8 17.8Z"/></svg>',
  trading:
    '<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M4 4h2v16H4V4Zm14 2h2v14h-2V6Zm-7-3h2v18h-2V3Zm-4 8h8v2H7v-2Zm6-5h6v2h-6V6Zm-8 9h6v2H5v-2Z"/></svg>',
  default:
    '<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="currentColor"/></svg>',
};

const SOCIAL_LINKS = [
  { name: "Twitter", iconKey: "twitter", url: "https://x.com/cyrotrading" },
  { name: "YouTube", iconKey: "youtube", url: "https://www.youtube.com/@cyrotrading" },
  { name: "Cyro's Trading Journal", iconKey: "telegram", url: "https://t.me/cyrotrades" },
  {
    name: "Trading Platform",
    iconImage: "./assets/axiom.jpg",
    iconClass: "icon-axiom",
    url: "https://axiom.trade/@cyro",
  },
  { name: "Twitch", iconKey: "twitch", url: "https://www.twitch.tv/cyrotrading" },
  {
    name: "Abstract Profile",
    iconImage: "./assets/abstract.jpg",
    iconClass: "icon-abstract",
    url: "https://portal.abs.xyz/profile/0x991b87ec4fe400178c3f54ea26ae445c2351e1ec",
  },
];

function setProfileContent() {
  document.getElementById("display-name").textContent = PROFILE_CONFIG.name;
  document.getElementById("bio-text").textContent = PROFILE_CONFIG.bio;

  const avatar = document.getElementById("profile-image");
  avatar.src = PROFILE_CONFIG.profileImage;
  avatar.alt = `${PROFILE_CONFIG.name} profile image`;

  document.getElementById("footer-text").textContent = PROFILE_CONFIG.footerText;
}

function renderSocialLinks() {
  const linksContainer = document.getElementById("social-links");

  SOCIAL_LINKS.forEach((link) => {
    const a = document.createElement("a");
    const iconMarkup = link.iconImage
      ? `<img src="${link.iconImage}" alt="" loading="lazy" decoding="async" />`
      : ICON_SVGS[link.iconKey] ?? ICON_SVGS.default;

    a.className = "social-link";
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", `Open ${link.name}`);

    a.innerHTML = `
      <span class="link-left">
        <span class="icon ${link.iconClass ?? ""}" aria-hidden="true">${iconMarkup}</span>
        <span class="label">${link.name}</span>
      </span>
      <span class="arrow" aria-hidden="true">↗</span>
    `;

    linksContainer.appendChild(a);
  });
}

function createStars(containerId, amount, minSize, maxSize, minDuration, maxDuration) {
  const container = document.getElementById(containerId);

  for (let index = 0; index < amount; index += 1) {
    const star = document.createElement("span");
    const size = randomBetween(minSize, maxSize);

    star.className = "star";

    if (size > 2.2) {
      star.classList.add("big");
    }

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${randomBetween(minDuration, maxDuration)}s`;
    star.style.animationDelay = `${-randomBetween(0, maxDuration)}s`;
    star.style.setProperty("--start-opacity", `${randomBetween(0.16, 0.4)}`);
    star.style.setProperty("--mid-opacity", `${randomBetween(0.62, 0.9)}`);
    star.style.setProperty("--high-opacity", `${randomBetween(0.9, 1)}`);

    container.appendChild(star);
  }
}

function randomBetween(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function initializePage() {
  setProfileContent();
  renderSocialLinks();

  createStars("stars-small", 130, 1, 2.5, 3.2, 6.3);
  createStars("stars-large", 36, 2.5, 4.6, 4.8, 9.5);
}

initializePage();
