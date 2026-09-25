export const learningRoadmapData = [
  {
    id: "cs-fundamentals",
    title: "Computer Science Fundamentals",
    status: "Solidified Foundation",
    category: "Core Engineering",
    progress: 95,
    icon: "GraduationCap",
    topics: [
      "Operating Systems & Process Concurrency",
      "Database Management Systems (DBMS) & Relational Algebra",
      "Computer Networks & TCP/IP Architecture",
      "Object-Oriented Analysis & Design (OOAD)"
    ],
    summary: "Deep, rigorous theoretical grounding that ensures scalable software is architected with memory efficiency and clean abstractions."
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    status: "Mastered & Daily Practice",
    category: "Algorithmic Problem Solving",
    progress: 90,
    icon: "Binary",
    topics: [
      "Trees, Binary Search Trees & Heaps",
      "Graph Algorithms (BFS, DFS, Dijkstra, TopoSort)",
      "Dynamic Programming & Memoization Patterns",
      "Time & Space Complexity Optimization in C++"
    ],
    summary: "Continuous sharpening of algorithmic problem-solving to design optimal data pipelines and performant software."
  },
  {
    id: "web-dev",
    title: "Full-Stack Web Architecture",
    status: "Advanced Production Ready",
    category: "Modern Web Engineering",
    progress: 92,
    icon: "Layers",
    topics: [
      "React Reactive Component State & Custom Hooks",
      "Node.js Event Loop, Streams & Express Middleware",
      "RESTful API Protocol Hygiene & Microservices",
      "Modern CSS, Design Systems & Responsive UX"
    ],
    summary: "Building seamless user interfaces backed by resilient, secure, and production-tested server architectures."
  },
  {
    id: "ai-ml",
    title: "Artificial Intelligence & ML",
    status: "Active Exploration & Application",
    category: "Applied AI",
    progress: 82,
    icon: "Brain",
    topics: [
      "Large Language Models (LLMs) & Prompt Engineering",
      "Retrieval-Augmented Generation (RAG) & Embeddings",
      "Google Gemini Multimodal API Integrations",
      "PyTorch, Scikit-learn & Computer Vision Models"
    ],
    summary: "Bridging the gap between theoretical AI models and production digital tools that solve tangible human problems."
  },
  {
    id: "system-design",
    title: "System Design & Distributed Scalability",
    status: "In-Depth Study & Implementation",
    category: "Architecture",
    progress: 78,
    icon: "Cpu",
    topics: [
      "Caching Strategies (Redis, Write-through, LRU)",
      "Message Queues & Asynchronous Workers (BullMQ)",
      "Database Sharding, Replication & Indexing Strategies",
      "Load Balancing & Horizontal Scalability"
    ],
    summary: "Designing systems that reliably serve thousands of concurrent requests with low latency and zero single points of failure."
  },
  {
    id: "cloud-devops",
    title: "Cloud & Infrastructure",
    status: "Continuous Integration",
    category: "DevOps",
    progress: 75,
    icon: "Cloud",
    topics: [
      "Docker Containerization & Multi-stage Builds",
      "Continuous Integration & Continuous Deployment (CI/CD)",
      "Vercel & Render Edge Deployments",
      "Cloud Database Management (Atlas, Neon/Render Postgres)"
    ],
    summary: "Ensuring frictionless deployments, automated test pipelines, and high-availability cloud infrastructure."
  },
  {
    id: "entrepreneurship",
    title: "Product Strategy & Entrepreneurship",
    status: "Lifelong Discipline",
    category: "Founder Mindset",
    progress: 85,
    icon: "Rocket",
    topics: [
      "User Research, Pain Point Discovery & Problem Validation",
      "Rapid MVP Scoping & Prototyping in <48 Hours",
      "UX Micro-interactions & Product-Led Growth",
      "Unit Economics & Value Proposition Crafting"
    ],
    summary: "Developing products with a commercial lens—ensuring every line of code serves customer happiness and business sustainability."
  }
];

