const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');
const {map, forEach} = require('lodash/fp');
const yargs = require('yargs').argv;
const loadProjectJson = require('./load-project-json');
const {bumpVersion} = require('./methods/bump-version');

const projectsDir = './projects';

/* ARGUMENTS FROM THE CLI */
/**
 * Indicate the bump operation to proceed on the version
 * Possible bumpOperations can be chained with comma separator (next,date):
 * - snap : will add '-snapshot' suffix
 * - next : will bump patch and add 'snapshot' suffix
 * - major : will bump major
 * - minor : will bump minor
 * - patch : will bump patch
 * - hash : will add the
 * - date : will add current date in MMDD format
 * - x.x.x or any other semver version
 *
 * @type {string}
 */
const bumpOperation = yargs._[0];
const nextIncArgument = yargs._[1];
/**
 * Provide `--nocommit` CLI argument to prevent to commit the
 * packages.json files on git after the bump.
 */
let shouldNotCommit = yargs.nocommit;

/**
 * @type {{name: string, version: string, engines: {node: string}, remotePath: {root: string, acc: string, release: string}}}
 */
const projectJson = loadProjectJson('./package.json');
const currentVersion = projectJson.version;
const projects = getProjects();
const bumpOperations = bumpOperation.split(',');
let newVersion;

if (bumpOperations && bumpOperations.length > 1) {
  newVersion = currentVersion;
  forEach((operation) => {
    newVersion = bumpVersion(newVersion, operation);
  }, bumpOperations);
} else {
  newVersion = bumpVersion(currentVersion, bumpOperation, nextIncArgument);
}

const packages = [
  ...(map((pck) => {
    return path.resolve(projectsDir, pck, 'package.json');
  }, projects)),
  path.resolve('./package.json'),
];

if (currentVersion === newVersion) {
  console.log('Current version is the same as the new version. Nothing to do.');
  process.exit(0);
}

updatePackages(packages, newVersion);

if (bumpOperation !== 'hash' && !shouldNotCommit) {
  const commitMessage = bumpOperation === 'next'
    ? `Bump next version to ${newVersion}`
    : `Bump version to ${newVersion}`;
  exec(`git commit ${packages.join(' ')} -m "${commitMessage}"`);
}

// eslint-disable-next-line no-console
console.log(newVersion);

/**
 * Update all packages with provided version string
 * @param packages {string[]}
 * @param version {string}
 */
function updatePackages(packages, version) {
  forEach((pckgPath) => {
    let packageData = setPackageVersion(loadProjectJson(pckgPath), version);
    packageData = updateDependenciesProjects(packageData, version);
    savePackage(packageData, pckgPath);
  }, packages);
}

/**
 * Return list of folders present in the projects folder
 * @returns {string[]}
 */
function getProjects() {
  try {
    return fs.readdirSync(projectsDir);
  } catch (e) {
    console.error('ERROR', e.message);
    return [];
  }
}

/**
 * Set Package version in provided package file data and return updated package content
 * @param packageData {{}}
 * @param version {string}
 * @returns {{}}
 */
function setPackageVersion(packageData, version) {
  return {...packageData, version};
}

/**
 * Will check the dependencies and update the version for each @mmv project
 * @param packageData {{dependencies: {[string]: string}, [string]: string}}
 * @param version {string}
 */
function updateDependenciesProjects(packageData, version) {
  forEach((project) => {
    if (packageData.dependencies && packageData.dependencies[`@mmv/${project}`]) {
      packageData.dependencies[`@mmv/${project}`] = `^${version}`;
    }
  }, projects);
  return packageData;
}

/**
 * Write updated package file content
 * @param packageData {{}}
 * @param packagePath {string}
 */
function savePackage(packageData, packagePath) {
  const fileContent = `${JSON.stringify(packageData, null, 2)}\n`;
  fs.writeFileSync(packagePath, fileContent, 'utf-8');
}

/**
 * Preconfigured execSync
 * @param command {string}
 */
function exec(command) {
  const result = execSync(command);
  return result.toString('utf8');
}
