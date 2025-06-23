import React, { useState, useEffect, useCallback } from 'react';
import automaton from './services/automaton';
import * as tokenRepo from './services/tokenRepository';

import TokenManager from './components/TokenManager';
import RecognitionTester from './components/RecognitionTester';
import StateTable from './components/StateTable';
import './index.css';

function App() {
  const [tokens, setTokens] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [recognitionResult, setRecognitionResult] = useState({ 
    message: 'Aguardando entrada...', 
    isRecognized: false 
  });
  
  const rebuildAutomaton = useCallback((currentTokens) => {
    automaton.reset();
    currentTokens.forEach(token => {
      automaton.adicionar_palavra(token);
    });
    setTokens([...currentTokens]); 
  }, []);
  
  useEffect(() => {
    const loadedTokens = tokenRepo.findAll();
    rebuildAutomaton(loadedTokens);
  }, [rebuildAutomaton]);

  const handleAddToken = (token) => {
    if (tokenRepo.save(token)) {
      const newTokens = tokenRepo.findAll();
      rebuildAutomaton(newTokens);
    }
  };

  const handleDeleteToken = (token) => {
    tokenRepo.remove(token);
    const newTokens = tokenRepo.findAll();
    rebuildAutomaton(newTokens);
  };
  
  const handleInputChange = (e) => {
    const newText = e.target.value.toLowerCase();
    if (!/^[a-z]*$/.test(newText)) {
      return;
    }
    setCurrentInput(newText);
    
    if (newText === '') {
      setRecognitionResult({ message: 'Aguardando entrada...', isRecognized: false });
      return;
    }

    const isRecognized = automaton.reconhecer(newText);
    
    setRecognitionResult({
      message: isRecognized ? `Palavra '${newText}' RECONHECIDA` : `Palavra '${newText}' NÃO reconhecida`,
      isRecognized: isRecognized
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Visualizador de Autômato Finito</h1>
      </header>
      <main>
        <div className="column">
          <TokenManager
            tokens={tokens}
            onAddToken={handleAddToken}
            onDeleteToken={handleDeleteToken}
          />
          <RecognitionTester
            currentInput={currentInput}
            onInputChange={handleInputChange}
            recognitionResult={recognitionResult}
          />
        </div>
        <div className="column">
          <StateTable
            states={automaton.getStates()}
            finalStates={automaton.getFinalStates()}
          />
        </div>
      </main>
    </div>
  );
}

export default App;