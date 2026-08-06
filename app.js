const express = require("express");
const path    = require("path");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Template engine ──────────────────────────────────────────────
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ── Middleware ───────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── Portfolio data ───────────────────────────────────────────────
const data = {
  meta: {
    title: "Bereket G/Alif | Data Analyst & AI Engineer Portfolio",
    description: "Bereket G/Alif — CS graduate, Data Analyst and aspiring AI Engineer from Addis Ababa. 8 projects spanning ML, NLP, credit-risk modeling, fraud detection, web scraping, and dashboards.",
  },
  profile: {
    name:      "Bereket G/Alif",
    headline:  "Data Analyst | Python Developer | Aspiring AI Engineer",
    location:  "Addis Ababa, Ethiopia",
    email:     "bereketgalif21@gmail.com",
    phone:     "+251 937 440 907",
    github:    "https://github.com/bereket5185",
    linkedin:  "https://www.linkedin.com/in/bereket-gebrealif",
    image:     "/assets/bereket-profile.jpg",
  },
  skills: [
    {
      title: "Programming Languages",
      items: ["Python", "PHP", "SQL", "JavaScript", "HTML & CSS"],
    },
    {
      title: "Data Science & Analysis",
      items: [
        "Data Cleaning and Wrangling",
        "Exploratory Data Analysis (EDA)",
        "Feature Engineering",
        "Statistical Analysis",
        "Data Visualization with Matplotlib",
        "Pandas and NumPy",
        "Power BI Dashboard Development",
      ],
    },
    {
      title: "Machine Learning",
      items: [
        "Supervised Learning (Classification & Regression)",
        "Logistic Regression",
        "Perceptron Algorithm",
        "Decision Trees and Random Forest",
        "Model Evaluation (Accuracy, Precision, Recall, F1, MAE, RMSE, R²)",
        "XGBoost and Gradient Boosting",
        "Natural Language Processing (NLP)",
        "TF-IDF Vectorization",
      ],
    },
    {
      title: "Databases",
      items: ["MySQL", "SQLite", "Database Design and SQL Queries"],
    },
    {
      title: "Tools & Environment",
      items: [
        "Git and GitHub",
        "VS Code and Jupyter Notebook",
        "Google Colab",
        "Streamlit",
        "Scikit-learn, Pandas, NumPy, Matplotlib",
      ],
    },
    {
      title: "AI & Data Engineering",
      items: [
        "Machine Learning Workflow",
        "Data Preprocessing Pipelines",
        "Model Training and Deployment Basics",
        "Data Analysis Automation with Python",
      ],
    },
  ],
  projects: [
    {
      num: "01", category: "Machine Learning",
      title: "Spam Email Classification",
      desc: "Binary spam classifier on 193,852 emails using TF-IDF vectorization and a Perceptron neural network. Achieved ~96.8% test accuracy with robust evaluation across precision, recall, and F1 — demonstrating NLP pipeline design from raw text to production-ready predictions.",
      tags: ["Python", "Scikit-learn", "Pandas", "TF-IDF", "Perceptron"],
      github: "https://github.com/bereket5185/_Email-Classification-Using-Perceptron",
      featured: false,
    },
    {
      num: "02", category: "Regression",
      title: "House Price Prediction",
      desc: "Rigorous comparison of univariate, bivariate, and multivariate Linear Regression models on 545 properties. Multivariate model achieved R² = 0.649 with MAE of ~980K. Includes interactive prediction, residual diagnostics, and full error analysis.",
      tags: ["Python", "Scikit-learn", "Pandas", "Seaborn", "Matplotlib"],
      github: "https://github.com/bereket5185/House-Price-Prediction",
      featured: false,
    },
    {
      num: "03", category: "Web Scraping",
      title: "ECA Website Scraper",
      desc: "Production-grade web scraper targeting eca.gov.et (Ethiopian Civil Aviation Authority) using BeautifulSoup and Requests. Extracts structured aviation data, handles pagination and anti-scraping patterns, and exports clean results for downstream analysis.",
      tags: ["BeautifulSoup", "Requests", "Pandas", "Python"],
      github: "https://github.com/bereket5185/Screaping_eca.gov.et",
      featured: false,
    },
    {
      num: "04", category: "Analytics",
      title: "Data Cleaning & EDA",
      desc: "Comprehensive EDA pipeline covering missing value detection and imputation, outlier analysis, skewness correction, feature correlation mapping, and statistical hypothesis testing — turning messy raw data into a clean, analysis-ready dataset.",
      tags: ["EDA", "Data Cleaning", "Visualization"],
      github: "https://github.com/bereket5185/data-cleaning-eda",
      featured: false,
    },
    {
      num: "05", category: "Dashboard",
      title: "Customer Data Dashboard",
      desc: "Interactive business intelligence dashboards built with Power BI and Python. Visualizes customer segmentation, purchase trends, KPIs, and churn indicators — turning raw customer data into actionable insights for decision-makers.",
      tags: ["Power BI", "Python", "Business Insights", "Matplotlib"],
      github: "https://github.com/bereket5185/customer-data-dashboard",
      featured: false,
    },
    {
      num: "06", category: "Machine Learning",
      title: "Customer Churn Prediction",
      desc: "Full ML pipeline predicting customer churn on the Telco dataset using a tuned Decision Tree classifier. Covers EDA, feature engineering, GridSearchCV hyperparameter optimization, evaluation metrics, and a reusable prediction script. Final model persisted with Joblib.",
      tags: ["Python", "Scikit-learn", "Pandas", "Seaborn", "GridSearchCV"],
      github: "https://github.com/bereket5185/customer-churn-decision-tree",
      featured: false,
    },
    {
      num: "07", category: "Machine Learning",
      title: "Credit Card Fraud Detection",
      desc: "Fraud detection system using a Random Forest (Bagging) classifier on 10,000 transactions. Full pipeline includes One-Hot encoding, EDA, SMOTE-style class handling, confusion matrix, ROC curve analysis, and an interactive prediction interface.",
      tags: ["Python", "Scikit-learn", "Random Forest", "Pandas", "Matplotlib"],
      github: "https://github.com/bereket5185/Credit-Card-Fraud-Detection",
      featured: true,
    },
    {
      num: "08", category: "Machine Learning",
      title: "Probability of Default Prediction",
      desc: "End-to-end credit-risk pipeline predicting loan default probability. Implements IV/WoE feature selection, correlation filtering, and RF importance ranking. Trains and tunes Logistic Regression, Random Forest, and XGBoost with cross-validation and isotonic calibration. Evaluated using ROC-AUC, Gini coefficient, KS statistic, and cumulative gains charts.",
      tags: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Matplotlib", "Seaborn"],
      github: "https://github.com/bereket5185/Probability-of-Default-Prediction-and-Feature-Selection",
      featured: true,
    },
  ],
  experience: [
    {
      org:   "Ambo University",
      role:  "BSc in Computer Science",
      desc:  "Graduated in 2016 E.C. with a foundation in programming, databases, algorithms, software engineering, and computer systems.",
    },
    {
      org:   "Commercial Bank of Ethiopia",
      role:  "IT Intern",
      desc:  "Supported network troubleshooting, ATM support, hardware maintenance, software installation, and general technical support.",
    },
    {
      org:   "Current Focus",
      role:  "Data Science and AI Engineering",
      desc:  "Building skills in machine learning, data visualization, Python automation, NLP, SQL development, and intelligent applications.",
    },
  ],
  services: [
    { title: "Data Analysis",      desc: "Cleaning, exploring, and summarizing data for better decisions." },
    { title: "Machine Learning",   desc: "Classification, regression, model evaluation, and practical ML workflows." },
    { title: "Web Scraping",       desc: "Collecting structured datasets from public websites using Python tools." },
    { title: "Dashboards",         desc: "Power BI and Python visuals for business insight and reporting." },
    { title: "Python Automation",  desc: "Scripts that reduce repetitive manual work and improve speed." },
    { title: "SQL Development",    desc: "Queries, data extraction, reporting logic, and database-backed analysis." },
    { title: "Data Cleaning",      desc: "Missing values, outliers, transformation, validation, and wrangling." },
    { title: "Data Visualization", desc: "Charts and visual stories that make findings easier to understand." },
  ],
};

// ── Routes ───────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.render("index", { ...data, flash: null });
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.render("index", { ...data, flash: { type: "error", text: "Please fill in all fields." } });
  }

  // Log to console (wire up nodemailer / a DB here when ready)
  console.log(`\n📩 New message from ${name} <${email}>:\n${message}\n`);

  res.render("index", { ...data, flash: { type: "success", text: "Message received — thanks! I will be in touch soon." } });
});

// ── 404 ──────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).send("Page not found"));

// ── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`Portfolio running → http://localhost:${PORT}`));
