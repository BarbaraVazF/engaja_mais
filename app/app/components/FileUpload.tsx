const FileUpload = ({ onChange }) => {
  return (
    <div className="file-upload">
      <label htmlFor="relatorio">Anexar Relatório (PDF)</label>
      <input type="file" id="relatorio" accept=".pdf" onChange={onChange} />
      <p>
      Inserir um relatório com as seguintes informações do aluno: idade, série escolar, nível de suporte, pontos fortes e principais desafios (acadêmicos, sociais e/ou sensoriais), interesses, objetivos de aprendizagem e desenvolvimento, padrão de aprendizagem e, se pertinente, outras informações relevantes sobre seu contexto.
      </p>
    </div>
  );
};

export default FileUpload;
