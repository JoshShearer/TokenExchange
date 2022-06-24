import { createSelector, createStructuredSelector } from '#src/models/utils';

const selected = createStructuredSelector({
  property1: (root, props) => true,
  property2: (root, props) => false,
});

export const CREDITOR_UNDERSCORE_NAME = createSelector(
  selected,
  ({ property1, property2 }) => {
    return property1 && property2;
  }
);
