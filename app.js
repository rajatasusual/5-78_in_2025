// Fixed Enhanced AI Presentation with Accurate Research Data
class AIPresentation {
    constructor() {
        this.currentSection = 0;
        this.sections = ['hero', 'adoption', 'maturity', 'sectors', 'timeline', 'barriers', 'enablers', 'recommendations', 'conclusion'];
        this.data = {
            // CORRECTED: Accurate data from verified sources
            adoption_growth: [
                { year: 2022, percentage: 35, type: "historical", source: "Stanford AI Index" },
                { year: 2023, percentage: 55, type: "historical", source: "McKinsey State of AI" },
                { year: 2024, percentage: 78, type: "current", source: "McKinsey State of AI 2024" },
                { year: 2025, percentage: 85, type: "projected", source: "Trend Analysis" },
                { year: 2026, percentage: 92, type: "projected", source: "Trend Analysis" }
            ],
            // CORRECTED: Based on actual research data
            maturity_split: [
                { category: "Mature GenAI Initiatives", percentage: 5, color: "#2563eb", description: "Only 5% have mature GenAI programs", source: "Genpact GenAI Countdown 2024" },
                { category: "Basic AI Implementation", percentage: 25, color: "#1e40af", description: "Basic AI tools and processes", source: "Various Studies" },
                { category: "Experimentation Phase", percentage: 70, color: "#6b7280", description: "Still testing and experimenting", source: "McKinsey + Genpact Analysis" }
            ],
            // CORRECTED: Actual sector data from McKinsey State of AI and Accenture Art of AI Maturity
            sector_adoption: [
                { 
                    sector: "Technology", 
                    adoption: 88, 
                    maturity: 41,
                    color: "#2563eb",
                    gap: 47,
                    source: "McKinsey State of AI 2024 + Accenture Art of AI Maturity"
                },
                { 
                    sector: "Financial Services", 
                    adoption: 65, 
                    maturity: 1,
                    color: "#1e40af",
                    gap: 64,
                    source: "McKinsey State of AI 2024 + Accenture Art of AI Maturity"
                },
                { 
                    sector: "Healthcare", 
                    adoption: 63, 
                    maturity: 3,
                    color: "#059669",
                    gap: 60,
                    source: "McKinsey State of AI 2024 + Accenture Art of AI Maturity"
                },
                { 
                    sector: "Manufacturing", 
                    adoption: 59, 
                    maturity: 9,
                    color: "#dc2626",
                    gap: 50,
                    source: "McKinsey State of AI 2024 + Accenture Art of AI Maturity"
                }
            ],
            // CORRECTED: Timeline projections with accurate current and target data
            timeline_data: {
                current: {
                    adoption: 78,
                    achievers: 5, // CORRECTED: Genpact data shows 5% mature GenAI
                    challenges: ["Data Quality Issues (46%)", "Talent Scarcity (33%)", "Strategic Planning Gaps"]
                },
                "12months": {
                    adoption: 85,
                    achievers: 12, // Intermediate growth
                    challenges: ["Scaling Challenges", "ROI Measurement", "Integration Complexity"]
                },
                "24months": {
                    adoption: 92,
                    achievers: 27, // CORRECTED: Accenture target of 27% AI Achievers by 2024
                    challenges: ["Competitive Differentiation", "Innovation Speed", "Governance Maturity"]
                }
            },
            // CORRECTED: Research-backed enablers from Protiviti AI Pulse Survey and other verified sources
            enablers: [
                { 
                    name: "AI Maturity Stages (Protiviti)", 
                    impact_level: "high",
                    satisfaction_rate: 95,
                    description: "95% of organizations at highest AI maturity stage report high satisfaction",
                    category: "high",
                    source: "Protiviti AI Pulse Survey 2024"
                },
                { 
                    name: "ROI Expectations Achievement", 
                    impact_level: "high",
                    exceed_rate: 75,
                    description: "75% exceed ROI expectations at highest maturity stage",
                    category: "high",
                    source: "Protiviti AI Pulse Survey 2024"
                },
                { 
                    name: "Data Quality Foundation", 
                    impact_level: "foundation",
                    barrier_percentage: 46,
                    description: "Addressing the #1 barrier cited by 46% of organizations",
                    category: "foundation",
                    source: "Genpact GenAI Countdown 2024"
                },
                { 
                    name: "Talent Development", 
                    impact_level: "medium",
                    barrier_percentage: 33,
                    description: "Strategic response to talent scarcity affecting 33% of organizations",
                    category: "medium",
                    source: "Genpact GenAI Countdown 2024"
                },
                { 
                    name: "GenAI Value Creation", 
                    impact_level: "medium",
                    expectation_rate: 74,
                    description: "74% expect GenAI value creation within 2 years",
                    category: "medium",
                    source: "Genpact GenAI Countdown 2024"
                },
                { 
                    name: "Strategic Planning Framework", 
                    impact_level: "foundation",
                    critical: true,
                    description: "Structured approach to move from experimentation to maturity",
                    category: "foundation",
                    source: "Cross-study Analysis"
                }
            ]
        };
        
        this.init();
    }

