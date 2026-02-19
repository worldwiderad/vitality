// --- GSAP ANIMATION LOGIC (Integrated) ---
gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin);

let mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
    gsap.set(".group-key-sm", { autoAlpha: 0 });

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".encryption-stage-wrapper",
            start: "top top",
            end: "+=4000",
            scrub: 1,
            pin: true
        }
    });

    const plainText = "SECRETS";
    const cipherText = "0x9F3B...";

    // 1. ENCRYPT
    tl.to("#t1", { opacity: 1, y: 0, duration: 2 })
      .fromTo("#key-pub", { opacity: 0, x: "35vw" }, { opacity: 1, x: 0, duration: 2 }, "<")
      .to("#packet", { borderColor: "#FF5722", duration: 1 }, ">")
      .to("#packetText", { text: cipherText, color: "#FF5722", duration: 1 }, "<")
      .to("#statusBadge", { opacity: 1, text: "ENCRYPTED", background: "#FF5722" }, "<")
      .to("#key-pub", { opacity: 0, scale: 0.5 }, ">")
      .to("#t1", { opacity: 0, y: -20 }, ">+1");

    // 2. MOVE TO HACKER
    tl.to("#packet", { top: "45vh", duration: 4, ease: "none" })
      .to("#node-hacker", { opacity: 1, boxShadow: "0 0 30px rgba(239,68,68,0.3)" }, "<+2");

    // 3. HACK FAIL
    tl.to("#t2", { opacity: 1, y: 0 })
      .fromTo("#key-hack", { opacity: 0, x: "35vw" }, { opacity: 1, x: 0, duration: 1 }, "<")
      .to("#packet", { borderColor: "#EF4444", x: 10, yoyo: true, repeat: 5, duration: 0.1 }, ">")
      .to("#statusBadge", { text: "ACCESS DENIED", background: "#EF4444" }, "<")
      .to("#key-hack", { rotation: 90, opacity: 0, scale: 0.5 }, ">")
      .to("#packet", { borderColor: "#FF5722", x: 0 }, ">")
      .to("#statusBadge", { text: "ENCRYPTED", background: "#FF5722" }, "<")
      .to("#ghost", { opacity: 1 }, ">")
      .to("#ghost", { motionPath: { path: [{x:-120, y:0}, {x:-120, y:150}, {x:0, y:300}], curviness: 1.5 }, duration: 2, ease: "power1.inOut" }, "<")
      .to("#ghost", { opacity: 0 }, ">-0.5")
      .to("#t2", { opacity: 0, y: -20 }, ">");

    // 4. MOVE TO TARGET & DECRYPT
    tl.to("#packet", { top: "75vh", duration: 4, ease: "none" })
      .to("#node-target", { opacity: 1, boxShadow: "0 0 30px rgba(16,185,129,0.3)" }, "<+2")
      .to("#t3", { opacity: 1, y: 0 }, "<")
      .fromTo("#key-priv", { opacity: 0, x: "35vw" }, { opacity: 1, x: 0, duration: 1 }, ">")
      .to("#packet", { borderColor: "#10B981", boxShadow: "0 0 20px #10B981" }, ">")
      .to("#packetText", { text: plainText, color: "white" }, "<")
      .to("#statusBadge", { text: "DECRYPTED", background: "#10B981" }, "<")
      .to("#key-priv", { scale: 1.5, opacity: 0 }, ">")
      .to("#t3", { opacity: 0, y: -20 }, ">+2");

    // === ACT 2: GROUP MODE TRANSITION ===
    tl.to("#packet", { opacity: 0, duration: 1 })
      .to("#node-target", { opacity: 0.2, boxShadow: "none" }, "<")
      .to("#node-sender", { borderColor: "#3B82F6", color: "#3B82F6" }, "<")
      .to("#label-sender", { text: "Sender (Group Mode)", color: "#3B82F6" }, "<")
      .to("#packet", { top: "15vh", borderColor: "white", boxShadow: "none", opacity: 1 }, ">")
      .to("#packetText", { text: "GROUP_DATA", color: "white" }, "<")
      .to("#statusBadge", { opacity: 0 }, "<")
      .to("#node-target", { opacity: 0 }, "<")
      .to(".group-node", { opacity: 1, stagger: 0.1 }, "<");

    tl.to("#t4", { opacity: 1, y: 0 })
      .to("#packetText", { text: "GENERATING_SESSION_KEY...", color: "#F59E0B" }, ">")
      .to("#packet", { borderColor: "#F59E0B" }, "<")
      .to("#t4", { opacity: 0, y: -20 }, ">+2");

    tl.to("#t5", { opacity: 1, y: 0 })
      .to("#packetText", { text: "ENCRYPTED_PAYLOAD (AES-256)" }, ">")
      .to("#packet", { borderWidth: 3 }, "<")
      .to("#t5", { opacity: 0, y: -20 }, ">+2");

    tl.to("#t6", { opacity: 1, y: 0 })
      .to("#multi-header", { height: "auto", opacity: 1, marginBottom: 10 }, ">")
      .set("#gk-pub-1", { autoAlpha: 1 })
      .to("#gk-pub-1", { y: "-65vh", x: "10vw", autoAlpha: 0, duration: 1.5, ease: "power2.inOut" }, "<")
      .to("#lock-1", { backgroundColor: "#3B82F6" }, ">-0.5")
      .set("#gk-pub-2", { autoAlpha: 1 })
      .to("#gk-pub-2", { y: "-65vh", autoAlpha: 0, duration: 1.5, ease: "power2.inOut" }, "<+0.2")
      .to("#lock-2", { backgroundColor: "#3B82F6" }, ">-0.5")
      .set("#gk-pub-3", { autoAlpha: 1 })
      .to("#gk-pub-3", { y: "-65vh", x: "-10vw", autoAlpha: 0, duration: 1.5, ease: "power2.inOut" }, "<+0.2")
      .to("#lock-3", { backgroundColor: "#3B82F6" }, ">-0.5")
      .to("#t6", { opacity: 0, y: -20 }, ">+1");

    tl.to("#packet", { top: "75vh", duration: 3, ease: "none" });

    tl.to("#t7", { opacity: 1, y: 0 })
      .set("#gk-priv-1", { autoAlpha: 1 })
      .to("#gk-priv-1", { y: "-10vh", x: "2vw", autoAlpha: 0, duration: 1, ease: "power2.in" }, ">")
      .to("#lock-1", { backgroundColor: "#10B981" }, ">-0.3")
      .set("#gk-priv-2", { autoAlpha: 1 })
      .to("#gk-priv-2", { y: "-10vh", autoAlpha: 0, duration: 1, ease: "power2.in" }, "<+0.2")
      .to("#lock-2", { backgroundColor: "#10B981" }, ">-0.3")
      .set("#gk-priv-3", { autoAlpha: 1 })
      .to("#gk-priv-3", { y: "-10vh", x: "-2vw", autoAlpha: 0, duration: 1, ease: "power2.in" }, "<+0.2")
      .to("#lock-3", { backgroundColor: "#10B981" }, ">-0.3")
      .to("#packet", { width: "280px", borderColor: "#10B981", boxShadow: "0 0 30px #10B981" }, ">")
      .to("#packetText", { text: "MSG_READ_ALL", color: "white" }, "<");
});


