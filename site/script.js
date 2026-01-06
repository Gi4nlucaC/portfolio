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
let languageRatingsAnimated = false;


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
      fill.dataset.fill = String(fillPercent);
      fill.style.width = reduceMotion ? `${fillPercent}%` : '0%';
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

function animateLanguageRatings() {
  if (languageRatingsAnimated) return;
  const container = document.getElementById('language-ratings');
  if (!container) return;

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  const fills = Array.from(container.querySelectorAll('.stars-fill'));
  if (fills.length === 0) return;

  languageRatingsAnimated = true;

  fills.forEach((fillEl, index) => {
    if (!(fillEl instanceof HTMLElement)) return;
    const target = Number(fillEl.dataset.fill ?? '0');
    const clamped = Math.max(0, Math.min(100, target));

    const apply = () => {
      fillEl.style.width = `${clamped}%`;
    };

    if (reduceMotion) {
      apply();
    } else {
      window.setTimeout(() => requestAnimationFrame(apply), index * 90);
    }
  });
}

function initLanguageRatingsAnimation() {
  const container = document.getElementById('language-ratings');
  if (!container) return;

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  if (reduceMotion) {
    animateLanguageRatings();
    return;
  }

  if (!('IntersectionObserver' in window)) {
    animateLanguageRatings();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animateLanguageRatings();
          observer.disconnect();
          return;
        }
      }
    },
    { threshold: 0.25 }
  );

  observer.observe(container);
}
}

function renderLanguageRatings() {
  const container = document.getElementById('language-ratings');
  if (!container) return;

  /** @type {Array<{ name: string; rating: number }>} */
  const languages = [
    { name: 'C#', rating: 5 },
    { name: 'C++', rating: 4 },
    { name: 'Java', rating: 4 },
    { name: 'PHP', rating: 4 },
    { name: 'JavaScript', rating: 3.5 },
    { name: 'Python', rating: 1 }
  ];

  container.innerHTML = '';

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

  languages.forEach((language, index) => {
    const row = document.createElement('div');
    row.className = 'rating-row';

    const label = document.createElement('div');
    label.className = 'rating-label';
    label.textContent = language.name;

    const stars = document.createElement('div');
    // Helpful when debugging on GitHub Pages.
    console.error('Failed to load projects.json', error);
    stars.className = 'rating-stars';
    stars.innerHTML = `
      <span class="stars-base" aria-hidden="true">★★★★★</span>
      <span class="stars-fill" aria-hidden="true">★★★★★</span>
    `;

    const clamped = Math.max(0, Math.min(5, Number(language.rating)));
    const fillPercent = (clamped / 5) * 100;
    const fill = stars.querySelector('.stars-fill');
    if (fill instanceof HTMLElement) {
      fill.style.width = '0%';
      const apply = () => {
        fill.style.width = `${fillPercent}%`;
      };

      if (reduceMotion) {
        apply();
initLanguageRatingsAnimation();
      } else {
        window.setTimeout(() => {
          requestAnimationFrame(apply);
        }, index * 90);
      }
    }
    stars.setAttribute('role', 'img');
    stars.setAttribute('aria-label', `${language.name}: ${clamped} out of 5`);

    row.appendChild(label);
    row.appendChild(stars);
    container.appendChild(row);
  });
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
renderLanguageRatings();
