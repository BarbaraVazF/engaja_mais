# 🧩 Engaja+

Plataforma baseada em Modelos de Linguagem de Grande Escala (LLMs) projetada para auxiliar professores no ensino de crianças e adolescentes com Transtorno do Espectro Autista (TEA). Desenvolvida como uma Prova de Conceito (PoC), a ferramenta transforma os dados dos alunos em materiais didáticos personalizados, promovendo a educação inclusiva e reduzindo a sobrecarga docente.

## 🎯 Uso Educacional
O Engaja+ foi desenvolvido especificamente para:
- **Apoio ao Trabalho Docente**: Reduzir a sobrecarga dos professores na elaboração materiais adaptados.
- **Promoção da Educação Inclusiva**: Democratizar práticas de ensino personalizadas para estudantes com TEA.
- **Engajamento**: Tornar o aprendizado mais atrativo ao integrar interesses dos alunos nas atividades.
- **Pesquisa Acadêmica**: Avaliar a viabilidade e o impacto do uso de Inteligência Artificial Generativa no ambiente da educação especial.

## 🔗 Acesso e Deploy

A plataforma está publicada e disponível para acesso através da Vercel:
👉 **[Acessar Engaja+ Front-end](https://engaja-mais.vercel.app/)**

## ✨ Funcionalidades

- **📝 Cadastro e Gestão de Alunos**: Anexo de relatórios com informações cruciais (idade, série, nível de suporte, interesses, desafios e padrões de aprendizagem) para alimentar a IA.
- **📋 Plano de Ensino Individualizado (PEI)**: Geração inteligente de percursos educacionais que definem conteúdos, metas e estratégias adaptadas às particularidades do aluno.
- **📚 Materiais de Estudo Personalizados**: Criação de resumos e atividades direcionadas para reforçar o conteúdo em casa e fomentar o estudo autônomo.
- **📝 Avaliações Adaptadas**: Elaboração de modelos de avaliação justos, customizados para respeitar as limitações e o estilo cognitivo do estudante.
- **🎮 Estratégias de Gamificação**: Sugestões de recompensas e desafios baseadas nos interesses individuais, aumentando o engajamento.
- **✏️ Edição e Exportação**: Edição dinâmica dos materiais gerados pela IA para refino do professor e opção de download facilitado.

## 🛠️ Tecnologias Utilizadas

O projeto foi estruturado como uma solução full-stack unificada, utilizando as seguintes tecnologias:

- **Frontend**: React, Vite e React Router 7
- **Backend**: Node.js e TypeScript
- **Banco de Dados**: MongoDB integrado via Prisma ORM
- **Autenticação**: Google SSO via Better Auth
- **Inteligência Artificial**: Integração direta com a API da OpenAI (modelo GPT-4o-mini)

## 🚀 Como Usar (Passo a Passo)

A ferramenta tem o professor como usuário principal e funciona da seguinte maneira:

1. **Autenticação**: O professor realiza o login na plataforma utilizando sua conta Google.
2. **Cadastro do Aluno**: O docente cadastra o aluno e anexa um relatório contendo suas informações vitais (nível de suporte, pontos fortes, desafios, interesses e objetivos).
3. **Solicitação Inteligente**: Na área de geração de materiais, o professor insere parâmetros como o conteúdo da aula e a quantidade de aulas que deseja planejar.
4. **Geração por IA**: O sistema utiliza engenharia de prompt para processar as informações do aluno combinadas com a matéria e gerar os documentos pedagógicos (PEI, Avaliações, Materiais de Estudo ou Gamificação).
5. **Revisão e Uso**: O professor pode revisar e editar o texto final na própria plataforma e, em seguida, efetuar o download para utilizar em sala de aula.

## ⚙️ Instalação e Execução Local

### 1. Pré-requisitos
Para rodar este projeto localmente, você precisará ter o **Node.js** instalado e um cluster **MongoDB** em funcionamento.

### 2. Clonando o Repositório
```bash
git clone https://github.com/BarbaraVazF/engaja_mais.git
cd engaja_mais
```

### 3. Instalando as Dependências
```bash
npm install
```

### 4. Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis, substituindo os valores pelas suas credenciais reais:
```bash
OPENAI_API_KEY="cole_o_valor_aqui"
DATABASE_URL="cole_o_valor_aqui"
BETTER_AUTH_SECRET="cole_o_valor_aqui"
BETTER_AUTH_URL="cole_o_valor_aqui"
GOOGLE_CLIENT_ID="cole_o_valor_aqui"
GOOGLE_CLIENT_SECRET="cole_o_valor_aqui"
```

### 5. Executando o Servidor de Desenvolvimento
```bash
npm run dev
```

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
