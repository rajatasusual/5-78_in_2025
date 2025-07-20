// Data from the provided JSON
const data = {
    adoption_growth: [
        {"year": 2022, "percentage": 35, "type": "historical", "source": "Stanford AI Index"},
        {"year": 2023, "percentage": 55, "type": "historical", "source": "McKinsey State of AI"},
        {"year": 2024, "percentage": 78, "type": "current", "source": "McKinsey State of AI 2024"},
        {"year": 2025, "percentage": 85, "type": "projected", "source": "Trend Analysis"},
        {"year": 2026, "percentage": 92, "type": "projected", "source": "Trend Analysis"}
    ],
    maturity_split: [
        {"category": "Mature GenAI Initiatives", "percentage": 5, "color": "#2563eb", "description": "Only 5% have mature GenAI programs"},
        {"category": "Basic AI Implementation", "percentage": 25, "color": "#1e40af", "description": "Basic AI tools and processes"},
        {"category": "Experimentation Phase", "percentage": 70, "color": "#6b7280", "description": "Still testing and experimenting"}
    ],
    sector_adoption: [
        {"sector": "Technology", "adoption": 88, "maturity": 41, "color": "#2563eb", "gap": 47},
        {"sector": "Financial Services", "adoption": 65, "maturity": 1, "color": "#1e40af", "gap": 64},
        {"sector": "Healthcare", "adoption": 63, "maturity": 3, "color": "#059669", "gap": 60},
        {"sector": "Manufacturing", "adoption": 59, "maturity": 9, "color": "#dc2626", "gap": 50}
    ],
    timeline_data: {
        "current": {"adoption": 78, "achievers": 5, "challenges": ["Data Quality Issues (46%)", "Talent Scarcity (33%)", "Strategic Planning Gaps"]},
        "12months": {"adoption": 85, "achievers": 12, "challenges": ["Scaling Challenges", "ROI Measurement", "Integration Complexity"]},
        "24months": {"adoption": 92, "achievers": 27, "challenges": ["Competitive Differentiation", "Innovation Speed", "Governance Maturity"]}
    },
    // Complete Research-Based Impact Matrix data
    impact_matrix: {
        maturity_stages: ["Experimenting", "Developing", "Scaling", "Leading"],
        impact_metrics: [
            {"metric": "Satisfaction Rate", "experimenting": 45, "developing": 65, "scaling": 80, "leading": 95},
            {"metric": "ROI Achievement", "experimenting": 25, "developing": 45, "scaling": 65, "leading": 75},
            {"metric": "Value Creation", "experimenting": 30, "developing": 50, "scaling": 70, "leading": 85},
            {"metric": "Strategic Alignment", "experimenting": 35, "developing": 55, "scaling": 75, "leading": 90}
        ]
    },
    conclusion_stats: [
        {"value": "$109.1B", "label": "US AI Investment in 2024", "source": "Stanford AI Index 2025", "color": "#2563eb"},
        {"value": "95%", "label": "High Satisfaction at Highest AI Maturity", "source": "Protiviti AI Pulse Survey 2024", "color": "#2563eb"},
        {"value": "75%", "label": "Exceed ROI Expectations at Highest Maturity", "source": "Protiviti AI Pulse Survey 2024", "color": "#2563eb"}
    ]
};

// Global variables
let scene, camera, renderer, particleSystem, lines;
let animationId;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    
    // Add a small delay to ensure all resources are loaded
    setTimeout(() => {
        initThreeJsBackground();
        initNavigation();
        initCharts();
        initInteractiveElements();
        initAnimations();
        initShareButton();
        initCounterAnimation();
    }, 100);
});

