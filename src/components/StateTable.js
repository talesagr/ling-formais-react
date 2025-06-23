import React from 'react';

const StateTable = ({ states, finalStates }) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
  const sortedStates = Object.keys(states).sort((a, b) => {
    const numA = parseInt(a.substring(1), 10);
    const numB = parseInt(b.substring(1), 10);
    return numA - numB;
  });

  return (
    <div className="card">
      <h2>Tabela de Transição de Estados</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Estado</th>
              {alphabet.map(char => <th key={char}>{char}</th>)}
            </tr>
          </thead>
          <tbody>
            {sortedStates.map(state => (
              <tr 
                key={state} 
                className={finalStates.has(state) ? 'final-state' : ''}
              >
                <td>{finalStates.has(state) ? `*${state}` : state}</td>
                {alphabet.map(char => (
                  <td key={char}>
                    {states[state]?.[char] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <p><small>* Estado Final</small></p>
    </div>
  );
};

export default StateTable;