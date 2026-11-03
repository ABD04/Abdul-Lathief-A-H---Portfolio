const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation?.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    projectCards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !visible);
    });
  });
});

const projectInfo = {
  deployment: {
    title: 'AI Surveillance Deployment',
    copy: 'Production-oriented computer-vision deployment work from the current role: setting up AI applications in client surveillance environments, integrating RTSP camera feeds, configuring detection zones and module tags, supporting model validation and QA, and operating deployments on Linux and Docker.',
    tags: ['Computer Vision', 'RTSP / CCTV', 'Linux', 'Docker']
  },
  face: {
    title: 'Face Recognition',
    copy: 'An attendance system concept that uses a camera to recognize when a student enters or leaves a classroom and records the time in an Excel data sheet. The project is listed with Machine Learning and Management skills.',
    tags: ['Computer Vision', 'Attendance', 'Excel']
  },
  npreneur: {
    title: 'NPRENEUR',
    copy: 'A business and employment-focused social platform for entrepreneurs, investors, and viewers. The project concept lets entrepreneurs showcase ideas, gadgets, and articles, connect with potential investors, and receive feedback. The website was planned as an interactive, responsive service with user records.',
    tags: ['Web Development', 'UI/UX', 'Firebase']
  },
  tea: {
    title: 'Tea Leaves Disease Detection',
    copy: 'An AI-domain project to detect disease in tea leaves, completed as part of the Naan Mudhalvan course conducted by Anna University. The profile lists Artificial Intelligence and CSS among the project skills.',
    tags: ['Artificial Intelligence', 'Image Analysis', 'Naan Mudhalvan']
  },
  toon: {
    title: 'Toon Meet',
    copy: 'A concept combining cartoon filters and group video calls. The profile describes learning use cases for kindergarten students during lockdown, as well as a playful way for friends to video chat.',
    tags: ['Artificial Intelligence', 'Video Calls', 'Cartoon Filters']
  }
};

const projectDialog = document.querySelector('.project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogCopy = document.querySelector('.dialog-copy');
const dialogTags = document.querySelector('.dialog-tags');

document.querySelectorAll('.project-open').forEach((button) => {
  button.addEventListener('click', () => {
    const info = projectInfo[button.closest('.project-card')?.dataset.project];
    if (!info || !projectDialog || !dialogTitle || !dialogCopy || !dialogTags) return;
    dialogTitle.textContent = info.title;
    dialogCopy.textContent = info.copy;
    dialogTags.replaceChildren(...info.tags.map((tag) => {
      const chip = document.createElement('span');
      chip.textContent = tag;
      return chip;
    }));
    projectDialog.showModal();
  });
});

document.querySelector('.dialog-close')?.addEventListener('click', () => projectDialog?.close());
projectDialog?.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Cinematic entrance and scroll choreography, inspired by the reference's
// staged scenes while keeping this portfolio lightweight and dependency-free.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) {
  window.setTimeout(() => document.body.classList.add('cinematic-ready'), 140);

  const revealTargets = document.querySelectorAll('.project-card,.timeline-item,.capability,.learning-item,.ai-scene-card');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach((target, index) => {
      target.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`);
      target.classList.add('reveal-ready');
      revealObserver.observe(target);
    });
  }
}

// A quiet neural-field atmosphere: linked points drift behind the title and
// respond gently to pointer movement. Reduced-motion users get one still frame.
const atmosphere = document.querySelector('#hero-atmosphere');
const heroSection = document.querySelector('.hero');
if (atmosphere && heroSection) {
  const context = atmosphere.getContext('2d', { alpha: true });
  if (context) {
    const field = { width: 0, height: 0, dpr: 1, points: [], pointerX: 0.5, pointerY: 0.5, frame: 0, visible: true };
    const resizeField = () => {
      const bounds = heroSection.getBoundingClientRect();
      field.dpr = Math.min(window.devicePixelRatio || 1, 1.7);
      field.width = bounds.width;
      field.height = bounds.height;
      atmosphere.width = Math.round(field.width * field.dpr);
      atmosphere.height = Math.round(field.height * field.dpr);
      atmosphere.style.width = `${field.width}px`;
      atmosphere.style.height = `${field.height}px`;
      context.setTransform(field.dpr, 0, 0, field.dpr, 0, 0);
      const count = Math.max(24, Math.min(65, Math.round(field.width / 23)));
      field.points = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * field.width,
        y: Math.random() * field.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.14,
        radius: index % 9 === 0 ? 1.7 : 0.8 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2
      }));
      drawField(0);
    };
    const drawField = (time) => {
      const { width, height, points } = field;
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const glow = context.createRadialGradient(width * 0.69, height * 0.48, 0, width * 0.69, height * 0.48, Math.max(width, height) * 0.7);
      glow.addColorStop(0, 'rgba(73, 115, 203, 0.12)');
      glow.addColorStop(0.48, 'rgba(43, 129, 157, 0.045)');
      glow.addColorStop(1, 'rgba(5, 8, 18, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      const driftX = (field.pointerX - 0.5) * 16;
      const driftY = (field.pointerY - 0.5) * 10;
      points.forEach((point) => {
        if (!reducedMotion && field.visible) {
          point.x += point.vx;
          point.y += point.vy;
          if (point.x < -8) point.x = width + 8;
          if (point.x > width + 8) point.x = -8;
          if (point.y < -8) point.y = height + 8;
          if (point.y > height + 8) point.y = -8;
        }
        point.drawX = point.x + driftX;
        point.drawY = point.y + driftY;
      });
      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const dx = a.drawX - b.drawX;
          const dy = a.drawY - b.drawY;
          const distance = Math.hypot(dx, dy);
          if (distance > 108) continue;
          context.strokeStyle = `rgba(132, 183, 225, ${(1 - distance / 108) * 0.13})`;
          context.lineWidth = 0.65;
          context.beginPath();
          context.moveTo(a.drawX, a.drawY);
          context.lineTo(b.drawX, b.drawY);
          context.stroke();
        }
      }
      points.forEach((point) => {
        const pulse = 0.48 + Math.sin(time * 0.0008 + point.phase) * 0.2;
        context.beginPath();
        context.arc(point.drawX, point.drawY, point.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(150, 224, 232, ${pulse})`;
        context.fill();
      });
      if (!reducedMotion && field.visible) field.frame = requestAnimationFrame(drawField);
    };
    heroSection.addEventListener('pointermove', (event) => {
      const bounds = heroSection.getBoundingClientRect();
      field.pointerX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      field.pointerY = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      field.visible = !document.hidden;
      if (field.visible && !reducedMotion) field.frame = requestAnimationFrame(drawField);
      else cancelAnimationFrame(field.frame);
    });
    window.addEventListener('resize', resizeField, { passive: true });
    resizeField();
    if (!reducedMotion) field.frame = requestAnimationFrame(drawField);
  }
}

