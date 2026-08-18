const express    = require("express");
const path       = require("path");
const https      = require("https");
const nodemailer = require("nodemailer");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Template engine ──────────────────────────────────────────────
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ── Middleware ───────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── GitHub API + Cache (5-min TTL) ───────────────────────────────
const GITHUB_USER  = "bereket5185";
const CACHE_TTL_MS = 5 * 60 * 1000;
let   repoCache    = { data: null, fetchedAt: 0 };

function githubGet(apiPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path:     apiPath,
      headers:  {
        "User-Agent": "bereket-portfolio",
        "Accept":     "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    };
    https.get(options, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

async function fetchPortfolioRepos() {
  const now = Date.now();
  if (repoCache.data && now - repoCache.fetchedAt < CACHE_TTL_MS) {
    return repoCache.data;
  }
  try {
    const result = await githubGet(
      `/search/repositories?q=user:${GITHUB_USER}+topic:portfolio&sort=pushed&order=desc&per_page=50`
    );
    const repos = result.items || [];
    const mapped = repos.map((repo, i) => ({
      num:      String(i + 1).padStart(2, "0"),
      category: repo.topics
        .filter((t) => t !== "portfolio")
        .map((t) => t.charAt(0).toUpperCase() + t.slice(1).replace(/-/g, " "))
        .join(" · ") || "Project",
      title:  repo.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      desc:   repo.description || "No description provided.",
      tags:   repo.topics.filter((t) => t !== "portfolio"),
      github: repo.html_url,
      stars:  repo.stargazers_count,
      lang:   repo.language,
    }));
    repoCache = { data: mapped, fetchedAt: now };
    return mapped;
  } catch (err) {
    console.error("GitHub API error:", err.message);
    return repoCache.data || [];
  }
}

// ── Mail transporter (set SMTP env vars to enable) ───────────────
function createTransporter() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ── Portfolio data ───────────────────────────────────────────────
const data = {
  meta: {
    title: "Bereket G/Alif | Data Analyst & AI Engineer",
    description:
      "Bereket G/Alif — CS graduate, Data Analyst and aspiring AI Engineer from Addis Ababa. Projects spanning ML, NLP, time series, credit-risk modeling, fraud detection, web scraping, and dashboards.",
  },
  profile: {
    name:     "Bereket G/Alif",
    headline: "Data Analyst · ML Engineer · Aspiring AI Engineer",
    location: "Addis Ababa, Ethiopia",
    email:    "bereketgalif21@gmail.com",
    phone:    "+251 937 440 907",
    github:   "https://github.com/bereket5185",
    linkedin: "https://www.linkedin.com/in/bereket-gebrealif",
    image:    "/assets/bereket-profile.jpg",
  },
  skills: [
    {
      title: "Programming Languages",
      items: ["Python", "SQL", "JavaScript", "PHP", "HTML & CSS"],
    },
    {
      title: "Data Science & Analysis",
      items: [
        "Exploratory Data Analysis (EDA)",
        "Data Cleaning & Wrangling",
        "Feature Engineering",
        "Statistical Analysis",
        "Time Series Analysis",
        "Pandas & NumPy",
        "Power BI Dashboards",
      ],
    },
    {
      title: "Machine Learning",
      items: [
        "Supervised Learning (Classification & Regression)",
        "Random Forest & Gradient Boosting",
        "XGBoost",
        "Logistic & Linear Regression",
        "Decision Trees",
        "Natural Language Processing (NLP)",
        "TF-IDF Vectorization",
        "Model Evaluation & Tuning",
      ],
    },
    {
      title: "Databases",
      items: ["MySQL", "SQLite", "Database Design", "SQL Query Optimization"],
    },
    {
      title: "Tools & Environment",
      items: [
        "Git & GitHub",
        "Jupyter Notebook & Google Colab",
        "VS Code",
        "Streamlit",
        "Scikit-learn",
        "Matplotlib & Seaborn",
      ],
    },
    {
      title: "AI & Data Engineering",
      items: [
        "End-to-End ML Pipelines",
        "Data Preprocessing Pipelines",
        "Model Deployment Basics",
        "Python Automation",
        "API Integration",
      ],
    },
  ],
  projects: [
    {
      num: "01", category: "Machine Learning",
      title: "Spam Email Classification",
      desc: "Binary spam classifier on 193,852 emails using TF-IDF vectorization and a Perceptron neural network. Achieved ~96.8% test accuracy with robust evaluation across precision, recall, and F1 — demonstrating NLP pipeline design from raw text to production-ready predictions.",
      tags: ["Python", "Scikit-learn", "TF-IDF", "Perceptron", "NLP"],
      github: "https://github.com/bereket5185/_Email-Classification-Using-Perceptron",
      stars: 0, lang: "Python",
    },
    {
      num: "02", category: "Regression",
      title: "House Price Prediction",
      desc: "Rigorous comparison of univariate, bivariate, and multivariate Linear Regression models on 545 properties. Multivariate model achieved R² = 0.649 with MAE of ~980K. Includes interactive prediction, residual diagnostics, and full error analysis.",
      tags: ["Python", "Scikit-learn", "Pandas", "Seaborn"],
      github: "https://github.com/bereket5185/House-Price-Prediction",
      stars: 0, lang: "Python",
    },
    {
      num: "03", category: "Web Scraping",
      title: "ECA Website Scraper",
      desc: "Production-grade web scraper targeting eca.gov.et (Ethiopian Civil Aviation Authority) using BeautifulSoup and Requests. Extracts structured aviation data, handles pagination and anti-scraping patterns, and exports clean results for downstream analysis.",
      tags: ["BeautifulSoup", "Requests", "Pandas", "Python"],
      github: "https://github.com/bereket5185/Screaping_eca.gov.et",
      stars: 0, lang: "Python",
    },
    {
      num: "04", category: "Analytics",
      title: "Data Cleaning & EDA",
      desc: "Comprehensive EDA pipeline covering missing value detection and imputation, outlier analysis, skewness correction, feature correlation mapping, and statistical hypothesis testing — turning messy raw data into a clean, analysis-ready dataset.",
      tags: ["EDA", "Data Cleaning", "Visualization", "Python"],
      github: "https://github.com/bereket5185/data-cleaning-eda",
      stars: 0, lang: "Python",
    },
    {
      num: "05", category: "Dashboard",
      title: "Customer Data Dashboard",
      desc: "Interactive business intelligence dashboards built with Power BI and Python. Visualizes customer segmentation, purchase trends, KPIs, and churn indicators — turning raw customer data into actionable insights for decision-makers.",
      tags: ["Power BI", "Python", "Business Insights", "Matplotlib"],
      github: "https://github.com/bereket5185/customer-data-dashboard",
      stars: 0, lang: "Python",
    },
    {
      num: "06", category: "Machine Learning",
      title: "Customer Churn Prediction",
      desc: "Full ML pipeline predicting customer churn on the Telco dataset using a tuned Decision Tree classifier. Covers EDA, feature engineering, GridSearchCV hyperparameter optimization, evaluation metrics, and a reusable prediction script. Final model persisted with Joblib.",
      tags: ["Python", "Scikit-learn", "GridSearchCV", "Decision Tree"],
      github: "https://github.com/bereket5185/customer-churn-decision-tree",
      stars: 0, lang: "Python",
    },
    {
      num: "07", category: "Machine Learning",
      title: "Credit Card Fraud Detection",
      desc: "Fraud detection system using a Random Forest classifier on 10,000 transactions. Full pipeline includes One-Hot encoding, EDA, class imbalance handling, confusion matrix, ROC curve analysis, and an interactive prediction interface.",
      tags: ["Python", "Random Forest", "Scikit-learn", "Matplotlib"],
      github: "https://github.com/bereket5185/Credit-Card-Fraud-Detection",
      stars: 0, lang: "Python",
    },
    {
      num: "08", category: "Machine Learning",
      title: "Probability of Default Prediction",
      desc: "End-to-end credit-risk pipeline predicting loan default probability. Implements IV/WoE feature selection, correlation filtering, and RF importance ranking. Trains Logistic Regression, Random Forest, and XGBoost with cross-validation and isotonic calibration. Evaluated using ROC-AUC, Gini, and KS statistic.",
      tags: ["Python", "XGBoost", "Scikit-learn", "Credit Risk"],
      github: "https://github.com/bereket5185/Probability-of-Default-Prediction-and-Feature-Selection",
      stars: 0, lang: "Python",
    },
    {
      num: "09", category: "Time Series",
      title: "Restaurant Sales Forecasting",
      desc: "Time series ML project forecasting daily restaurant sales from 22,896 transactions. Aggregated to 60 daily observations, engineered lag features, rolling statistics, and cyclical date encoding. Trained Linear Regression and Random Forest models for 1-day and 7-day horizons. Next-day forecast: 222,591 | 7-day cumulative: 1,424,410.",
      tags: ["Python", "Time Series", "Random Forest", "Pandas"],
      github: "https://github.com/bereket5185/restaurant-transactions_Time_series",
      stars: 0, lang: "Python",
    },
  ],
  experience: [
    {
      org:   "Ambo University",
      role:  "BSc in Computer Science",
      period: "Graduated 2016 E.C.",
      desc:  "Built a solid foundation in programming, algorithms, data structures, databases, software engineering, and computer systems.",
    },
    {
      org:   "Commercial Bank of Ethiopia",
      role:  "IT Support Intern",
      period: "Internship",
      desc:  "Supported network troubleshooting, ATM maintenance, hardware repairs, software installation, and end-user technical support across branches.",
    },
    {
      org:   "Self-Directed Learning",
      role:  "Data Science & AI Engineering",
      period: "2023 – Present",
      desc:  "Building real-world ML projects spanning classification, regression, time series, NLP, fraud detection, and credit-risk modeling. Focused on becoming a production-ready AI Engineer.",
    },
  ],
  services: [
    { title: "Data Analysis",      icon: "📊", desc: "Cleaning, exploring, and summarizing datasets to surface actionable insights." },
    { title: "Machine Learning",   icon: "🤖", desc: "Classification, regression, model evaluation, and end-to-end ML workflows." },
    { title: "Web Scraping",       icon: "🕸️",  desc: "Collecting structured datasets from public websites using Python tools." },
    { title: "Dashboards",         icon: "📈", desc: "Power BI and Python visuals that turn raw numbers into business clarity." },
    { title: "Python Automation",  icon: "⚡", desc: "Scripts that eliminate repetitive manual tasks and improve speed." },
    { title: "SQL Development",    icon: "🗄️",  desc: "Queries, reporting logic, data extraction, and database-backed analysis." },
    { title: "Data Cleaning",      icon: "🧹", desc: "Missing values, outliers, transformation, validation, and full wrangling pipelines." },
    { title: "Data Visualization", icon: "🎨", desc: "Charts and visual stories that make findings intuitive and shareable." },
  ],
};

// ── Routes ───────────────────────────────────────────────────────
app.get("/", async (req, res) => {
  const githubProjects = await fetchPortfolioRepos();
  const projects = githubProjects.length > 0 ? githubProjects : data.projects;
  res.render("index", { ...data, projects, flash: null });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  const githubProjects = await fetchPortfolioRepos();
  const projects = githubProjects.length > 0 ? githubProjects : data.projects;

  if (!name || !email || !message) {
    return res.render("index", {
      ...data, projects,
      flash: { type: "error", text: "Please fill in all fields." },
    });
  }

  console.log(`\n📩 Message from ${name} <${email}>:\n${message}\n`);

  const transporter = createTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to:      data.profile.email,
        replyTo: email,
        subject: `Portfolio message from ${name}`,
        text:    `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html:    `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><hr/><p>${message.replace(/\n/g, "<br>")}</p>`,
      });
    } catch (mailErr) {
      console.error("Mail send error:", mailErr.message);
    }
  }

  res.render("index", {
    ...data, projects,
    flash: { type: "success", text: "Message received — I'll be in touch soon!" },
  });
});

// ── 404 ──────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).send("Page not found"));

// ── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`Portfolio running → http://localhost:${PORT}`));
