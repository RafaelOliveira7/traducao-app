import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';

function App() {
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [inputText, setInputText] = useState('');
  const [inputTextVision, setInputTextVision] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translatedTextVision, setTranslatedTextVision] = useState('');

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
          setTranslatedTextVision(translation);
        } else {
          console.error('Erro na tradução');
        }
      } catch (error) {
        console.error('Erro na tradução:', error);
    }
  };
  
  const extractTextFromImage = async () => {
    const fileInput = document.getElementById('imageInput');
    if (fileInput && fileInput instanceof HTMLInputElement && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);

        const imageBlob = await new Response(formData.get('image') as Blob).blob();

        const visionResponse = await fetch(
          `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAZEin3W8ZtSijJom0c9UquXiImyG2CKXo`,
          {
            method: 'POST',
            body: JSON.stringify({
              requests: [
                {
                  image: {
                    content: btoa(
                      Array.from(new Uint8Array(await imageBlob?.arrayBuffer()))
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
          const extractedText = visionData.responses[0].fullTextAnnotation.text;
          setInputTextVision(extractedText);
          handleTranslateVision(extractedText);
        } else {
          console.error('Erro ao analisar a imagem');
        }
      } catch (error) {
        console.error('Erro ao analisar a imagem:', error);
      }
    }
  }else {
    console.error('Nenhum arquivo de imagem selecionado');
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
      <div>
      {/**Google Cloud Translate */}

        <TextField
        label="Texto a ser Traduzido"
        multiline
        rows={4}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        />
        {/* Botão para traduzir o texto */}
        <Button variant="contained" onClick={handleTranslate}>
          Traduzir
        </Button>
        {/* Mostrar texto extraído da imagem */}
        <TextField
          label="Texto Traduzido"
          multiline
          rows={4}
          value={translatedText}
          InputProps={{ readOnly: true }}
        />
      </div>
      {/**Google Cloud Vision */}
      <div>
        {/* Adicione um input para upload de imagem */}
        <input id="imageInput" type="file" accept="image/*" />
        {/* Botão para extrair texto da imagem */}
        <Button variant="contained" onClick={extractTextFromImage}>
          Capturar texto e traduzir
        </Button>
        <TextField
        label="Texto Capturado da Imagem"
        multiline
        rows={4}
        value={inputTextVision}
        onChange={(e) => setInputTextVision(e.target.value)}
        />
        {/* Mostrar texto extraído da imagem */}
        <TextField
          label="Texto Extraído da Imagem"
          multiline
          rows={4}
          value={translatedTextVision}
          InputProps={{ readOnly: true }}
        />
      </div>
      
    </div>
  );
}


export default App;