// --- ORIGINAL SITE LOGIC (FAQ, MESH) ---
function toggleFaq(element) {
    element.classList.toggle('active');
    const answer = element.querySelector('.faq-answer');
    const allFaqs = document.querySelectorAll('.faq-item');
    allFaqs.forEach(item => {
        if(item !== element) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
        }
    });
    if (element.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
        answer.style.maxHeight = null;
    }
}

// --- MESH SIMULATOR LOGIC ---
let seed = 12345;
function seededRandom() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

const canvas = document.getElementById('meshCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let nodes = [];
    let waves = [];
    const SPACING = 60;
    const WAVE_SPEED = 2;
    const MAX_WAVE_RADIUS = 80;

    function initGrid() {
        seed = 12345;
        nodes = [];
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        const cols = Math.ceil(canvas.width / SPACING) + 2;
        const rows = Math.ceil(canvas.height / (SPACING * 0.866)) + 2;

        for(let r=0; r<rows; r++) {
            for(let c=0; c<cols; c++) {
                let x = c * SPACING;
                let y = r * (SPACING * 0.866);
                if(r % 2 !== 0) x += SPACING / 2;
                x -= 30; y -= 30;
                x += (seededRandom() - 0.5) * 20;
                y += (seededRandom() - 0.5) * 20;

                if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
                    let n = new Node(x, y);
                    nodes.push(n);
                }
            }
        }
        let sorted = [...nodes].sort((a,b) => a.x - b.x);
        if(sorted.length > 0) {
            sorted[Math.floor(sorted.length * 0.05)].isSource = true;
            sorted[Math.floor(sorted.length * 0.95)].isDest = true;
        }
    }

    class Node {
        constructor(x, y) {
            this.x = x; this.y = y; this.exists = true; this.functional = true;
            this.hasBroadcasted = false; this.isSource = false; this.isDest = false; this.msgReceived = false;
        }
        draw() {
            if(!this.exists) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
            if (this.isSource) { ctx.fillStyle = '#FF5722'; ctx.shadowBlur = 10; ctx.shadowColor = '#FF5722'; }
            else if (this.isDest) { ctx.fillStyle = this.msgReceived ? '#FFFFFF' : '#10B981'; ctx.shadowBlur = this.msgReceived ? 20 : 10; ctx.shadowColor = '#10B981'; }
            else if (!this.functional) { ctx.fillStyle = '#334155'; ctx.shadowBlur = 0; }
            else if (this.hasBroadcasted) { ctx.fillStyle = '#94A3B8'; ctx.shadowBlur = 0; }
            else { ctx.fillStyle = '#FFFFFF'; ctx.shadowBlur = 0; }
            ctx.fill(); ctx.shadowBlur = 0;

            if(this.isDest && this.msgReceived) {
                ctx.beginPath(); ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
                ctx.strokeStyle = '#10B981'; ctx.lineWidth = 2; ctx.stroke();
            }
        }
    }

    class Wave {
        constructor(x, y) { this.x = x; this.y = y; this.radius = 0; this.active = true; }
        update() { this.radius += WAVE_SPEED; if(this.radius > MAX_WAVE_RADIUS) this.active = false; }
        draw() {
            if(!this.active) return;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 87, 34, ${1 - this.radius/MAX_WAVE_RADIUS})`;
            ctx.lineWidth = 2; ctx.stroke();
        }
    }

    window.applyScenario = function(type) {
        const centerX = canvas.width / 2; const centerY = canvas.height / 2;
        const source = nodes.find(n => n.isSource); const dest = nodes.find(n => n.isDest);
        seed = 67890;
        nodes.forEach(n => { n.exists = true; n.functional = true; n.hasBroadcasted = false; n.msgReceived = false; });
        waves = [];

        if (type === 'mountain') {
            const mountW = 120; const mountH = 150;
            nodes.forEach(n => { if (Math.abs(n.x - centerX) < mountW && Math.abs(n.y - centerY) < mountH) n.exists = false; });
        } else if (type === 'chaos') {
            nodes.forEach(n => {
                let distToSource = Math.hypot(n.x - source.x, n.y - source.y);
                let distToDest = Math.hypot(n.x - dest.x, n.y - dest.y);
                if (distToSource > 80 && distToDest > 80) { if(seededRandom() < 0.3) n.functional = false; }
            });
        }
        startWave();
    }

    window.startWave = function() {
        const source = nodes.find(n => n.isSource);
        if(source) {
            nodes.forEach(n => { n.hasBroadcasted = false; n.msgReceived = false; });
            source.hasBroadcasted = true; waves.push(new Wave(source.x, source.y));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        waves.forEach(w => {
            if(w.active) {
                w.update();
                nodes.forEach(n => {
                    if (n.exists && n.functional) {
                        let d = Math.hypot(w.x - n.x, w.y - n.y);
                        if(Math.abs(d - w.radius) < 5) {
                            if (n.isDest) n.msgReceived = true;
                            if(!n.hasBroadcasted && !n.isDest) {
                                n.hasBroadcasted = true;
                                setTimeout(() => { waves.push(new Wave(n.x, n.y)); }, 50);
                            }
                        }
                    }
                });
            }
            w.draw();
        });
        nodes.forEach(n => n.draw());
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => { initGrid(); });
    initGrid();
    animate();
}
