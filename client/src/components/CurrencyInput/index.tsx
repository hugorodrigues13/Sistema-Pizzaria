import React from 'react';

const CurrencyInput = ({ value, onChange }: any) => {
  const handleInputChange = (event: any) => {
    const inputValue = event.target.value;
    const unmaskedValue = inputValue.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
    const intValue = parseInt(unmaskedValue || '0', 10); // Converte para inteiro

    // Formata o valor para a exibição desejada
    const formatted = (intValue / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    onChange(formatted); // Passa o valor formatado para a função de onChange fornecida
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder="Digite o valor"
    />
  );
};

export default CurrencyInput;
