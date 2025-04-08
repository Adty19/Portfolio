import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const canvasRef = useRef(null);
  
  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Make canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Configure particle settings
    const particlesArray = [];
    const numberOfParticles = 100;
    const colors = ['#4361ee', '#3a0ca3', '#4895ef', '#4cc9f0'];
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        // Move particles
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function connectParticles() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particlesArray[a].color;
            ctx.globalAlpha = 0.1;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animate);
    }

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    
    init();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const projectsData = {
    '1': {
      id: 1,
      title: 'Si-Tepat : Sistem Tempat Sampah Cermat Integrated with IoT and Computer Vision',
      description: 'Si-Tepat: Sistem Tempat Sampah Cermat Integrated with IoT and Computer Vision for Waste Classification in Efforts to Realize Zero Waste 2030.',
      longDescription: `
        This is one of the projects from the Student Creativity Program (PKM) competition initiated by 5 people (Ilham, Cahyo, Ayu, Fahri) and I am one of them, the project that I worked on with my group is named: 
        Si-Tepat: Sistem Tempat Sampah Cermat Integrated with IoT and Computer Vision for Waste Classification in Efforts to Realize Zero Waste 2030. Si-Tepat is an innovative project that utilizes IoT and Computer Vision to optimize automatic waste sorting, in order to support the Zero Waste 2030 target. With smart sensors and high-resolution cameras, this system is able to classify waste accurately, reduce human error, and increase recycling efficiency. Not only that, Si-Tepat can also monitor the capacity of trash bins remotely via the web that has been integrated with the API using the PHP programming language.

        Technology and Equipment Used :
        Si-Tepat is developed using C programming language for IoT systems and Python for Computer Vision implementation. This system utilizes various sensors and hardware, including :
        1. ESP32-CAM: To read and analyze objects in front of the bin.
        2. ESP32: As the main microcontroller to control the entire system.
        3. Ultrasonic Sensor: To detect the capacity of the trash bin.
        4. PIR (Passive Infrared) Sensor: To detect the presence of humans around the trash bin and as an on/off power switch when there are or are not people and movement near the Si-tepat.
        5. Servo Motor: Untuk membuka dan menutup tempat sampah sesuai hasil analisa.
        6. Panel Surya: Sebagai sumber daya utama yang menyimpan energi di power bank.
        7. Resistor, Board, Kabel & Konektor: Untuk mendukung integrasi perangkat keras.
        8. Power Bank: Untuk menyimpan energi yang dihasilkan oleh panel surya.

        How the System Works :
        1. Object Detection and Analysis
        - The ESP32-CAM takes the image of the object in front of the bin.
        - The Computer Vision system analyzes images based on the collected dataset and is trained to classify objects as organic, non-organic, or other waste. 
        - The analysis results are embedded in the ESP32-CAM to support the real-time classification process.
        2. Waste Bin Control
        - The classification results are sent to the ESP32 microcontroller.
        - The ESP32 sends a signal to the servo motor to open the trash bin according to the type of trash detected.
        3. Energy Efficiency
        - PIR sensor detects human presence around the trash bin.
        - If there is no movement, the system will enter power saving mode to reduce energy consumption.
        - Solar panels are used as the main power source to supply energy to the power bank, which is then used to operate the system.
        4. Trash Bin Capacity Monitoring
        - Ultrasonic sensors measure the capacity of waste in the bin.
        - Capacity data is sent to the server and displayed via web monitoring that has been integrated with API using the PHP programming language.
        - Users can monitor the status of the bin remotely to optimize waste management.
      `,
      screenshots: [
        '/image/Scratch.png',
        '/image/SitepatPrototype.png'
      ],
      category: ['Internet of Things', 'Web Development', 'Machine Learning'],
      technologies: ['Php', 'Python', 'C', 'Mysql'],
      integrations: ['RESTFull API', 'MQTT'],
      link: 'https://youtu.be/NAVL1kOgZ0g?si=ar6yLQPyDkSYlnyJ',
      github: null,
    },
    '2': {
      id: 2,
      title: 'DigestiveSystem | Learning Application about Human Organs for Elementary School Children Using Augmented Reality',
      description: 'DigestiveSystem | Learning Application about Human Organs for Elementary School Children Using Augmented Reality',
      longDescription: `
        DigestiveSystem is an Augmented Reality (AR) based application that helps elementary school children learn about human digestive organs interactively. With an attractive 3D display, users can see organs more closely using the zoom in/out feature and move the model to make it easier to understand.
        This application is also equipped with a quiz feature to test children's understanding. Teachers don't need to bother creating their own applications because all questions and organ descriptions can be managed directly via the web, thanks to the API integration that is available. With an exciting and modern way of learning, children can understand science more fun.
        
        Main Features :
        1. Interactive Visualization of Digestive Organs
        This application allows students to study the human digestive organs in more depth with a 3D model display that can:
        - Zoom in and out to see the details of each organ clearly.
        - Rotate and move so students can see the organ structure from different angles.
        - Provide interactive descriptions for each part of the digestive system.
        2. Interactive Quizzes for Learning Evaluation
        To ensure student understanding after studying the material, this application is equipped with interactive quizzes that:
        - Testing students' knowledge of the human digestive system.
        - Using a gamification-based approach to make it more interesting and not boring.
        - Providing scores and direct feedback to users.
        3. API Integration for Quiz Management
        This application has been integrated with a web-based API to facilitate the management of quizzes and questions used in learning. Teachers or instructors can easily:
        - Access the website connected to the application.
        - Customize and update quiz questions without having to update the main application.
        - Customize content according to the curriculum taught in schools.
        
        This AR application is an innovative solution in the world of education, especially in introducing human digestive organs to elementary school students. With an interactive approach and advanced technology, this application not only improves student understanding but also makes the learning process more interesting and enjoyable. In addition, integration with API provides flexibility for teachers in managing educational content effectively. By introducing AR technology in early learning, this application contributes to creating a modern education method that is more effective, immersive, and in line with current developments.
      `,
      screenshots: [
        '/image/DigestiveHome.png',
        '/image/DigestiveScan.jpg',
        '/image/DigestiveQuiz.png'
      ],
      category: ['Mobile', 'Web Development', 'Augmented Reality'],
      technologies: ['C#', 'Codeigniter', 'Unity3D', 'Vuforia', 'Blender 3D', 'MySQL'],
      integrations: ['RESTFull API'],
      link: 'https://djournals.com/klik/article/view/1441/826',
      github: null,
    },
    '3': {
      id: 3,
      title: 'ReadBooks | Online Book Reading Application',
      description: 'Online Book Reading Application',
      longDescription: `
        ReadBooks is an online book reading application developed using Laravel 11 with high security features and payment gateway integration. This application is designed to provide a comfortable reading experience and ensure the security of each book with AES-256 encryption. In addition, ReadBooks supports various payment methods, including mobile banking and e-wallet, to make it easier for customers to subscribe to membership.
        
        Main Features :
        1. Book Security with AES-256 
        ReadBooks uses AES-256 encryption to protect books from unauthorized access. With this system, files that are attempted to be accessed unauthorizedly will remain encrypted and will not get any results without valid authorization. The book will be stored in a folder / in the database, when there is illegal activity or an attempt to access it by force, then when the book file is opened without the prepared key, the result will be empty, there is no content in the file.
        2. Role-Based Access Control (RBAC) System
        The ReadBooks application has three main roles with different access rights:
        Manager : Has full control over the application, including managing books, users (admin and subscribers), payments, content, reports & statistics, and monitoring activity to find out who made changes, when, and what was changed.
        Admin : Can manage books, users (subscribers only), content, and reports & statistics.
        Customer : Can read books, bookmark books, view payment history that has been made, access events and promotions and make payments for membership upgrades.
        3. Manual and Automatic Authentication
        The Readbooks Authentication System can be used manually and automatically using Google.
        4. Payment Gateway Integration
        ReadBooks has integrated a payment gateway that supports various payment methods, including mobile banking and e-wallet. With this system, customers can easily purchase or renew membership to access premium books. With various types of payments, customers can choose which one they want to use, this can make it easier for customers to make payments. After the customer makes a payment, the system will automatically update the status from previously non-premium to premium so that customers can use other premium features.
      `,
      screenshots: [
        'https://miro.medium.com/v2/resize:fit:720/format:webp/1*QLzKzMyQJPRDLtI7OqcSRQ.png'
      ],
      category: ['Web Development'],
      technologies: ['Laravel 11', 'MySql', 'Bootstrap 5', 'Git', 'Postman'],
      integrations: ['RESTFull API', 'OAuth', 'Payment Gateway', 'AES-256'],
      link: null,
      github: null,
    },
    '4': {
      id: 4,
      title: 'MiraiPlay | Anime Streaming Application',
      description: 'MiraiPlay | Anime Streaming Application',
      longDescription: `
        MiraiPlay is a React.js-based anime streaming app that displays the latest anime list in real-time through external API integration. With a user-friendly interface and clean design, users can explore, view details, and watch anime easily. Fast performance and navigation make MiraiPlay a practical solution for anime fans to enjoy their favorite shows online.
        
        Main Features :
        1. Real-Time Anime Listing 
        Displays the latest anime list directly using external API integration. Users always get the latest anime updates without having to refresh manually.
        2. Full Anime Details
        Each anime displayed provides complete information such as title, synopsis, genre, episode, rating, and more.
        3. Streaming Anime Online
        Users can watch anime directly from the application without downloading. Responsive and easy to use video player.
        4. User-Friendly Interface
        The clean design and intuitive layout make it easy for users to explore and use the app without any hassle.
        5. Fast and Responsive Fast app
        Performance and lightweight navigation keep the user experience smooth, even on standard internet connections.
        6. Anime Search and Filter
        Users can search for anime by title, genre, or rating, and filter the results to find
      `,
      category: ['Web Development'],
      technologies: ['React', 'Taildwinds', 'Postman', 'Git'],
      integrations: ['RESTFull API'],
      link: null,
      github: null,
    }
  };

  const project = projectsData[projectId];

  // Jika project tidak ditemukan
  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen relative overflow-hidden">
      {/* Particle Animation Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0 opacity-70"
      />
      
      {/* Content with z-index to appear above canvas */}
      <div className="relative z-10">
        {/* Main Content */}
        <div className="mx-auto max-w-6xl p-6">
          {/* Back Link */}
          <Link to="/" className="text-blue-400 hover:text-blue-300 inline-flex items-center mb-4 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back
          </Link>

          {/* Project Info Card */}
          <div className="bg-gray-800/70 backdrop-blur-md border border-blue-500/20 shadow-lg shadow-blue-500/10 rounded-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
              <div className="flex">
                <div className="bg-blue-900/50 h-16 w-16 rounded-md flex items-center justify-center mr-4 border border-blue-500/30">
                  {project.category[0].includes('React') ? (
                    <svg className="h-10 w-10 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 100-4.278zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 001.363 3.578l.101.213-.101.213a23.307 23.307 0 00-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046.317-1.025.766-2.11 1.342-3.177-.576-1.067-1.025-2.152-1.342-3.177zm12.675 6.325l-.133-.469a23.357 23.357 0 00-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 001.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.576 1.067 1.026 2.152 1.343 3.177 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046-.317 1.025-.767 2.11-1.343 3.177zm-7.724-.555c.405 0 .832-.034 1.275-.103l.3-.052a13.7 13.7 0 01-.593 1.374l-.126.311c-.403.872-.866 1.654-1.384 2.324-.341-.59-.644-1.28-.911-2.066-.319-.936-.571-1.92-.755-2.913a13.13 13.13 0 012.194 1.124zm-1.025-5.067c.267-.785.57-1.475.911-2.066.518.67.98 1.452 1.384 2.324l.125.313a13.87 13.87 0 01.594 1.372c-.496.071-.983.135-1.477.135-.492 0-.996-.066-1.497-.14.184-.994.436-1.977.755-2.913.082-.244.171-.485.261-.723.104.007.204.011.3.015.49.069.915.103 1.32.103zm7.724.555c-.782.22-1.57.326-2.381.337l-.3.001c.312-.595.576-1.226.806-1.887l.112-.323a14.053 14.053 0 00.756-2.913c.32.938.572 1.922.756 2.913.23.662.49 1.292.8 1.887zm-5.66-2.814c-.518-.67-.98-1.452-1.384-2.324a13.508 13.508 0 00-.91 2.066c-.33.937-.584 1.922-.755 2.913a13.1 13.1 0 012.194-1.124l.3-.052a13.41 13.41 0 01-.274-.807l-.126-.311zm2.449-4.86c.518.67.98 1.452 1.384 2.324l.125.311c.103.248.198.493.286.74-.496.071-.983.135-1.477.135-.492 0-.996-.066-1.497-.14a13.967 13.967 0 01.755-2.913c.267-.785.57-1.475.911-2.066.104.007.207.016.308.023.432.06.84.094 1.205.094v.002z"/>
                    </svg>
                  ) : project.category[0].includes('UI/UX') ? (
                    <svg className="h-10 w-10 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.332 8.668a3.333 3.333 0 00-0.728 6.574v1.426c0 0.608 0.493 1.099 1.099 1.099h0.534c0.608 0 1.099-0.493 1.099-1.099v-1.426a3.333 3.333 0 00-2.004-6.574zM16.667 12a1.334 1.334 0 11-2.667 0 1.334 1.334 0 012.667 0z M13.334 19.333h-9.333v-14.666h9.333v3.334a1 1 0 002 0v-4.334a1 1 0 00-1-1h-11.333a1 1 0 00-1 1v16.666a1 1 0 001 1h11.333a1 1 0 001-1v-4.334a1 1 0 00-2 0v3.334z"></path>
                    </svg>
                  ) : (
                    <svg className="h-10 w-10 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.5 10.33h-.75V6.5h1.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-7.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h1.5v3.83H8.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2.5v6.17h-1.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-1.5V13.33h2.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z"/>
                    </svg>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 cursor-pointer">{project.title}</h1>
                  <div className="flex flex-wrap items-center text-gray-400 text-sm mt-1 gap-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{Array.isArray(project.category) ? project.category.join(', ') : project.category}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 bg-opacity-80 text-white rounded-lg hover:bg-blue-700 transition border border-blue-500 shadow-md shadow-blue-500/20 backdrop-blur-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    Link
                  </a>
                )}
                
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-800 bg-opacity-80 text-white rounded-lg hover:bg-gray-700 transition border border-gray-600 shadow-md shadow-blue-500/10 backdrop-blur-sm"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                    </svg>
                    GitHub Repository
                  </a>
                )}
              </div>
            </div>
            
            {/* Overview Section */}
            <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/40 to-indigo-900/40 shadow-xl border border-blue-500/20 backdrop-blur-sm">
              <div className="px-6 py-8 md:px-8 md:py-10 relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500/5 -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-indigo-500/5 translate-y-1/3 -translate-x-1/4"></div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-4 relative z-10">
                  <span className="inline-block border-b-2 border-blue-400 pb-1">Overview</span>
                </h2>
                
                <div className="text-blue-100/90 space-y-4 whitespace-pre-line text-base md:text-lg relative z-10 leading-relaxed text-justify">
                  {project.longDescription}
                </div>
              </div>
            </div>
            
            {/* Technology Section */}
            <div className="mb-10 rounded-2xl bg-gray-800/60 p-6 md:p-8 shadow-lg border border-blue-500/20 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-blue-300 mb-6 flex items-center">
                <span className="mr-3 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                Technology Stack
              </h2>
              
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30 shadow-sm transition duration-300 hover:shadow-blue-500/20 hover:shadow-md hover:-translate-y-1 cursor-pointer"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {/* Integrations Section */}
            <div className="mb-10 rounded-2xl bg-gray-800/60 p-6 md:p-8 shadow-lg border border-blue-500/20 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-blue-300 mb-6 flex items-center">
                <span className="mr-3 text-blue-400">
                <img
                  width="64" height="64"
                  src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-integration-web-development-flaticons-flat-flat-icons.png" 
                  alt="System Integration" 
                  className="h-6 w-6 text-blue-500"
                />
                </span>
                Integrations
              </h2>
              
              <div className="flex flex-wrap gap-3">
                {project.integrations.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30 shadow-sm transition duration-300 hover:shadow-blue-500/20 hover:shadow-md hover:-translate-y-1 cursor-pointer"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Screenshot Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-blue-300 mb-6 flex items-center">
                <span className="mr-3 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                Screenshots
              </h2>
              <div className="border border-blue-500/20 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center">
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="mx-auto bg-white rounded px-4 py-1 text-xs text-gray-500">
                    {project.link || "Project Preview"}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
                  {project.screenshots?.map((src, index) => (
                    <div key={index} className="border border-blue-500/20 rounded-lg overflow-hidden shadow-md shadow-blue-500/10 group">
                      <img
                        src={src}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-55 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/800x400";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;