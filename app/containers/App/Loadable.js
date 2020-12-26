/**
 * Asynchronously loads the component for CustomerProfile
 */

import React from 'react';
import loadable from 'common/utils/loadable';
import LoadingIndicator from 'common/components/LoadingIndicator';

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
