import React from 'react';

import { Card } from 'antd';

export default function index(props) {
  return (
    <Card {...props} bodyStyle={props.bodyStyle || { padding: '16px' }}>
      {props.children}
    </Card>
  );
}
