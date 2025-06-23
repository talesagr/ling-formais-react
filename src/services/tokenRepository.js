const TOKENS_KEY = "automato_tokens";

const initializeTokens = () => {
    if (!localStorage.getItem(TOKENS_KEY)) {
        const initialTokens = ["tales", "fey"];
        localStorage.setItem(TOKENS_KEY, JSON.stringify(initialTokens));
    }
};

export const findAll = () => {
    initializeTokens();
    const tokens = localStorage.getItem(TOKENS_KEY);
    return tokens ? JSON.parse(tokens) : [];
};

export const save = (token) => {
    const tokens = findAll();
    if (!tokens.includes(token)) {
        tokens.push(token);
        localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
        return true;
    }
    return false; 
};

export const remove = (token) => {
    let tokens = findAll();
    tokens = tokens.filter(t => t !== token);
    localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
};