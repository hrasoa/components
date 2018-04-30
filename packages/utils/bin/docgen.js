#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const reactDocs = require('react-docgen');
const generateMarkdown = require('../generateMarkdown');

const md = fs.createWriteStream(resolve('README.md'));
const pkg = require(resolve('package.json'));
const docgenJson = require(resolve('docs/docgen.js'));
const usage = readFile('docs/USAGE.md');

md.write(`# ${pkg.name}`);
md.write(`

${pkg.description}

## Installation

\`\`\`bash
$ npm install ${pkg.name} --save
$ yarn add ${pkg.name}
\`\`\`

## General usage

${usage}

## Api`);

docgenJson.components.forEach((componentPath) => {
  const src = readFile(componentPath);
  const componentInfos = reactDocs.parse(src);
  md.write('\n\n');
  md.write(generateMarkdown(componentInfos));
});
md.write(os.EOL);
md.end();

function readFile(p) {
  return fs.readFileSync(resolve(p), { encoding: 'utf8' });
}

function resolve(p) {
  return path.resolve(process.cwd(), p);
}