export const verifiedCertifications = [
  {
    id: "london-goldsmiths-cpp",
    title: "Object Oriented Programming in C++ Specialization",
    organization: "University of London & Goldsmiths",
    instructor: "Matthew Yee-King, Professor of Computer Science",
    date: "Feb 2026",
    coursesCount: "5 Courses Specialization",
    credentialId: "Z7IAIY2NNH78",
    verifyUrl: "https://coursera.org/verify/specialization/Z7IAIY2NNH78",
    pdfUrl: "/certificates/london-goldsmiths-cpp-certificate.pdf",
    imagePreview: "/certificates/london-goldsmiths-cpp-certificate.jpg",
    badge: "Specialization (5 Courses)",
    category: "Core CS & Algorithmic C++",
    capstone: "Engineered a comprehensive cryptocurrency trading exchange platform in modern C++ modeling multi-module classes, data conversions, and interactive trade algorithms.",
    courses: [
      "Introduction to Object-Oriented Programming in C++",
      "C++ Programming: Classes and Data",
      "Object-Oriented Programming in C++: Functions",
      "Working with Objects in C++",
      "Use C++ to build a Crypto Trading Platform: Final System"
    ]
  },
  {
    id: "meta-backend-developer",
    title: "Meta Back-End Developer Professional Certificate",
    organization: "Meta",
    instructor: "Taught by Meta Experts",
    date: "Jul 2026",
    coursesCount: "9 Courses Professional Certificate",
    credentialId: "GRPGVIO42OCA",
    verifyUrl: "https://coursera.org/verify/professional-cert/GRPGVIO42OCA",
    pdfUrl: "/certificates/meta-backend-developer-certificate.pdf",
    imagePreview: "/certificates/meta-backend-developer-certificate.jpg",
    badge: "Professional Certificate (9 Courses)",
    category: "Backend & Systems Engineering",
    capstone: "Comprehensive enterprise backend engineering including relational databases, Django REST framework, version control branching, security, and technical interview readiness.",
    courses: [
      "Introduction to Back-End Development",
      "Programming in Python",
      "Version Control (Git/GitHub)",
      "Introduction to Databases for Back-End Development",
      "Django Web Framework",
      "APIs & RESTful Architecture",
      "The Full Stack Integration",
      "Back-End Developer Capstone",
      "Coding Interview Preparation"
    ]
  },
  {
    id: "michigan-web-design",
    title: "Web Design for Everybody: Basics of Web Development & Coding",
    organization: "University of Michigan (School of Information)",
    instructor: "Colleen van Lent, Ph.D.",
    date: "Feb 2026",
    coursesCount: "5 Courses Specialization",
    credentialId: "SHBEPDUW7EUF",
    verifyUrl: "https://coursera.org/verify/specialization/SHBEPDUW7EUF",
    pdfUrl: "/certificates/michigan-web-design-certificate.pdf",
    imagePreview: "/certificates/michigan-web-design-certificate.jpg",
    badge: "Specialization (5 Courses)",
    category: "Frontend & Accessible UX",
    capstone: "Architected modern accessible web interfaces adhering to WCAG standards, semantic HTML5, responsive CSS Grid/Flexbox, and dynamic JavaScript DOM interactions.",
    courses: [
      "Introduction to HTML5",
      "Introduction to CSS3",
      "Interactivity with JavaScript",
      "Advanced Styling with Responsive Design",
      "Web Design for Everybody Capstone"
    ]
  },
  {
    id: "cisco-packet-tracer",
    title: "Getting Started with Cisco Packet Tracer",
    organization: "Cisco Networking Academy",
    instructor: "Lynn Bloomer, Director Cisco Networking Academy",
    date: "Jul 14, 2026",
    coursesCount: "Official Cisco Certification",
    credentialId: "efc6f50b-864f-4d6f-a3dc-c6ee4cec7822",
    verifyUrl: "/certificates/cisco-packet-tracer-certificate.jpg",
    pdfUrl: "/certificates/cisco-packet-tracer-certificate.jpg",
    imagePreview: "/certificates/cisco-packet-tracer-certificate.jpg",
    badge: "Cisco Certified",
    category: "Computer Networks & Simulation",
    capstone: "Completed hands-on network architecture modeling in Cisco Packet Tracer, configuring dynamic IP addressing, VLAN switching, packet inspection, and smart IoT device telemetry.",
    courses: [
      "Network Topology Simulation & Packet Flow Modeling",
      "IPv4 / IPv6 Subnetting & Dynamic Routing Protocols",
      "Switch Configuration, VLANs & Wireless Access Points",
      "Real-Time PDU Protocol Analysis & Network Diagnostics"
    ]
  },
  {
    id: "udemy-arduino-mastery",
    title: "Arduino Step by Step: Getting Started",
    organization: "Udemy (Tech Explorations)",
    instructor: "Dr. Peter Dalmaris",
    date: "Oct 29, 2025",
    coursesCount: "21.5 Hours Comprehensive Mastery",
    credentialId: "UC-c959382e-3333-45e2-86f0-21ba743e4f28",
    verifyUrl: "https://ude.my/UC-c959382e-3333-45e2-86f0-21ba743e4f28",
    pdfUrl: "/certificates/udemy-arduino-step-by-step-certificate.jpg",
    imagePreview: "/certificates/udemy-arduino-step-by-step-certificate.jpg",
    badge: "21.5 Hours Mastery",
    category: "IoT, Microcontrollers & Embedded Systems",
    capstone: "Engineered embedded hardware prototypes and wrote C++ firmware for Arduino microcontrollers, interfacing digital/analog sensor telemetry, PWM motor drivers, and serial communication.",
    courses: [
      "Microcontroller Architecture & GPIO Interface Fundamentals",
      "C/C++ Embedded Firmware Programming & Interrupt Handlers",
      "Analog & Digital Sensor Integration (Ultrasonic, Temperature, Optical)",
      "Actuator Control, PWM Modulation & Serial Protocol Telemetry"
    ]
  }
];
