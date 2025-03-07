import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FuncionalidadePopup = ({ title, onClose, onGerar }) => {
    const navegar = useNavigate();
    
    const conteudoFuncionalidades = {
        "Plano de ensino personalizado": "Desenvolvimento de planos de ensino personalizados, com estratégias para a apresentação de conteúdos e atividades práticas em sala de aula.",
        "Materiais de estudo e atividades para casa": "Elaboração de materiais de estudo e atividades para uso em casa, promovendo a autonomia no aprendizado.",
        "Estratégia de gamificação": "Implementação de estratégias de gamificação, incentivo o envolvimento e a motivação dos alunos no processo educacional.",
        "Modelo de avaliação individualizado": "Criação de modelos de avaliações individualizadas, garantindo uma avaliação equitativa e alinhada ao perfil de cada aluno."
    };
    
    const [conteudoMateria, setConteudoMateria] = useState('');
    const [quantidadeAulas, setQuantidadeAulas] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const inputStyle = {
        height: '40px',
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box'
    };

    useEffect(() => {
        // Desabilitar o botão "Gerar" se os campos necessários estiverem vazios
        if (title === "Plano de ensino personalizado") {
            setIsButtonDisabled(!(conteudoMateria && quantidadeAulas));
        } else {
            setIsButtonDisabled(!conteudoMateria);
        }
    }, [conteudoMateria, quantidadeAulas, title]);

    return (
        <div className="popup-overlay">
            <div className="popup" style={{ width: '500px', padding: '20px' }}>
                <h2>{title}</h2>
                <p>{conteudoFuncionalidades[title]}</p>
                
                {title === "Plano de ensino personalizado" && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
                        <input 
                            type="text" 
                            placeholder="Conteúdo / Matéria" 
                            value={conteudoMateria} 
                            onChange={(e) => setConteudoMateria(e.target.value)} 
                            className="custom-input"
                            style={inputStyle}
                        />
                        <input 
                            type="number" 
                            placeholder="Quantidade de aulas" 
                            value={quantidadeAulas} 
                            onChange={(e) => setQuantidadeAulas(e.target.value)} 
                            className="custom-input"
                            style={inputStyle}
                        />
                    </div>
                )}
                
                {(title === "Materiais de estudo e atividades para casa" || title === "Modelo de avaliação individualizado") && (
                    <input 
                        type="text" 
                        placeholder="Conteúdo / Matéria" 
                        value={conteudoMateria} 
                        onChange={(e) => setConteudoMateria(e.target.value)} 
                        className="custom-input"
                        style={inputStyle}
                    />
                )}

                {/* Mostrar o conteúdo escrito, se aplicável */}
                {(conteudoMateria || quantidadeAulas) && title === "Plano de ensino personalizado" && (
                    <div style={{ marginTop: '20px' }}>
                        <p><strong>Matéria:</strong> {conteudoMateria}</p>
                        <p><strong>Quantidade de aulas:</strong> {quantidadeAulas}</p>
                    </div>
                )}

                {(conteudoMateria) && (title === "Materiais de estudo e atividades para casa" || title === "Modelo de avaliação individualizado") && (
                    <div style={{ marginTop: '20px' }}>
                        <p><strong>Matéria:</strong> {conteudoMateria}</p>
                    </div>
                )}
                
                <div className="popup-buttons">
                    <button onClick={onClose} className="custom-button">Fechar</button>
                    <button 
                      onClick={() => {
                        onGerar(title, conteudoMateria, quantidadeAulas);
                        onClose();
                      }} 
                      className="custom-button" 
                      disabled={isButtonDisabled}
                    >
                      Gerar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FuncionalidadePopup;
