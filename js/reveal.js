// Optimized Scroll Reveal
// Uses IntersectionObserver instead of scroll event listener for performance.

document.addEventListener('DOMContentLoaded', () => {

    const observerOptions = {
        root: null,
        // Trigger when the top of the element is 150px above the bottom of the viewport
        // (matching the original logic: elementTop < windowHeight - 150)
        rootMargin: '0px 0px -150px 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Activate if intersecting (entering view)
            // OR if it has already been scrolled past (is above the viewport)
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => observer.observe(el));
});
