// GitHub live data configuration and fetchers for @25csdaksh

export const languageColors = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Java: "#B07219",
  "C++": "#F34B7D",
  C: "#555555",
  PHP: "#4F5D95",
  Go: "#00ADD8",
  Rust: "#DEA584"
};

export const repoCuratedDescriptions = {
  "daksh-s-portfolio": "Luxury editorial developer portfolio built with React, Vite, Framer Motion & Tailwind CSS.",
  "VidyaPath": "4-Year CSE curriculum roadmap, interactive code sandbox & placement preparation platform.",
  "bob-ai-hackathon-trialguard-ai": "Bank of Baroda AI Hackathon — Clinical trial compliance & deep analysis security engine.",
  "rakeshkumarjwellers": "Luxury gold & diamond jewelry catalog with live 22K/24K hallmark bullion ticker.",
  "naitri_project": "AI-powered multimodal video inspection & deepfake verification workflow.",
  "SANJEEVNI_AI": "Healthcare AI assistant for patient triage, symptom classification & consultation records.",
  "devkrupajwellers": "E-commerce jewelry platform with dynamic pricing and custom jewelry requests.",
  "dakshkumar-school-management-system": "Enterprise institutional ERP with student records, attendance & fee ledger.",
  "SIH_project_2026": "Smart India Hackathon national initiative prototype and decentralized registry.",
  "krishiSeva": "Agro-tech portal for crop disease diagnosis, weather advisories & biological inputs.",
  "tradvision_ai": "Algorithmic market trend analyzer and financial risk indicator engine.",
  "CIE_2": "Computer Engineering institutional coursework & algorithm implementations.",
  "C-project": "Data structures and low-level algorithmic problem solving in C.",
  "Memori": "Neural memory consolidation & cognitive revision flashcard system."
};

// Generates 52 weeks x 7 days realistic mock contribution heat matrix
export const generateContributionMatrix = () => {
  const weeks = [];
  const today = new Date();
  
  for (let w = 51; w >= 0; w--) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      
      const rand = Math.random();
      let count = 0;
      let level = 0;
      
      if (rand > 0.4) {
        if (rand > 0.88) {
          count = Math.floor(Math.random() * 8) + 7;
          level = 4;
        } else if (rand > 0.7) {
          count = Math.floor(Math.random() * 4) + 4;
          level = 3;
        } else if (rand > 0.5) {
          count = Math.floor(Math.random() * 3) + 2;
          level = 2;
        } else {
          count = 1;
          level = 1;
        }
      }
      
      days.push({
        date: date.toISOString().split("T")[0],
        count,
        level,
        dayOfWeek: d
      });
    }
    weeks.push(days);
  }
  return weeks;
};

