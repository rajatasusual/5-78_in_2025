// Enhanced AI Presentation Interactive Application
class AIPresentation {
    constructor() {
        this.currentSection = 0;
        this.sections = ['hero', 'adoption', 'maturity', 'sectors', 'timeline', 'barriers', 'enablers', 'recommendations', 'conclusion'];
        this.data = {
            adoption_growth: [
                { year: '2023', percentage: 55 },
                { year: '2024', percentage: 78 },
                { year: '2025', percentage: 82 },
                { year: '2026', percentage: 89 }
            ],
            maturity_split: [
                { category: "AI Achievers", percentage: 12, color: "#2563eb", description: "Top performers with enterprise-wide AI integration" },
                { category: "AI Builders", percentage: 25, color: "#1e40af", description: "Progressing with structured AI initiatives" },
                { category: "AI Innovators", percentage: 13, color: "#f59e0b", description: "Experimental approach with pilot projects" },
                { category: "AI Experimenters", percentage: 50, color: "#6b7280", description: "Testing waters with limited AI adoption" }
            ],
            sector_adoption: [
                { sector: "Technology", percentage: 85, color: "#2563eb" },
                { sector: "Financial Services", percentage: 78, color: "#1e40af" },
                { sector: "Healthcare", percentage: 68, color: "#f59e0b" },
                { sector: "Manufacturing", percentage: 65, color: "#059669" },
                { sector: "Retail", percentage: 62, color: "#dc2626" },
                { sector: "Energy", percentage: 55, color: "#7c3aed" }
            ],
            timeline_data: {
                current: {
                    adoption: 78,
                    achievers: 12,
                    challenges: ["Data Strategy Issues", "Talent Gap", "Integration Complexity"]
                },
                "12months": {
                    adoption: 85,
                    achievers: 20,
                    challenges: ["Scaling Challenges", "ROI Measurement", "Governance Issues"]
                },
                "24months": {
                    adoption: 92,
                    achievers: 27,
                    challenges: ["Competitive Pressure", "Innovation Speed", "Digital Transformation"]
                }
            },
            barriers: {
                whereStall: [
                    { name: "Data Strategy Issues", percentage: 46 },
                    { name: "Poor Data Quality", percentage: 42 },
                    { name: "Lack of Strategic Roadmap", percentage: 40 }
                ],
                whyStall: [
                    { name: "Talent Gaps", percentage: 33 },
                    { name: "Integration Pain", percentage: 30 },
                    { name: "Unclear Value Cases", percentage: 28 }
                ],
                breakingThrough: [
                    { name: "CEO Sponsorship", percentage: 83 },
                    { name: "Responsible AI Framework", percentage: 53 },
                    { name: "AI Core Platform", percentage: 32 }
                ]
            },
            enablers: [
                { name: "KPI Tracking", impact: 9, difficulty: 5, roi: "20% EBIT variance", color: "#2563eb" },
                { name: "CEO Oversight", impact: 8, difficulty: 8, roi: "Highest at large enterprises", color: "#1e40af" },
                { name: "Workflow Redesign", impact: 10, difficulty: 9, roi: "47% more ROI success", color: "#f59e0b" },
                { name: "AI Core Platform", impact: 7, difficulty: 9, roi: "5x faster deployment", color: "#059669" },
                { name: "Talent Investment", impact: 6, difficulty: 6, roi: "78% vs 51% training rate", color: "#dc2626" }
            ]
        };

        this.init();
    }

    init() {
        this.setupThreeJS();
        this.setupNavigation();
        this.setupIntersectionObserver();
        this.setupAnimations();
        this.createVisualizations();
        this.setupInteractivity();
        this.setupStartPresentation();
    }

    setupStartPresentation() {
        window.startPresentation = () => {
            const adoptionSection = document.getElementById('adoption');
            if (adoptionSection) {
                adoptionSection.scrollIntoView({ behavior: 'smooth' });
            }
        };
    }

    setupNavigation() {
        document.documentElement.style.scrollBehavior = 'smooth';

        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navHeight = 80;
                    const targetPosition = targetElement.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
    }

