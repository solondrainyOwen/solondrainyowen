
  // ── Hamburger menu ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // ── Scroll animations (IntersectionObserver) ──
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => observer.observe(el));

  // Trigger hero immediately
  document.querySelectorAll('#hero .fade-up').forEach(el => el.classList.add('visible'));

  // ── Skill circle animations ──
  const CIRCUMFERENCE = 2 * Math.PI * 45; // r=45

  function animateCircles(section) {
    section.querySelectorAll('.skill-item').forEach(item => {
      const pct = parseInt(item.dataset.percent) || 0;
      const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
      const circle = item.querySelector('.circle-fill');
      if (circle) {
        circle.style.strokeDasharray = CIRCUMFERENCE;
        circle.style.strokeDashoffset = offset;
      }
    });
  }

  const skillSection = document.getElementById('competences');
  let skillsAnimated = false;
  const skillObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      // Delay so initial offset=283 is painted first, then animate
      requestAnimationFrame(() => {
        setTimeout(() => animateCircles(skillSection), 100);
      });
    }
  }, { threshold: 0.2 });
  skillObs.observe(skillSection);

  // ── Contact form submit ──
  function handleSubmit() {
    const firstName = document.getElementById('firstName').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();

    if (!firstName || !email || !message) {
      const btn = document.getElementById('submitBtn');
      btn.style.background = 'linear-gradient(135deg,#EF4444,#DC2626)';
      btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Veuillez remplir les champs requis';
      setTimeout(() => {
        btn.style.background = '';
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
      }, 2500);
      return;
    }

    // Compose mailto link
    const subject = document.getElementById('subjectSelect').value || 'Message depuis le portfolio';
    const lastName = document.getElementById('lastName').value.trim();
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    const body = `Nom: ${fullName}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:solondrainychateau@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    // Show toast
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);

    // Reset form
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('subjectSelect').selectedIndex = 0;
    document.getElementById('messageInput').value = '';
  }
