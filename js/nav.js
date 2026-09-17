document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const page = getCurrentPage();

    document.body.dataset.page = page.replace('.html', '');

    if (nav) {
        nav.innerHTML = `
            <a class="brand" href="index.html" aria-label="Vitality Communications home">
                <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
                <span class="brand-word">VITALITY<small>COMMUNICATIONS</small></span>
            </a>
            <span class="nav-system" aria-hidden="true"><i></i> AEGIS NETWORK / V4</span>
            <button class="hamburger" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="nav-links">
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

        highlightActiveLink(page);
        const menuButton = nav.querySelector('.hamburger');
        menuButton.addEventListener('click', () => toggleMenu(menuButton));
        nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

        const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 24);
        updateNav();
        window.addEventListener('scroll', updateNav, { passive: true });
    }

    addSkipLink();
    upgradeFooter();
    initImageLoaders();
});

function getCurrentPage() {
    return window.location.pathname.split('/').pop().split(/[?#]/)[0] || 'index.html';
}

function addSkipLink() {
    const main = document.querySelector('main');
    if (!main) return;
    main.id ||= 'main-content';
    const link = document.createElement('a');
    link.className = 'skip-link';
    link.href = `#${main.id}`;
    link.textContent = 'Skip to main content';
    document.body.prepend(link);
}

function upgradeFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    footer.innerHTML = `
        <div class="footer-inner">
            <div class="footer-brand"><strong>VITALITY</strong><span>Communication beyond infrastructure.</span></div>
            <div class="footer-meta"><span>AEGIS / GENERATION 04</span><span>CONRAD CHALLENGE 2025–2026</span></div>
            <p>&copy; 2026 Vitality Communications.</p>
        </div>
    `;
}

function initImageLoaders() {
    document.querySelectorAll('.img-fade-in').forEach(img => {
        const revealImage = () => {
            img.classList.add('img-loaded');
            img.closest('.skeleton-bg')?.classList.remove('skeleton-bg');
        };
        if (img.complete) revealImage();
        else img.addEventListener('load', revealImage, { once: true });
    });
}

function toggleMenu(button = document.querySelector('.hamburger')) {
    const links = document.getElementById('nav-links');
    if (!links || !button) return;
    const isOpen = links.classList.toggle('active');
    button.classList.toggle('active', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
}

function closeMenu() {
    const links = document.getElementById('nav-links');
    const button = document.querySelector('.hamburger');
    links?.classList.remove('active');
    button?.classList.remove('active');
    button?.setAttribute('aria-expanded', 'false');
    button?.setAttribute('aria-label', 'Open navigation');
}

function highlightActiveLink(page = getCurrentPage()) {
    document.querySelectorAll('#nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        const active = href === page || (page === 'node-details.html' && href === 'product.html');
        if (active) link.classList.add('active');
    });
}

window.toggleMenu = toggleMenu;
