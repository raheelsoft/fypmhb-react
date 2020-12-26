import React, { lazy, Suspense } from 'react';

import LoadingIndicator from 'common/components/LoadingIndicator';

const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);

  return props => (
    <Suspense fallback={<LoadingIndicator />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