// Three.js AI-themed background
function initThreeJsBackground() {
    try {
        console.log('Initializing Three.js background...');
        
        const canvas = document.getElementById('background-canvas');
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        // Create particle system
        const particleCount = 80;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

            // Alternate between blue and yellow colors
            if (Math.random() > 0.6) {
                colors[i * 3] = 0.15;     // R
                colors[i * 3 + 1] = 0.39; // G
                colors[i * 3 + 2] = 0.92; // B (blue)
            } else {
                colors[i * 3] = 0.91;     // R
                colors[i * 3 + 1] = 0.89; // G
                colors[i * 3 + 2] = 0.28; // B (yellow)
            }

            velocities.push({
                x: (Math.random() - 0.5) * 0.005,
                y: (Math.random() - 0.5) * 0.005,
                z: (Math.random() - 0.5) * 0.005
            });
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        // Create line geometry for connections
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x2563eb,
            transparent: true,
            opacity: 0.2
        });

        lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        camera.position.z = 8;

        // Animation loop
        function animate() {
            animationId = requestAnimationFrame(animate);

            if (!particleSystem || !lines) return;

            // Update particle positions
            const positions = particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += velocities[i].x;
                positions[i * 3 + 1] += velocities[i].y;
                positions[i * 3 + 2] += velocities[i].z;

                // Bounce off boundaries
                if (Math.abs(positions[i * 3]) > 7.5) velocities[i].x *= -1;
                if (Math.abs(positions[i * 3 + 1]) > 7.5) velocities[i].y *= -1;
                if (Math.abs(positions[i * 3 + 2]) > 7.5) velocities[i].z *= -1;
            }

            particleSystem.geometry.attributes.position.needsUpdate = true;
            
            // Update connections
            updateConnections();

            // Rotate the entire system slowly
            particleSystem.rotation.y += 0.001;
            lines.rotation.y += 0.001;

            renderer.render(scene, camera);
        }

        function updateConnections() {
            const linePositions = [];
            const pos = particleSystem.geometry.attributes.position.array;
            
            for (let i = 0; i < particleCount; i++) {
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = pos[i * 3] - pos[j * 3];
                    const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                    const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (distance < 2.5) {
                        linePositions.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
                        linePositions.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
                    }
                }
            }

            lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        }

        animate();
        console.log('Three.js background initialized successfully');

    } catch (error) {
        console.error('Error initializing Three.js background:', error);
    }
}

// CRITICAL: Navigation functionality with snap scroll support and fix for Home button
function initNavigation() {
    console.log('Initializing navigation...');
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.section');
    const progressFill = document.querySelector('.progress-fill');

    // Smooth scroll and active link management
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            console.log('Navigation clicked, target:', targetId);
            
            // CRITICAL FIX: Ensure home button goes to hero section
            if (targetId === 'hero') {
                scrollToSection('hero');
            } else {
                scrollToSection(targetId);
            }
        });
    });

    // Update active nav link and progress on scroll with better section detection
    let ticking = false;
    function updateScrollProgress() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset;
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                
                // Update progress bar
                const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
                if (progressFill) {
                    progressFill.style.width = Math.min(progress, 100) + '%';
                }

                // Update active nav link with better detection
                let activeSection = null;
                let closestDistance = Infinity;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 150; // Account for nav height
                    const sectionBottom = sectionTop + section.offsetHeight;
                    const distance = Math.abs(scrollTop - sectionTop);
                    
                    if (scrollTop >= sectionTop && scrollTop < sectionBottom && distance < closestDistance) {
                        activeSection = section.id;
                        closestDistance = distance;
                    }
                });

                let previousLink = null;
                let foundSection = false;

                navLinks.forEach(link => {
                    if (link.classList.contains('active') && link.getAttribute('data-section') !== activeSection) {
                        previousLink = link;
                    }
                    if (link.getAttribute('data-section') === activeSection) {
                        link.classList.add('active');
                        foundSection = true;
                    }
                });
                
                if(foundSection) {
                    if (previousLink) {
                        previousLink.classList.remove('active');
                    }
                } 
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateScrollProgress);
    console.log('Navigation initialized');
}

