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

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function splitBadgeText(value) {
  const text = String(value ?? '').trim();
  if (!text) return [];

  // Split common separators used in the JSON (keep it simple and predictable).
  const parts = text
    .split(/\s*(?:\/|\||,)\s*/g)
    .map((p) => p.trim())
    .filter(Boolean);

  return parts.length > 0 ? parts : [text];
}

function parseYouTubeEmbed(value) {
  if (typeof value !== 'string') return null;
  const raw = value.trim();
  if (!raw) return null;
  if (!isSafeUrl(raw)) return null;

  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, '');
  let videoId = '';

  if (host === 'youtube.com' || host === 'm.youtube.com') {
    if (url.pathname.startsWith('/embed/')) {
      videoId = url.pathname.split('/embed/')[1]?.split('/')[0] ?? '';
    } else if (url.pathname === '/watch') {
      videoId = url.searchParams.get('v') ?? '';
    }
  }

  if (host === 'youtu.be') {
    videoId = url.pathname.replace('/', '');
  }

  if (!/^[a-zA-Z0-9_-]{6,}$/.test(videoId)) return null;

  const allowedParams = new Set(['start', 'end', 'si', 't']);
  const params = new URLSearchParams();
  for (const [key, val] of url.searchParams.entries()) {
    if (!allowedParams.has(key)) continue;
    if (!val) continue;
    params.set(key, val);
  }

  const src = `https://www.youtube.com/embed/${videoId}${params.toString() ? `?${params}` : ''}`;
  return { id: videoId, src };
}

function parseTikTokEmbed(value) {
  if (typeof value !== 'string') return null;
  const raw = value.trim();
  if (!raw) return null;

  // Allow passing a plain numeric video id.
  if (/^\d{10,}$/.test(raw)) {
    return { id: raw, src: `https://www.tiktok.com/embed/v2/${raw}` };
  }

  if (!isSafeUrl(raw)) return null;

  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, '').toLowerCase();
  if (!(host === 'tiktok.com' || host.endsWith('.tiktok.com'))) return null;

  // Common formats:
  // - https://www.tiktok.com/@user/video/<id>
  // - https://www.tiktok.com/embed/v2/<id>
  const match = url.pathname.match(/(?:\/video\/|\/embed\/v2\/)(\d{10,})/);
  const id = match?.[1] ?? '';
  if (!/^\d{10,}$/.test(id)) return null;

  return { id, src: `https://www.tiktok.com/embed/v2/${id}` };
}

function parseVimeoEmbed(value) {
  if (typeof value !== 'string') return null;
  const raw = value.trim();
  if (!raw) return null;
  if (!isSafeUrl(raw)) return null;

  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, '').toLowerCase();
  if (!(host === 'vimeo.com' || host === 'player.vimeo.com')) return null;

  let videoId = '';
  if (host === 'player.vimeo.com') {
    const m = url.pathname.match(/^\/video\/(\d+)$/);
    videoId = m?.[1] ?? '';
  } else {
    const m = url.pathname.match(/^\/(\d+)$/);
    videoId = m?.[1] ?? '';
  }

  if (!/^\d{6,}$/.test(videoId)) return null;

  const allowedParams = new Set(['h']);
  const params = new URLSearchParams();
  for (const [key, val] of url.searchParams.entries()) {
    if (!allowedParams.has(key)) continue;
    if (!val) continue;
    params.set(key, val);
  }

  const src = `https://player.vimeo.com/video/${videoId}${params.toString() ? `?${params}` : ''}`;
  return { id: videoId, src };
}

