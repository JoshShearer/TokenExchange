module.exports = ({ paths = [] }) => {
  const filtered = paths.filter((item) => item.split('/').length > 1).sort();

  const _exports = filtered.map(
    (item) => `export { ${item.replace(/\//g, '_')} } from '#src/${item}';`
  );

  return ['/* CREDITOR_GENERATED */', '', ..._exports, ''].join('\n');
};
