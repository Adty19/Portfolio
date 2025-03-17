import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Portfolio = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [scrollY, setScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [splashes, setSplashes] = useState([]);
    const splashIdRef = useRef(0);
    const particlesRef = useRef([]);
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const currentYear = new Date().getFullYear();

    // Handle cursor movement and splash effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
            
            // Add splash effect with a controlled rate (every 100ms)
            if (Math.random() > 0.85) { // Randomly create splashes for a more natural effect
                const newSplash = {
                    id: splashIdRef.current++,
                    x: e.clientX,
                    y: e.clientY,
                    size: 0,
                    opacity: 0.7,
                    color: `hsl(${Math.random() * 60 + 190}, 100%, 50%)`
                };
                
                setSplashes(prev => [...prev, newSplash]);
                
                // Remove splash after animation completes
                setTimeout(() => {
                    setSplashes(prev => prev.filter(splash => splash.id !== newSplash.id));
                }, 1000);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Handle splash animation
    useEffect(() => {
        const interval = setInterval(() => {
            setSplashes(prev => 
                prev.map(splash => ({
                ...splash,
                size: splash.size + 10,
                opacity: splash.opacity - 0.05
                }))
            );
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // Initialize and animate background particles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particleCount = 80;
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
    
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create particles
        if (particlesRef.current.length === 0) {
            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                color: `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})`,
                pulse: 0,
                pulseSpeed: Math.random() * 0.02 + 0.01
                });
            }
        }
    
        // Animation function
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particlesRef.current.forEach(particle => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Handle boundaries
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
                
                // Update pulse
                particle.pulse += particle.pulseSpeed;
                if (particle.pulse > 1 || particle.pulse < 0) particle.pulseSpeed *= -1;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(
                particle.x, 
                particle.y, 
                particle.radius * (1 + particle.pulse * 0.5), 
                0, 
                Math.PI * 2
                );
                ctx.fillStyle = particle.color;
                ctx.fill();
                
                // Draw connecting lines for particles that are close to each other
                particlesRef.current.forEach(otherParticle => {
                    const distance = Math.sqrt(
                        Math.pow(particle.x - otherParticle.x, 2) + 
                        Math.pow(particle.y - otherParticle.y, 2)
                    );
                
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
        
        requestRef.current = requestAnimationFrame(animate);
        };
    
        animate();
        
        return () => {
            cancelAnimationFrame(requestRef.current);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    // Handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            
            // Update active section based on scroll position
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY + 300;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(section.id);
                }
            });
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    // Education data
    const education = [
        {
            id: 1,
            degree: 'Vocational High School in Software Engineering',
            school: 'SMK Negeri 4 Bandar Lampung',
            year: '2017 - 2020',
            description: 'A graduate of Software Engineering (RPL) with knowledge in various technology fields, including software development, computer networking, UI/UX design, Internet of Things (IoT), and mobile, desktop, and web application development. Also experienced in database management and understanding system security principles and network technologies.'
        },
        {
            id: 2,
            degree: 'Bachelor of Computer Science',
            school: 'University of Technology Yogyakarta',
            year: '2020 - 2024',
            description: 'A Bachelors degree graduate in Informatics with in-depth knowledge of software development, algorithms, data structures, databases, artificial intelligence, cybersecurity, and computer networks. Experienced in web, mobile, and desktop application development, and skilled in implementing software engineering methodologies to create innovative and efficient technological solutions. Proficient in multiple programming languages and well-versed in Software Development Life Cycle (SDLC) and system design principles.'
        }
    ];

    // Experience
    const experiences = [
        {
            id: 1,
            position: 'Freelance Fullstack Web Developer',
            company: 'Self-Employed',
            year: '2020 - Now',
            description: 'As a Freelance Fullstack Developer, I have experience in developing and managing web-based projects using PHP Native and Laravel. Skilled in building responsive and user-friendly interfaces with Bootstrap and Tailwind CSS. Additionally, I specialize in API integration and payment gateway implementation. Website security is a top priority, ensuring that best practices are applied to protect user data and system integrity.'
        },
        {
            id: 2,
            position: 'Project-Based-Intern Fullstack Developer',
            company: 'Qwords Cloud Web Hosting Indonesia x Rakamin Academy',
            year: 'Feb 2024 - Mar 2024',
            description: 'Experienced in backend and API development with GoLang, and understands the concept of version control with Git. Also familiar with JavaScript frameworks such as Vue.js and the basics of the Java programming language.'
        },
        {
            id: 3,
            position: 'Web Development',
            company: 'Next Gen Dev',
            year: 'Jun 2024 - Jul 2024',
            description: 'I am responsible for frontend and backend development, as well as managing MySQL databases. I build responsive and user-friendly interfaces, while developing efficient backend systems to ensure optimal application performance.'
        },
        {
            id: 4,
            position: 'Intern Fullstack Developer',
            company: 'G2Smtech',
            year: 'Aug 2018 - Mar 2019',
            description: 'In this internship I developed a website with PHP, ensuring responsiveness and security of the application. Managed MySQL database for optimal performance, and developed desktop applications with Java. Also understood system testing, deployment, and maintenance.'
        }
    ];

    // Honor & Awards
    const honorawards = [
        {
            id: 1,
            title: 'Passed PKM KC 2023 funding',
            organizer: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia',
            year: '2023',
            description: 'I contribute as a Web Developer and IoT Engineer in the PKM (Student Creativity Program) project, developing web-based solutions and IoT technology to support digital innovation in the field being carried out. My role includes system design, IoT device integration, and overall application interface and backend development.',
        },
        {
            id: 2,
            title: ' Top 45 Capture The Flag Healthkathon BPJS 2023',
            organizer: 'Badan Penyelenggara Jaminan Sosial',
            year: '2023',
            description: 'Reverse Engineering, Cryptography, Web Security, Forensics, Binary Exploitation and Steganography.',
        },
        {
            id: 3,
            title: 'Top 60 National Hacking Competion CTF Cyber Jawara 2021',
            organizer: 'Cyber Jawara',
            year: '2021',
            description: 'Reverse Engineering, Cryptography, Web Security, Forensics, Binary Exploitation, Networking and Steganography.',
        },
        {
            id: 4,
            title: 'Top 50 National Hacking Competion CTF Cyber Jawara 2019',
            organizer: 'Cyber Jawara',
            year: '2019',
            description: 'Reverse Engineering, Cryptography, Web Security, Forensics, Binary Exploitation, Networking and Steganography.',
        }
    ];

    return (
        <div className="bg-black text-gray-200 min-h-screen font-mono">
            {/* Canvas for particle animation */}
            <canvas 
            ref={canvasRef} 
            className="fixed inset-0 z-0 w-full h-full" 
            />
            
            {/* Cursor splash effects */}
            <div className="fixed inset-0 z-10 pointer-events-none">
            {splashes.map(splash => (
                <div 
                key={splash.id}
                className="absolute rounded-full"
                style={{
                    left: splash.x + 'px',
                    top: splash.y + 'px',
                    width: splash.size + 'px',
                    height: splash.size + 'px',
                    backgroundColor: splash.color,
                    opacity: splash.opacity,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.8s ease-out, height 0.8s ease-out, opacity 0.8s ease-out'
                }}
                />
            ))}
            <div 
                className="absolute w-6 h-6 rounded-full border-2 border-blue-400 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-difference"
                style={{
                left: cursorPosition.x + 'px',
                top: cursorPosition.y + 'px',
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
                }}
            />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-sm z-50 shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            <span className="text-blue-500">&lt;</span>
                                APortfolio
                            <span className="text-blue-500">/&gt;</span>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8 text-sm">
                            <a href="#home" className={`transition-all duration-300 hover:text-blue-400 ${activeSection === 'home' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}>
                                Home
                            </a>
                            <a href="#about" className={`transition-all duration-300 hover:text-blue-400 ${activeSection === 'about' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}>
                                About
                            </a>
                            <a href="#education" className={`transition-all duration-300 hover:text-blue-400 ${activeSection === 'education' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}>
                                Education
                            </a>
                            <a href="#project" className={`transition-all duration-300 hover:text-blue-400 ${activeSection === 'project' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}>
                                Project
                            </a>
                            <a href="#experience" className={`transition-all duration-300 hover:text-blue-400 ${activeSection === 'experience' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}>
                                Experience
                            </a>
                            <a href="#licenses" className={`transition-all duration-300 hover:text-blue-400 ${activeSection === 'licenses' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}>
                                Certification & Awards
                            </a>
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button 
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="text-gray-200 focus:outline-none">
                                <svg 
                                    className="w-6 h-6" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24">
                                    {menuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden bg-gray-800 bg-opacity-95 backdrop-filter backdrop-blur-sm">
                        <a href="#home" onClick={() => setMenuOpen(false)} className={`block py-3 px-4 transition-colors duration-300 ${activeSection === 'home' ? 'text-blue-400 bg-gray-700' : 'hover:bg-gray-700'}`}>
                            Home
                        </a>
                        <a href="#about" onClick={() => setMenuOpen(false)} className={`block py-3 px-4 transition-colors duration-300 ${activeSection === 'about' ? 'text-blue-400 bg-gray-700' : 'hover:bg-gray-700'}`}>
                            About
                        </a>
                        <a href="#education" onClick={() => setMenuOpen(false)} className={`block py-3 px-4 transition-colors duration-300 ${activeSection === 'education' ? 'text-blue-400 bg-gray-700' : 'hover:bg-gray-700'}`}>
                            Education
                        </a>
                        <a href="#project" onClick={() => setMenuOpen(false)} className={`block py-3 px-4 transition-colors duration-300 ${activeSection === 'project' ? 'text-blue-400 bg-gray-700' : 'hover:bg-gray-700'}`}>
                            Project
                        </a>
                        <a href="#experience" onClick={() => setMenuOpen(false)} className={`block py-3 px-4 transition-colors duration-300 ${activeSection === 'experience' ? 'text-blue-400 bg-gray-700' : 'hover:bg-gray-700'}`}>
                            Experience
                        </a>
                        <a href="#licenses" onClick={() => setMenuOpen(false)} className={`block py-3 px-4 transition-colors duration-300 ${activeSection === 'licenses' ? 'text-blue-400 bg-gray-700' : 'hover:bg-gray-700'}`}>
                            Certification & Awards
                        </a>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <div className="relative z-10 overflow-hidden">
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden" style={{ transform: `translateY(${scrollY * 0.3}px)`, overflow: 'hidden', opacity: 1 - scrollY / 700}} >
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            Aditya Pranoto
                        </h1>
                        <div className="text-xl md:text-3xl mb-6 text-gray-300">
                            <span className="inline-block overflow-hidden border-r-2 border-blue-400 whitespace-nowrap animate-typing">
                                Fullstack Developer | Software Engineer
                            </span>
                        </div>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Committed to empowering ideas and translating them into impactful digital realities by crafting user-centric designs, building robust systems, and delivering seamless user experiences.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <a href="#about" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Explore
                            </a>
                            <a href="#contact" className="px-8 py-3 bg-transparent border border-blue-400 text-blue-400 hover:text-white hover:bg-blue-500 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Contact Me
                            </a>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="min-h-screen py-20 px-4 overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl font-bold mb-2 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">About Me</h2>
                            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="transform transition-all duration-700 overflow-hidden" 
                                style={{ 
                                    opacity: scrollY > 400 ? 1 : 0, 
                                    transform: scrollY > 400 ? 'translateX(0)' : 'translateX(-100px)',
                                    maxWidth: '100%',
                                    overflow: 'hidden'
                                }}>
                                <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-lg shadow-xl">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 opacity-80"></div>
                                    <img src="https://via.placeholder.com/400x320" alt="" className="w-full h-full object-cover mix-blend-overlay"/>
                                    <div className="absolute inset-0 border-2 border-white border-opacity-20 rounded-lg"></div>
                                </div>
                            </div>
                        
                            <div className="transform transition-all duration-700 overflow-hidden" 
                                style={{ 
                                    opacity: scrollY > 400 ? 1 : 0, 
                                    transform: scrollY > 400 ? 'translateX(0)' : 'translateX(100px)',
                                    maxWidth: '100%',
                                    overflow: 'hidden'
                                }}>
                                <h3 className="text-2xl font-bold mb-4 text-blue-400">Hello, Aditya Pranoto</h3>
                                <p className="text-gray-300 mb-6 text-justify leading-relaxed">
                                    A freelancer who is passionate about the world of technology. I am an Informatics graduate from University Technology of Yogyakarta (UTY), with experience in various fields of technology development. I have expertise in backend, frontend, and full-stack
                                    web development, and always strive to create innovative solutions utilizing the latest technology.
                                </p>
                                <p className="text-gray-300 mb-6 text-justify leading-relaxed">
                                    Additionally, I also have a deep interest in cybersecurity, which allows me to create systems that are not only effective, but also secure. With a strong educational background and a passion for continuous learning, I am ready to face new challenges and work together with clients to realize successful projects!
                                </p>
                                
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-blue-400 mb-2">Skills</h4>
                                        <ul className="space-y-1 text-gray-400">
                                            <li>Laravel, Javascript, C#, C React(Basic) & Go(Basic)</li>
                                            <li>HTML, CSS, Tailwinds, Bootstrap</li>
                                            <li>Penetration Testing</li>
                                            <li>UI/UX Design</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-blue-400 mb-2">Interests</h4>
                                        <ul className="space-y-1 text-gray-400">
                                            <li>Web Development</li>
                                            <li>Cyber Security</li>
                                            <li>Artificial Intelligence</li>
                                            <li>Internet of Things</li>
                                            <li>Augmented Reality</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="flex space-x-4">
                                    <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition duration-300">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325v21.351C0 23.407 0.593 24 1.325 24h11.53v-9.294H9.697v-3.622h3.158V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463 0.099 2.795 0.143v3.24h-1.918c-1.504 0-1.795 0.715-1.795 1.763v2.313h3.587l-0.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.675V1.325C24 0.593 23.407 0 22.675 0z"></path>
                                        </svg>
                                    </button>
                                    <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition duration-300">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path>
                                        </svg>
                                    </button>
                                    <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition duration-300">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Education Section */}
                <section id="education" className="min-h-screen py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl font-bold mb-2 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Education</h2>
                            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {education.map((edu, index) => (
                            <div 
                                key={edu.id}
                                className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-2"
                                style={{
                                    opacity: scrollY > 1400 + (index * 100) ? 1 : 0,
                                    transform: scrollY > 1400 + (index * 100) 
                                    ? 'translateY(0)' 
                                    : 'translateY(100px)'
                                }} >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-blue-400">{edu.degree}</h3>
                                    <span className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-300 text-sm rounded-full">
                                    {edu.year}
                                    </span>
                                </div>
                                <h4 className="text-gray-300 mb-4">{edu.school}</h4>
                                <p className="text-gray-400 text-justify">{edu.description}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Project Section */}       
                <section id="project" className="min-h-screen py-20 px-4 bg-gray-900 bg-opacity-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl font-bold mb-2 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Project</h2>
                            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className='bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-2' data-aos="fade-up-left" data-aos-duration="1000">
                                <h4 className="text-gray-300 font-bold mb-4">Si-Tepat : Sistem Tempat Sampah Cermat Integrated with IoT and Computer Vision</h4>
                                <p className="text-gray-400 text-justify mb-5">
                                    Si-Tepat: Sistem Tempat Sampah Cermat Integrated with IoT and Computer Vision for Waste Classification in Efforts to Realize Zero Waste 2030.</p>
                                <a className='px-8 py-3 bg-transparent border border-blue-400 text-blue-400 hover:text-white hover:bg-blue-500 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1' href="#">Detail</a>
                            </div>
                            <div className='bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-2' data-aos="fade-up-left" data-aos-duration="1000">
                                <h4 className="text-gray-300 font-bold mb-4">DigestiveSystem | Learning Application about Human Organs for Elementary School Children Using Augmented Reality</h4>
                                <p className="text-gray-400 text-justify mb-5">DigestiveSystem is an Augmented Reality (AR) based application that helps elementary school children learn about human digestive organs interactively.</p>
                                <a className='px-8 py-3 bg-transparent border border-blue-400 text-blue-400 hover:text-white hover:bg-blue-500 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1' href="#">Detail</a>
                            </div>
                            <div className='bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-2' data-aos="fade-up-left" data-aos-duration="1000">
                                <h4 className="text-gray-300 font-bold mb-4">ReadBooks | Online Book Reading Application</h4>
                                <p className="text-gray-400 text-justify mb-5">ReadBooks is an online book reading application that provides a modern, safe and practical reading experience. This application was developed using Laravel 11 with a flexible authentication system, allowing users to log in manually or using a Google account.</p>
                                <a className='px-8 py-3 bg-transparent border border-blue-400 text-blue-400 hover:text-white hover:bg-blue-500 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1' href="#">Detail</a>
                            </div>
                            <div className='bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-2' data-aos="fade-up-left" data-aos-duration="1000">
                                <h4 className="text-gray-300 font-bold mb-4">MiraiPlay | Anime Streaming Application</h4>
                                <p className="text-gray-400 text-justify mb-5">MiraiPlay is a React.js-based anime streaming app that displays the latest anime list in real-time through external API integration. With a user-friendly interface and clean design, users can explore, view details, and watch anime easily. Fast performance and navigation make MiraiPlay a practical solution for anime fans to enjoy their favorite shows online.</p>
                                <a className='px-8 py-3 bg-transparent border border-blue-400 text-blue-400 hover:text-white hover:bg-blue-500 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1' href="#">Detail</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="min-h-screen py-20 px-4 bg-gray-900 bg-opacity-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl font-bold mb-2 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Experience</h2>
                            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
                        </div>
                        
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-0 md:left-1/2 h-full w-1 bg-blue-500 bg-opacity-30 transform -translate-x-1/2"></div>
                        
                            {/* Timeline Items */}
                            {experiences.map((exp, index) => (
                            <div 
                            key={exp.id}
                            className={`relative mb-12 ${index % 2 === 0 ? 'md:ml-auto md:pl-12 md:pr-0' : 'md:mr-auto md:pr-12 md:pl-0'} md:w-1/2 transition-all duration-700`}
                            style={{
                                opacity: scrollY > 800 + (index * 150) ? 1 : 0,
                                transform: scrollY > 800 + (index * 150) 
                                ? 'translateX(0)' 
                                : `translateX(${index % 2 === 0 ? '100px' : '-100px'})`
                            }} >
                                <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                        <h3 className="text-xl font-bold text-blue-400">{exp.position}</h3>
                                        <span className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-300 text-sm rounded-full mt-2 md:mt-0">
                                            {exp.year}
                                        </span>
                                    </div>
                                    <h4 className="text-gray-300 font-bold mb-4">{exp.company}</h4>
                                    <p className="text-gray-400 text-justify">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Licenses Section */}
            <section id="licenses" className="min-h-screen py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-bold mb-2 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Licenses & Certifications</h2>
                        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {[
                            "Microsoft.png",
                            "Cisco.png",
                            "DataEngineering.png",
                            "MachineLearning.png",
                            "DicodingBackend.JPG",
                            "DicodingAWS.png"
                        ].map((img, i) => (
                            <div key={i} className='bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-2' data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
                                <div className="w-full h-[220px] bg-white flex items-center justify-center rounded-md overflow-hidden">
                                    <img src={`/image/${img}`} alt="Certification" className="max-h-full max-w-full object-contain"/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <br />
                    <div className="flex justify-center mt-6">
                        <a href="#" className="inline-block w-auto px-8 py-3 bg-transparent border border-blue-400 text-blue-400 hover:text-white hover:bg-blue-500 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            See More
                        </a>
                    </div>
                </div>
            </section>

            {/* Awards Section */}
            <section id="awards" className="min-h-screen py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-bold mb-2 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Honors & Awards</h2>
                        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up" data-aos-duration="2000">
                        {honorawards.map((awards) => (
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-2"
                        key={awards.id} >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-blue-400">{awards.title}</h3>
                                <span className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-300 text-sm rounded-full">
                                    {awards.year}
                                </span>
                            </div>
                            <h4 className="text-gray-300 mb-4">{awards.organizer}</h4>
                            <p className="text-gray-400 text-justify">{awards.description}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="min-h-screen py-20 px-4 bg-gradient-to-b from-gray-900 to-black overflow-hidden relative">
                
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-bold mb-2 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Contact Me
                        </h2>
                        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                            Ready to start your next project? Let's create something amazing together.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-10 items-center">                        
                        {/* Contact Form */}
                        <div className="backdrop-blur-sm bg-gray-900/50 p-8 rounded-2xl border border-gray-800 shadow-xl relative">
                            {/* Futuristic glowing elements */}
                            <div className="absolute -top-4 -right-4 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
                            
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="group relative z-0">
                                        <input type="text" name="name" id="name" 
                                            className="block w-full px-0 py-3 text-gray-200 bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:border-blue-500 peer" 
                                            placeholder=" " 
                                        />
                                        <label 
                                            htmlFor="name" 
                                            className="absolute text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Your Name
                                        </label>
                                    </div>
                                    <div className="group relative z-0">
                                        <input type="email" name="email" id="email" 
                                            className="block w-full px-0 py-3 text-gray-200 bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:border-blue-500 peer" 
                                            placeholder=" " 
                                        />
                                        <label 
                                            htmlFor="email" 
                                            className="absolute text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Email Address
                                        </label>
                                    </div>
                                </div>
                                
                                <div className="group relative z-0">
                                    <input type="text" name="subject" id="subject" 
                                        className="block w-full px-0 py-3 text-gray-200 bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:border-blue-500 peer" 
                                        placeholder=" " 
                                    />
                                    <label 
                                        htmlFor="subject" 
                                        className="absolute text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Subject
                                    </label>
                                </div>
                                
                                <div className="group relative z-0">
                                    <textarea 
                                        name="message" 
                                        id="message" 
                                        rows="4" 
                                        className="block w-full px-0 py-3 text-gray-200 bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:border-blue-500 peer" 
                                        placeholder=" "
                                    ></textarea>
                                    <label 
                                        htmlFor="message" 
                                        className="absolute text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Your Message
                                    </label>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:from-blue-500 hover:to-purple-500 group"
                                >
                                    <span className="relative z-10">Send Message</span>
                                    <span className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                {/* Add keyframes for floating animation */}
                <style jsx>{`
                    @keyframes float {
                        0%, 100% {
                            transform: translate(-50%, -50%) translateY(0px);
                        }
                        50% {
                            transform: translate(-50%, -50%) translateY(-20px);
                        }
                    }
                    
                    .bg-grid-pattern {
                        background-image: linear-gradient(rgba(66, 153, 225, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(66, 153, 225, 0.1) 1px, transparent 1px);
                        background-size: 30px 30px;
                    }
                `}</style>
            </section>
        </div>

        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
            <div className="container mx-auto py-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Logo dan deskripsi */}
                    <div className="space-y-4">
                        <div className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">APortfolio</div>
                        <p className="text-gray-400 text-justify max-w-md">A digital problem solver who creates end-to-end technology solutions through the development of digital systems, interfaces, and infrastructure that integrate efficiently and functionally.</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="relative z-10 text-gray-400 hover:text-blue-500 transition-colors duration-300">
                                <FaGithub className="text-xl" />
                            </a>
                            <a href="https://www.linkedin.com/in/adty" target="_blank" rel="noopener noreferrer" className="relative z-10 text-gray-400 hover:text-blue-500 transition-colors duration-300">
                                <FaLinkedin className="text-xl" />
                            </a>
                            <a href="#" className="relative z-10 text-gray-400 hover:text-blue-500 transition-colors duration-300">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="#" className="relative z-10 text-gray-400 hover:text-blue-500 transition-colors duration-300">
                                <FaEnvelope className="text-xl" />
                            </a>
                        </div>
                    </div>
            
                    {/* Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4 relative">
                            <span className="relative z-10">Navigation</span>
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="relative z-10 hover:text-blue-400 transition-colors duration-300">Home</a></li>
                            <li><a href="#" className="relative z-10 hover:text-blue-400 transition-colors duration-300">About</a></li>
                            <li><a href="#" className="relative z-10 hover:text-blue-400 transition-colors duration-300">Education</a></li>
                            <li><a href="#" className="relative z-10 hover:text-blue-400 transition-colors duration-300">Project</a></li>
                            <li><a href="#" className="relative z-10 hover:text-blue-400 transition-colors duration-300">Experience</a></li>
                            <li><a href="#" className="relative z-10 hover:text-blue-400 transition-colors duration-300">Certification & Awards</a></li>
                        </ul>
                    </div>
            
                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4 relative">
                            <span className="relative z-10">Contact Me</span>
                        </h3>
                        <p className="text-gray-400 text-justify">Interested in working together? I am open to freelance projects, team collaborations, or new challenges in the programming world.</p>
                        <a href="mailto:adityaspranoto89@gmail.com" className="relative z-10 inline-block px-6 py-3 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-md hover:opacity-90 transition-opacity duration-300">Send Email</a>
                    </div>
                </div>
            
                {/* Bottom bar */}
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">&copy; {currentYear} APortfolio. All rights reserved.</p>
                    <div className="mt-4 md:mt-0">
                        <ul className="flex space-x-6 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">Privacy</a></li>
                            <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">Terms</a></li>
                            <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

        {/* Scroll to top button */}
        <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transition-all duration-300 ${scrollY > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>

        {/* Add some CSS for animations */}
        <style jsx>{`
            @keyframes pulse {
                0% { transform: scale(1); opacity: 0.7; }
                100% { transform: scale(1.5); opacity: 0.3; }
            }
            
            @keyframes typing {
                from { width: 0 }
                to { width: 100% }
            }
            
            .animate-typing {
                animation: typing 3.5s steps(50, end);
            }
        `}</style>
    </div>
);
};

export default Portfolio;
