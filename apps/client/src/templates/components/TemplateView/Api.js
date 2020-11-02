import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import queryString from 'qs';
import { CopyButton, DropDown, flexMiddle, Button } from 'shared/components';
import ExternalIcon from 'shared/assets/icons/external.svg';
import EmailForm from './EmailForm';

const TYPES = {
	email: {
		label: 'Email',
		method: 'POST',
		urlSuffix: '/email',
	},
	pdf: {
		label: 'PDF',
		method: 'GET',
		urlSuffix: '?type=pdf',
	},
	html: {
		label: 'HTML',
		method: 'GET',
		urlSuffix: '?type=html',
	},
	image: {
		label: 'Image',
		method: 'GET',
		urlSuffix: '?type=png',
	},
};

const InputRow = styled.div`
	${flexMiddle};
	position: relative;
	border: 1px solid ${({ theme }) => theme.colors.gray2};
	background: ${({ theme }) => theme.colors.gray4};
	color: ${({ theme }) => theme.colors.dark};
	border-radius: 5px;
	padding: 7px 5px;
	margin-bottom: 18px;
	transition: border-color 200ms;
`;

const Method = styled.div`
	color: green;
	font-weight: bold;
	font-size: 11px;
	margin-right: 3px;
`;

const InsideInput = styled.input.attrs(() => ({ readOnly: true }))`
	flex: 1;
	border: none;
	background: transparent;
	outline: none;
`;

const OpenButton = styled(Button)`
	svg {
		width: 20px;
		height: 20px;
		margin: 0 10px -3px 15px;
	}
`;

const Api = ({ dynamicProps, onChange, baseTemplateUrl }) => {
	const [selectedType, setSelectedType] = useState('email');

	const options = useMemo(() => Object.entries(TYPES).map(([key, { label }]) => ({ label, value: key })), []);

	const qsProps = useMemo(() => queryString.stringify(dynamicProps), [dynamicProps]);

	const url = useMemo(() => {
		if (selectedType === 'email') {
			return `${baseTemplateUrl}${TYPES[selectedType].urlSuffix}`;
		}
		return `${baseTemplateUrl}${TYPES[selectedType].urlSuffix}${qsProps ? `&${qsProps}` : qsProps}`;
	}, [baseTemplateUrl, qsProps, selectedType]);

	return (
		<>
			<DropDown selectedValue={selectedType} onChange={({ value }) => setSelectedType(value)} options={options} />

			<InputRow>
				<Method>{TYPES[selectedType].method}</Method>
				<InsideInput value={url} />
				<CopyButton copyText={url} />
			</InputRow>

			{selectedType === 'email' ? (
				<EmailForm dynamicProps={dynamicProps} baseTemplateUrl={url} />
			) : (
				<OpenButton onClick={() => window.open(url)}>
					Open Template
					<ExternalIcon />
				</OpenButton>
			)}
		</>
	);
};

export default Api;