export const githubData = {
  username: "25csdaksh",
  name: "Daksh Soni",
  bio: "Computer Science student & Full Stack Developer",
  publicRepos: 43,
  profileUrl: "https://github.com/25csdaksh",
  totalContributions: "405+",
  currentStreak: "9 days",
  longestStreak: "14 days",
  topLanguages: [
    { name: "HTML", percentage: 39, color: "#E34F26" },
    { name: "JavaScript", percentage: 29, color: "#F7DF1E" },
    { name: "TypeScript", percentage: 10, color: "#3178C6" },
    { name: "CSS", percentage: 6, color: "#1572B6" },
    { name: "Java", percentage: 6, color: "#B07219" }
  ],
  featuredRepositories: [
    {
      name: "VidyaPath",
      description: "4-Year CSE curriculum roadmap, interactive code sandbox & placement preparation platform.",
      language: "JavaScript",
      langColor: "#F7DF1E",
      stars: 3,
      forks: 1,
      url: "https://github.com/25csdaksh/VidyaPath"
    },
    {
      name: "bob-ai-hackathon-trialguard-ai",
      description: "Bank of Baroda AI Hackathon — Clinical trial compliance & deep analysis security engine.",
      language: "TypeScript",
      langColor: "#3178C6",
      stars: 4,
      forks: 2,
      url: "https://github.com/25csdaksh/bob-ai-hackathon-trialguard-ai"
    },
    {
      name: "rakeshkumarjwellers",
      description: "Luxury gold & diamond jewelry catalog with live 22K/24K hallmark bullion ticker.",
      language: "HTML / JS",
      langColor: "#E34F26",
      stars: 2,
      forks: 0,
      url: "https://github.com/25csdaksh/rakeshkumarjwellers"
    },
    {
      name: "naitri_project",
      description: "AI-powered multimodal video inspection & deepfake verification workflow.",
      language: "JavaScript",
      langColor: "#F7DF1E",
      stars: 5,
      forks: 1,
      url: "https://github.com/25csdaksh/naitri_project"
    },
    {
      name: "SANJEEVNI_AI",
      description: "Healthcare AI assistant for patient triage, symptom classification & consultation records.",
      language: "JavaScript",
      langColor: "#F7DF1E",
      stars: 3,
      forks: 0,
      url: "https://github.com/25csdaksh/SANJEEVNI_AI"
    },
    {
      name: "devkrupajwellers",
      description: "E-commerce jewelry platform with dynamic pricing and custom jewelry requests.",
      language: "JavaScript",
      langColor: "#F7DF1E",
      stars: 2,
      forks: 0,
      url: "https://github.com/25csdaksh/devkrupajwellers"
    }
  ],
  recentActivity: [
    {
      type: "push",
      repo: "25csdaksh/VidyaPath",
      message: "feat: update study modules & CSE curriculum navigation",
      time: "2 days ago"
    },
    {
      type: "push",
      repo: "25csdaksh/bob-ai-hackathon-trialguard-ai",
      message: "feat: clinical trial compliance engine & security pipeline",
      time: "1 week ago"
    },
    {
      type: "push",
      repo: "25csdaksh/rakeshkumarjwellers",
      message: "perf: optimize live bullion ticker and bridal catalog",
      time: "3 weeks ago"
    },
    {
      type: "push",
      repo: "25csdaksh/SANJEEVNI_AI",
      message: "feat: patient triage flow & symptom assessment interface",
      time: "4 weeks ago"
    }
  ]
};

