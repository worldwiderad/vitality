// GSAP ANIMATION LOGIC (Mission Control)
gsap.registerPlugin(ScrollTrigger);

if (window.matchMedia("(min-width: 769px)").matches) {
    // 1. PINNING
    gsap.utils.toArray(".product-section").forEach((section) => {
        let modules = section.querySelector(".modules-layer");
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: modules,
            pinSpacing: false,
            scrub: true
        });
    });

    // 2. LINES
    const svg = document.getElementById('main-svg');
    const lines = [];

    function createLine(cls) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("class", cls);
        svg.appendChild(line);
        return line;
    }

    const connections = [
        { from: 'node-1', to: 'card-node', type: 'card' },
        { from: 'node-2', to: 'card-node', type: 'card' },
        { from: 'node-3', to: 'card-node', type: 'card' },
        { from: 'node-4', to: 'card-node', type: 'card' },

        { from: 'hand-1', to: 'card-handheld', type: 'card' },
        { from: 'hand-2', to: 'card-handheld', type: 'card' },
        { from: 'hand-3', to: 'card-handheld', type: 'card' },

        { from: 'rep-1', to: 'card-repeater', type: 'card' },
        { from: 'rep-2', to: 'card-repeater', type: 'card' },
        { from: 'rep-3', to: 'card-repeater', type: 'card' },
        { from: 'rep-4', to: 'card-repeater', type: 'card' },

        // Bridges
        { from: 'node-2', to: 'hand-1', type: 'bridge' },
        { from: 'node-4', to: 'hand-3', type: 'bridge' },
        { from: 'hand-2', to: 'rep-1', type: 'bridge' },
        { from: 'hand-2', to: 'rep-2', type: 'bridge' }
    ];

    connections.forEach(c => {
        const lineEl = createLine(c.type === 'bridge' ? 'bridge-line' : 'mesh-line');
        lines.push({ el: lineEl, from: c.from, to: c.to });
    });

    function updateLines() {
        lines.forEach(line => {
            const fromEl = document.getElementById(line.from);
            const toEl = document.getElementById(line.to);

            if (fromEl && toEl) {
                const r1 = fromEl.getBoundingClientRect();
                const r2 = toEl.getBoundingClientRect();
                const x1 = r1.left + r1.width / 2;
                const y1 = r1.top + r1.height / 2;
                const x2 = r2.left + r2.width / 2;
                const y2 = r2.top + r2.height / 2;
                line.el.setAttribute("x1", x1);
                line.el.setAttribute("y1", y1);
                line.el.setAttribute("x2", x2);
                line.el.setAttribute("y2", y2);
            }
        });
    }
    gsap.ticker.add(updateLines);
}

// STANDARD CALCULATOR
function handleSelectChange() {
    const selectValue = document.getElementById('areaSelect').value;
    const customContainer = document.getElementById('customInputContainer');
    if (selectValue === 'custom') {
        customContainer.style.display = 'block';
        calculateCost();
    } else {
        customContainer.style.display = 'none';
        calculateCost();
    }
}

function calculateCost() {
    const selectValue = document.getElementById('areaSelect').value;
    let area = 0;
    let density = 0.5;
    let nodes, price, note;

    if (selectValue === "japan") {
        nodes = 5000; price = 500000;
        note = "*<strong>Strategic Backbone Logic:</strong> Uses 10km grid spacing with mountaintop solar repeaters. Cost reflects a mix of 40% Public Nodes ($150) and 60% low-cost Repeaters ($50). <strong>Total cost is less than one fire truck.</strong>";
    }
    else if (selectValue === "usa") {
        nodes = 130000; price = 13000000;
        note = "*<strong>National Defense Logic:</strong> Continental backbone coverage. Uses 60% low-cost repeaters ($50) on towers/peaks and 40% hardened nodes ($150). Provides nationwide emergency comms for less than the cost of one fighter jet.";
    }
    else {
        if (selectValue === 'custom') {
            area = parseFloat(document.getElementById('customAreaInput').value) || 0;
        } else {
            area = parseInt(selectValue);
        }

        if(area <= 5) density = 3.0;
        else if(area <= 50) density = 2.0;
        else if(area <= 200) density = 0.5;
        else if(area > 100000) density = 0.1;
        else density = 0.15;

        nodes = Math.ceil(area * density);
        if(nodes < 2 && area > 0) nodes = 2;
        if(area === 0) nodes = 0;

        let costPerUnit = (area > 1000) ? 100 : 150;
        price = nodes * costPerUnit;

        let densityText = (density < 0.2) ? "Strategic Backbone" : "High Density";
        note = `*<strong>${densityText}:</strong> Based on ${density} nodes/km² for this scale.`;
    }

    document.getElementById('nodeCount').innerText = nodes.toLocaleString();
    document.getElementById('totalCost').innerText = "$" + price.toLocaleString();
    document.getElementById('calculationNote').innerHTML = note;
}

// Initial calculation
if(document.getElementById('areaSelect')) {
    handleSelectChange();
}