// Add restrained depth to the work cards on a mouse/trackpad, not touch screens.
if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty('--card-tilt-x', `${(-y * 2.1).toFixed(2)}deg`);
      card.style.setProperty('--card-tilt-y', `${(x * 2.5).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--card-tilt-x', '0deg');
      card.style.setProperty('--card-tilt-y', '0deg');
    });
  });
}

// A small, keyboard-accessible career time machine, echoing the reference's
// cursor-controlled timeline while keeping the actual experience text in HTML.
const careerYearButtons = [...document.querySelectorAll('[data-career-year]')];
const careerHighlight = document.querySelector('#career-highlight');
const timelineItems = [...document.querySelectorAll('.timeline-item')];
const roleYears = {
  'AI/ML and Deployment Engineer': ['2026'],
  'Technical Engineer': ['2025', '2026'],
  'Full-stack Developer': ['2024', '2025'],
  'Frontend Developer': ['2023', '2024'],
  'Web Developer': ['2022']
};
const yearStory = {
  '2022': 'Web development internship',
  '2023': 'Frontend development freelance work',
  '2024': 'Frontend work and full-stack internship',
  '2025': 'Full-stack internship and AI engineering',
  '2026': 'AI/ML and deployment engineering'
};
const selectCareerYear = (year) => {
  careerYearButtons.forEach((button) => {
    const active = button.dataset.careerYear === year;
    button.classList.toggle('is-selected', active);
    button.setAttribute('aria-pressed', String(active));
  });
  timelineItems.forEach((item) => {
    const role = item.querySelector('h3')?.textContent.trim();
    const active = roleYears[role]?.includes(year) ?? false;
    item.classList.toggle('is-year-active', active);
  });
  if (careerHighlight) careerHighlight.textContent = `${year} · ${yearStory[year] ?? 'Experience'}`;
};
careerYearButtons.forEach((button) => button.addEventListener('click', () => selectCareerYear(button.dataset.careerYear)));
selectCareerYear('2026');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const yearRail = document.querySelector('.career-years');
  yearRail?.addEventListener('pointermove', (event) => {
    const rail = yearRail.getBoundingClientRect();
    const position = Math.max(0, Math.min(0.999, (event.clientX - rail.left) / rail.width));
    const index = Math.round(position * (careerYearButtons.length - 1));
    selectCareerYear(careerYearButtons[index]?.dataset.careerYear);
  }, { passive: true });
}

// Reading progress and active section state for this single continuous page.
const progressFill = document.querySelector('#scroll-progress-bar');
let progressFrame = 0;
const paintScrollProgress = () => {
  progressFrame = 0;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.max(0, Math.min(1, window.scrollY / scrollable)) : 0;
  progressFill?.style.setProperty('transform', `scaleX(${progress})`);
};
const queueScrollProgress = () => {
  if (!progressFrame) progressFrame = requestAnimationFrame(paintScrollProgress);
};
window.addEventListener('scroll', queueScrollProgress, { passive: true });
window.addEventListener('resize', queueScrollProgress, { passive: true });
paintScrollProgress();

const sectionLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const activeHash = `#${visible.target.id}`;
    sectionLinks.forEach((link) => {
      if (link.getAttribute('href') === activeHash) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-16% 0px -65% 0px', threshold: [0, 0.1, 0.35, 0.65] });
  document.querySelectorAll('main>section[id]').forEach((section) => sectionObserver.observe(section));
}
