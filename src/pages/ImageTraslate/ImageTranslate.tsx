import { Grid, MenuItem } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import {
	RoundedButton,
	RoundedFileInput,
	RoundedTextField,
	RoundedTextFieldSelect,
} from './ImageTranslate.styles';

const ImageTranslate = (): JSX.Element => {
	const [sourceLanguage, setSourceLanguage] = useState('');
	const [targetLanguage, setTargetLanguage] = useState('');
	const [inputTextVision, setInputTextVision] = useState('');
	const [translatedTextVision, setTranslatedTextVision] = useState('');
	const [fileValue, setFileValue] = useState(null);

	const handleTranslateVision = async (text: string) => {
		try {
			const response = await fetch(
				`https://translation.googleapis.com/language/translate/v2?key=AIzaSyDPJI6giDF2c4zNXZWW59gGKWJuUrRfZ4c&q=${encodeURIComponent(
					text
				)}&source=${sourceLanguage}&target=${targetLanguage}`,
				{
					method: 'POST',
				}
			);
			if (response.ok) {
				const data = await response.json();
				const translation = data.data.translations[0].translatedText;
				console.log(translation);
				setTranslatedTextVision(translation);
			} else {
				console.error('Erro na tradução');
			}
		} catch (error) {
			console.error('Erro na tradução:', error);
		}
	};

	const extractTextFromImage = async () => {
		if (fileValue) {
			if (fileValue) {
				try {
					const formData = new FormData();
					formData.append('image', fileValue);

					const imageBlob = await new Response(
						formData.get('image') as Blob
					).blob();

					const visionResponse = await fetch(
						`https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAZEin3W8ZtSijJom0c9UquXiImyG2CKXo`,
						{
							method: 'POST',
							body: JSON.stringify({
								requests: [
									{
										image: {
											content: btoa(
												Array.from(
													new Uint8Array(await imageBlob?.arrayBuffer())
												)
													.map((byte) => String.fromCharCode(byte))
													.join('')
											),
										},
										features: [
											{
												type: 'TEXT_DETECTION',
											},
										],
									},
								],
							}),
						}
					);

					if (visionResponse.ok) {
						const visionData = await visionResponse.json();
						const extractedText =
							visionData.responses[0].fullTextAnnotation.text;
						setInputTextVision(extractedText);
						handleTranslateVision(extractedText);
					} else {
						console.error('Erro ao analisar a imagem');
					}
				} catch (error) {
					console.error('Erro ao analisar a imagem:', error);
				}
			}
		} else {
			console.error('Nenhum arquivo de imagem selecionado');
		}
	};

	const handleChangeFileValue = (file: any) => {
		setFileValue(file);
		console.log(file);
	};

	return (
		<Grid container style={{ justifyContent: 'center' }}>
			<Grid item xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
				<Grid item xs={2}>
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

				<Grid item xs={2} style={{ marginBottom: 30, marginLeft: 50 }}>
					<RoundedFileInput
						placeholder="Selecione um arquivo"
						value={fileValue}
						onChange={handleChangeFileValue}
					/>
				</Grid>
			</Grid>

			<Grid
				item
				xs={6}
				style={{
					marginTop: 20,
					marginBottom: 30,
					justifyContent: 'center',
					display: 'flex',
				}}
			>
				<RoundedButton variant="outlined" onClick={extractTextFromImage}>
					Capturar texto e traduzir
				</RoundedButton>
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
					InputProps={{ readOnly: true }}
					maxRows={7}
					minRows={7}
					value={inputTextVision}
					onChange={(e) => setInputTextVision(e.target.value)}
				/>
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
					value={translatedTextVision}
					onChange={(e) => setInputTextVision(e.target.value)}
				/>
			</Grid>
		</Grid>
	);
};

export default ImageTranslate;
