document.addEventListener('DOMContentLoaded', () => {
    // Inject Nav HTML
    const nav = document.querySelector('nav');
    if (nav) {
        nav.innerHTML = `
            <div class="logo">VITALITY</div>
            <button class="hamburger" aria-label="Toggle navigation" onclick="toggleMenu()">
                <span></span><span></span><span></span>
            </button>
            <ul id="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="product.html">Products</a></li>
                <li><a href="tech.html">The Tech</a></li>
                <li><a href="team.html">Team</a></li>
                <li><a href="mission.html">Our Mission</a></li>
                <li><a href="contact.html" class="btn-nav">Contact</a></li>
            </ul>
        `;
        highlightActiveLink();
    }

    // Initialize Progressive Image Loading
    initImageLoaders();
});

function initImageLoaders() {
    const images = document.querySelectorAll('.img-fade-in');

    images.forEach(img => {
        const parent = img.closest('.skeleton-bg');

        if (img.complete) {
            img.classList.add('img-loaded');
            if (parent) parent.classList.remove('skeleton-bg');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('img-loaded');
                if (parent) parent.classList.remove('skeleton-bg');
            });
        }
    });
}

function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop().split(/[?#]/)[0] || 'index.html';
    const navLinks = document.querySelectorAll('#nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else if (currentPath === 'node-details.html' && href === 'product.html') {
            link.classList.add('active');
        }
    });
}

// Ensure toggleMenu is globally accessible for the onclick handler
window.toggleMenu = toggleMenu;
