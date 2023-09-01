import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavBar = styled(AppBar)`
	-webkit-box-shadow: 0px 2px 33px 14px rgba(156, 156, 156, 0.32) !important;
	-moz-box-shadow: 0px 2px 33px 14px rgba(156, 156, 156, 0.32) !important;
	box-shadow: 0px 2px 33px 14px rgba(156, 156, 156, 0.32) !important;
	background-color: white !important;
	margin-bottom: 100px;
`;

export const NavLinks = styled.div`
	margin-left: 25px;
	display: flex;
`;

export const StyledLink = styled(Link)`
	text-decoration: none;
	font-weight: 600;
	border-bottom: '1px solid transparent';
	color: #414141;
	margin-right: 15px;
	padding: 3px;

	&:hover {
		color: #38b5bc;
		border-bottom: 2px solid #38b5bc;
	}
`;
