import React from 'react';

import { Form } from 'antd';
import 'antd/dist/antd.css';

export default function index(props) {
  return (
    <Form {...props} layout={props.layout || 'vertical'}>
      {props.children}
    </Form>
  );
}

export const FormItem = Form.Item;
