// AI Presentation Interactive Application
class AIPresentation {
    constructor() {
        this.currentSection = 0;
        this.sections = ['hero', 'introduction', 'forecast', 'barriers', 'enablers', 'recommendations'];
        this.data = {
            adoption_growth: [
                { year: 2022, percentage: 55 },
                { year: 2023, percentage: 72 },
                { year: 2024, percentage: 78 }
            ],
            maturity_split: [
                { category: "AI Achievers", percentage: 12, color: "#1FB8CD" },
                { category: "Progressing", percentage: 25, color: "#FFC185" },
                { category: "Experimenters", percentage: 63, color: "#B4413C" }
            ],
            enablers: [
                { practice: "Track clear KPIs for every AI solution", impact: "Largest EBIT impact" },
                { practice: "Defined scaling roadmap across BUs", impact: "Doubles chance of payoff" },
                { practice: "C-suite governance (CEO directly oversees AI)", impact: "Strongest EBIT lever in large enterprises" },
                { practice: "Workflow redesign not just app add-ons", impact: "47% more projects beat ROI targets" },
                { practice: "Central-plus-hub talent model", impact: "Higher ROI and faster iteration" }
            ]
        };
        
        this.init();
    }

    init() {
        this.setupThreeJS();
        this.setupNavigation(); // Move this before other setups
        this.setupIntersectionObserver();
        this.setupAnimations();
        this.createVisualizations();
        this.setupInteractivity();
    }

    // Navigation setup - Fixed version
    setupNavigation() {
        // Add smooth scrolling behavior to html
        document.documentElement.style.scrollBehavior = 'smooth';
        
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calculate offset to account for fixed nav
                    const navHeight = 80;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active state immediately
                    document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
    }

    // Three.js 3D Background
    setupThreeJS() {
        const container = document.getElementById('heroBackground');
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);

        // Create floating geometric shapes
        this.createFloatingShapes();
        
        // Camera position
        this.camera.position.z = 5;
        
        // Animation loop
        this.animateThreeJS();
        
        // Handle resize
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

        const colors = [0x1FB8CD, 0xFFC185, 0xB4413C, 0x5D878F];

