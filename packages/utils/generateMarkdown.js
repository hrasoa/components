function generateTitle(title) {
  return `### \`<${title}>\``;
}

function generateProp(propName, prop) {
  return [
    `**${propName}** ${(prop.required ? '(required)' : '')}`,
  ].join('\n\n');
}

function generateProps(props) {
  const title = 'Props';
  return [
    title,
    Object.keys(props)
      .sort()
      .map(propName => generateProp(propName, props[propName]))
      .join('\n\n'),
  ].join('\n\n');
}

function generateMarkdown(componentInfo) {
  const markdownString = [
    generateTitle(componentInfo.displayName),
    componentInfo.description,
    generateProps(componentInfo.props),
  ].join('\n');

  return markdownString;
}

module.exports = generateMarkdown;