// Initialize all charts using D3.js
function initCharts() {
    console.log('Initializing charts...');
    
    // Wait for D3 to be available
    if (typeof d3 === 'undefined') {
        console.error('D3.js not loaded');
        setTimeout(initCharts, 500);
        return;
    }
    
    createGrowthChart();
    createMaturityChart();
    createSectorChart();
    createImpactMatrixChart();
    
    console.log('Charts initialized');
}

// Growth chart with D3.js
function createGrowthChart() {
    const container = d3.select('#growth-chart');
    if (container.empty()) return;

    container.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const containerWidth = container.node().getBoundingClientRect().width;
    const width = Math.max(containerWidth - margin.left - margin.right, 300);
    const height = 400 - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain(d3.extent(data.adoption_growth, d => d.year))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.percentage))
        .curve(d3.curveCardinal);

    const area = d3.area()
        .x(d => x(d.year))
        .y0(height)
        .y1(d => y(d.percentage))
        .curve(d3.curveCardinal);

    const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'growth-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0).attr('y1', height)
        .attr('x2', 0).attr('y2', 0);

    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#2563eb')
        .attr('stop-opacity', 0.1);

    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#2563eb')
        .attr('stop-opacity', 0.5);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add area
                svg.append('path')
                    .datum(data.adoption_growth)
                    .attr('d', area)
                    .style('fill', 'url(#growth-gradient)')
                    .style('opacity', 0)
                    .transition()
                    .duration(2000)
                    .style('opacity', 1);

                // Add line
                svg.append('path')
                    .datum(data.adoption_growth)
                    .attr('d', line)
                    .style('fill', 'none')
                    .style('stroke', '#2563eb')
                    .style('stroke-width', 3)
                    .style('opacity', 0)
                    .transition()
                    .duration(2000)
                    .style('opacity', 1);

                // Add dots
                svg.selectAll('.dot')
                    .data(data.adoption_growth)
                    .enter().append('circle')
                    .attr('cx', d => x(d.year))
                    .attr('cy', d => y(d.percentage))
                    .attr('r', 6)
                    .style('fill', d => d.type === 'current' ? '#e7e247' : '#2563eb')
                    .style('stroke', '#ffffff')
                    .style('stroke-width', 2)
                    .style('opacity', 0)
                    .transition()
                    .delay((d, i) => i * 300)
                    .duration(500)
                    .style('opacity', 1);

                // Add axes
                svg.append('g')
                    .attr('transform', `translate(0,${height})`)
                    .call(d3.axisBottom(x).tickFormat(d3.format('d')))
                    .selectAll('text')
                    .style('fill', '#cccccc');

                svg.append('g')
                    .call(d3.axisLeft(y).tickFormat(d => d + '%'))
                    .selectAll('text')
                    .style('fill', '#cccccc');

                observer.unobserve(container.node());
            }
        });
    }, { threshold: 0.1 });

    observer.observe(container.node());
}