// Helper for relative time
export const formatTimeAgo = (dateString) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mo ago`;
};

// Live fetcher with cache
export const fetchLiveGithubData = async (username = "25csdaksh") => {
  const CACHE_KEY = `gh_data_${username}`;
  const CACHE_TIME_KEY = `gh_data_time_${username}`;
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  // Check cache first
  try {
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
    if (cachedData && cachedTime && Date.now() - parseInt(cachedTime, 10) < CACHE_DURATION) {
      return JSON.parse(cachedData);
    }
  } catch (e) {
    console.warn("Session storage access error:", e);
  }

  try {
    // 1. Fetch user profile, repos, contributions, and events concurrently
    const [userRes, reposRes, contribRes, eventsRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`),
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
      fetch(`https://api.github.com/users/${username}/events/public`)
    ]);

    let userObj = {};
    if (userRes.status === "fulfilled" && userRes.value.ok) {
      userObj = await userRes.value.json();
    }

    let reposList = [];
    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      reposList = await reposRes.value.json();
    }

    let contribObj = null;
    if (contribRes.status === "fulfilled" && contribRes.value.ok) {
      contribObj = await contribRes.value.json();
    }

    let eventsList = [];
    if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
      eventsList = await eventsRes.value.json();
    }

    // Process Contributions & Matrix
    let weeks = [];
    let totalContributions = githubData.totalContributions;
    let currentStreak = 0;
    let longestStreak = 0;

    if (contribObj && Array.isArray(contribObj.contributions) && contribObj.contributions.length > 0) {
      const rawContributions = contribObj.contributions;
      const totalCount = contribObj.total?.lastYear ?? rawContributions.reduce((sum, d) => sum + (d.count || 0), 0);
      totalContributions = totalCount > 0 ? `${totalCount.toLocaleString()}+` : `${totalCount}`;

      // Calculate streaks
      let tempStreak = 0;
      for (let i = 0; i < rawContributions.length; i++) {
        if (rawContributions[i].count > 0) {
          tempStreak++;
          if (tempStreak > longestStreak) longestStreak = tempStreak;
        } else {
          tempStreak = 0;
        }
      }

      for (let i = rawContributions.length - 1; i >= 0; i--) {
        if (rawContributions[i].count > 0) {
          currentStreak++;
        } else if (i === rawContributions.length - 1) {
          continue; // today might be in progress
        } else {
          break;
        }
      }

      // Group into 52 weeks x 7 days
      let curWeek = [];
      for (let i = 0; i < rawContributions.length; i++) {
        const item = rawContributions[i];
        const dObj = new Date(item.date);
        curWeek.push({
          date: item.date,
          count: item.count || 0,
          level: item.level || (item.count > 10 ? 4 : item.count > 5 ? 3 : item.count > 1 ? 2 : item.count > 0 ? 1 : 0),
          dayOfWeek: dObj.getDay()
        });

        if (curWeek.length === 7 || i === rawContributions.length - 1) {
          weeks.push(curWeek);
          curWeek = [];
        }
      }

      // Ensure standard 52 weeks length
      if (weeks.length > 52) {
        weeks = weeks.slice(weeks.length - 52);
      }
    } else {
      weeks = generateContributionMatrix();
      totalContributions = "405+";
      longestStreak = 14;
      currentStreak = 9;
    }

    // Process Repositories
    let featuredRepositories = githubData.featuredRepositories;
    let topLanguages = githubData.topLanguages;

    if (Array.isArray(reposList) && reposList.length > 0) {
      // Calculate language distribution
      const langCount = {};
      reposList.forEach(r => {
        if (r.language) {
          langCount[r.language] = (langCount[r.language] || 0) + 1;
        }
      });
      const totalLangRepos = Object.values(langCount).reduce((a, b) => a + b, 0);
      if (totalLangRepos > 0) {
        topLanguages = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([lang, count]) => ({
            name: lang,
            percentage: Math.round((count / totalLangRepos) * 100),
            color: languageColors[lang] || "#123C2F"
          }));
      }

      // Format featured repos
      const topRepos = reposList
        .filter(r => !r.fork)
        .slice(0, 6)
        .map(r => ({
          name: r.name,
          description: r.description || repoCuratedDescriptions[r.name] || "Full-stack engineering & algorithmic system repository.",
          language: r.language || "JavaScript",
          langColor: languageColors[r.language] || "#123C2F",
          stars: r.stargazers_count,
          forks: r.forks_count,
          url: r.html_url
        }));

      if (topRepos.length > 0) {
        featuredRepositories = topRepos;
      }
    }

    // Process Recent Activity / Commits
    let recentActivity = githubData.recentActivity;
    if (Array.isArray(eventsList) && eventsList.length > 0) {
      const pushEvents = eventsList
        .filter(e => e.type === "PushEvent" || e.type === "CreateEvent" || e.type === "WatchEvent")
        .slice(0, 4)
        .map(e => {
          const repoName = e.repo?.name?.replace(`${username}/`, "") || e.repo?.name || "portfolio";
          let message = `Pushed commits to ${repoName}`;
          if (e.type === "CreateEvent") {
            message = `Created repository ${repoName}`;
          } else if (e.payload?.commits && e.payload.commits[0]?.message) {
            message = e.payload.commits[0].message;
          }
          return {
            type: e.type === "PushEvent" ? "push" : "create",
            repo: repoName,
            message: message.length > 70 ? message.substring(0, 67) + "..." : message,
            time: formatTimeAgo(e.created_at)
          };
        });

      if (pushEvents.length > 0) {
        recentActivity = pushEvents;
      }
    }

    const liveResult = {
      username: userObj.login || username,
      name: userObj.name || "Daksh Soni",
      bio: userObj.bio || "Computer Science student & Full Stack Developer",
      avatarUrl: userObj.avatar_url || "https://avatars.githubusercontent.com/u/241403709?v=4",
      publicRepos: userObj.public_repos || reposList.length || 43,
      followers: userObj.followers || 1,
      profileUrl: `https://github.com/${username}`,
      totalContributions,
      currentStreak: `${currentStreak} days`,
      longestStreak: `${longestStreak > 0 ? longestStreak : 14} days`,
      topLanguages,
      featuredRepositories,
      recentActivity,
      weeks,
      isLive: true,
      lastSynced: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    // Save to cache
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(liveResult));
      sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch (e) {
      console.warn("Session storage write error:", e);
    }

    return liveResult;
  } catch (err) {
    console.error("GitHub live fetch error:", err);
    return {
      ...githubData,
      weeks: generateContributionMatrix(),
      isLive: false,
      lastSynced: "Offline cache"
    };
  }
};

