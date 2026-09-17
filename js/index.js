gsap.registerPlugin(ScrollTrigger, TextPlugin);

window.addEventListener('load', () => {
    window.scrollTo(0, 0);

    // Trigger animations without loader delay
    ScrollTrigger.refresh();
    initWave(); // Start Wave
    initNetwork(); // Start Particles

    // 2. SCROLL PROMPT LOGIC
    const prompt = document.getElementById('scroll-prompt');
    setTimeout(() => {
        if(window.scrollY < 10) prompt.style.opacity = '1';
    }, 2100);

    window.addEventListener('scroll', () => {
        prompt.style.opacity = '0';
    }, { once: true });

    // *** HERO ANIMATIONS ***
    if (window.innerWidth > 768) {
        const anchors = { hero: { x: 0.5, y: 0.5 }, hub:  { x: 0.5, y: 0.5 }, node: { x: 0.5, y: 0.5 }, rep:  { x: 0.5, y: 0.5 }, hand: { x: 0.5, y: 0.5 } };
        const connections = [
            { from: 'hero-node-wrapper', to: 'hub-wrapper', fa: anchors.hero, ta: anchors.hub },
            { from: 'hero-node-wrapper', to: 'std-1-wrapper', fa: anchors.hero, ta: anchors.node },
            { from: 'hero-node-wrapper', to: 'std-2-wrapper', fa: anchors.hero, ta: anchors.node },
            { from: 'hub-wrapper', to: 'rep-2-wrapper', fa: anchors.hub, ta: anchors.rep },
            { from: 'std-1-wrapper', to: 'rep-1-wrapper', fa: anchors.node, ta: anchors.rep },
            { from: 'std-1-wrapper', to: 'rep-3-wrapper', fa: anchors.node, ta: anchors.rep },
            { from: 'std-2-wrapper', to: 'rep-2-wrapper', fa: anchors.node, ta: anchors.rep },
            { from: 'std-2-wrapper', to: 'rep-4-wrapper', fa: anchors.node, ta: anchors.rep },
            { from: 'rep-1-wrapper', to: 'rep-5-wrapper', fa: anchors.rep, ta: anchors.rep },
            { from: 'rep-5-wrapper', to: 'rep-3-wrapper', fa: anchors.rep, ta: anchors.rep },
            { from: 'rep-3-wrapper', to: 'hand-1-wrapper', fa: anchors.rep, ta: anchors.hand },
            { from: 'rep-4-wrapper', to: 'hand-1-wrapper', fa: anchors.rep, ta: anchors.hand },
            { from: 'rep-2-wrapper', to: 'hand-2-wrapper', fa: anchors.rep, ta: anchors.hand },
            { from: 'rep-4-wrapper', to: 'hand-2-wrapper', fa: anchors.rep, ta: anchors.hand }
        ];

        const svg = document.getElementById('mesh-lines-svg');
        const lines = [];
        connections.forEach((conn) => {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("class", "mesh-line");
            svg.appendChild(line);
            lines.push({ el: line, ...conn });
        });

        function updateMeshLines() {
            const stageRect = document.getElementById('hero-stage').getBoundingClientRect();
            lines.forEach(obj => {
                const fromEl = document.getElementById(obj.from);
                const toEl = document.getElementById(obj.to);
                if(fromEl && toEl) {
                    const r1 = fromEl.getBoundingClientRect();
                    const r2 = toEl.getBoundingClientRect();
                    const x1 = (r1.left - stageRect.left) + (r1.width * obj.fa.x);
                    const y1 = (r1.top - stageRect.top) + (r1.height * obj.fa.y);
                    const x2 = (r2.left - stageRect.left) + (r2.width * obj.ta.x);
                    const y2 = (r2.top - stageRect.top) + (r2.height * obj.ta.y);
                    obj.el.setAttribute("x1", (x1 / stageRect.width) * 100);
                    obj.el.setAttribute("y1", (y1 / stageRect.height) * 100);
                    obj.el.setAttribute("x2", (x2 / stageRect.width) * 100);
                    obj.el.setAttribute("y2", (y2 / stageRect.height) * 100);
                }
            });
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#intro-trigger-wrapper",
                start: "top top",
                end: "+=4000",
                scrub: 1,
                pin: true,
                onUpdate: updateMeshLines
            }
        });

        const pos = {
            hub:  { x: '35vw',  y: '-20vh' }, std1: { x: '-20vw', y: '10vh' }, std2: { x: '20vw',  y: '10vh' },
            rep1: { x: '-35vw', y: '-5vh' }, rep2: { x: '40vw',  y: '-10vh' }, rep3: { x: '-25vw', y: '30vh' },
            rep4: { x: '25vw',  y: '30vh' }, rep5: { x: '-40vw', y: '15vh' }, hand1:{ x: '0vw',   y: '40vh' }, hand2:{ x: '45vw',  y: '20vh' },
        };

        tl.to("#hero-node-wrapper", {scale: "+=0.03", duration: 1.5, ease: "sine.inOut"})
          .add("zoomLabel")
          .to("#city-map", {scale: 1, filter: "blur(0px) invert(1) hue-rotate(180deg) brightness(0.8)", opacity: 1, duration: 6}, "zoomLabel")
          .to(["#text-line-1", "#text-line-2", "#text-line-3"], { color: "#F8FAFC", textShadow: "0 4px 28px rgba(2, 6, 23, 0.95)", duration: 1, ease: "power2.in" }, "zoomLabel+=1.5")
          .to(["#text-line-1", "#text-line-2", "#text-line-3"], { opacity: 0, duration: 1 }, "zoomLabel+=2.5")
          .add("explodeLabel", "zoomLabel+=3.0")
          .to("#hero-node-wrapper", {width: "8vw", y: "-20vh", duration: 3}, "explodeLabel")
          .fromTo("#hub-wrapper", {scale:0, opacity:0, x:0, y:0}, {x: pos.hub.x, y: pos.hub.y, scale: 1, opacity: 1, duration: 3}, "explodeLabel")
          .fromTo("#rep-1-wrapper", {scale:0, opacity:0, x:0, y:0}, {x: pos.rep1.x, y: pos.rep1.y, scale: 1, opacity: 1, duration: 3}, "explodeLabel")
          .fromTo("#hand-1-wrapper", {scale:0, opacity:0, x:0, y:0}, {x: pos.hand1.x, y: pos.hand1.y, scale: 1, opacity: 1, duration: 3}, "explodeLabel")
          .fromTo(["#std-1-wrapper", "#std-2-wrapper"], {scale:0, opacity:0, x:0, y:0}, {opacity: 1, scale: 1, duration: 3, stagger: 0.1, x: (i) => i === 0 ? pos.std1.x : pos.std2.x, y: (i) => i === 0 ? pos.std1.y : pos.std2.y}, "explodeLabel")
          .fromTo(["#rep-2-wrapper", "#rep-3-wrapper", "#rep-4-wrapper", "#rep-5-wrapper"], {scale:0, opacity:0, x:0, y:0}, {opacity: 1, scale: 1, duration: 3, stagger: 0.1, x: (i) => pos[`rep${i+2}`].x, y: (i) => pos[`rep${i+2}`].y}, "explodeLabel+=0.2")
          .fromTo(["#hand-2-wrapper"], {scale:0, opacity:0, x:0, y:0}, {opacity: 1, scale: 1, duration: 3, x: pos.hand2.x, y: pos.hand2.y}, "explodeLabel+=0.4")
          .to(".mesh-line", {opacity: 1, duration: 3, stagger: 0.05, ease: "power2.inOut"}, "explodeLabel+=1.5");
    }
});