// Maturity breakdown chart
function createMaturityChart() {
    const container = d3.select('#maturity-chart');
    if (container.empty()) return;
    if (!container.select('svg').empty()) return;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const margin = { top: 20, right: 30, bottom: 60, left: 120 };
            const containerWidth = container.node().getBoundingClientRect().width;
            const width = Math.max(containerWidth - margin.left - margin.right, 300);
            const height = 300;
            const radius = Math.min(width, height) / 2 - 20;

            const svg = container.append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${width/2},${height/2})`);

            const pie = d3.pie()
                .value(d => d.percentage)
                .sort(null);

            const arc = d3.arc()
                .innerRadius(radius * 0.5)
                .outerRadius(radius);

            const arcs = svg.selectAll('.arc')
                .data(pie(data.maturity_split))
                .enter().append('g')
                .style('opacity', 0);

            arcs.append('path')
                .attr('d', arc)
                .attr('fill', d => d.data.color)
                .attr('stroke', '#000000')
                .attr('stroke-width', 2)
                .style('opacity', 0.8)
                .on('mouseover', function() {
                    d3.select(this).style('opacity', 1);
                })
                .on('mouseout', function() {
                    d3.select(this).style('opacity', 0.8);
                });

            // Add percentage labels
            arcs.append('text')
                .attr('transform', d => `translate(${arc.centroid(d)})`)
                .attr('text-anchor', 'middle')
                .style('font-size', '16px')
                .style('font-weight', 'bold')
                .style('fill', '#ffffff')
                .text(d => d.data.percentage + '%')
                .style('opacity', 0)
                .transition()
                .duration(2000)
                .style('opacity', 1);

            // Incrementally render the chart
            arcs.transition()
                .delay((d, i) => i * 300)
                .duration(500)
                .style('opacity', 1);

            observer.unobserve(container.node());
        }
    }, { threshold: 0.1 });

    observer.observe(container.node());
}

// CRITICAL: Sector analysis chart with working modal functionality
function createSectorChart() {
    const container = d3.select('#sector-chart');
    if (container.empty()) return;
    
    const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            createSectorChartInternal(container);
            observer.unobserve(container.node());
        }
    }, { threshold: 0.1 });

    observer.observe(container.node());
}

function createSectorChartInternal(container) {
    container.selectAll('*').remove();
    
    const margin = { top: 20, right: 30, bottom: 60, left: 120 };
    const containerWidth = container.node().getBoundingClientRect().width;
    const width = Math.max(containerWidth - margin.left - margin.right, 300);
    const height = 400 - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(data.sector_adoption.map(d => d.sector))
        .range([0, height])
        .padding(0.2);

    // Add adoption bars with proper click handlers
    svg.selectAll('.adoption-bar')
        .data(data.sector_adoption)
        .enter().append('rect')
        .attr('class', 'adoption-bar')
        .attr('x', 0)
        .attr('y', d => y(d.sector))
        .attr('width', 0)
        .attr('height', y.bandwidth() / 2)
        .attr('fill', '#2563eb')
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this).style('opacity', 0.8);
        })
        .on('mouseout', function(event, d) {
            d3.select(this).style('opacity', 1);
        })
        .on('click', function(event, d) {
            console.log('Adoption bar clicked for:', d.sector);
            showSectorModal(d);
        })
        .transition()
        .delay((d, i) => i * 50)
        .duration(500)
        .attr('width', d => x(d.adoption));

    // Add maturity bars with proper click handlers
    svg.selectAll('.maturity-bar')
        .data(data.sector_adoption)
        .enter().append('rect')
        .attr('class', 'maturity-bar')
        .attr('x', 0)
        .attr('y', d => y(d.sector) + y.bandwidth() / 2)
        .attr('width', 0)
        .attr('height', y.bandwidth() / 2)
        .attr('fill', '#e7e247')
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
            d3.select(this).style('opacity', 0.8);
        })
        .on('mouseout', function(event, d) {
            d3.select(this).style('opacity', 1);
        })
        .on('click', function(event, d) {
            console.log('Maturity bar clicked for:', d.sector);
            showSectorModal(d);
        })
        .transition()
        .delay((d, i) => i * 50)
        .duration(500)
        .attr('width', d => x(d.maturity));

    // Add sector labels with click functionality
    svg.selectAll('.sector-label')
        .data(data.sector_adoption)
        .enter().append('text')
        .attr('class', 'sector-label')
        .attr('x', -10)
        .attr('y', d => y(d.sector) + y.bandwidth() / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'end')
        .style('fill', '#ffffff')
        .style('font-size', '14px')
        .style('cursor', 'pointer')
        .text(d => d.sector)
        .on('click', function(event, d) {
            console.log('Sector label clicked for:', d.sector);
            showSectorModal(d);
        });

    // Add value labels
    svg.selectAll('.adoption-label')
        .data(data.sector_adoption)
        .enter().append('text')
        .attr('x', d => x(d.adoption) + 5)
        .attr('y', d => y(d.sector) + y.bandwidth() / 4)
        .attr('dy', '0.35em')
        .style('fill', '#ffffff')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .text(d => d.adoption + '%');

    svg.selectAll('.maturity-label')
        .data(data.sector_adoption)
        .enter().append('text')
        .attr('x', d => x(d.maturity) + 5)
        .attr('y', d => y(d.sector) + 3 * y.bandwidth() / 4)
        .attr('dy', '0.35em')
        .style('fill', '#000000')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .text(d => d.maturity + '%');

    // Add axes
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => d + '%'))
        .selectAll('text')
        .style('fill', '#cccccc');
}

// CRITICAL: Complete Research-Based Impact Matrix
function createImpactMatrixChart() {
    const container = d3.select('#impact-matrix-chart');
    if (container.empty()) return;
    
    container.selectAll('*').remove();
    
    const margin = { top: 50, right: 30, bottom: 60, left: 150 };
    const containerWidth = container.node().getBoundingClientRect().width;
    const width = Math.max(containerWidth - margin.left - margin.right, 400);
    const height = 400 - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const colors = ['#2563eb', '#2563eb50', '#e7e24750', '#e7e247'];
    const stages = data.impact_matrix.maturity_stages;
    const metrics = data.impact_matrix.impact_metrics;

    const x = d3.scaleBand()
        .domain(stages)
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleBand()
        .domain(metrics.map(d => d.metric))
        .range([0, height])
        .padding(0.1);

    // Create cells for each metric and stage
    metrics.forEach((metric, metricIndex) => {
        stages.forEach((stage, stageIndex) => {
            const value = metric[stage.toLowerCase()];
            const cellHeight = Math.max((value / 100) * y.bandwidth(), 5);
            
            svg.append('rect')
                .attr('x', x(stage))
                .attr('y', y(metric.metric) + (y.bandwidth() - cellHeight))
                .attr('width', x.bandwidth())
                .attr('height', cellHeight)
                .attr('fill', colors[stageIndex])
                .attr('opacity', 0.8)
                .on('mouseover', function(event) {
                    d3.select(this).attr('opacity', 1);
                    
                    // Create tooltip
                    const tooltip = svg.append('g')
                        .attr('id', 'matrix-tooltip')
                        .attr('transform', `translate(${x(stage) + x.bandwidth()/2}, ${y(metric.metric) - 10})`);
                    
                    const tooltipBg = tooltip.append('rect')
                        .attr('width', 100)
                        .attr('height', 30)
                        .attr('x', -50)
                        .attr('y', -25)
                        .attr('fill', '#000000')
                        .attr('stroke', '#ffffff')
                        .attr('opacity', 0.9)
                        .attr('rx', 5);
                    
                    tooltip.append('text')
                        .attr('text-anchor', 'middle')
                        .attr('y', -10)
                        .style('fill', '#ffffff')
                        .style('font-size', '12px')
                        .style('font-weight', 'bold')
                        .text(`${value}%`);
                })
                .on('mouseout', function() {
                    d3.select(this).attr('opacity', 0.8);
                    svg.select('#matrix-tooltip').remove();
                });

            // Add value labels for larger cells
            if (cellHeight > 20) {
                svg.append('text')
                    .attr('x', x(stage) + x.bandwidth()/2)
                    .attr('y', y(metric.metric) + y.bandwidth() - cellHeight/2)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '0.35em')
                    .style('fill', '#ffffff')
                    .style('font-size', '11px')
                    .style('font-weight', 'bold')
                    .text(value + '%');
            }
        });
    });

    // Add Y axis (metrics)
    svg.append('g')
        .selectAll('text')
        .data(metrics)
        .enter().append('text')
        .attr('x', -10)
        .attr('y', d => y(d.metric) + y.bandwidth()/2)
        .attr('text-anchor', 'end')
        .attr('dy', '0.35em')
        .style('fill', '#ffffff')
        .style('font-size', '13px')
        .text(d => d.metric);

    // Add X axis (stages)
    svg.append('g')
        .attr('transform', `translate(0, ${height + 10})`)
        .selectAll('text')
        .data(stages)
        .enter().append('text')
        .attr('x', d => x(d) + x.bandwidth()/2)
        .attr('text-anchor', 'middle')
        .style('fill', '#ffffff')
        .style('font-size', '13px')
        .text(d => d);
}

// Initialize interactive elements
function initInteractiveElements() {
    console.log('Initializing interactive elements...');
    
    initTimelineControls();
    initEnablerFilters();
    initModal();
    
    // Initialize CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('growth');
        });
    }
    
    console.log('Interactive elements initialized');
}

// Timeline controls
function initTimelineControls() {
    const timelineButtons = document.querySelectorAll('.timeline-btn');
    const adoptionNumber = document.getElementById('timeline-adoption');
    const achieversNumber = document.getElementById('timeline-achievers');
    const challengesList = document.getElementById('timeline-challenge-list');

    if (!timelineButtons.length || !adoptionNumber || !achieversNumber || !challengesList) {
        console.warn('Timeline elements not found');
        return;
    }

    timelineButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            timelineButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const period = this.getAttribute('data-period');
            const periodData = data.timeline_data[period];

            if (periodData) {
                // Animate numbers
                animateNumber(adoptionNumber, parseInt(adoptionNumber.textContent), periodData.adoption, 1000);
                animateNumber(achieversNumber, parseInt(achieversNumber.textContent), periodData.achievers, 1000);

                // Update challenges
                challengesList.innerHTML = '';
                periodData.challenges.forEach(challenge => {
                    const li = document.createElement('li');
                    li.textContent = challenge;
                    challengesList.appendChild(li);
                });
            }
        });
    });
}

// CRITICAL: Enabler filters with fade instead of hide
function initEnablerFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const enablerCards = document.querySelectorAll('.enabler-card');

    if (!filterButtons.length || !enablerCards.length) {
        console.warn('Enabler filter elements not found');
        return;
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            enablerCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                card.classList.remove('faded');
                
                if (filter === 'all') {
                    // Show all cards highlighted
                    card.classList.remove('faded');
                } else if (cardCategory !== filter) {
                    // Fade non-matching cards instead of hiding them
                    card.classList.add('faded');
                }
            });
        });
    });

    // Initialize with all cards highlighted
    enablerCards.forEach(card => {
        card.classList.remove('faded');
    });
}

// CRITICAL: Modal functionality - properly implemented
function initModal() {
    const modal = document.getElementById('sector-modal');
    const closeBtn = document.querySelector('.modal-close');

    if (!modal || !closeBtn) {
        console.warn('Modal elements not found');
        return;
    }

    closeBtn.addEventListener('click', function() {
        console.log('Modal close button clicked');
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            console.log('Modal background clicked');
            modal.style.display = 'none';
        }
    });

    // Ensure modal is hidden initially
    modal.style.display = 'none';
    console.log('Modal initialized');
}

function showSectorModal(sectorData) {
    console.log('Showing modal for sector:', sectorData.sector);
    
    const modal = document.getElementById('sector-modal');
    const title = document.getElementById('modal-sector-title');
    const adoption = document.getElementById('modal-adoption');
    const maturity = document.getElementById('modal-maturity');
    const gap = document.getElementById('modal-gap');
    const description = document.getElementById('modal-description');

    if (!modal || !title || !adoption || !maturity || !gap || !description) {
        console.error('Modal elements not found');
        return;
    }

    title.textContent = sectorData.sector;
    adoption.textContent = sectorData.adoption + '%';
    maturity.textContent = sectorData.maturity + '%';
    gap.textContent = sectorData.gap + '%';
    
    // Add sector-specific descriptions
    const descriptions = {
        'Technology': 'Technology sector leads in AI adoption but faces challenges in achieving full maturity across all initiatives.',
        'Financial Services': 'Financial services show strong adoption but extremely low maturity rates due to regulatory constraints.',
        'Healthcare': 'Healthcare demonstrates moderate adoption with significant maturity gaps due to data privacy concerns.',
        'Manufacturing': 'Manufacturing shows steady adoption with growing maturity as AI integrates with operational processes.'
    };
    
    description.textContent = descriptions[sectorData.sector] || 'Sector-specific AI implementation details.';
    
    // Show the modal
    modal.style.display = 'block';
    console.log('Modal displayed successfully');
}

// CRITICAL: Share Insights Button
function initShareButton() {
    const shareBtn = document.getElementById('share-insights-btn');
    const toast = document.getElementById('toast-notification');
    
    if (!shareBtn || !toast) {
        console.warn('Share button or toast not found');
        return;
    }

    shareBtn.addEventListener('click', function() {
        console.log('Share button clicked');
        const shareText = `AI Maturity Gap Alert: 78% adoption vs only 5% mature implementations. The 24-month window to join the 27% AI Achievers is closing. Key insight: 95% satisfaction at highest AI maturity levels. #AITransformation #DigitalLeadership ${window.location.href}`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareText).then(function() {
            console.log('Text copied to clipboard successfully');
            // Show toast notification
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }).catch(function(err) {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
                console.log('Text copied using fallback method');
            } catch (err) {
                console.error('Fallback copy failed: ', err);
            }
            document.body.removeChild(textArea);
        });
    });
}

