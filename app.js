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
    title: "Bereket G/Alif | Data, Python & AI Portfolio",
    description: "Portfolio of Bereket G/Alif, a Data Analyst, Python Developer, and aspiring AI Engineer based in Addis Ababa, Ethiopia.",
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
      desc: "Binary email spam classifier using TF-IDF vectorization and a Perceptron neural network on 193,852 emails. Achieved ~96.8% test accuracy with minimal overfitting, evaluated across accuracy, precision, recall, and F1 score.",
      tags: ["Python", "Scikit-learn", "Pandas", "TF-IDF", "Perceptron"],
      github: "https://github.com/bereket5185/_Email-Classification-Using-Perceptron",
    },
    {
      num: "02", category: "Regression",
      title: "House Price Prediction",
      desc: "Compared univariate, bivariate, and multivariate Linear Regression models to predict house prices. The multivariate model achieved R² = 0.649 with MAE of ~980K, including interactive prediction and error analysis on 545 properties.",
      tags: ["Python", "Scikit-learn", "Pandas", "Seaborn", "Matplotlib"],
      github: "https://github.com/bereket5185/House-Price-Prediction",
    },
    {
      num: "03", category: "Web Scraping",
      title: "ECA Website Scraper",
      desc: "Built a web scraper targeting eca.gov.et (Ethiopian Civil Aviation Authority) to collect structured data for analysis, using BeautifulSoup and Requests, with results exported for further cleaning and exploration.",
      tags: ["BeautifulSoup", "Requests", "Pandas", "Python"],
      github: "https://github.com/bereket5185/Screaping_eca.gov.et",
    },
    {
      num: "04", category: "Analytics",
      title: "Data Cleaning & EDA",
      desc: "Performed exploratory data analysis including missing value handling, outlier detection, data transformation, visualization, and statistical analysis.",
      tags: ["EDA", "Data Cleaning", "Visualization"],
      github: "https://github.com/bereket5185/data-cleaning-eda",
    },
    {
      num: "05", category: "Dashboard",
      title: "Customer Data Dashboard",
      desc: "Created dashboards using Power BI and Python to visualize business insights and make customer data easier to understand.",
      tags: ["Power BI", "Python", "Business Insights"],
      github: "https://github.com/bereket5185/customer-data-dashboard",
    },
    {
      num: "06", category: "Machine Learning",
      title: "Customer Churn Prediction",
      desc: "Built a classification model to predict customer churn using a Decision Tree on the Telco dataset. Covers EDA, preprocessing, feature engineering, model training, GridSearchCV hyperparameter tuning, evaluation metrics, and a prediction script. Final model saved with Joblib.",
      tags: ["Python", "Scikit-learn", "Pandas", "Seaborn", "GridSearchCV"],
      github: "https://github.com/bereket5185/customer-churn-decision-tree",
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
