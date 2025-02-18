import React from 'react';

const FileUpload = ({ onChange }) => {
  return (
    <div className="file-upload">
      <label htmlFor="relatorio">Anexar Relatório (PDF)</label>
      <input
        type="file"
        id="relatorio"
        accept=".pdf"
        onChange={onChange}
      />
      <p>Inserir relatório com informações do novo aluno, como: nome, pontos fortes, dificuldades, padrão de aprendizagem e áreas prioritárias de desenvolvimento.</p>
    </div>
  );
};

export default FileUpload;