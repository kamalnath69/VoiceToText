import React, { useState, useEffect } from 'react';
import "./Vp.css"

const VoiceToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Web Speech API is not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart + ' ';
        } else {
          interimTranscript += transcriptPart;
        }
      }

      // Apply auto-phrasing feature
      finalTranscript = autoPhrase(finalTranscript);
      
      setTranscript(finalTranscript + interimTranscript);
    };

    recognitionInstance.onerror = (event) => {
      console.error(event.error);
    };

    setRecognition(recognitionInstance);
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Function to format the transcript into specific phrases or sentences
  const autoPhrase = (text) => {
    // Example of simple auto-phrasing rules:
    text = text.replace(/\s*and\s*/gi, ' and ');
    text = text.replace(/\s*but\s*/gi, ' but ');
    
    // Capitalize the first letter of each sentence
    text = text.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
    
    // Example of ending each sentence with a period if not already present
    if (text && !/[.!?]$/.test(text.trim())) {
      text = text.trim() + '.';
    }

    return text;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Voice to Text Conversion</h1>
      <h3>Tap to Speak</h3>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? '🎤' : '🎙️'}
      </button>
      <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>{transcript}</p>
    </div>
  );
};

export default VoiceToText;
