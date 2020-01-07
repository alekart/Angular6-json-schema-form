const fs = require('fs');
const {exec} = require('child_process');
const projectsDir = './projects';
let projects;
let next = process.argv[2] === 'next';
let version = process.argv[next ? 3 : 2] || null;

if (!version) {
  throw new Error('NO VERSION PROVIDED');
}

if (!/^\d+\.\d+\.\d+(\.\d+|[-]\w+\.\d+?)?$/.test(version)) {
  throw new Error('INVALID VERSION FORMAT');
}

projects = getProjects();

function getProjects() {
  return fs.readdirSync(projectsDir);
}

function loadPckg(path) {
  return JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'));
}

function savePckg(path, data) {
  const json = JSON.stringify(data, null, 2) + '\n';
  fs.writeFileSync(`${path}/package.json`, json);
}

function setPckgVersion(path, version) {
  let pckg = loadPckg(path);
  if (pckg.version === version) {
    throw new Error('SETTING SAME VERSION IS NOT A BUMP');
  }
  const data = Object.assign({}, pckg, {version: version});
  savePckg(path, data);
}

for (let i = 0; i < projects.length; i++) {
  setPckgVersion(`${projectsDir}/${projects[i]}`, version);
}

const commitMessage = `Bump ${next ? 'next ' : ''}projects versions to ${version}`;

exec(`git commit projects/${projects.join(' projects/')} -m "${commitMessage}"`, (err, stdout) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(stdout);
});
