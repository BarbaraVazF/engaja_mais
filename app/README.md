# Engaja+

Plataforma web baseada em LLM para apoio a professores no ensino inclusivo de alunos com Transtorno do Espectro Autista (TEA).

## O que é

O Engaja+ permite ao professor cadastrar alunos com TEA, anexar um relatório pedagógico em linguagem natural e solicitar a geração automática de quatro tipos de material individualizado via GPT-4o-mini:

- **Plano de Ensino Individualizado (PEI)**

- **Material de estudo e atividades para casa**

- **Modelo de avaliação individualizado**

- **Estratégia de gamificação personalizada**

A ferramenta foi desenvolvida como parte do Trabalho de Conclusão de Curso de Bárbara Vaz Ferreira no Centro de Informática da UFPE, sob orientação do Prof. Vinícius Cardoso Garcia (ASSERT Lab/CIn-UFPE).

## Acesso em produção

A ferramenta está disponível em: https://engaja-mais.vercel.app/

O acesso é feito via Google SSO — nenhum cadastro manual é necessário.

## Stack tecnológica

| Camada | Tecnologia |

|---------|---------|

| Frontend | React, Vite, React Router 7 |

| Backend | Node.js, TypeScript, Express.js |

| Banco de dados | MongoDB com Prisma ORM |

| Autenticação | Google Auth via Better Auth (SSO) |

| IA | OpenAI API (GPT-4o-mini) |

| Deploy | Vercel |

## Como rodar localmente

### Pré-requisitos

- Node.js 18+

- Conta MongoDB Atlas (ou instância local)

- Chave de API da OpenAI

- Credenciais OAuth do Google

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/BarbaraVazF/engaja_mais.git
cd engaja_mais

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

### Editar o arquivo .env com suas credenciais

**Variáveis de ambiente**

Criar um arquivo .env na raiz do projeto com as seguintes variáveis:

- OPENAI_API_KEY=sua_chave_aqui

- MONGODB_URL=sua_url_de_conexao_aqui

- GOOGLE_CLIENT_ID=seu_client_id_aqui

- GOOGLE_CLIENT_SECRET=seu_client_secret_aqui

- BETTER_AUTH_SECRET=sua_secret_aqui

### Executar

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## Prompts

Os prompts utilizados para geração dos quatro tipos de material estão
documentados em [PROMPTS.md](PROMPTS.md).

## Licença

Este projeto está licenciado sob a licença MIT.
Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autores

- **Bárbara Vaz Ferreira** — bvf@cin.ufpe.br
- **Sidney Alex de Amorim Arruda** — saaa@cin.ufpe.br
- **Vinícius Cardoso Garcia** — vcg@cin.ufpe.br

Centro de Informática, Universidade Federal de Pernambuco (CIn-UFPE)
ASSERT Lab — https://assertlab.com
