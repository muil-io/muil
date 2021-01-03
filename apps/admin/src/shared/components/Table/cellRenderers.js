import React from 'react';
import dayjs from 'dayjs';
import Button from '../Button';
import { DATE_AND_TIME_FORMAT } from 'shared/constants';

export const dateRenderer = ({ rowData, dataKey }) =>
  dayjs(rowData[dataKey]).format(DATE_AND_TIME_FORMAT);

export const actionRenderer = ({ cellData: { label, onClick } }) =>
  onClick ? (
    <Button buttonType="tertiary" onClick={onClick}>
      {label}
    </Button>
  ) : null;
