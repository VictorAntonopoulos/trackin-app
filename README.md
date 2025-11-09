# 🚀 Track In - Aplicativo Mobile (Versão Final Challenge FIAP 2025)

O **Track In** é um aplicativo mobile desenvolvido com **React Native + Expo (EAS Build)** que simula o gerenciamento e rastreamento de motos em pátios utilizando **RFID**, **visão computacional** e **notificações inteligentes**.  
Projeto desenvolvido como parte do **Challenge 2025 da FIAP**, com foco em arquitetura limpa, UX moderna e integração com API RESTful.

---

## 👥 Equipe de Desenvolvimento

| Nome | RM |
|------|----|
| Julia Brito | 558831 |
| Leandro Correia | 556203 |
| Victor Martins Antonopoulos | 556313 |

---

## 🎯 Visão Geral

A versão final do aplicativo conta com:
- 🌎 **Suporte a múltiplos idiomas (Português / Espanhol)**  
- 🌙 **Tema dinâmico (claro/escuro)** com persistência automática  
- 🔔 **Notificação Push Inteligente** lembrete de aluguel de moto  
- ⚙️ **Integração total com a API TrackIn** (CRUD de motos e pátios)  
- 🔐 **Autenticação local com persistência (AsyncStorage)**  
- 🧩 **Arquitetura modular e componentizada**  
- 🧭 **Navegação completa via React Navigation**  
- 📦 **Build com Expo EAS (Android .apk)**  

🎥 **Vídeo de Demonstração (YouTube):**  
👉 [[https://youtu.be/bavRon5fUTQ](https://youtu.be/jwjcm7w70zM)]

---

## ✨ Funcionalidades Principais

| Categoria | Descrição |
|------------|------------|
| 🏍️ **Gestão de Motos** | Cadastro, edição e visualização de motos com integração à API |
| 🌎 **Internacionalização** | Alternância manual entre **Português / Espanhol** com persistência local |
| 🌓 **Tema Dinâmico** | Alternância entre tema claro e escuro em tempo real |
| 🔔 **Notificação Push** | Lembrete de aluguel ao cadastrar uma moto |
| 👤 **Perfil do Usuário** | Exibe dados, idioma, tema e informações da build |
| 🔒 **Autenticação Local** | Armazenamento de dados e sessão do usuário |
| ⚙️ **Integração RESTful** | Comunicação com a API TrackIn via Axios |

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Biblioteca / Tecnologia |
|------------|------------------------|
| **Framework** | [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) |
| **Linguagem** | TypeScript |
| **Navegação** | React Navigation (`@react-navigation/native`, `stack`, `bottom-tabs`) |
| **Formulários e Validação** | React Hook Form + Zod + @hookform/resolvers |
| **Internacionalização (i18n)** | i18next + react-i18next + expo-localization |
| **Notificações** | expo-notifications  |
| **Armazenamento Local** | @react-native-async-storage/async-storage |
| **HTTP Client** | Axios |
| **Estilização** | expo-linear-gradient, react-native-vector-icons |
| **Fontes** | @expo-google-fonts/poppins |
| **Build** | Expo EAS Build |
| **Outros** | uuid, react-native-get-random-values |

---

## ⚙️ Estrutura do Projeto

```
trackin-app-att/
├── App.tsx                  # Componente principal
├── app.json                 # Configurações do Expo
├── assets/                  # Imagens e ícones
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   └── ui/              # Botões, Cards, Inputs etc.
│   ├── context/             # Contextos globais (tema, idioma)
│   ├── locales/             # Traduções (pt.json, es.json)
│   ├── navigation/          # Configuração das rotas
│   ├── screens/             # Telas principais
│   │   ├── HomeScreen.tsx
│   │   ├── PerfilScreen.tsx
│   │   ├── CadastroScreen.tsx
│   │   └── Onboarding/
│   ├── services/            # Integração com API (motoService, patioService)
│   ├── utils/               # Helpers e notificações 
│   ├── styles/              # Cores, espaçamento e tipografia
│   └── i18n.ts              # Configuração do sistema de idiomas
├── babel.config.js
├── package.json
└── README.md
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (versão LTS)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- API TrackIn em execução, caso queria testar todas as screens

### Passos

```bash
# Clonar o repositório
git clone https://github.com/VictorAntonopoulos/trackin-apps.git
cd trackin-apps

# Instalar dependências
npm install

# Iniciar o servidor Expo
npx expo start
```

📱 Escaneie o QR Code com o **Expo Go** ou abra em um emulador.

---

## 🧠 Recursos Implementados na Versão Final

✅ i18n (Português e Espanhol)  
✅ Tema escuro/claro persistente  
✅ SplashScreen controlada com carregamento de fontes  
✅ Notificação automática pós-cadastro de moto
✅ API totalmente integrada via Axios  
✅ Navegação com abas e stack  
✅ Build EAS compatível com Expo SDK 53  

---

## 🔮 Melhorias Futuras

- Dashboard com estatísticas e relatórios  
- Autenticação via API (usuários reais)  
- Testes automatizados (unitários e integração)  

---

## 🏁 Conclusão

O **Track In** representa uma solução mobile moderna e funcional, com foco em **usabilidade**, **escalabilidade** e **experiência do usuário**.  
Desenvolvido de forma modular, o app simula com realismo o fluxo operacional de um sistema de rastreamento inteligente, estando pronto para publicação em loja de aplicativos.

---

📦 **Versão:** 1.0.0  
🔖 **Commit Hash:** exibido na tela de perfil  
👨‍💻 Desenvolvido por **Equipe Track In - FIAP 2TDSPG (2025)**  
