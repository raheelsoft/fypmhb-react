import React from 'react';

import { Typography } from 'antd';

import { appColor } from 'common/appConstants';

const { Title, Text } = Typography;

export function ATitle(props) {
  return (
    <Title
      {...props}
      style={{ ...props.style, color: appColor }}
      level={props.level || 1}
    >
      {props.children}
    </Title>
  );
}

export function AText(props) {
  return (
    <Text {...props} style={{ color: appColor }}>
      {props.children}
    </Text>
  );
}
