import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  .lds-ring {
    display: inline-block;
    position: relative;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border: 3px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ theme }) => theme.colors.primary} transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = ({ className, size = 20 }) => (
  <Wrapper className={className} size={size}>
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </Wrapper>
);

export default Spinner;
