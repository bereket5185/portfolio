const { execSync } = require("child_process");
const os   = require("os");
const fs   = require("fs");
const path = require("path");

const TOKEN  = process.argv[2];
const REMOTE = `https://${TOKEN}@github.com/bereket5185/portfolio.git`;
const DIR    = "C:/Users/IGUS/Documents/Codex/portfolio-web";

function run(cmd) {
  console.log(`> ${cmd.replace(TOKEN, "***")}`);
  const out = execSync(cmd, { encoding: "utf8" });
  if (out && out.trim()) console.log(out.trim());
  return out;
}

// Ensure .ssh/known_hosts has GitHub
const sshDir    = path.join(os.homedir(), ".ssh");
const knownFile = path.join(sshDir, "known_hosts");
if (!fs.existsSync(sshDir)) fs.mkdirSync(sshDir, { recursive: true });
const ghKey  = "github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl";
const existing = fs.existsSync(knownFile) ? fs.readFileSync(knownFile, "utf8") : "";
if (!existing.includes("github.com")) fs.appendFileSync(knownFile, "\n" + ghKey + "\n");

run(`git config --global --add safe.directory ${DIR}`);
run(`git config --global user.email "bereket5185@users.noreply.github.com"`);
run(`git config --global user.name "Bereket G/alif"`);

// Stage everything new
run("git add -A");

// Commit (skip if nothing to commit)
try {
  run(`git commit -m "refactor: convert to Node.js/Express + EJS"`);
} catch {
  console.log("Nothing new to commit.");
}

// Set remote with token and force-push
try { run(`git remote add origin ${REMOTE}`); }
catch { run(`git remote set-url origin ${REMOTE}`); }

run("git push -u origin main");

console.log("\nDone — https://github.com/bereket5185/portfolio");
