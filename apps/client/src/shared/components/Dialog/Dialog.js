import React, { useRef } from 'react';
import styled from 'styled-components';
import { fadeIn } from 'style/animations';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { Card } from '../Card';
import { FlexCenter, flexColumn, Flex } from '../Flex';
import { Header2 } from '../Typography';
import Button from '../Button';
import Spinner from '../Spinner';

const Layout = styled(FlexCenter)`
	position: fixed;
	background: ${({ theme }) => theme.colors.dark}60;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 2;
	padding: 20px 0;
`;

const Wrapper = styled(Card).attrs(() => ({ level: 4 }))`
	${flexColumn};
	border-radius: 4px;
	width: 80%;
	max-width: 500px;
	padding: 16px 25px;
	box-sizing: border-box;
	animation: ${fadeIn} 200ms;
	max-height: 100%;
	overflow: auto;
`;

const Title = styled(Header2)`
	margin-bottom: 20px;
`;

const Buttons = styled(Flex)`
	flex-direction: row-reverse;
	margin-top: 16px;

	${Button} {
		margin-left: 10px;
		padding: 13px 36px;
		font-size: 15px;
	}
`;

const Dialog = ({
	onClose,
	title,
	children,
	showConfirm = true,
	confirmButtonText = 'Confirm',
	onConfirm,
	showCancel = true,
	cancelButtonText = 'Cancel',
	onCancel,
	loading,
}) => {
	const ref = useRef();
	useOnClickOutside(ref, onClose);

	return (
		<Layout>
			<Wrapper ref={ref}>
				{title && <Title>{title}</Title>}

				{children}

				{(showConfirm || showCancel) && (
					<Buttons>
						{showConfirm && (
							<Button disabled={loading} onClick={onConfirm}>
								{loading ? <Spinner /> : confirmButtonText}
							</Button>
						)}

						{showCancel && (
							<Button buttonType="tertiary" disabled={loading} onClick={onCancel}>
								{cancelButtonText}
							</Button>
						)}
					</Buttons>
				)}
			</Wrapper>
		</Layout>
	);
};

export default Dialog;