function renderMediaCarousel({ titleText, imageSrcRaw, imageAltText, youtubeUrl, vimeoUrl, tiktokUrl, gallery }) {
  const items = [];
  const tt = parseTikTokEmbed(tiktokUrl);
  const yt = parseYouTubeEmbed(youtubeUrl);
  const vm = parseVimeoEmbed(vimeoUrl);

  // Ordering rule:
  // - If TikTok exists: keep it first (good for short social clips).
  // - Otherwise: put the gameplay video first (YouTube/Vimeo), then screenshots.
  if (tt) {
    items.push({ type: 'tiktok', src: tt.src, title: `${titleText} TikTok` });
  } else {
    if (yt) items.push({ type: 'youtube', src: yt.src, title: `${titleText} video` });
    if (vm) items.push({ type: 'vimeo', src: vm.src, title: `${titleText} video (Vimeo)` });
  }

  const safeImageSrc = isSafeAssetPath(imageSrcRaw) ? imageSrcRaw : 'assets/projects/placeholder.svg';
  items.push({ type: 'image', src: safeImageSrc, alt: imageAltText || titleText });

  const seen = new Set([safeImageSrc]);
  if (Array.isArray(gallery)) {
    for (const entry of gallery) {
      const srcRaw = typeof entry === 'string' ? entry : String(entry?.src ?? '').trim();
      if (!srcRaw) continue;
      if (!isSafeAssetPath(srcRaw)) continue;
      if (seen.has(srcRaw)) continue;
      seen.add(srcRaw);

      const alt =
        typeof entry === 'object' && entry
          ? String(entry?.alt ?? titleText).trim() || titleText
          : titleText;

      items.push({ type: 'image', src: srcRaw, alt });
    }
  }

  // If TikTok is first, keep longer-form videos after screenshots.
  if (tt) {
    if (yt) items.push({ type: 'youtube', src: yt.src, title: `${titleText} video` });
    if (vm) items.push({ type: 'vimeo', src: vm.src, title: `${titleText} video (Vimeo)` });
  }

  const carousel = document.createElement('div');
  carousel.className = 'carousel';
  carousel.dataset.index = '0';

  const viewport = document.createElement('div');
  viewport.className = 'carousel__viewport';

  const track = document.createElement('div');
  track.className = 'carousel__track';

  items.forEach((item) => {
    const slide = document.createElement('div');
    slide.className = 'carousel__slide';

    const frame = document.createElement('div');
    frame.className = 'carousel__frame';

    if (item.type === 'image') {
      const img = document.createElement('img');
      img.className = 'carousel__img';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.src = item.src;
      img.alt = item.alt;
      frame.appendChild(img);
      slide.appendChild(frame);
    }

    if (item.type === 'youtube') {
      const iframe = document.createElement('iframe');
      iframe.src = item.src;
      iframe.title = item.title;
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;

      frame.appendChild(iframe);
      slide.appendChild(frame);
    }

    if (item.type === 'vimeo') {
      const iframe = document.createElement('iframe');
      iframe.src = item.src;
      iframe.title = item.title;
      iframe.loading = 'lazy';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;

      frame.appendChild(iframe);
      slide.appendChild(frame);
    }

    if (item.type === 'tiktok') {
      const inner = document.createElement('div');
      inner.className = 'carousel__tiktok';

      const iframe = document.createElement('iframe');
      iframe.src = item.src;
      iframe.title = item.title;
      iframe.loading = 'lazy';
      iframe.allow = 'encrypted-media; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;

      inner.appendChild(iframe);
      frame.appendChild(inner);
      slide.appendChild(frame);
    }

    track.appendChild(slide);
  });

  viewport.appendChild(track);
  carousel.appendChild(viewport);

  if (items.length > 1) {
    const controls = document.createElement('div');
    controls.className = 'carousel__controls';

    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'carousel__btn';
    prev.dataset.action = 'prev';
    prev.setAttribute('aria-label', 'Previous media');
    prev.textContent = 'Prev';

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'carousel__btn';
    next.dataset.action = 'next';
    next.setAttribute('aria-label', 'Next media');
    next.textContent = 'Next';

    const dots = document.createElement('div');
    dots.className = 'carousel__dots';
    items.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot';
      dot.dataset.index = String(i);
      dot.setAttribute('aria-label', `Go to media ${i + 1}`);
      dots.appendChild(dot);
    });

    controls.appendChild(prev);
    controls.appendChild(dots);
    controls.appendChild(next);
    carousel.appendChild(controls);
  }

  return carousel;
}

