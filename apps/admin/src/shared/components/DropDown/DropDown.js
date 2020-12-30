import React, { useMemo, useState, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Header3 } from '../Typography';
import ArrowIcon from 'shared/assets/icons/arrow.svg';
import { FlexMiddle, FlexColumn } from '../Flex';
import { card } from '../Card';
import useOnClickOutside from 'shared/hooks/useOnClickOutside';
import { slideIn } from 'style/animations';

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const SelectValue = styled(FlexMiddle)`
  cursor: pointer;
  color: ${({ theme, isEmpty }) => (isEmpty ? theme.colors.gray1 : theme.colors.dark)};
`;

const Arrow = styled(ArrowIcon)`
  width: 12px;
  height: 12px;
  transform: rotate(90deg);
  margin-left: 10px;
  path {
    fill: ${({ theme }) => theme.colors.dark};
  }
`;

const Options = styled(FlexColumn).attrs(() => ({ level: 1 }))`
  ${card};
  padding: 0;
  background: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 0;
  ${({ location: { left, right, top, bottom } = {} }) =>
    css`
      ${left !== undefined && `left: ${left}px;`}
      ${right !== undefined && `right: ${right}px;`}
			${top !== undefined && `top: ${top}px;`}
			${bottom !== undefined && `bottom: ${bottom}px;`}
    `}

  min-width: 120px;
  transform-origin: 0 0;
  animation: ${slideIn} 200ms;
`;

const hoverOption = css`
  background: ${({ theme }) => theme.colors.gray3};
  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const Option = styled.div`
  padding: 10px 16px;
  white-space: nowrap;
  cursor: pointer;

  ${({ theme, isSelected }) =>
    isSelected &&
    css`
      color: ${theme.colors.primary};
      ${hoverOption};
    `};

  &:hover {
    ${hoverOption};
  }
`;

const DropDown = ({
  className,
  selectedValue,
  placeHolder,
  options,
  onChange,
  children,
  location,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const selectedLabel = useMemo(() => options.find(({ value }) => value === selectedValue)?.label, [
    options,
    selectedValue,
  ]);

  const handleChange = useCallback(
    (option) => {
      onChange?.(option);
      setIsOpen(false);
    },
    [onChange],
  );

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <Wrapper className={className} ref={ref}>
      <SelectValue isEmpty={!selectedLabel && !children} onClick={() => setIsOpen(!isOpen)}>
        <Header3>
          {selectedLabel || children || placeHolder}
          <Arrow />
        </Header3>
      </SelectValue>

      {isOpen && (
        <Options location={location}>
          {options.map((option) => (
            <Option
              key={option.value}
              isSelected={option.value === selectedValue}
              onClick={() => option.onClick?.() || handleChange(option)}
            >
              {option.label}
            </Option>
          ))}
        </Options>
      )}
    </Wrapper>
  );
};

export default DropDown;
