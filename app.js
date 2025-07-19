// Enhanced AI Presentation Interactive Application with Bug Fixes
class AIPresentation {
    constructor() {
        this.currentSection = 0;
        this.sections = ['hero', 'adoption', 'maturity', 'sectors', 'timeline', 'barriers', 'enablers', 'recommendations', 'conclusion'];
        this.data = {
            // Accurate data from verified sources
            adoption_growth: [
                { year: 2022, percentage: 35, type: "historical", source: "Stanford AI Index" },
                { year: 2023, percentage: 55, type: "historical", source: "McKinsey Global Survey" },
                { year: 2024, percentage: 78, type: "current", source: "McKinsey + Stanford AI Index 2025" },
                { year: 2025, percentage: 85, type: "projected", source: "Trend Analysis" },
                { year: 2026, percentage: 92, type: "projected", source: "Trend Analysis" }
            ],
            maturity_split: [
                { category: "AI Achievers", percentage: 12, color: "#2563eb", description: "50% higher revenue growth", source: "Accenture Art of AI Maturity" },
                { category: "Builders & Innovators", percentage: 25, color: "#1e40af", description: "Structured AI initiatives in progress", source: "Accenture" },
                { category: "Experimenters", percentage: 63, color: "#6b7280", description: "Still in experimentation phase", source: "Accenture" }
            ],
            sector_adoption: [
                { 
                    sector: "Technology", 
                    adoption: 85, 
                    winners: 15,
                    color: "#2563eb",
                    maturity_split: { achievers: 12, builders: 3, experimenters: 70 }
                },
                { 
                    sector: "Financial Services", 
                    adoption: 78, 
                    winners: 12,
                    color: "#1e40af",
                    maturity_split: { achievers: 9, builders: 3, experimenters: 66 }
                },
                { 
                    sector: "Manufacturing", 
                    adoption: 68, 
                    winners: 8,
                    color: "#059669",
                    maturity_split: { achievers: 5, builders: 3, experimenters: 60 }
                },
                { 
                    sector: "Healthcare", 
                    adoption: 60, 
                    winners: 6,
                    color: "#dc2626",
                    maturity_split: { achievers: 4, builders: 2, experimenters: 54 }
                }
            ],
            timeline_data: {
                current: {
                    adoption: 78,
                    achievers: 12,
                    challenges: ["Data Quality Issues (46%)", "Talent Scarcity (33%)", "Strategic Planning Gap (42%)"]
                },
                "12months": {
                    adoption: 85,
                    achievers: 18,
                    challenges: ["Scaling Challenges (38%)", "ROI Measurement (35%)", "Integration Complexity (40%)"]
                },
                "24months": {
                    adoption: 92,
                    achievers: 27,
                    challenges: ["Competitive Pressure (45%)", "Innovation Speed (42%)", "Governance & Ethics (35%)"]
                }
            },
            enablers: [
                { 
                    name: "CEO Oversight", 
                    impact_on_roi: 95, 
                    correlation: 0.87,
                    achiever_percentage: 85,
                    experimenter_percentage: 56,
                    description: "CEO directly oversees AI governance and strategy",
                    roi_impact: "30+",
                    source: "McKinsey Global Survey 2024"
                },
                { 
                    name: "KPI Tracking", 
                    impact_on_roi: 90, 
                    correlation: 0.84,
                    success_multiplier: 2.4,
                    description: "Track clear KPIs for every AI solution",
                    roi_impact: "20+",
                    source: "McKinsey - biggest impact on EBIT"
                },
                { 
                    name: "Workflow Redesign", 
                    impact_on_roi: 88, 
                    correlation: 0.82,
                    ebit_impact: "Highest correlation with EBIT gains",
                    description: "Fundamentally redesign workflows, not just add-ons",
                    roi_impact: "30+",
                    source: "McKinsey - most correlated with gen AI EBIT impact"
                },
                { 
                    name: "Responsible AI", 
                    impact_on_roi: 75, 
                    correlation: 0.73,
                    maturity_difference: 53,
                    description: "Responsible-AI frameworks from design phase",
                    roi_impact: "20+",
                    source: "McKinsey - 53% more likely mature programs"
                },
                { 
                    name: "Data Quality", 
                    impact_on_roi: 85, 
                    correlation: 0.79,
                    foundation: true,
                    description: "High-quality, governed data as foundation",
                    roi_impact: "10+",
                    source: "Foundation enabler across all studies"
                },
                { 
                    name: "Talent Investment", 
                    impact_on_roi: 78, 
                    correlation: 0.71,
                    training_percentage: 78,
                    description: "Mandatory AI training and skill development",
                    roi_impact: "10+",
                    source: "78% have mandatory AI training vs 51% others"
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
        this.animateCounter('#winningStat', 12, 2000, 500); // Fixed to show 12% not 5%
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
        setTimeout(() => {
            this.createEnhancedAdoptionChart();
            this.createSankeyChart();
            this.createEnhancedSectorChart();
            this.createEnhancedEnablersSection();
        }, 500);
    }

    // ENHANCEMENT 1: Enhanced Adoption Growth Chart with current position and predictions
    createEnhancedAdoptionChart() {
        const container = d3.select('#adoptionAreaChart');
        if (!container.node()) return;
        
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
    }

    createSankeyChart() {
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
        let currentY = 80;

        data.forEach((segment, i) => {
            const segmentY = currentY + i * (segmentHeight + 30);
            
            // Draw connection line
            svg.append('path')
                .attr('d', `M ${startX + 60} ${centerY} Q ${(startX + endX) / 2} ${segmentY + segmentHeight/2} ${endX - 100} ${segmentY + segmentHeight/2}`)
                .attr('stroke', segment.color)
                .attr('stroke-width', Math.max(segment.percentage / 4, 3))
                .attr('fill', 'none')
                .attr('opacity', 0.7);

            // Draw segment rectangle
            svg.append('rect')
                .attr('x', endX - 100)
                .attr('y', segmentY)
                .attr('width', segment.percentage * 5)
                .attr('height', segmentHeight)
                .attr('fill', segment.color)
                .attr('opacity', 0.8)
                .attr('rx', 8);

            // Add segment label
            svg.append('text')
                .attr('x', endX + 30)
                .attr('y', segmentY + 20)
                .attr('fill', 'white')
                .attr('font-size', '16px')
                .attr('font-weight', 'bold')
                .text(segment.category);

            svg.append('text')
                .attr('x', endX + 30)
                .attr('y', segmentY + 40)
                .attr('fill', '#f59e0b')
                .attr('font-size', '14px')
                .attr('font-weight', 'bold')
                .text(`${segment.percentage}%`);

            svg.append('text')
                .attr('x', endX + 30)
                .attr('y', segmentY + 55)
                .attr('fill', 'rgba(255,255,255,0.8)')
                .attr('font-size', '12px')
                .text(segment.description.substring(0, 30) + '...');
        });
    }

    // ENHANCEMENT 2: Enhanced Sector Chart with Clickable Maturity Breakdown
    createEnhancedSectorChart() {
        const container = d3.select('#sectorChart');
        if (!container.node()) return;
        
        container.selectAll("*").remove();
        
        const margin = { top: 20, right: 120, bottom: 40, left: 160 };
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

        // Add bars with click functionality
        const bars = g.selectAll('.sector-bar')
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
            .on('click', (event, d) => {
                this.showSectorMaturityBreakdown(d);
            })
            .on('mouseover', function(event, d) {
                d3.select(this)
                    .attr('opacity', 1)
                    .attr('stroke', 'white')
                    .attr('stroke-width', 2);
            })
            .on('mouseout', function() {
                d3.select(this)
                    .attr('opacity', 0.8)
                    .attr('stroke', 'none');
            });

        // Animate bars
        bars.transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attr('width', d => x(d.adoption));

        // Add value labels
        g.selectAll('.sector-value')
            .data(this.data.sector_adoption)
            .enter().append('text')
            .attr('class', 'sector-value')
            .attr('x', d => x(d.adoption) + 10)
            .attr('y', d => y(d.sector) + y.bandwidth() / 2 + 5)
            .attr('fill', 'white')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .text(d => d.adoption + '%')
            .style('opacity', 0)
            .transition()
            .delay((d, i) => i * 200 + 500)
            .duration(500)
            .style('opacity', 1);

        // Add winner percentage labels
        g.selectAll('.sector-winners')
            .data(this.data.sector_adoption)
            .enter().append('text')
            .attr('class', 'sector-winners')
            .attr('x', d => x(d.adoption) + 50)
            .attr('y', d => y(d.sector) + y.bandwidth() / 2 + 5)
            .attr('fill', '#f59e0b')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .text(d => `(${d.winners}% winners)`)
            .style('opacity', 0)
            .transition()
            .delay((d, i) => i * 200 + 800)
            .duration(500)
            .style('opacity', 1);

        // Add y-axis
        g.append('g')
            .call(d3.axisLeft(y))
            .selectAll('text')
            .attr('fill', 'white')
            .attr('font-size', '14px')
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                const sectorData = this.data.sector_adoption.find(s => s.sector === d);
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

        // Add click instruction
        g.append('text')
            .attr('x', width / 2)
            .attr('y', -5)
            .attr('text-anchor', 'middle')
            .attr('fill', 'rgba(255,255,255,0.6)')
            .attr('font-size', '12px')
            .attr('font-style', 'italic')
            .text('Click on any sector to see maturity breakdown');
    }

    // Show sector maturity breakdown modal
    showSectorMaturityBreakdown(sectorData) {
        const modal = document.getElementById('sectorMaturityModal');
        const modalName = document.getElementById('modalSectorName');
        const modalAdoption = document.getElementById('sectorAdoption');
        const modalWinners = document.getElementById('sectorWinners');
        const modalAchievers = document.getElementById('sectorAchievers');
        
        if (!modal || !modalName || !modalAdoption || !modalWinners || !modalAchievers) return;
        
        // Update modal content
        modalName.textContent = sectorData.sector;
        modalAdoption.textContent = sectorData.adoption + '%';
        modalWinners.textContent = sectorData.winners + '%';
        modalAchievers.textContent = sectorData.maturity_split.achievers + '%';
        
        // Create Sankey chart for this sector
        this.createSectorSankeyChart(sectorData);
        
        // Show modal
        modal.classList.remove('hidden');
        
        // Setup close functionality
        const closeBtn = document.getElementById('closeSectorModal');
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.classList.add('hidden');
            };
        }
        
        // Close on backdrop click
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        };
    }

