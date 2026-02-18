
// --- LOADER LOGIC & CANVAS SETUP ---
window.addEventListener('load', () => {
    const canvas = document.getElementById('team-canvas');
    if (!canvas) return; // Guard clause

    const ctx = canvas.getContext('2d');
    let particles = [];

    // Resize Logic
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial resize

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            // Bounce off edges
            if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 87, 34, 0.5)'; // Primary Orange
            ctx.fill();
        }
    }

    // Animation Loop
    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach((p, index) => {
            p.update();
            p.draw();

            // Draw lines between close particles
            for(let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx*dx + dy*dy);

                if(distance < 150) { // Connection threshold
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 87, 34, ${1 - distance/150})`; // Fade out line
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animateCanvas);
    }

    // Initialize Particles
    const particleCount = Math.floor(window.innerWidth / 15); // Density
    for(let i=0; i<particleCount; i++){
        particles.push(new Particle());
    }
    animateCanvas();
});
