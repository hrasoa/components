const fs = require('fs');
const os = require('os');
const path = require('path');
const fm = require('front-matter');

const packages = fs.readdirSync('packages');
const pkgWithDocs = packages
  .map(pkgFolder => ({
    root: path.join('packages', pkgFolder),
    rootDoc: path.join('packages', pkgFolder, 'docs'),
    toc: path.join('packages', pkgFolder, 'docs/toc.md'),
  }))
  .filter(pkg => fs.existsSync(pkg.toc));

pkgWithDocs.forEach((pkg) => {
  const md = fs.createWriteStream(path.join(pkg.root, 'README.md'));
  const pkgJson = require(path.resolve(process.cwd(), path.join(pkg.root, 'package.json')));
  const toc = readFile(pkg.toc);
  const content = fm(toc);
  md.write(`# ${pkgJson.name}`);
  md.write('\n\n');
  md.write(pkgJson.description);
  md.write('\n\n');
  md.write(generateInstall(pkgJson));
  md.write('\n\n');
  content.attributes.forEach((attribute) => {
    const page = readFile(path.join(pkg.rootDoc, attribute));
    const pageContent = fm(page);
    md.write(`## ${pageContent.attributes.title}`);
    md.write('\n\n');
    if (pageContent.body) md.write(pageContent.body);
    console.log(pageContent);
    console.log();
    md.write('\n');
  });
  md.end(os.EOL);
});

function generateInstall(pkgJson) {
  return [
    '## Install',
    '',
    '```bash',
    `npm install --save ${pkgJson.name}`,
    `yarn add ${pkgJson.name}`,
    '```',
  ].join('\n');
}

function readFile(p) {
  return fs.readFileSync(p, { encoding: 'utf8' });
}
