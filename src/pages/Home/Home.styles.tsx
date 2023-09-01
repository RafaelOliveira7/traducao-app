import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

export const RoundedButton = styled(Button)`
	&& {
		font-weight: 600;
		border-width: 2px;
		color: #414141;
		border-color: #38b5bc;
		border-radius: 40px;
		padding: 10px 70px;

		&:hover {
			color: #38b5bc;
			border-color: #38b5bc;
			border-width: 2px;
		}
	}
`;

export const RoundedTextField = styled(TextField)`
	width: 100%;
	& .MuiOutlinedInput-notchedOutline {
		border-color: #38b5bc;
		border-width: 1px;
		border-radius: 40px;
	}

	& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
		border-color: #38b5bc;
	}

	& label {
		&.Mui-focused {
			color: #38b5bc;
		}
	}
`;

export const RoundedTextFieldSelect = styled(TextField)`
	width: 100%;
	& .MuiOutlinedInput-notchedOutline {
		border-color: #38b5bc;
		border-width: 1px;
		border-radius: 40px;
	}

	& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
		border-color: #38b5bc;
	}

	& label {
		&.Mui-focused {
			color: #38b5bc;
		}
	}
`;