    // Three.js 3D Background
    setupThreeJS() {
        const container = document.getElementById('heroBackground');
        if (!container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);

        this.createFloatingShapes();
        this.camera.position.z = 5;
        this.animateThreeJS();

        window.addEventListener('resize', () => this.onWindowResize());
    }

    createFloatingShapes() {
        this.shapes = [];
        const geometries = [
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.OctahedronGeometry(0.4),
            new THREE.TetrahedronGeometry(0.4)
        ];

        const colors = [0x2563eb, 0x1e40af, 0xf59e0b, 0x059669, 0xdc2626];

        for (let i = 0; i < 60; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.7,
                wireframe: Math.random() > 0.6
            });

            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.x = (Math.random() - 0.5) * 25;
            mesh.position.y = (Math.random() - 0.5) * 25;
            mesh.position.z = (Math.random() - 0.5) * 15;

            mesh.rotation.x = Math.random() * 2 * Math.PI;
            mesh.rotation.y = Math.random() * 2 * Math.PI;

            mesh.userData.originalPosition = mesh.position.clone();
            mesh.userData.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            };

            this.scene.add(mesh);
            this.shapes.push(mesh);
        }
    }

    animateThreeJS() {
        requestAnimationFrame(() => this.animateThreeJS());

        this.shapes.forEach(shape => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;

            const time = Date.now() * 0.001;
            shape.position.y = shape.userData.originalPosition.y + Math.sin(time + shape.position.x) * 0.8;
        });

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSection(entry.target);
                    this.updateNavigation(entry.target.id);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        });

        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) observer.observe(section);
        });

        window.addEventListener('scroll', () => this.updateProgressBar());
    }

    updateProgressBar() {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const progressBar = document.getElementById('navProgress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }

    updateNavigation(activeSection) {
        document.querySelectorAll('.nav__link').forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav__link[href="#${activeSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    setupAnimations() {
        // Hero section animations
        anime.timeline()
            .add({
                targets: '.hero__title-line',
                opacity: [0, 1],
                translateY: [50, 0],
                delay: anime.stagger(200),
                duration: 1000,
                easing: 'easeOutExpo'
            })
            .add({
                targets: '.hero__subtitle',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                easing: 'easeOutExpo'
            }, '-=500')
            .add({
                targets: '.start-presentation-btn',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                easing: 'easeOutExpo'
            }, '-=300')
            .add({
                targets: '.hero__scroll-indicator',
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutExpo'
            }, '-=200');

        this.animateCounter('#adoptionStat', 78, 2000);
        this.animateCounter('#winningStat', 5, 2000, 500);
    }

    animateCounter(selector, target, duration, delay = 0) {
        setTimeout(() => {
            anime({
                targets: { value: 0 },
                value: target,
                duration: duration,
                easing: 'easeOutExpo',
                update: function (anim) {
                    const element = document.querySelector(selector);
                    if (element) {
                        element.textContent = Math.round(anim.animatables[0].target.value) + '%';
                    }
                }
            });
        }, delay);
    }

    animateSection(section) {
        const sectionId = section.id;

        if (section.dataset.animated) return;
        section.dataset.animated = 'true';

        switch (sectionId) {
            case 'adoption':
                this.animateAdoption();
                break;
            case 'maturity':
                this.animateMaturity();
                break;
            case 'sectors':
                this.animateSectors();
                break;
            case 'timeline':
                this.animateTimeline();
                break;
            case 'barriers':
                this.animateBarriers();
                break;
            case 'enablers':
                this.animateEnablers();
                break;
            case 'recommendations':
                this.animateRecommendations();
                break;
            case 'conclusion':
                this.animateConclusion();
                break;
        }
    }

    animateAdoption() {
        anime({
            targets: '#adoption .section__title',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#adoption .chart-container',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            delay: 200,
            easing: 'easeOutExpo'
        });
    }

    animateMaturity() {
        anime({
            targets: '#maturity .section__title',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#maturity .adoption-stat-large',
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 1000,
            delay: 200,
            easing: 'easeOutExpo'
        });
    }

    animateSectors() {
        anime({
            targets: '#sectors .section__title',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#sectors .chart-container',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            delay: 200,
            easing: 'easeOutExpo'
        });
    }

    animateTimeline() {
        anime({
            targets: '#timeline .section__title',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#timeline .interactive-timeline',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            delay: 200,
            easing: 'easeOutExpo'
        });
    }

    animateBarriers() {
        anime({
            targets: '#barriers .section__title',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#barriers .barrier-category',
            opacity: [0, 1],
            translateX: [-30, 0],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }

    animateEnablers() {
        anime({
            targets: '#enablers .section__title',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#enablers .chart-container',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            delay: 200,
            easing: 'easeOutExpo'
        });
    }

    animateRecommendations() {
        anime({
            targets: '#recommendations .section__title',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#recommendations .recommendation-card',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutExpo',
            complete: () => {
                // Animate progress bars
                document.querySelectorAll('.progress-fill').forEach((bar, index) => {
                    const percent = bar.getAttribute('data-percent');
                    setTimeout(() => {
                        bar.style.width = percent + '%';
                    }, index * 100);
                });
            }
        });
    }

    animateConclusion() {
        anime({
            targets: '.urgency-number',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.conclusion-title',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 200,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.takeaway',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100, 400),
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.citations',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 800,
            easing: 'easeOutExpo'
        });
    }

    createVisualizations() {
        setTimeout(() => {
            this.createAdoptionAreaChart();
            this.createSankeyChart();
            this.createSectorChart();
            this.createEnablersChart();
        }, 500);
    }

    createAdoptionAreaChart() {
        const container = d3.select('#adoptionAreaChart');
        if (!container.node()) return;

        container.selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const width = 800 - margin.left - margin.right;
        const height = 350 - margin.top - margin.bottom;

        const svg = container.append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([2023, 2026])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        // Create gradient
        const gradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'area-gradient')
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
            .attr('stop-opacity', 0.8);

        // Define area
        const area = d3.area()
            .x(d => x(parseInt(d.year)))
            .y0(height)
            .y1(d => y(d.percentage))
            .curve(d3.curveCardinal);

        // Define line
        const line = d3.line()
            .x(d => x(parseInt(d.year)))
            .y(d => y(d.percentage))
            .curve(d3.curveCardinal);

        // Add area
        const areaPath = g.append('path')
            .datum(this.data.adoption_growth)
            .attr('fill', 'url(#area-gradient)')
            .attr('d', area);

        // Add line
        const linePath = g.append('path')
            .datum(this.data.adoption_growth)
            .attr('fill', 'none')
            .attr('stroke', '#2563eb')
            .attr('stroke-width', 3)
            .attr('d', line);

        // Animate paths
        const totalAreaLength = areaPath.node().getTotalLength();
        const totalLineLength = linePath.node().getTotalLength();

        areaPath
            .attr('stroke-dasharray', totalAreaLength + ' ' + totalAreaLength)
            .attr('stroke-dashoffset', totalAreaLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0);

        linePath
            .attr('stroke-dasharray', totalLineLength + ' ' + totalLineLength)
            .attr('stroke-dashoffset', totalLineLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0);

        // Add data points
        g.selectAll('.data-point')
            .data(this.data.adoption_growth)
            .enter().append('circle')
            .attr('class', 'data-point')
            .attr('cx', d => x(parseInt(d.year)))
            .attr('cy', d => y(d.percentage))
            .attr('r', 6)
            .attr('fill', '#2563eb')
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .style('opacity', 0)
            .transition()
            .delay(2000)
            .duration(500)
            .style('opacity', 1);

        // Add value labels
        g.selectAll('.value-label')
            .data(this.data.adoption_growth)
            .enter().append('text')
            .attr('class', 'value-label')
            .attr('x', d => x(parseInt(d.year)))
            .attr('y', d => y(d.percentage) - 15)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .text(d => d.percentage + '%')
            .style('opacity', 0)
            .transition()
            .delay(2500)
            .duration(500)
            .style('opacity', 1);

        // Add axes
        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format('d')))
            .selectAll('text, path, line')
            .attr('stroke', 'rgba(255,255,255,0.6)')
            .attr('fill', 'rgba(255,255,255,0.6)');

        g.append('g')
            .call(d3.axisLeft(y).tickFormat(d => d + '%'))
            .selectAll('text, path, line')
            .attr('stroke', 'rgba(255,255,255,0.6)')
            .attr('fill', 'rgba(255,255,255,0.6)');
    }

    createSankeyChart() {
        // This is a simplified sankey-style diagram
        const container = d3.select('#sankeyChart');
        if (!container.node()) return;

        container.selectAll("*").remove();

        const width = 800;
        const height = 400;

        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);

        const data = this.data.maturity_split;
        const startX = 100;
        const endX = 600;
        const centerY = height / 2;

        // Draw the 78% adoption circle
        const mainCircle = svg.append('circle')
            .attr('cx', startX)
            .attr('cy', centerY)
            .attr('r', 60)
            .attr('fill', '#2563eb')
            .attr('opacity', 0.8)
            .attr('stroke', 'white')
            .attr('stroke-width', 3);

        svg.append('text')
            .attr('x', startX)
            .attr('y', centerY - 5)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '24px')
            .attr('font-weight', 'bold')
            .text('78%');

        svg.append('text')
            .attr('x', startX)
            .attr('y', centerY + 15)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '12px')
            .text('Total Adoption');

        // Draw connections and maturity segments
        const segmentHeight = 60;
        let currentY = 50;

        data.forEach((segment, i) => {
            const segmentY = currentY + i * (segmentHeight + 20);

            // Draw connection line
            const connection = svg.append('path')
                .attr('d', `M ${startX + 60} ${centerY} Q ${(startX + endX) / 2} ${segmentY + segmentHeight / 2} ${endX - 80} ${segmentY + segmentHeight / 2}`)
                .attr('stroke', segment.color)
                .attr('stroke-width', 3)
                .attr('fill', 'none')
                .attr('opacity', 0.7);

            // Draw segment rectangle
            const segmentRect = svg.append('rect')
                .attr('x', endX - 80)
                .attr('y', segmentY)
                .attr('width', segment.percentage * 4)
                .attr('height', segmentHeight)
                .attr('fill', segment.color)
                .attr('opacity', 0.8)
                .attr('rx', 8);

            // Add segment label
            svg.append('text')
                .attr('x', endX + 20)
                .attr('y', segmentY + 20)
                .attr('fill', 'white')
                .attr('font-size', '14px')
                .attr('font-weight', 'bold')
                .text(segment.category);

            svg.append('text')
                .attr('x', endX + 20)
                .attr('y', segmentY + 35)
                .attr('fill', 'rgba(255,255,255,0.8)')
                .attr('font-size', '12px')
                .text(`${segment.percentage}%`);

            svg.append('text')
                .attr('x', endX + 20)
                .attr('y', segmentY + 50)
                .attr('fill', 'rgba(255,255,255,0.6)')
                .attr('font-size', '10px')
                .text(segment.description);
        });
    }

    createSectorChart() {
        const container = d3.select('#sectorChart');
        if (!container.node()) return;

        container.selectAll("*").remove();

        const margin = { top: 20, right: 100, bottom: 40, left: 150 };
        const width = 800 - margin.left - margin.right;
        const height = 350 - margin.top - margin.bottom;

        const svg = container.append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width]);

        const y = d3.scaleBand()
            .domain(this.data.sector_adoption.map(d => d.sector))
            .range([0, height])
            .padding(0.2);

        // Add bars
        g.selectAll('.sector-bar')
            .data(this.data.sector_adoption)
            .enter().append('rect')
            .attr('class', 'sector-bar')
            .attr('x', 0)
            .attr('y', d => y(d.sector))
            .attr('width', 0)
            .attr('height', y.bandwidth())
            .attr('fill', d => d.color)
            .attr('opacity', 0.8)
            .style('cursor', 'pointer')
            .transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attr('width', d => x(d.percentage));

        // Add value labels
        g.selectAll('.sector-value')
            .data(this.data.sector_adoption)
            .enter().append('text')
            .attr('class', 'sector-value')
            .attr('x', d => x(d.percentage) + 10)
            .attr('y', d => y(d.sector) + y.bandwidth() / 2 + 5)
            .attr('fill', 'white')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .text(d => d.percentage + '%')
            .style('opacity', 0)
            .transition()
            .delay((d, i) => i * 200 + 500)
            .duration(500)
            .style('opacity', 1);

        // Add y-axis
        g.append('g')
            .call(d3.axisLeft(y))
            .selectAll('text')
            .attr('fill', 'white')
            .attr('font-size', '12px');

        g.selectAll('.domain, .tick line')
            .attr('stroke', 'rgba(255,255,255,0.3)');

        // Add x-axis
        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d => d + '%'))
            .selectAll('text, path, line')
            .attr('stroke', 'rgba(255,255,255,0.6)')
            .attr('fill', 'rgba(255,255,255,0.6)');
    }

    createEnablersChart() {
        const container = d3.select('#enablersChart');
        if (!container.node()) return;

        container.selectAll("*").remove();

        const margin = { top: 40, right: 40, bottom: 60, left: 60 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = container.append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([0, 10])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, 10])
            .range([height, 0]);

        // Add grid
        g.selectAll('.grid-line-x')
            .data(x.ticks(10))
            .enter().append('line')
            .attr('class', 'grid-line-x')
            .attr('x1', d => x(d))
            .attr('x2', d => x(d))
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', 'rgba(255,255,255,0.1)');

        g.selectAll('.grid-line-y')
            .data(y.ticks(10))
            .enter().append('line')
            .attr('class', 'grid-line-y')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', d => y(d))
            .attr('y2', d => y(d))
            .attr('stroke', 'rgba(255,255,255,0.1)');

        // Add data points
        const points = g.selectAll('.enabler-point')
            .data(this.data.enablers)
            .enter().append('g')
            .attr('class', 'enabler-point')
            .style('cursor', 'pointer');

        points.append('circle')
            .attr('cx', d => x(d.difficulty))
            .attr('cy', d => y(d.impact))
            .attr('r', 8)
            .attr('fill', d => d.color)
            .attr('opacity', 0.8)
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .style('opacity', 0)
            .transition()
            .delay((d, i) => i * 200)
            .duration(800)
            .style('opacity', 1);

        // Add labels
        points.append('text')
            .attr('x', d => x(d.difficulty))
            .attr('y', d => y(d.impact) - 15)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .text(d => d.name)
            .style('opacity', 0)
            .transition()
            .delay((d, i) => i * 200 + 400)
            .duration(500)
            .style('opacity', 1);

        // Add tooltip functionality
        points.on('mouseover', function (event, d) {
            const tooltip = d3.select('body').append('div')
                .attr('class', 'tooltip')
                .style('position', 'absolute')
                .style('background', 'rgba(0,0,0,0.9)')
                .style('color', 'white')
                .style('padding', '10px')
                .style('border-radius', '5px')
                .style('font-size', '12px')
                .style('pointer-events', 'none')
                .style('opacity', 0);

            tooltip.html(`
                <strong>${d.name}</strong><br/>
                Impact: ${d.impact}/10<br/>
                Difficulty: ${d.difficulty}/10<br/>
                ROI: ${d.roi}
            `)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px')
                .transition()
                .duration(200)
                .style('opacity', 1);
        })
            .on('mouseout', function () {
                d3.selectAll('.tooltip').remove();
            });

        // Add axes
        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text, path, line')
            .attr('stroke', 'rgba(255,255,255,0.6)')
            .attr('fill', 'rgba(255,255,255,0.6)');

        g.append('g')
            .call(d3.axisLeft(y))
            .selectAll('text, path, line')
            .attr('stroke', 'rgba(255,255,255,0.6)')
            .attr('fill', 'rgba(255,255,255,0.6)');

        // Add axis labels
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 20)
            .attr('x', -height / 2 - margin.top)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '14px')
            .text('ROI Impact (1-10)');

        svg.append('text')
            .attr('x', width / 2 + margin.left)
            .attr('y', height + margin.top + 40)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '14px')
            .text('Implementation Difficulty (1-10)');
    }

    setupInteractivity() {
        // Maturity section interaction - Fixed
        const exploreBtn = document.getElementById('exploreMaturity');
        const closeBtn = document.getElementById('closeSankey');
        const adoptionStatLarge = document.querySelector('.adoption-stat-large');
        const sankeyContainer = document.getElementById('sankeyContainer');

        if (exploreBtn && closeBtn && sankeyContainer && adoptionStatLarge) {
            exploreBtn.addEventListener('click', () => {
                adoptionStatLarge.style.display = 'none';
                sankeyContainer.classList.remove('hidden');
                sankeyContainer.style.display = 'block';
                anime({
                    targets: sankeyContainer,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 500,
                    easing: 'easeOutExpo'
                });
            });

            closeBtn.addEventListener('click', () => {
                sankeyContainer.classList.add('hidden');
                sankeyContainer.style.display = 'none';
                adoptionStatLarge.style.display = 'block';
                anime({
                    targets: adoptionStatLarge,
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    duration: 500,
                    easing: 'easeOutExpo'
                });
            });
        }

        // Timeline interaction
        const timelineButtons = document.querySelectorAll('.timeline-btn');
        timelineButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const period = btn.dataset.period;
                this.updateTimelineContent(period);

                timelineButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Barriers interaction
        document.querySelectorAll('.barrier-category').forEach(category => {
            const header = category.querySelector('.barrier-header');
            const content = category.querySelector('.barrier-content');
            const icon = category.querySelector('.expand-icon');

            header.addEventListener('click', () => {
                const isExpanded = category.classList.contains('expanded');

                // Close all other categories
                document.querySelectorAll('.barrier-category').forEach(cat => {
                    if (cat !== category) {
                        cat.classList.remove('expanded');
                        cat.querySelector('.barrier-content').classList.add('hidden');
                        cat.querySelector('.expand-icon').textContent = '+';
                    }
                });

                if (isExpanded) {
                    category.classList.remove('expanded');
                    content.classList.add('hidden');
                    icon.textContent = '+';
                } else {
                    category.classList.add('expanded');
                    content.classList.remove('hidden');
                    icon.textContent = '×';

                    // Animate barrier bars
                    setTimeout(() => {
                        content.querySelectorAll('.barrier-fill').forEach(fill => {
                            const percent = fill.getAttribute('data-percent');
                            fill.style.width = percent + '%';
                        });
                    }, 200);
                }
            });
        });

        // Recommendation cards interaction
        document.querySelectorAll('.recommendation-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    translateY: -8,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutExpo'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    translateY: 0,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutExpo'
                });
            });
        });
    }

    updateTimelineContent(period) {
        const data = this.data.timeline_data[period];

        if (data) {
            // Update stats with animation
            this.animateCounter('#timelineAdoption', data.adoption, 1000);
            this.animateCounter('#timelineAchievers', data.achievers, 1000, 200);

            // Update challenges list
            const challengesList = document.getElementById('challengesList');
            if (challengesList) {
                // Fade out current content
                anime({
                    targets: challengesList.children,
                    opacity: 0,
                    translateX: -20,
                    duration: 300,
                    complete: () => {
                        challengesList.innerHTML = '';
                        data.challenges.forEach((challenge, index) => {
                            const li = document.createElement('li');
                            li.textContent = challenge;
                            li.style.opacity = '0';
                            li.style.transform = 'translateX(20px)';
                            challengesList.appendChild(li);
                        });

                        // Fade in new content
                        anime({
                            targets: challengesList.children,
                            opacity: [0, 1],
                            translateX: [20, 0],
                            delay: anime.stagger(100),
                            duration: 400,
                            easing: 'easeOutExpo'
                        });
                    }
                });
            }
        }
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIPresentation();
});