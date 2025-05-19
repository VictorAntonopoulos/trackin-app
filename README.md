# 📱 Track In - Sistema de Gestão de Motos no Pátio

O **Track In** é um aplicativo mobile desenvolvido com **React Native + Expo**, que simula o controle e rastreamento de motos em pátios utilizando conceitos de **RFID**, **visão computacional** e localização. Foi desenvolvido como parte do Challenge 2025 da FIAP.

---

## 🎯 Funcionalidades

✅ Fluxo completo de autenticação:
- Onboarding moderno exibido apenas uma vez
- Cadastro em 5 etapas com persistência
- Login dinâmico com verificação de e-mail e senha

✅ Telas:
- **Início:** mensagem de boas-vindas
- **Cadastro:** adicionar/editar motos com imagem, placa e status
- **Buscar:** filtro por modelo, com imagem e botões de editar/excluir
- **Status:** motos separadas por status com localização simulada
- **Scanner:** simula leitura RFID com coordenadas e setor
- **Perfil:** exibe dados do usuário logado, com logout e botão para ver o onboarding novamente

✅ Recursos:
- Armazenamento de usuários, motos e preferências com `AsyncStorage`
- Navegação com `React Navigation`
- Fontes personalizadas com `Google Fonts`
- Design responsivo e agradável
- Suporte ao tema claro/escuro (modo escuro opcional)

---

## 🛠 Tecnologias Utilizadas

- React Native com Expo
- TypeScript
- React Navigation
- AsyncStorage
- React Hook Form + Zod
- Expo Google Fonts

---

## 🧪 Pré-requisitos

- Node.js e npm instalados
- Expo CLI: `npm install -g expo-cli`
- Conta no [Expo Go](https://expo.dev)

---

## ▶️ Como Executar o Projeto

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/trackin-app.git
cd trackin-app

# 2. Instale as dependências
npm install

# 3. Inicie o projeto com o Expo
npx expo start
