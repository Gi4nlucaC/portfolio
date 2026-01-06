function escapeText(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isSafeUrl(url) {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  return trimmed.startsWith('https://') || trimmed.startsWith('http://');
}

function isSafeAssetPath(value) {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:')) return false;
  if (lower.startsWith('data:')) return false;
  return isSafeUrl(trimmed) || trimmed.startsWith('./') || trimmed.startsWith('assets/');
}

function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function enhanceNav() {
  for (const link of document.querySelectorAll('a[href^="#"]')) {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      if (href === '#top') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.replaceState(null, '', href);
        return;
      }

      const target = document.querySelector(href);
      if (!(target instanceof HTMLElement)) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const hadTabIndex = target.hasAttribute('tabindex');
      if (!hadTabIndex) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (!hadTabIndex) {
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }

      history.replaceState(null, '', href);
    });
  }
}

function renderProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'card project';

  const titleText = String(project?.title ?? 'Project title');
  const roleText = String(project?.role ?? '');
  const platformText = String(project?.platform ?? '');
  const yearText = String(project?.year ?? '');
  const descriptionText = String(project?.description ?? '');

  const imageSrcRaw = String(project?.image ?? '').trim();
  const imageAltText = String(project?.imageAlt ?? titleText).trim() || titleText;

  const badges = [];
  if (roleText) badges.push(roleText);
  if (platformText) badges.push(platformText);
  if (yearText) badges.push(yearText);

  const links = Array.isArray(project?.links) ? project.links : [];

  const safeLinks = links
    .map((link) => {
      const label = String(link?.label ?? '').trim();
      const href = String(link?.href ?? link?.url ?? '').trim();
      return { label, href };
    })
    .filter((link) => link.label && isSafeUrl(link.href));

  const splash = document.createElement('div');
  splash.className = 'project__splash';

  const img = document.createElement('img');
  img.className = 'project__img';
  img.loading = 'lazy';
  img.decoding = 'async';
  if (isSafeAssetPath(imageSrcRaw)) {
    img.src = imageSrcRaw;
  } else {
    img.src = 'assets/projects/placeholder.svg';
  }
  img.alt = imageAltText;
  splash.appendChild(img);

  const header = document.createElement('div');
  header.className = 'project__header';

  const title = document.createElement('div');
  title.className = 'project__title';
  title.textContent = titleText;
  header.appendChild(title);

  const badgesEl = document.createElement('div');
  badgesEl.className = 'badges';
  badgesEl.setAttribute('aria-label', 'Project metadata');
  for (const badgeText of badges) {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = badgeText;
    badgesEl.appendChild(badge);
  }
  header.appendChild(badgesEl);
  splash.appendChild(header);

  const overlay = document.createElement('div');
  overlay.className = 'project__overlay';

  const description = document.createElement('p');
  description.className = 'project__desc';
  description.textContent = descriptionText;
  overlay.appendChild(description);

  if (safeLinks.length > 0) {
    const linksEl = document.createElement('div');
    linksEl.className = 'project__links';
    linksEl.setAttribute('aria-label', 'Project links');
    for (const link of safeLinks) {
      const a = document.createElement('a');
      a.className = 'link';
      a.href = link.href;
      a.target = '_blank';
      a.rel = 'noreferrer';
      a.textContent = link.label;
      linksEl.appendChild(a);
    }
    overlay.appendChild(linksEl);
  }

  splash.appendChild(overlay);
  card.appendChild(splash);

  return card;
}

async function loadProjects() {
  const gridEl = document.getElementById('projects-grid');
  if (!gridEl) return;

  try {
    const response = await fetch('./data/projects.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    /** @type {{ projects?: Array<any> }} */
    const data = await response.json();
    if (!data || !Array.isArray(data.projects)) throw new Error('Invalid JSON format');

    gridEl.innerHTML = '';
    for (const project of data.projects) {
      gridEl.appendChild(renderProjectCard(project));
    }
  } catch (error) {
    console.error('Failed to load projects.json', error);

    const fallback = document.createElement('div');
    fallback.className = 'card';
    fallback.innerHTML = `
      <h3>Loading error</h3>
      <p class="muted">Check <strong>site/data/projects.json</strong> and try again.</p>
    `;

    gridEl.innerHTML = '';
    gridEl.appendChild(fallback);
  }
}

function renderLanguageRatings() {
  const container = document.getElementById('language-ratings');
  if (!container) return;

  /** @type {Array<{ name: string; rating: number }>} */
  const languages = [
    { name: 'C#', rating: 5 },
    { name: 'C++', rating: 4 },
    { name: 'Java', rating: 3 },
    { name: 'PHP', rating: 3.5 },
    { name: 'JavaScript', rating: 2 },
    { name: 'Python', rating: 1 },
  ];

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  container.innerHTML = '';

  languages.forEach((language) => {
    const row = document.createElement('div');
    row.className = 'rating-row';

    const label = document.createElement('div');
    label.className = 'rating-label';
    label.textContent = language.name;

    const stars = document.createElement('div');
    stars.className = 'rating-stars';
    stars.innerHTML = `
      <span class="stars-base" aria-hidden="true">★★★★★</span>
      <span class="stars-fill" aria-hidden="true">★★★★★</span>
    `;

    const clamped = Math.max(0, Math.min(5, Number(language.rating)));
    const fillPercent = (clamped / 5) * 100;
    stars.setAttribute('role', 'img');
    stars.setAttribute('aria-label', `${language.name}: ${clamped} out of 5`);

    const fill = stars.querySelector('.stars-fill');
    if (fill instanceof HTMLElement) {
      fill.dataset.targetWidth = `${fillPercent}%`;
      fill.style.width = reduceMotion ? `${fillPercent}%` : '0%';
    }

    row.appendChild(label);
    row.appendChild(stars);
    container.appendChild(row);
  });
}

function initLanguageRatingsAnimation() {
  const container = document.getElementById('language-ratings');
  if (!container) return;

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  if (reduceMotion) return;

  const rows = Array.from(container.querySelectorAll('.rating-row'));
  if (rows.length === 0) return;

  const applyRow = (row, index) => {
    const fill = row.querySelector('.stars-fill');
    if (!(fill instanceof HTMLElement)) return;
    const targetWidth = fill.dataset.targetWidth;
    if (!targetWidth) return;

    window.setTimeout(() => {
      requestAnimationFrame(() => {
        fill.style.width = targetWidth;
      });
    }, index * 90);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const row = entry.target;
          const index = rows.indexOf(row);
          if (index >= 0) applyRow(row, index);
          observer.unobserve(row);
        }
      },
      { threshold: 0.25 }
    );

    rows.forEach((row) => observer.observe(row));
  } else {
    rows.forEach((row, index) => applyRow(row, index));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  enhanceNav();
  loadProjects();
  renderLanguageRatings();
  initLanguageRatingsAnimation();
});