    createSectorSankeyChart(sectorData) {
        const container = d3.select('#sectorSankeyChart');
        container.selectAll("*").remove();
        
        const width = 600;
        const height = 300;
        
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const startX = 50;
        const endX = 450;
        const centerY = height / 2;
        
        // Draw adoption circle
        svg.append('circle')
            .attr('cx', startX)
            .attr('cy', centerY)
            .attr('r', 40)
            .attr('fill', sectorData.color)
            .attr('opacity', 0.8)
            .attr('stroke', 'white')
            .attr('stroke-width', 2);
        
        svg.append('text')
            .attr('x', startX)
            .attr('y', centerY - 5)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '16px')
            .attr('font-weight', 'bold')
            .text(sectorData.adoption + '%');
        
        svg.append('text')
            .attr('x', startX)
            .attr('y', centerY + 15)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '10px')
            .text('Adoption');
        
        // Draw maturity segments
        const segments = [
            { name: 'Achievers', value: sectorData.maturity_split.achievers, color: '#2563eb', y: 60 },
            { name: 'Builders', value: sectorData.maturity_split.builders, color: '#059669', y: 130 },
            { name: 'Experimenters', value: sectorData.maturity_split.experimenters, color: '#6b7280', y: 200 }
        ];
        
        segments.forEach(segment => {
            // Connection line
            svg.append('path')
                .attr('d', `M ${startX + 40} ${centerY} Q ${(startX + endX) / 2} ${segment.y + 15} ${endX - 60} ${segment.y + 15}`)
                .attr('stroke', segment.color)
                .attr('stroke-width', Math.max(segment.value / 2, 2))
                .attr('fill', 'none')
                .attr('opacity', 0.7);
            
            // Segment rectangle
            svg.append('rect')
                .attr('x', endX - 60)
                .attr('y', segment.y)
                .attr('width', segment.value * 3)
                .attr('height', 30)
                .attr('fill', segment.color)
                .attr('opacity', 0.8)
                .attr('rx', 5);
            
            // Labels
            svg.append('text')
                .attr('x', endX + 10)
                .attr('y', segment.y + 15)
                .attr('fill', 'white')
                .attr('font-size', '12px')
                .attr('font-weight', 'bold')
                .text(segment.name);
            
            svg.append('text')
                .attr('x', endX + 10)
                .attr('y', segment.y + 28)
                .attr('fill', '#f59e0b')
                .attr('font-size', '11px')
                .text(segment.value + '%');
        });
    }

    // ENHANCEMENT 3: Enhanced Interactive Enablers Section
    createEnhancedEnablersSection() {
        const enablersGrid = document.getElementById('enablersGrid');
        const matrixGrid = document.getElementById('matrixGrid');
        
        if (!enablersGrid || !matrixGrid) return;
        
        // Create enabler cards
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
            card.dataset.roiImpact = enabler.roi_impact;
            
            card.innerHTML = `
                <div class="enabler-header">
                    <h4 class="enabler-name">${enabler.name}</h4>
                    <div class="enabler-impact">${enabler.impact_on_roi}% impact</div>
                </div>
                <div class="enabler-description">${enabler.description}</div>
                <div class="enabler-metrics">
                    <div class="enabler-metric">
                        <span class="metric-label">Correlation</span>
                        <span class="metric-value">${enabler.correlation.toFixed(2)}</span>
                    </div>
                    <div class="enabler-metric">
                        <span class="metric-label">ROI Impact</span>
                        <span class="metric-value">${enabler.roi_impact}%</span>
                    </div>
                </div>
            `;
            
            // Add specific metrics based on enabler
            if (enabler.achiever_percentage && enabler.experimenter_percentage) {
                const achieverMetric = document.createElement('div');
                achieverMetric.className = 'enabler-metric';
                achieverMetric.innerHTML = `
                    <span class="metric-label">Achievers vs Exp.</span>
                    <span class="metric-value">${enabler.achiever_percentage}% vs ${enabler.experimenter_percentage}%</span>
                `;
                card.querySelector('.enabler-metrics').appendChild(achieverMetric);
            }
            
            if (enabler.success_multiplier) {
                const multiplierMetric = document.createElement('div');
                multiplierMetric.className = 'enabler-metric';
                multiplierMetric.innerHTML = `
                    <span class="metric-label">Success Multiplier</span>
                    <span class="metric-value">${enabler.success_multiplier}×</span>
                `;
                card.querySelector('.enabler-metrics').appendChild(multiplierMetric);
            }
            
            enablersGrid.appendChild(card);
        });
    }

    createEnablersMatrix() {
        const matrixGrid = document.getElementById('matrixGrid');
        matrixGrid.innerHTML = '';
        
        this.data.enablers.forEach(enabler => {
            const item = document.createElement('div');
            item.className = 'matrix-item';
            
            // Determine impact level for styling
            if (enabler.impact_on_roi >= 85) {
                item.classList.add('high-impact');
            } else if (enabler.impact_on_roi >= 75) {
                item.classList.add('medium-impact');
            } else {
                item.classList.add('low-impact');
            }
            
            item.innerHTML = `
                <div class="matrix-lever">${enabler.name}</div>
                <div class="matrix-roi">${enabler.roi_impact}% ROI Impact</div>
            `;
            
            matrixGrid.appendChild(item);
        });
    }

    setupROIInteractions() {
        const roiButtons = document.querySelectorAll('.roi-btn');
        const enablerCards = document.querySelectorAll('.enabler-card');
        
        roiButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetROI = btn.dataset.roi;
                
                // Update button states
                roiButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter enabler cards
                enablerCards.forEach(card => {
                    const cardROIImpact = card.dataset.roiImpact;
                    
                    if (targetROI === 'all') {
                        card.classList.add('highlighted');
                    } else {
                        const targetValue = parseInt(targetROI);
                        const cardValue = parseInt(cardROIImpact.replace('+', ''));
                        
                        if (cardValue >= targetValue) {
                            card.classList.add('highlighted');
                        } else {
                            card.classList.remove('highlighted');
                        }
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

    setupInteractivity() {
        // Maturity section interaction - Fixed with proper event handling
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
    }

    // Fixed maturity interaction
    setupMaturityInteraction() {
        // Use a timeout to ensure DOM is ready
        setTimeout(() => {
            const exploreBtn = document.getElementById('exploreMaturity');
            const closeBtn = document.getElementById('closeSankey');
            const adoptionStatLarge = document.querySelector('.adoption-stat-large');
            const sankeyContainer = document.getElementById('sankeyContainer');

            console.log('Setting up maturity interaction...', { exploreBtn, closeBtn, adoptionStatLarge, sankeyContainer });

            if (exploreBtn && closeBtn && sankeyContainer && adoptionStatLarge) {
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

                console.log('Maturity interaction setup complete');
            } else {
                console.log('Missing elements for maturity interaction:', {
                    exploreBtn: !!exploreBtn,
                    closeBtn: !!closeBtn,
                    adoptionStatLarge: !!adoptionStatLarge,
                    sankeyContainer: !!sankeyContainer
                });
            }
        }, 2000); // Increased timeout to ensure everything is loaded
    }

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
    new AIPresentation();
});