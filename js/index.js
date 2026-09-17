document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.observe');
  if (!('IntersectionObserver' in window)) {
    sections.forEach(section => section.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  sections.forEach(section => observer.observe(section));
});
