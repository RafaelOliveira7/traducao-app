import { Grid, MenuItem } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useState } from 'react';
import React from 'react';
import {
	RoundedButton,
	RoundedTextField,
	RoundedTextFieldSelect,
} from './Home.styles';

const Home = (): JSX.Element => {
	const [sourceLanguage, setSourceLanguage] = useState('');
	const [targetLanguage, setTargetLanguage] = useState('');
	const [inputText, setInputText] = useState('');
	const [translatedText, setTranslatedText] = useState('');

	const handleTranslate = async () => {
		try {
			const response = await fetch(
				`https://translation.googleapis.com/language/translate/v2?key=AIzaSyDPJI6giDF2c4zNXZWW59gGKWJuUrRfZ4c&q=${encodeURIComponent(
					inputText
				)}&source=${sourceLanguage}&target=${targetLanguage}`,
				{
					method: 'POST',
				}
			);

			if (response.ok) {
				const data = await response.json();
				const translation = data.data.translations[0].translatedText;
				setTranslatedText(translation);
			} else {
				console.error('Erro na tradução');
			}
		} catch (error) {
			console.error('Erro na tradução:', error);
		}
	};

	return (
		<Grid container style={{ justifyContent: 'center' }}>
			<Grid item xs={2}>
				<RoundedTextFieldSelect
					id="select-idioma-entrada"
					select
					label="Idioma de entrada"
					helperText="Selecione o idioma de entrada"
					variant="outlined"
					style={{ width: '100%' }}
					value={sourceLanguage}
					onChange={(e) => setSourceLanguage(e.target.value as string)}
				>
					<MenuItem key="pt" value="pt">
						Português
					</MenuItem>
					<MenuItem key="es" value="es">
						Espanhol
					</MenuItem>
					<MenuItem key="en" value="en">
						Inglês
					</MenuItem>
					<MenuItem key="fr" value="fr">
						Francês
					</MenuItem>
				</RoundedTextFieldSelect>
			</Grid>
			<Grid item xs={1} style={{ display: 'flex', justifyContent: 'center' }}>
				<CompareArrowsIcon />
			</Grid>
			<Grid item xs={2} style={{ marginBottom: 30 }}>
				<RoundedTextFieldSelect
					id="select-idioma-saida"
					select
					label="Idioma de saída"
					helperText="Selecione o idioma de saída"
					variant="outlined"
					style={{ width: '100%' }}
					value={targetLanguage}
					onChange={(e) => setTargetLanguage(e.target.value as string)}
				>
					<MenuItem key="pt" value="pt">
						Português
					</MenuItem>
					<MenuItem key="es" value="es">
						Espanhol
					</MenuItem>
					<MenuItem key="en" value="en">
						Inglês
					</MenuItem>
					<MenuItem key="fr" value="fr">
						Francês
					</MenuItem>
				</RoundedTextFieldSelect>
			</Grid>

			<Grid
				item
				xs={12}
				style={{ marginBottom: 30, justifyContent: 'center', display: 'flex' }}
			>
				<RoundedTextField
					id="filled-textarea"
					label="Texto de entrada"
					placeholder="Texto a ser traduzido"
					multiline
					variant="outlined"
					style={{ width: '50%' }}
					maxRows={7}
					minRows={7}
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
				/>
			</Grid>

			<Grid
				item
				xs={2}
				style={{
					marginBottom: 30,
					justifyContent: 'center',
					display: 'flex',
				}}
			>
				<RoundedButton variant="outlined" onClick={handleTranslate}>
					Traduzir
				</RoundedButton>
			</Grid>

			<Grid
				item
				xs={12}
				style={{ marginBottom: 30, justifyContent: 'center', display: 'flex' }}
			>
				<RoundedTextField
					id="filled-textarea"
					label="Texto de saída"
					placeholder="Texto Traduzido"
					multiline
					variant="outlined"
					style={{ width: '50%' }}
					InputProps={{ readOnly: true }}
					maxRows={7}
					minRows={7}
					value={translatedText}
				/>
			</Grid>
		</Grid>
	);
};

export default Home;