function initCarousels(root) {
  const containers = root instanceof HTMLElement ? [root] : Array.from(document.querySelectorAll('.project-details'));
  for (const container of containers) {
    for (const carousel of container.querySelectorAll('.carousel')) {
      const track = carousel.querySelector('.carousel__track');
      if (!(track instanceof HTMLElement)) continue;

      const slides = carousel.querySelectorAll('.carousel__slide');
      if (slides.length <= 1) continue;

      const stopSlideMedia = (slide) => {
        if (!(slide instanceof Element)) return;
        const frames = slide.querySelectorAll('iframe');
        frames.forEach((frame) => {
          if (!(frame instanceof HTMLIFrameElement)) return;
          const src = frame.getAttribute('src');
          if (!src) return;
          // Reloading the iframe is the simplest cross-provider way to stop playback.
          frame.setAttribute('src', src);
        });
      };

      const setIndex = (nextIndex) => {
        const current = Number(carousel.dataset.index ?? '0') || 0;
        const max = slides.length - 1;
        const index = Math.max(0, Math.min(max, nextIndex));

        if (index !== current) {
          stopSlideMedia(slides[current]);
        }

        carousel.dataset.index = String(index);
        track.style.transform = `translateX(${-index * 100}%)`;

        const dots = carousel.querySelectorAll('.carousel__dot');
        dots.forEach((dot, i) => {
          if (!(dot instanceof HTMLElement)) return;
          if (i === index) dot.setAttribute('aria-current', 'true');
          else dot.removeAttribute('aria-current');
        });
      };

      setIndex(0);

      carousel.addEventListener('click', (event) => {
        const target = event.target instanceof Element ? event.target : null;
        if (!target) return;

        const actionBtn = target.closest('button[data-action]');
        if (actionBtn instanceof HTMLButtonElement) {
          const current = Number(carousel.dataset.index ?? '0') || 0;
          const action = actionBtn.dataset.action;
          if (action === 'prev') setIndex(current - 1);
          if (action === 'next') setIndex(current + 1);
          return;
        }

        const dotBtn = target.closest('button.carousel__dot');
        if (dotBtn instanceof HTMLButtonElement) {
          const idx = Number(dotBtn.dataset.index);
          if (Number.isFinite(idx)) setIndex(idx);
        }
      });
    }
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

  const projectId = String(project?.id ?? '').trim() || slugify(project?.title ?? '');
  card.dataset.projectId = projectId;
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open details for ${String(project?.title ?? 'project')}`);

  const titleText = String(project?.title ?? 'Project title');
  const roleText = String(project?.role ?? '');
  const platformText = String(project?.platform ?? '');
  const yearText = String(project?.year ?? '');
  const descriptionText = String(project?.description ?? '');

  const imageSrcRaw = String(project?.image ?? '').trim();
  const imageAltText = String(project?.imageAlt ?? titleText).trim() || titleText;

  const badges = [];
  if (roleText) badges.push(roleText);
  for (const part of splitBadgeText(platformText)) badges.push(part);
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

  const detailsHint = document.createElement('div');
  detailsHint.className = 'project__hint';
  detailsHint.textContent = 'Click for details';
  overlay.appendChild(detailsHint);

  splash.appendChild(overlay);
  card.appendChild(splash);

  return card;
}

function renderProjectDetails(projects) {
  const container = document.getElementById('project-details');
  if (!container) return;

  container.innerHTML = '';

  for (const project of projects) {
    const projectId = String(project?.id ?? '').trim() || slugify(project?.title ?? '');
    const titleText = String(project?.title ?? 'Project');
    const roleText = String(project?.role ?? '').trim();
    const platformText = String(project?.platform ?? '').trim();
    const yearText = String(project?.year ?? '').trim();
    const descriptionText = String(project?.description ?? '').trim();

    const links = Array.isArray(project?.links) ? project.links : [];
    const safeLinks = links
      .map((link) => {
        const label = String(link?.label ?? '').trim();
        const href = String(link?.href ?? link?.url ?? '').trim();
        return { label, href };
      })
      .filter((link) => link.label && isSafeUrl(link.href));

    const details = document.createElement('details');
    details.className = 'project-detail';
    details.id = `project-${projectId}`;
    details.setAttribute('aria-label', `${titleText} details`);

    const summary = document.createElement('summary');
    summary.className = 'project-detail__summary';

    const summaryInner = document.createElement('div');
    summaryInner.className = 'project-detail__header';

    const h3 = document.createElement('h3');
    h3.className = 'project-detail__title';
    h3.textContent = titleText;
    summaryInner.appendChild(h3);

    const badgesEl = document.createElement('div');
    badgesEl.className = 'badges';
    badgesEl.setAttribute('aria-label', 'Project metadata');
    const badgeValues = [];
    if (roleText) badgeValues.push(roleText);
    badgeValues.push(...splitBadgeText(platformText));
    if (yearText) badgeValues.push(yearText);
    for (const text of badgeValues.filter(Boolean)) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = text;
      badgesEl.appendChild(badge);
    }
    summaryInner.appendChild(badgesEl);
    summary.appendChild(summaryInner);

    const body = document.createElement('div');
    body.className = 'project-detail__body';

    const desc = document.createElement('p');
    desc.className = 'project-detail__desc';
    desc.textContent = descriptionText;

    const imageSrcRaw = String(project?.image ?? '').trim();
    const imageAltText = String(project?.imageAlt ?? titleText).trim() || titleText;
    const youtubeUrl = String(project?.youtube ?? '').trim();
    const vimeoUrl = String(project?.vimeo ?? '').trim();
    const tiktokUrl = String(project?.tiktok ?? '').trim();
    const gallery = Array.isArray(project?.gallery) ? project.gallery : null;

    body.appendChild(
      renderMediaCarousel({
        titleText,
        imageSrcRaw,
        imageAltText,
        youtubeUrl,
        vimeoUrl,
        tiktokUrl,
        gallery,
      })
    );
    if (descriptionText) body.appendChild(desc);

    if (safeLinks.length > 0) {
      const linksEl = document.createElement('div');
      linksEl.className = 'project-detail__links';
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
      body.appendChild(linksEl);
    }

    details.appendChild(summary);
    details.appendChild(body);
    container.appendChild(details);
  }

  initCarousels(container);
}

function initProjectCardInteractions() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const openFromCard = (card) => {
    const projectId = card?.dataset?.projectId;
    if (!projectId) return;
    const targetId = `project-${projectId}`;
    const target = document.getElementById(targetId);
    if (!(target instanceof HTMLDetailsElement)) return;

    const container = document.getElementById('project-details');
    if (container) {
      for (const other of container.querySelectorAll('details.project-detail[open]')) {
        if (other !== target) other.open = false;
      }
    }

    target.open = true;
    history.replaceState(null, '', `#${targetId}`);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const summary = target.querySelector('summary');
    if (summary instanceof HTMLElement) summary.focus({ preventScroll: true });
  };

  grid.addEventListener('click', (event) => {
    const clickedLink = event.target instanceof Element ? event.target.closest('a') : null;
    if (clickedLink) return;
    const card = event.target instanceof Element ? event.target.closest('.project') : null;
    if (!(card instanceof HTMLElement)) return;
    openFromCard(card);
  });

  grid.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target instanceof Element ? event.target.closest('.project') : null;
    if (!(card instanceof HTMLElement)) return;
    event.preventDefault();
    openFromCard(card);
  });
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

    renderProjectDetails(data.projects);

    if (location.hash && location.hash.startsWith('#project-')) {
      const target = document.querySelector(location.hash);
      if (target instanceof HTMLDetailsElement) {
        const container = document.getElementById('project-details');
        if (container) {
          for (const other of container.querySelectorAll('details.project-detail[open]')) {
            if (other !== target) other.open = false;
          }
        }
        target.open = true;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
  initProjectCardInteractions();
  renderLanguageRatings();
  initLanguageRatingsAnimation();
});
