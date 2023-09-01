import { Box, Button, Toolbar } from '@mui/material';
import { NavBar, NavLinks, StyledLink } from './Navbar.styles';
import Logotipo from '../../assets/images/logotipo.png';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (): JSX.Element => {
	return (
		<NavBar position="static">
			<Toolbar>
				<Box
					component="img"
					sx={{
						height: 45,
					}}
					alt="Your logo."
					src={Logotipo}
				/>

				<NavLinks>
					<StyledLink to="/">Tradutor de Texto</StyledLink>

					<StyledLink to="/image-translate">Tradutor de Imagens</StyledLink>
				</NavLinks>
			</Toolbar>
		</NavBar>
	);
};

export default Navbar;
