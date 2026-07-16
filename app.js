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
    { title: "Programming",    items: ["Python", "SQL", "HTML and CSS", "JavaScript"] },
    { title: "Data Science",   items: ["Pandas and NumPy", "Data cleaning and wrangling", "Feature engineering", "Matplotlib visualization"] },
    { title: "Machine Learning", items: ["Classification and regression", "NLP and TF-IDF", "Perceptron and logistic regression", "Decision trees and random forest"] },
    { title: "Tools & Databases", items: ["MySQL and SQLite", "Git and GitHub", "VS Code and Jupyter Notebook", "Google Colab and Power BI"] },
  ],
  projects: [
    {
      num: "01", category: "Machine Learning",
      title: "Spam Email Classification",
      desc: "Built a machine learning model that classifies emails into spam or ham using TF-IDF vectorization and the Perceptron algorithm, with accuracy, precision, recall, and F1 score evaluation.",
      tags: ["Python", "Scikit-learn", "Pandas", "NumPy"],
      github: "https://github.com/bereket5185/spam-email-classification",
    },
    {
      num: "02", category: "Regression",
      title: "House Price Prediction",
      desc: "Developed a regression model for predicting house prices using preprocessing, feature engineering, train/test splitting, model training, and error analysis.",
      tags: ["Python", "Pandas", "Scikit-learn"],
      github: "https://github.com/bereket5185/house-price-prediction",
    },
    {
      num: "03", category: "Web Scraping",
      title: "Ethiopian News Web Scraper",
      desc: "Created a web scraper to collect Amharic news articles for NLP and data analysis, then structured the results for cleaning and exploration.",
      tags: ["BeautifulSoup", "Requests", "Pandas"],
      github: "https://github.com/bereket5185/ethiopian-news-web-scraper",
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