// 4. STATS ANIMATION
gsap.to("#stat-range", {
    scrollTrigger: ".testing-stat-grid",
    innerText: 15,
    duration: 2,
    snap: { innerText: 1 },
    ease: "power2.out"
});
gsap.to("#stat-battery", {
    scrollTrigger: ".testing-stat-grid",
    innerText: 6,
    duration: 2,
    snap: { innerText: 1 },
    ease: "power2.out"
});
gsap.to("#stat-latency", {
    scrollTrigger: ".testing-stat-grid",
    innerText: 250,
    duration: 2,
    snap: { innerText: 1 },
    ease: "power2.out"
});

// 5. OSCILLATING WAVE (Canvas Version for Performance)
function initWave() {
    const canvas = document.getElementById('wave-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;

    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();

        const centerY = height / 2;
        const amplitude = 30;
        const frequency = 0.01;

        ctx.moveTo(0, centerY);
        for(let x = 0; x < width; x++) {
            const y = centerY + Math.sin(x * frequency + time) * amplitude;
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = '#FF5722';
        ctx.lineWidth = 2;
        ctx.stroke();

        time += 0.05;
        requestAnimationFrame(draw);
    }
    draw();
}

// 6. NETWORK ANIMATION (Canvas - Impact Section)
function initNetwork() {
    const canvas = document.getElementById('network-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    function resize() { width = canvas.width = canvas.parentElement.offsetWidth; height = canvas.height = canvas.parentElement.offsetHeight; }
    window.addEventListener('resize', resize); resize();

    class Particle {
        constructor() { this.x = Math.random()*width; this.y = Math.random()*height; this.vx = (Math.random()-0.5)*0.5; this.vy = (Math.random()-0.5)*0.5; }
        update() { this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>width) this.vx*=-1; if(this.y<0||this.y>height) this.vy*=-1; }
        draw() { ctx.fillStyle = '#FF5722'; ctx.fillRect(this.x, this.y, 2, 2); }
    }
    for(let i=0; i<30; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p, i) => {
            p.update(); p.draw();
            for(let j=i; j<particles.length; j++) {
                const dx = p.x - particles[j].x, dy = p.y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if(dist < 100) {
                    ctx.beginPath(); ctx.strokeStyle = `rgba(255, 87, 34, ${1 - dist/100})`;
                    ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
}
