import React, { useState } from 'react';

const TokenManager = ({ tokens, onAddToken, onDeleteToken }) => {
  const [newToken, setNewToken] = useState('');
  const [error, setError] = useState('');

  const handleAddClick = () => {
    if (!/^[a-z]+$/.test(newToken)) {
      setError('Erro: O token deve conter apenas letras de a-z.');
      return;
    }
    if (tokens.includes(newToken)) {
      setError('Erro: O token já está cadastrado.');
      return;
    }
    
    onAddToken(newToken);
    setNewToken('');
    setError('');
  };

  return (
    <div className="card">
      <h2>Gerenciador de Tokens</h2>
      <div className="input-group">
        <input
          type="text"
          value={newToken}
          onChange={(e) => setNewToken(e.target.value.toLowerCase())}
          placeholder="Digite um novo token"
        />
        <button onClick={handleAddClick}>Adicionar Token</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      
      <h3>Tokens Cadastrados</h3>
      {tokens.length === 0 ? (
        <p>Nenhum token cadastrado.</p>
      ) : (
        <ul className="token-list">
          {tokens.map((token) => (
            <li key={token}>
              <span>{token}</span>
              <button className="delete-btn" onClick={() => onDeleteToken(token)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenManager;