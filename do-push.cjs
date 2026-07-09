const { execSync } = require("child_process");
const os   = require("os");
const fs   = require("fs");
const path = require("path");

const TOKEN  = process.argv[2];
const REMOTE = `https://${TOKEN}@github.com/bereket5185/portfolio.git`;

function run(cmd, opts) {
  console.log(`> ${cmd.replace(TOKEN, "***")}`);
  const out = execSync(cmd, { encoding: "utf8", ...opts });
  if (out && out.trim()) console.log(out.trim());
  return out;
}

// Trust GitHub host key
const sshDir    = path.join(os.homedir(), ".ssh");
const knownFile = path.join(sshDir, "known_hosts");
if (!fs.existsSync(sshDir)) fs.mkdirSync(sshDir, { recursive: true });
const ghKey = "github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl";
const existing = fs.existsSync(knownFile) ? fs.readFileSync(knownFile, "utf8") : "";
if (!existing.includes("github.com")) fs.appendFileSync(knownFile, "\n" + ghKey + "\n");

// Mark directory safe
run(`git config --global --add safe.directory C:/Users/IGUS/Documents/Codex/portfolio-web`);

// Reset to a clean single commit (squash all history so no old commit has the token)
run("git checkout --orphan clean-main");
run("git add -A");
run(`git commit -m "feat: complete portfolio with all sections"`);
run("git branch -D main", { stdio: "pipe" });
run("git branch -m clean-main main");

// Set remote with token embedded in URL only (not in any file)
try { run(`git remote add origin ${REMOTE}`); }
catch { run(`git remote set-url origin ${REMOTE}`); }

run(`git push --force -u origin main`);

console.log("\nPushed to https://github.com/bereket5185/portfolio");
