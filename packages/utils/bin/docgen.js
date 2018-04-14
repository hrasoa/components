#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const reactDocs = require('react-docgen');
const generateMarkdown = require('../generateMarkdown');

const md = fs.createWriteStream(resolve('README.md'));
const pkg = require(resolve('package.json'));
const docgenRc = readFile('.docgenrc');
const usage = readFile('docs/USAGE.md');
const docgenJson = JSON.parse(docgenRc);

md.write(`# ${pkg.name}`);
md.write(`

> ${pkg.description}

## Installation

\`\`\`bash
$ npm install ${pkg.name} --save
$ yarn add ${pkg.name}
\`\`\`

## General usage

${usage}

## Api
`);

docgenJson.components.forEach((componentPath) => {
  const src = readFile(componentPath);
  const componentInfos = reactDocs.parse(src);
  md.write(generateMarkdown(componentInfos));
  md.write('\n\n');
});

md.end();

function readFile(p) {
  return fs.readFileSync(resolve(p), { encoding: 'utf8' });
}

function resolve(p) {
  return path.resolve(process.cwd(), p);
}
