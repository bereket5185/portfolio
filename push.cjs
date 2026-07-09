const { execSync } = require("child_process");

const remote = "https://github.com/bereket5185/portfolio.git";
const dir = "C:/Users/IGUS/Documents/Codex/portfolio-web";

function run(cmd) {
  console.log(`> ${cmd}`);
  const out = execSync(cmd, { encoding: "utf8", stdio: ["inherit", "pipe", "pipe"] });
  if (out) process.stdout.write(out);
  return out;
}

try {
  // Mark directory as safe for git
  run(`git config --global --add safe.directory ${dir}`);

  // Init if not already a repo
  try {
    run("git rev-parse --git-dir");
    console.log("Already a git repo.");
  } catch {
    run("git init");
    run("git checkout -b main");
  }

  // Set remote
  try {
    run(`git remote add origin ${remote}`);
  } catch {
    run(`git remote set-url origin ${remote}`);
  }

  // Set identity if not already configured
  try { run("git config user.email"); } catch {
    run(`git config --global user.email "bereket5185@users.noreply.github.com"`);
    run(`git config --global user.name "Bereket G/alif"`);
  }

  // Stage all, commit, push
  run("git add -A");
  run(`git commit -m "feat: complete portfolio with all sections"`);

  // Ensure branch is named main
  try { run("git branch -m master main"); } catch { /* already main */ }

  // Trust GitHub's SSH host key
  const os = require("os");
  const fs = require("fs");
  const sshDir = require("path").join(os.homedir(), ".ssh");
  if (!fs.existsSync(sshDir)) fs.mkdirSync(sshDir, { recursive: true });
  const knownHosts = require("path").join(sshDir, "known_hosts");
  const githubKey = "github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl";
  const existing = fs.existsSync(knownHosts) ? fs.readFileSync(knownHosts, "utf8") : "";
  if (!existing.includes("github.com")) fs.appendFileSync(knownHosts, "\n" + githubKey + "\n");
  console.log("GitHub host key trusted.");

  run("git push -u origin main");

  console.log("\nDone — pushed to " + remote);
} catch (e) {
  console.error(e.stderr || e.message);
  process.exit(1);
}
