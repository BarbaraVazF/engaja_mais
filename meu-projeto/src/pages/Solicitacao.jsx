import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VoltarButton from '../components/VoltarButton';
import jsPDF from 'jspdf'; // Certifique-se de que a biblioteca está instalada
import { getRequest } from '../api/getRequest';
import Markdown from 'https://esm.sh/react-markdown@10'

const Solicitacao = () => {
  const navigate = useNavigate();
  const { alunoId,requestId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(``);
  
  const [originalText, setOriginalText] = useState(text);
  const params = useParams();

  const [request, setRequest] = useState();

  useEffect(() => {
    getRequest(params.alunoId,params.requestId).then((request) => {
      setRequest(request);
    });
  },[])

  const handleEditClick = () => {
    setOriginalText(text);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setText(originalText);
    setIsEditing(false);
  };

  const handleDownloadClick = () => {
    // Cria um novo documento PDF
    const doc = new jsPDF();

    // Configurações do PDF
    const marginLeft = 15; // Margem esquerda
    const marginTop = 20; // Margem superior
    const lineHeight = 7; // Altura da linha
    const fontSize = 12; // Tamanho da fonte
    const pageWidth = doc.internal.pageSize.getWidth(); // Largura da página
    const maxWidth = pageWidth - 2 * marginLeft; // Largura máxima do texto

    // Define a fonte e o tamanho
    doc.setFont('helvetica'); // Fonte
    doc.setFontSize(fontSize);

    // Divide o texto em linhas
    const lines = doc.splitTextToSize(text, maxWidth);

    // Adiciona o conteúdo ao PDF com margens e padding
    let y = marginTop; // Posição Y inicial
    lines.forEach((line) => {
      if (y > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage(); // Adiciona uma nova página se o texto ultrapassar o limite
        y = marginTop; // Reinicia a posição Y
      }
      doc.text(line, marginLeft, y);
      y += lineHeight; // Avança para a próxima linha
    });

  };

  return (
    <div className="solicitacao-page" style={{
      position: 'relative',
      paddingTop: '70px', // Esse padding empurra o conteúdo abaixo da navbar
      minHeight: '100vh',
    }}>
      <Navbar
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '60px',
          backgroundColor: '#fff',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
        userName="Bárbara"
      />
      <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '0 20px', marginTop: '30px' }}>
        <VoltarButton />
        <h1>{request && request.title}</h1>
      </div>

      {/* Box de texto editável */}
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        margin: '20px auto',
        width: '80%',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        fontSize: '18px',
        fontWeight: 'bold',
        position: 'relative',
        paddingTop: '50px',
        minHeight: isEditing ? '250px' : '150px',
        minWidth: isEditing ? '90%' : '80%',
        transition: 'min-height 0.3s ease, min-width 0.3s ease',
      }}>
        {/* Ícone de edição dentro do box */}
        <img
          src="/editar_texto.png"
          alt="Editar"
          style={{
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            position: 'absolute',
            top: '10px',
            right: '50px',
            margin: '8px',
            zIndex: 10,
          }}
          onClick={handleEditClick}
        />
        {/* Ícone de download dentro do box */}
        <img
          src="/download.png"
          alt="Download"
          style={{
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            position: 'absolute',
            top: '10px',
            right: '10px',
            margin: '8px',
            zIndex: 10,
          }}
          onClick={handleDownloadClick}
        />
        {isEditing ? (
          <div>
            {/* Box de texto editável com largura maior quando editando */}
            <textarea
              value={request.content}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: '100%',
                height: '200px',
                border: 'none',
                outline: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                resize: 'none',
              }}
            />
            {/* Botões de ação dentro do box */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                onClick={handleCancelClick}
                style={{
                  backgroundColor: '#5A5858',
                  color: '#fff',
                  padding: '10px 20px',
                  marginRight: '10px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveClick}
                style={{
                  backgroundColor: '#022651',
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        ) : (
          request && request.content &&
          <Markdown>{request.content}</Markdown>
        )}
      </div>
    </div>
  );
};

export default Solicitacao;