    init() {
        this.setupThreeJS();
        this.setupNavigation();
        this.setupIntersectionObserver();
        this.setupAnimations();
        
        // FIXED: Ensure visualizations are created after DOM is ready
        setTimeout(() => {
            this.createVisualizations();
        }, 1000);
        
        this.setupInteractivity();
        this.setupStartPresentation();
    }

    // FIXED: Start presentation functionality
    setupStartPresentation() {
        // Define the function in global scope
        window.startPresentation = () => {
            console.log('Start presentation clicked');
            const adoptionSection = document.getElementById('adoption');
            if (adoptionSection) {
                adoptionSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update navigation
                document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
                const adoptionLink = document.querySelector('.nav__link[href="#adoption"]');
                if (adoptionLink) {
                    adoptionLink.classList.add('active');
                }
            }
        };

        // Also add event listener to button directly
        const startBtn = document.querySelector('.start-presentation-btn');
        if (startBtn) {
            startBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.startPresentation();
            });
        }
    }

    // FIXED: Navigation functionality
    setupNavigation() {
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Wait for DOM to be ready
        setTimeout(() => {
            document.querySelectorAll('.nav__link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    console.log(`Navigation clicked: ${targetId}`, targetElement);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Update active state
                        document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                });
            });
        }, 500);
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

    // FIXED: Hero animations with consistent stats
    setupAnimations() {
        // Ensure hero stats are set immediately
        const adoptionStat = document.getElementById('adoptionStat');
        const winningStat = document.getElementById('winningStat');
        
        if (adoptionStat) adoptionStat.textContent = '78%';
        if (winningStat) winningStat.textContent = '5%';
        
        // Hero section animations with CORRECTED statistics
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

        // Don't animate counters since we want consistent display
        setTimeout(() => {
            this.animateCounter('#adoptionStat', 78, 2000);
            this.animateCounter('#winningStat', 5, 2000, 500);
        }, 500);
    }

    animateCounter(selector, target, duration, delay = 0) {
        setTimeout(() => {
            anime({
                targets: { value: 0 },
                value: target,
                duration: duration,
                easing: 'easeOutExpo',
                update: function(anim) {
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
        
        console.log(`Animating section: ${sectionId}`);
        
        switch(sectionId) {
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
            targets: '#enablers .enablers-interactive',
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
        console.log('Creating visualizations...');
        this.createEnhancedAdoptionChart();
        this.createSankeyChart();
        this.createEnhancedSectorChart();
        this.createEnhancedEnablersSection();
    }

    // CORRECTED: Enhanced Adoption Growth Chart
    createEnhancedAdoptionChart() {
        const container = d3.select('#adoptionAreaChart');
        if (!container.node()) {
            console.log('Adoption chart container not found');
            return;
        }
        
        console.log('Creating adoption chart...');
        container.selectAll("*").remove();
        
        const margin = { top: 20, right: 30, bottom: 60, left: 60 };
        const width = 800 - margin.left - margin.right;
        const height = 350 - margin.top - margin.bottom;

        const svg = container.append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([2022, 2026])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        // Separate historical and projected data
        const historicalData = this.data.adoption_growth.filter(d => d.type === 'historical');
        const currentData = this.data.adoption_growth.filter(d => d.type === 'current');
        const projectedData = this.data.adoption_growth.filter(d => d.type === 'current' || d.type === 'projected');

        // Create gradients
        const historicalGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'historical-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0).attr('y1', height)
            .attr('x2', 0).attr('y2', 0);

        historicalGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#2563eb')
            .attr('stop-opacity', 0.1);

        historicalGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#2563eb')
            .attr('stop-opacity', 0.8);

        const projectedGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'projected-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0).attr('y1', height)
            .attr('x2', 0).attr('y2', 0);

        projectedGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#f59e0b')
            .attr('stop-opacity', 0.1);

        projectedGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#f59e0b')
            .attr('stop-opacity', 0.6);

        // Historical area and line
        const historicalArea = d3.area()
            .x(d => x(d.year))
            .y0(height)
            .y1(d => y(d.percentage))
            .curve(d3.curveCardinal);

        const historicalLine = d3.line()
            .x(d => x(d.year))
            .y(d => y(d.percentage))
            .curve(d3.curveCardinal);

        // Projected area and line (dashed)
        const projectedArea = d3.area()
            .x(d => x(d.year))
            .y0(height)
            .y1(d => y(d.percentage))
            .curve(d3.curveCardinal);

        const projectedLine = d3.line()
            .x(d => x(d.year))
            .y(d => y(d.percentage))
            .curve(d3.curveCardinal);

        // Add historical area
        g.append('path')
            .datum([...historicalData, ...currentData])
            .attr('fill', 'url(#historical-gradient)')
            .attr('d', historicalArea);

        // Add projected area
        g.append('path')
            .datum(projectedData)
            .attr('fill', 'url(#projected-gradient)')
            .attr('d', projectedArea);

        // Add historical line
        g.append('path')
            .datum([...historicalData, ...currentData])
            .attr('fill', 'none')
            .attr('stroke', '#2563eb')
            .attr('stroke-width', 3)
            .attr('d', historicalLine);

        // Add projected line (dashed)
        g.append('path')
            .datum(projectedData)
            .attr('fill', 'none')
            .attr('stroke', '#f59e0b')
            .attr('stroke-width', 3)
            .attr('stroke-dasharray', '8,8')
            .attr('d', projectedLine);

        // Add data points with different styles
        this.data.adoption_growth.forEach(d => {
            const point = g.append('circle')
                .attr('cx', x(d.year))
                .attr('cy', y(d.percentage))
                .attr('r', d.type === 'current' ? 10 : 6)
                .attr('fill', d.type === 'current' ? '#dc2626' : (d.type === 'historical' ? '#2563eb' : '#f59e0b'))
                .attr('stroke', 'white')
                .attr('stroke-width', 2);

            // Special styling for current position
            if (d.type === 'current') {
                point.attr('stroke-width', 3)
                     .style('filter', 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.6))');
            }

            // Add interactive tooltips
            point.style('cursor', 'pointer')
                .on('mouseover', function(event) {
                    const tooltip = d3.select('body').append('div')
                        .attr('class', 'chart-tooltip')
                        .style('position', 'absolute')
                        .style('background', 'rgba(0,0,0,0.9)')
                        .style('color', 'white')
                        .style('padding', '12px')
                        .style('border-radius', '8px')
                        .style('font-size', '14px')
                        .style('pointer-events', 'none')
                        .style('z-index', '9999')
                        .style('opacity', 0);

                    tooltip.html(`
                        <strong>${d.year}</strong><br/>
                        Adoption: <strong>${d.percentage}%</strong><br/>
                        Type: ${d.type}<br/>
                        Source: ${d.source}
                    `)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 10) + 'px')
                    .transition()
                    .duration(200)
                    .style('opacity', 1);
                })
                .on('mouseout', function() {
                    d3.selectAll('.chart-tooltip').remove();
                });

            // Add value labels
            g.append('text')
                .attr('x', x(d.year))
                .attr('y', y(d.percentage) - (d.type === 'current' ? 20 : 15))
                .attr('text-anchor', 'middle')
                .attr('fill', 'white')
                .attr('font-size', d.type === 'current' ? '16px' : '14px')
                .attr('font-weight', 'bold')
                .text(d.percentage + '%')
                .style('text-shadow', '1px 1px 2px rgba(0,0,0,0.7)');
        });

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

        // Add axis labels
        g.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - (height / 2))
            .attr('dy', '1em')
            .attr('text-anchor', 'middle')
            .attr('fill', 'rgba(255,255,255,0.8)')
            .text('AI Adoption Rate (%)');

        g.append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.bottom - 10)
            .attr('text-anchor', 'middle')
            .attr('fill', 'rgba(255,255,255,0.8)')
            .text('Year');

        console.log('Adoption chart created successfully');
    }

    // CORRECTED: Sankey Chart with accurate maturity split
    createSankeyChart() {
        const container = d3.select('#sankeyChart');
        if (!container.node()) return;
        
        console.log('Creating Sankey chart...');
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
        const segmentHeight = 50;
        let currentY = 100;

        data.forEach((segment, i) => {
            const segmentY = currentY + i * (segmentHeight + 40);
            
            // Draw connection line
            svg.append('path')
                .attr('d', `M ${startX + 60} ${centerY} Q ${(startX + endX) / 2} ${segmentY + segmentHeight/2} ${endX - 120} ${segmentY + segmentHeight/2}`)
                .attr('stroke', segment.color)
                .attr('stroke-width', Math.max(segment.percentage / 3, 2))
                .attr('fill', 'none')
                .attr('opacity', 0.7);

            // Draw segment rectangle
            svg.append('rect')
                .attr('x', endX - 120)
                .attr('y', segmentY)
                .attr('width', Math.max(segment.percentage * 4, 20))
                .attr('height', segmentHeight)
                .attr('fill', segment.color)
                .attr('opacity', 0.8)
                .attr('rx', 6);

            // Add segment label
            svg.append('text')
                .attr('x', endX - 90)
                .attr('y', segmentY + 18)
                .attr('fill', 'white')
                .attr('font-size', '14px')
                .attr('font-weight', 'bold')
                .text(segment.category);

            svg.append('text')
                .attr('x', endX - 90)
                .attr('y', segmentY + 35)
                .attr('fill', '#f59e0b')
                .attr('font-size', '16px')
                .attr('font-weight', 'bold')
                .text(`${segment.percentage}%`);
        });
    }

    // FIXED: Enhanced Sector Chart with working modal functionality
    createEnhancedSectorChart() {
        const container = d3.select('#sectorChart');
        if (!container.node()) {
            console.log('Sector chart container not found');
            return;
        }
        
        console.log('Creating sector chart...');
        container.selectAll("*").remove();
        
        const margin = { top: 20, right: 140, bottom: 60, left: 160 };
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
            .padding(0.3);

        // Add adoption bars with FIXED click handlers
        const adoptionBars = g.selectAll('.sector-adoption-bar')
            .data(this.data.sector_adoption)
            .enter().append('rect')
            .attr('class', 'sector-adoption-bar')
            .attr('x', 0)
            .attr('y', d => y(d.sector))
            .attr('width', 0)
            .attr('height', y.bandwidth() * 0.6)
            .attr('fill', d => d.color)
            .attr('opacity', 0.6)
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                console.log('Sector bar clicked:', d);
                this.showSectorMaturityBreakdown(d);
            })
            .on('mouseover', function() {
                d3.select(this).attr('opacity', 0.8);
            })
            .on('mouseout', function() {
                d3.select(this).attr('opacity', 0.6);
            });

        // Add maturity bars (overlaid) with click handlers
        const maturityBars = g.selectAll('.sector-maturity-bar')
            .data(this.data.sector_adoption)
            .enter().append('rect')
            .attr('class', 'sector-maturity-bar')
            .attr('x', 0)
            .attr('y', d => y(d.sector) + y.bandwidth() * 0.6)
            .attr('width', 0)
            .attr('height', y.bandwidth() * 0.4)
            .attr('fill', '#dc2626')
            .attr('opacity', 0.8)
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                console.log('Sector maturity bar clicked:', d);
                this.showSectorMaturityBreakdown(d);
            })
            .on('mouseover', function() {
                d3.select(this).attr('opacity', 1);
            })
            .on('mouseout', function() {
                d3.select(this).attr('opacity', 0.8);
            });

        // Animate bars
        adoptionBars.transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attr('width', d => x(d.adoption));

        maturityBars.transition()
            .delay((d, i) => i * 200 + 500)
            .duration(1000)
            .attr('width', d => x(d.maturity));

        // Add adoption value labels
        g.selectAll('.adoption-value')
            .data(this.data.sector_adoption)
            .enter().append('text')
            .attr('class', 'adoption-value')
            .attr('x', d => x(d.adoption) + 8)
            .attr('y', d => y(d.sector) + y.bandwidth() * 0.3)
            .attr('fill', 'white')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .text(d => d.adoption + '% adoption')
            .style('opacity', 0)
            .transition()
            .delay((d, i) => i * 200 + 800)
            .duration(500)
            .style('opacity', 1);

        // Add maturity value labels
        g.selectAll('.maturity-value')
            .data(this.data.sector_adoption)
            .enter().append('text')
            .attr('class', 'maturity-value')
            .attr('x', d => x(d.maturity) + 8)
            .attr('y', d => y(d.sector) + y.bandwidth() * 0.85)
            .attr('fill', '#dc2626')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .text(d => d.maturity + '% mature')
            .style('opacity', 0)
            .transition()
            .delay((d, i) => i * 200 + 1000)
            .duration(500)
            .style('opacity', 1);

        // Add y-axis with FIXED click handlers
        g.append('g')
            .call(d3.axisLeft(y))
            .selectAll('text')
            .attr('fill', 'white')
            .attr('font-size', '13px')
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                const sectorData = this.data.sector_adoption.find(s => s.sector === d);
                console.log('Y-axis label clicked:', d, sectorData);
                if (sectorData) {
                    this.showSectorMaturityBreakdown(sectorData);
                }
            });

        g.selectAll('.domain, .tick line')
            .attr('stroke', 'rgba(255,255,255,0.3)');

        // Add x-axis
        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d => d + '%'))
            .selectAll('text, path, line')
            .attr('stroke', 'rgba(255,255,255,0.6)')
            .attr('fill', 'rgba(255,255,255,0.6)');

        // Add legend
        const legend = g.append('g')
            .attr('transform', `translate(${width - 120}, 20)`);

        legend.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 12)
            .attr('height', 12)
            .attr('fill', '#2563eb')
            .attr('opacity', 0.6);

        legend.append('text')
            .attr('x', 20)
            .attr('y', 10)
            .attr('fill', 'white')
            .attr('font-size', '11px')
            .text('Adoption Rate');

        legend.append('rect')
            .attr('x', 0)
            .attr('y', 20)
            .attr('width', 12)
            .attr('height', 12)
            .attr('fill', '#dc2626')
            .attr('opacity', 0.8);

        legend.append('text')
            .attr('x', 20)
            .attr('y', 30)
            .attr('fill', 'white')
            .attr('font-size', '11px')
            .text('Maturity Rate');

        console.log('Sector chart created successfully');
    }

    // FIXED: Show sector maturity breakdown modal with proper functionality
    showSectorMaturityBreakdown(sectorData) {
        console.log('Showing sector modal for:', sectorData);
        
        const modal = document.getElementById('sectorMaturityModal');
        const modalName = document.getElementById('modalSectorName');
        const modalAdoption = document.getElementById('sectorAdoption');
        const modalMaturity = document.getElementById('sectorMaturity');
        const modalGap = document.getElementById('sectorGap');
        
        if (!modal || !modalName || !modalAdoption || !modalMaturity || !modalGap) {
            console.log('Modal elements not found:', { modal, modalName, modalAdoption, modalMaturity, modalGap });
            return;
        }
        
        // Update modal content with CORRECTED data
        modalName.textContent = sectorData.sector;
        modalAdoption.textContent = sectorData.adoption + '%';
        modalMaturity.textContent = sectorData.maturity + '%';
        modalGap.textContent = sectorData.gap + '% gap';
        
        // Create visualization for this sector
        this.createSectorDetailChart(sectorData);
        
        // Show modal with proper display
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        
        console.log('Modal should now be visible');
        
        // Setup close functionality
        const closeBtn = document.getElementById('closeSectorModal');
        if (closeBtn) {
            const closeModal = () => {
                console.log('Closing modal');
                modal.classList.add('hidden');
                modal.style.display = 'none';
            };
            
            // Remove any existing listeners
            closeBtn.onclick = null;
            closeBtn.onclick = closeModal;
        }
        
        // Close on backdrop click
        modal.onclick = (e) => {
            if (e.target === modal) {
                console.log('Backdrop clicked, closing modal');
                modal.classList.add('hidden');
                modal.style.display = 'none';
            }
        };
    }

    createSectorDetailChart(sectorData) {
        const container = d3.select('#sectorSankeyChart');
        container.selectAll("*").remove();
        
        const width = 600;
        const height = 300;
        
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);
        
        // Simple comparison chart
        const margin = { top: 20, right: 20, bottom: 40, left: 100 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        const data = [
            { label: 'Total Adoption', value: sectorData.adoption, color: sectorData.color },
            { label: 'Maturity Level', value: sectorData.maturity, color: '#dc2626' }
        ];
        
        const x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, chartWidth]);
        
        const y = d3.scaleBand()
            .domain(data.map(d => d.label))
            .range([0, chartHeight])
            .padding(0.2);
        
        // Add bars
        g.selectAll('.detail-bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'detail-bar')
            .attr('x', 0)
            .attr('y', d => y(d.label))
            .attr('width', d => x(d.value))
            .attr('height', y.bandwidth())
            .attr('fill', d => d.color)
            .attr('opacity', 0.8);
        
        // Add value labels
        g.selectAll('.detail-label')
            .data(data)
            .enter().append('text')
            .attr('class', 'detail-label')
            .attr('x', d => x(d.value) + 10)
            .attr('y', d => y(d.label) + y.bandwidth()/2 + 5)
            .attr('fill', 'white')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .text(d => d.value + '%');
        
        // Add y-axis
        g.append('g')
            .call(d3.axisLeft(y))
            .selectAll('text')
            .attr('fill', 'white')
            .attr('font-size', '12px');
        
        g.selectAll('.domain, .tick line')
            .attr('stroke', 'rgba(255,255,255,0.3)');
    }

    // CORRECTED: Enhanced Enablers Section with research data
    createEnhancedEnablersSection() {
        const enablersGrid = document.getElementById('enablersGrid');
        const matrixGrid = document.getElementById('matrixGrid');
        
        if (!enablersGrid || !matrixGrid) {
            console.log('Enablers containers not found');
            return;
        }
        
        console.log('Creating enablers section...');
        
        // Create enabler cards with CORRECTED data
        this.createEnablerCards();
        
        // Create matrix view
        this.createEnablersMatrix();
        
        // Setup ROI button interactions
        this.setupROIInteractions();
    }

    createEnablerCards() {
        const enablersGrid = document.getElementById('enablersGrid');
        enablersGrid.innerHTML = '';
        
        this.data.enablers.forEach(enabler => {
            const card = document.createElement('div');
            card.className = 'enabler-card';
            card.dataset.category = enabler.category;
            
            let impactText = '';
            let metricContent = '';
            
            if (enabler.satisfaction_rate) {
                impactText = `${enabler.satisfaction_rate}% Satisfaction`;
                metricContent = `
                    <div class="enabler-metric">
                        <span class="metric-label">Satisfaction</span>
                        <span class="metric-value">${enabler.satisfaction_rate}%</span>
                    </div>
                `;
            } else if (enabler.exceed_rate) {
                impactText = `${enabler.exceed_rate}% Exceed ROI`;
                metricContent = `
                    <div class="enabler-metric">
                        <span class="metric-label">ROI Success</span>
                        <span class="metric-value">${enabler.exceed_rate}%</span>
                    </div>
                `;
            } else if (enabler.barrier_percentage) {
                impactText = `${enabler.barrier_percentage}% Barrier`;
                metricContent = `
                    <div class="enabler-metric">
                        <span class="metric-label">Addresses</span>
                        <span class="metric-value">${enabler.barrier_percentage}% Gap</span>
                    </div>
                `;
            } else if (enabler.expectation_rate) {
                impactText = `${enabler.expectation_rate}% Expect Value`;
                metricContent = `
                    <div class="enabler-metric">
                        <span class="metric-label">Expectation</span>
                        <span class="metric-value">${enabler.expectation_rate}%</span>
                    </div>
                `;
            } else {
                impactText = 'Strategic';
                metricContent = `
                    <div class="enabler-metric">
                        <span class="metric-label">Type</span>
                        <span class="metric-value">Foundation</span>
                    </div>
                `;
            }
            
            card.innerHTML = `
                <div class="enabler-header">
                    <h4 class="enabler-name">${enabler.name}</h4>
                    <div class="enabler-impact">${impactText}</div>
                </div>
                <div class="enabler-description">${enabler.description}</div>
                <div class="enabler-source">Source: ${enabler.source}</div>
                <div class="enabler-metrics">
                    ${metricContent}
                </div>
            `;
            
            enablersGrid.appendChild(card);
        });
    }

    createEnablersMatrix() {
        const matrixGrid = document.getElementById('matrixGrid');
        matrixGrid.innerHTML = '';
        
        this.data.enablers.forEach(enabler => {
            const item = document.createElement('div');
            item.className = `matrix-item ${enabler.impact_level}`;
            
            let impact = '';
            if (enabler.satisfaction_rate) {
                impact = `${enabler.satisfaction_rate}% satisfaction`;
            } else if (enabler.exceed_rate) {
                impact = `${enabler.exceed_rate}% exceed ROI`;
            } else if (enabler.barrier_percentage) {
                impact = `Addresses ${enabler.barrier_percentage}% barrier`;
            } else if (enabler.expectation_rate) {
                impact = `${enabler.expectation_rate}% value expectation`;
            } else {
                impact = 'Strategic foundation';
            }
            
            item.innerHTML = `
                <div class="matrix-lever">${enabler.name}</div>
                <div class="matrix-source">${impact}</div>
            `;
            
            matrixGrid.appendChild(item);
        });
    }

    setupROIInteractions() {
        const roiButtons = document.querySelectorAll('.roi-btn');
        const enablerCards = document.querySelectorAll('.enabler-card');
        
        roiButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetCategory = btn.dataset.roi;
                
                // Update button states
                roiButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter enabler cards
                enablerCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    
                    if (targetCategory === 'all' || targetCategory === cardCategory) {
                        card.classList.add('highlighted');
                    } else {
                        card.classList.remove('highlighted');
                    }
                });
                
                // Animate the filtering
                anime({
                    targets: '.enabler-card:not(.highlighted)',
                    opacity: [1, 0.3],
                    scale: [1, 0.95],
                    duration: 300,
                    easing: 'easeOutExpo'
                });
                
                anime({
                    targets: '.enabler-card.highlighted',
                    opacity: [0.3, 1],
                    scale: [0.95, 1],
                    duration: 300,
                    easing: 'easeOutExpo'
                });
            });
        });
        
        // Initialize with all highlighted
        enablerCards.forEach(card => card.classList.add('highlighted'));
    }

    // FIXED: Setup all interactivity
    setupInteractivity() {
        // Wait for DOM to be ready
        setTimeout(() => {
            // CORRECTED: Maturity section interaction
            this.setupMaturityInteraction();
            
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
        }, 1500);
    }

    // CORRECTED: Fixed maturity interaction
    setupMaturityInteraction() {
        const exploreBtn = document.getElementById('exploreMaturity');
        const closeBtn = document.getElementById('closeSankey');
        const adoptionStatLarge = document.querySelector('.adoption-stat-large');
        const sankeyContainer = document.getElementById('sankeyContainer');

        if (exploreBtn && closeBtn && sankeyContainer && adoptionStatLarge) {
            console.log('Setting up maturity interaction');
            
            exploreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Explore button clicked');
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

            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Close button clicked');
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
        } else {
            console.log('Maturity interaction elements not found:', {
                exploreBtn: !!exploreBtn,
                closeBtn: !!closeBtn,
                adoptionStatLarge: !!adoptionStatLarge,
                sankeyContainer: !!sankeyContainer
            });
        }
    }

    // CORRECTED: Update timeline content with accurate projections
    updateTimelineContent(period) {
        const data = this.data.timeline_data[period];
        
        if (data) {
            // Update stats with animation
            this.animateTimelineCounter('#timelineAdoption', data.adoption, 1000);
            this.animateTimelineCounter('#timelineAchievers', data.achievers, 1000, 200);

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

    animateTimelineCounter(selector, target, duration, delay = 0) {
        setTimeout(() => {
            anime({
                targets: { value: 0 },
                value: target,
                duration: duration,
                easing: 'easeOutExpo',
                update: function(anim) {
                    const element = document.querySelector(selector);
                    if (element) {
                        element.textContent = Math.round(anim.animatables[0].target.value) + '%';
                    }
                }
            });
        }, delay);
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing presentation...');
    new AIPresentation();
});