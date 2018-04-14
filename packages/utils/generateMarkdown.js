function generateTitle(title) {
  return `### \`<${title}>\``;
}

function generateProp(propName, prop) {
  const props = [
    `\`${propName}\` ${(prop.required ? '(required)' : '')}`,
    prop.description || '',
    generatePropType(prop.flowType),
    generateDefaultValue(prop),
  ];
  return props
    .filter(propInfo => !!propInfo.length)
    .join('\n\n');
}

function generatePropType(flowType) {
  if (flowType.type === 'function') {
    return formatType(`function ${flowType.raw}`);
  } else if (flowType.raw) {
    return formatType(flowType.raw);
  }
  return formatType(flowType.name);
}

function formatType(type) {
  return `type: ${type}`;
}

function generateDefaultValue(prop) {
  return prop.defaultValue ? `default value: \`${prop.defaultValue.value}\`` : '';
}

function generateProps(props) {
  const title = '**Props**';
  return [
    title,
    Object.keys(props)
      .sort()
      .filter(propName =>
        !(props[propName].description && props[propName].description.match(/@private/)))
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
