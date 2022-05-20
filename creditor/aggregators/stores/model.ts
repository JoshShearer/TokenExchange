module.exports = ({ paths = [] }) => {
  const filtered = paths.filter((item) => item.split(path.sep).length > 1).sort();

  const imports = filtered.map(
    (item) => `import { ${item.replace(/\//g, '_')} } from '#src/${item}';`
  );

  const types = filtered.map(
    (item) =>
      `  ${item.replace(/\//g, '_')}: typeof ${item.replace(/\//g, '_')};`
  );

  const models = filtered.map((item) => `  ${item.replace(/\//g, '_')},`);

  return [
    '/* CREDITOR_GENERATED */',
    "import { RematchRootState, RematchDispatch, Models } from '@rematch/core';",
    '',
    ...imports,
    '',
    'export interface RootModel extends Models<RootModel> {',
    ...types,
    '}',
    '',
    'export const models: RootModel = {',
    ...models,
    '}',
    '',
    'export type RootState = RematchRootState<RootModel>;',
    'export type Actions = RematchDispatch<RootModel>;',
  ].join(eol);
};
