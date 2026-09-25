export const projectsData = [
  {
    id: "netram-deepfake-defense",
    title: "Netram — God's Eye",
    category: "AI & Cybersecurity",
    tagline: "Real-Time Deepfake & Voice-Clone Defense Engine for Video Meetings",
    featuredBadge: "Production AI Engine",
    year: "2026",
    role: "Lead Full-Stack & ML Pipeline Engineer",
    summary: "An open-source, multi-modal deepfake detection platform that inspects video call frames and audio in real time on Google Meet, Zoom Web, and Microsoft Teams to flag face swaps and cloned voices before they cause harm.",
    problemSolved: "High-stakes corporate video meetings, remote hiring, and financial verifications face unprecedented security risks from real-time AI face-swapping and cloned voice injection attacks.",
    solution: "Engineered a 7-stage multi-branch inference pipeline that fuses spatial pixel artifacts (EfficientNet-B4), 2D spectral FFT log-magnitudes, bi-directional GRU temporal feature drift, and audio-sync mouth motion checks into a calibrated verdict.",
    keyFeatures: [
      "7-Stage Pipeline with Cascade Triage Router for low-latency meeting performance",
      "5 Independent Modalities: Spatial (ViT), Frequency (2D FFT), Temporal (Bi-GRU), Audio Sync (AASIST Net), and Liveness Micro-motion",
      "Seamless Chrome Extension paired with local WebSocket inference engine (ws://127.0.0.1:8765)",
      "468-point MediaPipe facial mesh alignment and head-pose normalization",
      "SHA-256 forensic audit hash logging for post-call compliance verification"
    ],
    technologies: ["PyTorch", "ONNX Runtime", "FastAPI", "WebSocket", "React", "MediaPipe", "Tailwind CSS", "Docker"],
    accentColor: "#3ddcc8",
    githubUrl: "https://github.com/rashiyaom2/Netram-Deepfake-Detection-",
    liveUrl: "https://naitram.netlify.app/",
    coverImage: "/projects/netram-gods-eye-cover.png",
    stats: {
      syncAccuracy: "98.2%",
      triageLatency: "0.14s",
      pipelineStages: "7 Stages"
    },
    codeSnippet: `@app.websocket("/ws/inference")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    async for frame in websocket.iter_bytes():
        # Stage 0: Cascade triage routing
        if cascade_router.is_confidently_real(frame):
            await websocket.send_json({"verdict": "REAL", "latency_ms": 12})
            continue
        # Stages 1-6: Multi-modal fusion
        score = await fusion_engine.evaluate_multimodal(frame)
        await websocket.send_json({"verdict": score.label, "confidence": score.calibrated})`
  },
  {
    id: "swayur-agrotech",
    title: "Swayur AgroTech — KshetraPal",
    category: "AgriTech & Biotechnology",
    tagline: "Science-Driven Agricultural Biotechnology & KshetraPal Biological E-Commerce",
    featuredBadge: "Biotech Platform",
    year: "2025 - 2026",
    role: "Lead Full-Stack Web Architect",
    summary: "A modern agricultural biotechnology digital platform and biological catalog engineered for Swayur Agrotech LLP in Anand, Gujarat, showcasing the KshetraPal biological product line (Bio-NPK, Bio-ZSB, Mycorrhiza, Trichoderma viride, Beauveria bassiana, Pseudomonas fluorescens) manufactured to FCO 1985 & CIB-RC standards.",
    problemSolved: "Indian farmers face soil degradation from chemical overuse, poor microbial biodiversity, and limited digital access to certified biofertilizers and localized crop protection guidance.",
    solution: "Architected a high-performance Next.js/React web platform with interactive 3D product studio shadows, automated dosage calculators per acre, bilingual crop solution guides, and direct dealer inquiry workflows.",
    keyFeatures: [
      "Interactive KshetraPal biological product showcase with high-CFU microbial specifications",
      "Automated dosage & acre calculator complying with FCO 1985 & CIB-RC guidelines",
      "Bilingual Gujarati/English crop solutions for cotton, groundnut, paddy, and horticultural crops",
      "Direct WhatsApp inquiry dispatcher with automated product-specific payloads",
      "Sub-second asset pipeline with Next.js image optimization and responsive glassmorphic UI"
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Lucide Icons", "Vercel Edge", "SEO Schema JSON-LD"],
    accentColor: "#1A5442",
    githubUrl: "https://github.com/25csdaksh/krishiSeva",
    liveUrl: "https://swayuragrotech.vercel.app/",
    coverImage: "/projects/swayur-agrotech-cover.jpg",
    stats: {
      compliance: "FCO 1985 Standard",
      facility: "Anand, Gujarat",
      liveProducts: "6 Bio Products"
    },
    codeSnippet: `export const calculateDosage = (cropType, acreage, biologicalStrain) => {
  const baseRateMlPerAcre = biologicalStrain === 'Bio-NPK' ? 500 : 250;
  const totalVolume = acreage * baseRateMlPerAcre;
  const applicationSchedule = cropType === 'Cotton' ? 'Basal + 30 DAS' : 'Seed Treatment + Foliar';
  return { totalVolumeLitres: totalVolume / 1000, applicationSchedule, fcoStandard: 'Schedule I' };
};`
  },
  {
    id: "shreejee-education",
    title: "Shreejee Education ERP",
    category: "EdTech & Institutional ERP",
    tagline: "Multi-Role Institutional Management & Academic Administration Platform",
    featuredBadge: "Enterprise System",
    year: "2025 - 2026",
    role: "Full-Stack Web Architect",
    summary: "A comprehensive cloud ERP platform engineered for educational institutions, unifying administrative workflows, automated fee calculation, biometric attendance tracking, and multi-role student-parent communications.",
    problemSolved: "Educational institutions struggle with fragmented software for fee collection, manual attendance errors, and disconnected parent-teacher communication.",
    solution: "Built a centralized, secure multi-tenant web ERP featuring 5 distinct role-based access portals (Admin, Teacher, Student, Parent, Accountant), automated fee payment gateways with digital receipts, and real-time student telemetry.",
    keyFeatures: [
      "Granular Multi-Role RBAC (Admin, Teacher, Student, Parent, Fee Accountant)",
      "Automated Fee Ledger Engine with payment processing & digital PDF invoice generation",
      "Real-time student attendance telemetry and academic progress gradebook",
      "Teacher assignment dispatcher and digital homework submission workflow",
      "Parent communication hub for institutional announcements and fee reminders"
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Tailwind CSS", "REST APIs"],
    accentColor: "#123C2F",
    githubUrl: "https://github.com/25csdaksh/dakshkumar-school-management-system",
    liveUrl: "https://shreejeeeducation.vercel.app/login",
    coverImage: "/projects/shreejee-education-cover.jpg",
    stats: {
      activeRoles: "5 Portals",
      billingAutomation: "100% Digital",
      queryLatency: "<40ms"
    },
    codeSnippet: `router.post("/api/v1/fees/process-invoice", verifyAuth, async (req, res) => {
  const { studentId, term, amount, paymentMethod } = req.body;
  const invoice = await FeeLedgerService.generateInvoice({
    studentId,
    term,
    amount,
    invoiceNo: generateAuditCode(),
    timestamp: new Date()
  });
  await NotificationService.alertParent(studentId, invoice);
  res.status(201).json({ success: true, invoice });
});`
  },
  {
    id: "vidyapath-learning",
    title: "VidyaPath — Gyan Anupath",
    category: "EdTech & Career Platforms",
    tagline: "Comprehensive 4-Year CSE Engineering Curriculum & Placement Preparation Engine",
    featuredBadge: "EdTech Platform",
    year: "2025 - 2026",
    role: "Full-Stack Architect & Creator",
    summary: "An end-to-end engineering learning and placement platform for Computer Science Engineering students, unifying 8 semesters of core CS roadmaps, interactive code execution sandboxes, curated DSA topic tracks, and technical interview preparation.",
    problemSolved: "Engineering students struggle with fragmented syllabi, disconnected coding tracks, and lack of structured placement roadmaps from semester 1 to campus recruitments.",
    solution: "Engineered a unified learning ecosystem with semester-wise subject roadmaps, curated DSA problem matrices with code solutions, interactive quizzes, and placement readiness telemetry.",
    keyFeatures: [
      "Full 8-Semester CSE Curriculum Roadmap with curated resources and lab guides",
      "Interactive Data Structures & Algorithms (DSA) track with complexity benchmarks",
      "Mock technical interview engine with live coding questions and curated solutions",
      "Personalized progress telemetry and student milestone tracking",
      "Fast Vite + React architecture with JetBrains Mono code execution interfaces"
    ],
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Netlify", "JavaScript (ES6+)"],
    accentColor: "#4F46E5",
    githubUrl: "https://github.com/25csdaksh/VidyaPath",
    liveUrl: "https://shreejeelearning.netlify.app/",
    coverImage: "/projects/vidyapath-learning-cover.jpg",
    stats: {
      curriculum: "8 Semesters",
      studentTracks: "DSA & Core CS",
      performance: "100 Lighthouse"
    },
    codeSnippet: `export const trackStudentProgress = (studentId, completedTopicId, semesterNo) => {
  const currentSemesterMilestone = calculateSemesterCompletion(studentId, semesterNo);
  const readinessIndex = computePlacementReadinessScore(studentId);
  return { currentSemesterMilestone, readinessIndex, nextRecommendedTrack: 'Dynamic Programming' };
};`
  },
  {
    id: "devkrupa-jewellers",
    title: "Devkrupa Jewellers",
    category: "Luxury E-Commerce & Retail",
    tagline: "High-End Gold, Diamond & Silver Jewelry E-Commerce Platform",
    featuredBadge: "Production E-Commerce",
    year: "2025 - 2026",
    role: "Frontend & UI/UX Engineer",
    summary: "A luxury digital storefront and jewelry catalog platform engineered for high-ticket jewelry retail, featuring live bullion price calculators, bridal collections, and custom quote builders.",
    problemSolved: "Traditional jewelry retailers face high customer friction with static physical catalogs, fluctuating daily bullion rates, and lack of instant quotation tools for bespoke bridal ornaments.",
    solution: "Developed an ultra-fluid luxury web experience with dynamic gold rate calculators (22K/24K), high-definition multi-angle jewelry zoom galleries, and direct WhatsApp quote consultation.",
    keyFeatures: [
      "Dynamic Daily Gold & Silver Bullion Rate Calculator with automated purity calculation",
      "High-Definition Visual Showcase with multi-angle zoom and hallmark purity certifications",
      "Interactive Bridal, Antique, and Modern Collection Filter Matrix",
      "Direct-to-Store Bespoke Custom Order Inquiry & WhatsApp checkout integration",
      "Sub-second asset delivery optimized with modern CDN caching and image pipelines"
    ],
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Cloudinary CDN", "REST APIs"],
    accentColor: "#D4AF37",
    githubUrl: "https://github.com/25csdaksh/devkrupajwellers",
    liveUrl: "https://devkrupajwellers.vercel.app/",
    coverImage: "/projects/devkrupa-jewellers-cover.jpg",
    stats: {
      liveRateSync: "24K / 22K",
      assetDelivery: "Cloudinary CDN",
      mobileOptimized: "100% Fluid"
    },
    codeSnippet: `export const calculateJewelryPrice = (weightGrams, purityCarat, liveGoldRate, makingChargePercent) => {
  const purityMultiplier = purityCarat === 24 ? 1.0 : purityCarat === 22 ? (22 / 24) : (18 / 24);
  const baseMetalValue = weightGrams * liveGoldRate * purityMultiplier;
  const makingCharges = baseMetalValue * (makingChargePercent / 100);
  const gst = (baseMetalValue + makingCharges) * 0.03;
  return { baseMetalValue, makingCharges, gst, finalPrice: Math.round(baseMetalValue + makingCharges + gst) };
};`
  },
  {
    id: "rakeshkumar-jewellers",
    title: "Rakeshkumar Jewellers",
    category: "Retail Tech & Heritage Brand",
    tagline: "Heritage Gold Ornament Showcase & Real-Time Bullion Rate Oracle",
    featuredBadge: "Digital Brand Platform",
    year: "2025 - 2026",
    role: "Full-Stack Web Developer",
    summary: "A digital brand experience platform for a premier jewelry house, integrating curated gold ornament collections with real-time market pricing and customer consultation booking.",
    problemSolved: "Bridging legacy offline jewelry craftsmanship with modern digital customer acquisition, transparent daily gold rate dissemination, and appointment scheduling.",
    solution: "Created a responsive digital showroom with interactive product discovery, instant gold rate telemetry, appointment booking for bespoke jewelry design, and digital catalogs.",
    keyFeatures: [
      "Real-Time Market Bullion Rate Ticker (Gold 24K, Gold 22K, Silver 999)",
      "Interactive Heritage & Contemporary Ornament Catalog with Category Slicers",
      "Digital Appointment Booking for bespoke bridal jewelry design consultations",
      "Mobile-first editorial UX with rich micro-animations and smooth scroll",
      "SEO-optimized local business discovery with direct showroom consultation links"
    ],
    technologies: ["React", "JavaScript (ES6+)", "Tailwind CSS", "Framer Motion", "Vercel Edge"],
    accentColor: "#B8860B",
    githubUrl: "https://github.com/25csdaksh/rakeshkumarjwellers",
    liveUrl: "https://rakeshkumarjwellers.vercel.app/",
    coverImage: "/projects/rakeshkumar-jewellers-cover.jpg",
    stats: {
      marketTicker: "Live Daily Rates",
      appointments: "Online Booking",
      uptime: "99.9% Vercel Edge"
    },
    codeSnippet: `export const fetchLiveBullionRates = async () => {
  const response = await fetch('/api/bullion-rates', { next: { revalidate: 300 } });
  const data = await response.json();
  return {
    gold24k: data.gold24k,
    gold22k: Math.round(data.gold24k * 0.916),
    silver1kg: data.silver1kg,
    lastUpdated: new Date().toLocaleTimeString()
  };
};`
  }
];
