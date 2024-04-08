const formatCurrency = (current: string | number): string => {
    // Se o valor já for um número, simplesmente formate-o como moeda
    if (typeof current === 'number') {
        return current.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }

    // Remova o símbolo "R$" da string e converta-a para um número
    const amount = parseFloat(current.replace('R$ ', ''));
    
    // Se a conversão for bem-sucedida, formate o número como moeda
    if (!isNaN(amount)) {
        return amount.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }
    
    // Caso contrário, retorne a string original
    return current;
};

export default formatCurrency;