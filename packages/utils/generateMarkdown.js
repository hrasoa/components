function generateTitle(title) {
  return `### \`<${title}>\``;
}

function generateProp(propName, prop) {
  const props = [
    `**${propName}** ${(prop.required ? '(required)' : '')}`,
    generatePropType(prop.flowType),
  ];
  if (prop.defaultValue) {
    props.push(generateDefaultValue(prop));
  }
  return props.join('\n\n');
}

function generatePropType(flowType) {
  if (flowType.type === 'function') {
    return `type: function ${flowType.raw}`;
  } else if (flowType.raw) {
    return `type: ${flowType.raw}`;
  }
  return `type: ${flowType.name}`;
}

function generateDefaultValue(prop) {
  return `default value: \`${prop.defaultValue.value}\``;
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
  ].join('\n\n');

  return markdownString;
}

module.exports = generateMarkdown;
