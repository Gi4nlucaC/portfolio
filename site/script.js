async function loadProjects() {
  const statusEl = document.getElementById('projects-status');
  const gridEl = document.getElementById('projects-grid');

  try {
    statusEl.textContent = 'Loading projects…';
    const response = await fetch('./data/projects.json', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    /** @type {{ projects: Array<any> }} */
    const data = await response.json();

    if (!data || !Array.isArray(data.projects)) {
      throw new Error('Invalid JSON format');
    }

    gridEl.innerHTML = '';

    for (const project of data.projects) {
      gridEl.appendChild(renderProjectCard(project));
    }

    statusEl.textContent = `${data.projects.length} projects loaded.`;
  } catch (error) {
    statusEl.textContent = 'Unable to load projects.';

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

function renderProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'card project';

  const title = escapeText(project.title ?? 'Project title');
  const role = escapeText(project.role ?? 'Role');
  const platform = escapeText(project.platform ?? 'Platforms');
  const year = escapeText(project.year ?? '');
  const description = escapeText(project.description ?? '');

  const badges = [];
  if (role) badges.push(role);
  if (platform) badges.push(platform);
  if (year) badges.push(year);

  const links = Array.isArray(project.links) ? project.links : [];

  card.innerHTML = `
    <div class="project__top">
      <div class="project__title">${title}</div>
      <div class="badges" aria-label="Project metadata">
        ${badges.map((b) => `<span class="badge">${b}</span>`).join('')}
      </div>
    </div>

    <p class="project__desc">${description}</p>

    <div class="project__links" aria-label="Project links">
      ${links
        .map((l) => {
          const label = escapeText(l.label ?? 'Link');
          const href = typeof l.href === 'string' ? l.href : '';

          if (!isSafeUrl(href)) return '';

          const rel = href.startsWith('#') ? '' : ' rel="noreferrer"';
          const target = href.startsWith('#') ? '' : ' target="_blank"';

          return `<a class="link" href="${href}"${target}${rel}>${label}</a>`;
        })
        .filter(Boolean)
        .join('')}
    </div>
  `;

  return card;
}

function escapeText(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function isSafeUrl(url) {
  if (!url) return false;
  if (url.startsWith('#')) return true;

  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
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

      const target = document.querySelector(href);
      if (!(target instanceof HTMLElement)) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const canFocus = target.hasAttribute('tabindex');
      if (!canFocus) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (!canFocus) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });

      history.replaceState(null, '', href);
    });
  }
}

setYear();
enhanceNav();
loadProjects();
