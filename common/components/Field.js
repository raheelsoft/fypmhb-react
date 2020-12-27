import React from 'react';

import { FormItem } from './Form';

export default Component => ({ input, meta, label, children, ...rest }) => {
  const hasError = meta && meta.touched && meta.invalid;

  return (
    <FormItem
      label={label}
      help={hasError && meta.error}
      validateStatus={hasError ? 'error' : 'success'}
      style={{ marginBottom: 0 }}
    >
      <Component {...input} {...rest}>
        {children}
      </Component>
    </FormItem>
  );
};
