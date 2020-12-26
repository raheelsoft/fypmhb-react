import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const circleFadeDelay = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const Circle = props => {
  const CirclePrimitive = styled.div`
    animation: ${circleFadeDelay} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    -webkit-transform-origin: 40px 40px;
    -ms-transform-origin: 40px 40px;
    transform-origin: 40px 40px;
    &:after {
      content: " ";
      display: block;
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #5d1049;
      margin: -4px 0 0 -4px;
    }
    ${props.delay &&
      `
      &:nth-child(${props.child}){
        -webkit-animation-delay: ${props.delay}s;
        animation-delay: ${props.delay}s;}
      };
      &:nth-child(${props.child})&:after {
      top: ${props.top}px;
      left: ${props.left}px;
      `}
    }
  `;
  return <CirclePrimitive />;
};

Circle.propTypes = {
  delay: PropTypes.number.isRequired,
  child: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
};

export default Circle;
