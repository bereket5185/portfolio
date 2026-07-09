const { execSync } = require("child_process");
const TOKEN  = process.argv[2];
const REMOTE = `https://${TOKEN}@github.com/bereket5185/portfolio.git`;

function run(cmd) {
  console.log(`> ${cmd.replace(TOKEN, "***")}`);
  const out = execSync(cmd, { encoding: "utf8" });
  if (out && out.trim()) console.log(out.trim());
}

run(`git config --global --add safe.directory C:/Users/IGUS/Documents/Codex/portfolio-web`);
run(`git config --global user.email "bereket5185@users.noreply.github.com"`);
run(`git config --global user.name "Bereket G/alif"`);
run("git add -A");
try { run(`git commit -m "fix: clean structure — remove stale static files, add vercel.json"`); }
catch { console.log("Nothing to commit."); }
try { run(`git remote add origin ${REMOTE}`); }
catch { run(`git remote set-url origin ${REMOTE}`); }
run("git push -u origin main");
console.log("\nDone — https://github.com/bereket5185/portfolio");
