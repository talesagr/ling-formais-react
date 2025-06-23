import React from 'react';

const RecognitionTester = ({ currentInput, onInputChange, recognitionResult }) => {
  return (
    <div className="card">
      <h2>Reconhecedor de Palavras</h2>
      <p>Digite para testar o reconhecimento pelo autômato em tempo real.</p>
      <input
        type="text"
        value={currentInput}
        onChange={onInputChange}
        placeholder="Digite aqui..."
      />
      <div className="recognition-status">
        <strong>Status:</strong>
        <span className={recognitionResult.isRecognized ? 'recognized' : 'not-recognized'}>
          {recognitionResult.message}
        </span>
      </div>
    </div>
  );
};

export default RecognitionTester;