// Initialize animations
function initAnimations() {
    console.log('Initializing animations...');
    initHeroAnimations();
    initScrollAnimations();
}

// Counter animations for hero section
function initHeroAnimations() {
    const heroStats = document.querySelectorAll('.hero-stat');

    if ( !heroStats.length) {
        console.warn('Hero section or stat numbers not found');
        return;
    }

    heroStats.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        animateNumber(number, 0, target, 2000);
    })
    
}


// CRITICAL: Counter animation for conclusion 24-month counter
function initCounterAnimation() {
    const counterSection = document.getElementById('conclusion');
    const counterElement = document.getElementById('months-counter');
    let counterTriggered = false;

    if (!counterSection || !counterElement) {
        console.warn('Counter elements not found');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterTriggered) {
                counterTriggered = true;
                console.log('Triggering 24-month counter animation...');
                animateNumber(counterElement, 0, 24, 2000);
            }
        });
    });

    observer.observe(counterSection);
}

// Scroll-based animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.insight-item, .maturity-item, .barrier-item, .stall-item, .enabler-card, .stat-card, .source-item');
    
    if (!animatedElements.length) {
        console.warn('No animated elements found');
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Utility functions
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + difference * easeOutQuart);
        
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// CRITICAL: Enhanced snap scroll support
function scrollToSection(sectionId) {
    console.log('Scrolling to section:', sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
        // Use more aggressive scrolling options to ensure snap behavior works
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
        
        // Fallback for better snap behavior
        setTimeout(() => {
            const elementTop = section.offsetTop - 70; // Account for nav height
            window.scrollTo({
                top: elementTop,
                behavior: 'smooth'
            });
        }, 100);
    } else {
        console.error('Section not found:', sectionId);
    }
}

// Handle window resize for charts and Three.js
window.addEventListener('resize', function() {
    // Resize Three.js renderer
    if (renderer && camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Recreate charts with new dimensions
    setTimeout(() => {
        if (typeof d3 !== 'undefined') {
            createGrowthChart();
            createMaturityChart();
            createSectorChart();
            createImpactMatrixChart();
        }
    }, 100);
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    d3.selectAll('.chart-tooltip').remove();
});