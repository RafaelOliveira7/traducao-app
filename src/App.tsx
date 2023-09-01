import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';

function App() {
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
    <div className="App">
      <FormControl>
        <InputLabel>Idioma de Origem</InputLabel>
        <Select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value as string)}>
          <MenuItem value="en">Inglês</MenuItem>
          <MenuItem value="es">Espanhol</MenuItem>
          {/* Adicione mais opções de idioma conforme necessário */}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Idioma de Destino</InputLabel>
        <Select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value as string)}>
          <MenuItem value="pt">Português</MenuItem>
          <MenuItem value="fr">Francês</MenuItem>
          {/* Adicione mais opções de idioma conforme necessário */}
        </Select>
      </FormControl>
      <TextField
        label="Texto a ser Traduzido"
        multiline
        rows={4}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button variant="contained" onClick={handleTranslate}>
        Traduzir
      </Button>
      <TextField
        label="Texto Traduzido"
        multiline
        rows={4}
        value={translatedText}
        InputProps={{ readOnly: true }}
      />
    </div>
  );
}

export default App;
