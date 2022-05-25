module.exports = ({ paths = [] }) => {
  const imports = paths.map(
    (item) =>
      `import { navigation as ${item.replace(
        /\//g,
        '_'
      )} } from '#src/${item}';`
  );

  const navigations = paths.map((item) => `  ${item.replace(/\//g, '_')},`);

  return (
    [
      '/* CREDITOR_GENERATED */',
      ...imports,
      '',
      'export const navigation = [',
      ...navigations,
      ']',
      '',
    ].join('\n') + ';'
  );
};
