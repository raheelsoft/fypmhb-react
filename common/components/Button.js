import React from 'react';

import { Button } from 'antd';
import 'antd/dist/antd.css';

export default function index(props) {
  return (
    <Button
      {...props}
      type={props.type || 'primary'}
      htmlType={props.htmlType || 'submit'}
    >
      {props.children}
    </Button>
  );
}