        for (let i = 0; i < 50; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.6,
                wireframe: Math.random() > 0.5
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            
            // Random position
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 20;
            mesh.position.z = (Math.random() - 0.5) * 10;
            
            // Random rotation
            mesh.rotation.x = Math.random() * 2 * Math.PI;
            mesh.rotation.y = Math.random() * 2 * Math.PI;
            
            // Store original position for animation
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
        
        // Animate shapes
        this.shapes.forEach(shape => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;
            
            // Floating motion
            const time = Date.now() * 0.001;
            shape.position.y = shape.userData.originalPosition.y + Math.sin(time + shape.position.x) * 0.5;
        });
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Intersection Observer for scroll animations
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
            rootMargin: '-80px 0px -80px 0px' // Account for fixed nav
        });

        // Observe all sections
        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) observer.observe(section);
        });

        // Progress bar
        window.addEventListener('scroll', () => this.updateProgressBar());
    }

    updateProgressBar() {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('navProgress').style.width = scrolled + '%';
    }

    updateNavigation(activeSection) {
        document.querySelectorAll('.nav__link').forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav__link[href="#${activeSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Initial animations
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
                targets: '.hero__scroll-indicator',
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutExpo'
            }, '-=300');

        // Counter animations for hero stats
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
                update: function(anim) {
                    document.querySelector(selector).textContent = Math.round(anim.animatables[0].target.value) + '%';
                }
            });
        }, delay);
    }

    // Section animations
    animateSection(section) {
        const sectionId = section.id;
        
        // Only animate if not already animated
        if (section.dataset.animated) return;
        section.dataset.animated = 'true';
        
        switch(sectionId) {
            case 'introduction':
                this.animateIntroduction();
                break;
            case 'forecast':
                this.animateForecast();
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
        }
    }

    animateIntroduction() {
        anime({
            targets: '#introduction .section__title',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#introduction .chart-container',
            opacity: [0, 1],
            translateY: [50, 0],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }

    animateForecast() {
        anime({
            targets: '#forecast .section__title',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#forecast .stat-card',
            opacity: [0, 1],
            scale: [0.9, 1],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutExpo',
            complete: () => {
                // Animate counters
                this.animateCounter('#confidenceStat', 74, 1500);
                this.animateCounter('#investmentStat', 30, 1500, 200);
                setTimeout(() => {
                    document.querySelector('#marketStat').textContent = '$252B';
                    document.querySelector('#multiplierStat').textContent = '13×';
                }, 400);
            }
        });

        anime({
            targets: '#forecast .timeline',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 600,
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
            targets: '#barriers .barrier-card',
            opacity: [0, 1],
            translateX: [-50, 0],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'easeOutExpo',
            complete: () => {
                // Animate progress bars
                document.querySelectorAll('.progress-bar').forEach((bar, index) => {
                    const percent = bar.getAttribute('data-percent');
                    setTimeout(() => {
                        bar.style.setProperty('--progress-width', percent + '%');
                        bar.querySelector('::before') || bar.style.setProperty('width', percent + '%');
                    }, index * 200);
                });
            }
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
            targets: '#enablers .enabler-item',
            opacity: [0, 1],
            scale: [0.9, 1],
            delay: anime.stagger(100),
            duration: 800,
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
            targets: '#recommendations .action-card',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '#recommendations .conclusion',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 800,
            easing: 'easeOutExpo'
        });
    }

    // D3.js Visualizations
    createVisualizations() {
        // Wait for DOM to be ready and sections to be visible before creating charts
        setTimeout(() => {
            this.createAdoptionChart();
            this.createMaturityChart();
            this.createTimeline();
        }, 100);
    }

    createAdoptionChart() {
        const container = d3.select('#adoptionChart');
        if (!container.node()) return;
        
        container.selectAll("*").remove(); // Clear any existing content
        
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const width = 350 - margin.left - margin.right;
        const height = 250 - margin.top - margin.bottom;

        const svg = container.append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(this.data.adoption_growth.map(d => d.year))
            .range([0, width])
            .padding(0.2);

        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        // Add bars
        g.selectAll('.bar')
            .data(this.data.adoption_growth)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.year))
            .attr('width', x.bandwidth())
            .attr('y', height)
            .attr('height', 0)
            .attr('fill', '#1FB8CD')
            .attr('opacity', 0.8)
            .transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attr('y', d => y(d.percentage))
            .attr('height', d => height - y(d.percentage));

        // Add value labels
        g.selectAll('.value-label')
            .data(this.data.adoption_growth)
            .enter().append('text')
            .attr('class', 'value-label')
            .attr('x', d => x(d.year) + x.bandwidth() / 2)
            .attr('y', d => y(d.percentage) - 5)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .text(d => d.percentage + '%')
            .attr('opacity', 0)
            .transition()
            .delay((d, i) => i * 200 + 500)
            .duration(500)
            .attr('opacity', 1);

        // Add axes
        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text, path, line')
            .attr('stroke', 'rgba(255,255,255,0.6)')
            .attr('fill', 'rgba(255,255,255,0.6)');

        g.append('g')
            .call(d3.axisLeft(y).tickFormat(d => d + '%'))
            .selectAll('text, path, line')
            .attr('stroke', 'rgba(255,255,255,0.6)')
            .attr('fill', 'rgba(255,255,255,0.6)');
    }

    createMaturityChart() {
        const container = d3.select('#maturityChart');
        if (!container.node()) return;
        
        container.selectAll("*").remove(); // Clear any existing content
        
        const width = 350;
        const height = 250;
        const radius = Math.min(width, height) / 2 - 20;

        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', `translate(${width/2},${height/2})`);

        const pie = d3.pie()
            .value(d => d.percentage)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(60)
            .outerRadius(radius);

        const arcs = g.selectAll('.arc')
            .data(pie(this.data.maturity_split))
            .enter().append('g')
            .attr('class', 'arc');

        // Add pie slices
        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => d.data.color)
            .attr('opacity', 0.8)
            .style('stroke', 'rgba(255,255,255,0.2)')
            .style('stroke-width', '2px')
            .each(function(d) {
                this._current = { startAngle: 0, endAngle: 0 };
            })
            .transition()
            .duration(1000)
            .delay((d, i) => i * 200)
            .attrTween('d', function(d) {
                const interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return t => arc(interpolate(t));
            });

        // Add labels
        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .text(d => d.data.percentage + '%')
            .attr('opacity', 0)
            .transition()
            .delay(1200)
            .duration(500)
            .attr('opacity', 1);

        // Add legend
        const legend = svg.append('g')
            .attr('transform', `translate(20, ${height - 80})`);

        const legendItems = legend.selectAll('.legend-item')
            .data(this.data.maturity_split)
            .enter().append('g')
            .attr('class', 'legend-item')
            .attr('transform', (d, i) => `translate(0, ${i * 20})`);

        legendItems.append('rect')
            .attr('width', 12)
            .attr('height', 12)
            .attr('fill', d => d.color);

        legendItems.append('text')
            .attr('x', 16)
            .attr('y', 9)
            .attr('font-size', '11px')
            .attr('fill', 'rgba(255,255,255,0.8)')
            .text(d => d.category);
    }

    createTimeline() {
        const container = d3.select('#timeline');
        if (!container.node()) return;
        
        container.selectAll("*").remove(); // Clear any existing content
        
        const containerRect = container.node().getBoundingClientRect();
        const width = containerRect.width || 800;
        const height = 200;

        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);

        // Create a simple animated timeline visualization
        const timelineData = [
            { x: 0.1, label: 'Current State', color: '#B4413C' },
            { x: 0.5, label: '12 Months', color: '#FFC185' },
            { x: 0.9, label: '24 Months', color: '#1FB8CD' }
        ];

        const timeline = svg.append('g')
            .attr('transform', 'translate(50, 100)');

        // Timeline line
        timeline.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', width - 100)
            .attr('y2', 0)
            .attr('stroke', 'rgba(255,255,255,0.3)')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', `0,${width - 100}`)
            .transition()
            .duration(2000)
            .attr('stroke-dasharray', `${width - 100},0`);

        // Timeline points
        const points = timeline.selectAll('.timeline-point')
            .data(timelineData)
            .enter().append('g')
            .attr('class', 'timeline-point')
            .attr('transform', d => `translate(${d.x * (width - 100)}, 0)`);

        points.append('circle')
            .attr('r', 8)
            .attr('fill', d => d.color)
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .attr('opacity', 0)
            .transition()
            .delay((d, i) => 1000 + i * 300)
            .duration(500)
            .attr('opacity', 1);

        points.append('text')
            .attr('y', -15)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .text(d => d.label)
            .attr('opacity', 0)
            .transition()
            .delay((d, i) => 1200 + i * 300)
            .duration(500)
            .attr('opacity', 1);
    }

    // Interactive features
    setupInteractivity() {
        // Barrier cards interaction
        document.querySelectorAll('.barrier-card').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutExpo'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutExpo'
                });
            });
        });

        // Action cards interaction
        document.querySelectorAll('.action-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    translateY: -5,
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

        // Enabler items interaction
        document.querySelectorAll('.enabler-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                anime({
                    targets: item,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutExpo'
                });
            });

            item.addEventListener('mouseleave', () => {
                anime({
                    targets: item,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutExpo'
                });
            });
        });
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIPresentation();
});