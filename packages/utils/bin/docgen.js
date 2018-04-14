#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const reactDocs = require('react-docgen');
const generateMarkdown = require('../generateMarkdown');

const md = fs.createWriteStream(path.resolve(process.cwd(), 'README.md'));
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const docgenRc = fs.readFileSync(path.resolve(process.cwd(), '.docgenrc'), { encoding: 'utf8' });
const usage = fs.readFileSync(path.resolve(process.cwd(), 'docs/USAGE.md'), { encoding: 'utf8' });
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
  const src = fs.readFileSync(path.resolve(process.cwd(), componentPath), { encoding: 'utf8' });
  const componentInfos = reactDocs.parse(src);
  md.write(generateMarkdown(componentInfos));
  md.write('\n\n');
});

md.end();
