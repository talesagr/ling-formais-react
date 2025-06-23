// src/services/automaton.js
class Automaton {
  constructor() {
    this.estados = {};
    this.estado_inicial = 'q0';
    this.estado_atual = this.estado_inicial;
    this.estados_finais = new Set();
    this.proximo_estado = 1;
  }

  getStates() {
    return this.estados;
  }

  getFinalStates() {
    return this.estados_finais;
  }
  
  getCurrentState() {
    return this.estado_atual;
  }

  adicionar_palavra(palavra) {
    let estado_atual_local = this.estado_inicial;

    for (const letra of palavra) {
      if (!this.estados[estado_atual_local]) {
        this.estados[estado_atual_local] = {};
      }

      if (!this.estados[estado_atual_local][letra]) {
        const novo_estado = 'q' + this.proximo_estado;
        this.proximo_estado += 1;
        this.estados[estado_atual_local][letra] = novo_estado;
      }
      
      estado_atual_local = this.estados[estado_atual_local][letra];
    }
    
    this.estados_finais.add(estado_atual_local);
  }

  reconhecer(palavra) {
    let estado_para_verificar = this.estado_inicial;
    
    for (const letra of palavra) {
      if (this.estados[estado_para_verificar] && this.estados[estado_para_verificar][letra]) {
        estado_para_verificar = this.estados[estado_para_verificar][letra];
      } else {
        return false;
      }
    }
    return this.estados_finais.has(estado_para_verificar);
  }

  trocar_estado(letra) {
    if (this.estado_atual === null) {
      return;
    }
    if (this.estados[this.estado_atual] && this.estados[this.estado_atual][letra]) {
      this.estado_atual = this.estados[this.estado_atual][letra];
    } else {
      this.estado_atual = null; // Estado de erro/inválido
    }
  }

  reset() {
    this.estados = {};
    this.estados_finais = new Set();
    this.proximo_estado = 1;
    this.estado_atual = this.estado_inicial;
  }

  reset_current_state() {
    this.estado_atual = this.estado_inicial;
  }
}

const automatonInstance = new Automaton();
export default automatonInstance;