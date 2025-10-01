# Track In - Aplicativo Mobile 📱

Este repositório contém o código-fonte do aplicativo mobile **Track In**, desenvolvido em React Native + Expo. O Track In é uma solução projetada para simular o controle e rastreamento de motos em pátios, incorporando conceitos de RFID, visão computacional e localização. Este projeto foi desenvolvido como parte do Challenge 2025 da FIAP, com foco na integração com uma API RESTful externa e aprimoramentos na experiência do usuário.

## 👥 Integrantes

*   Julia Brito - RM558831
*   Leandro Correia - RM556203
*   Victor Martins Antonopoulos - RM556313

## 💡 Visão Geral do Projeto

O objetivo principal do Track In é fornecer uma plataforma mobile para o gerenciamento de motos, desde o cadastro até o rastreamento. A versão atual, correspondente à 3ª sprint do desafio, destaca-se pela integração robusta com a `Trackin.API` para todas as operações de dados de motos, enquanto a autenticação de usuários é gerenciada localmente para agilidade e segurança.

▶️ Link do vídeo YouTube: [https://youtube.com/shorts/ZhiXuU637SM?feature=share](https://youtu.be/bavRon5fUTQ)

## ✨ Funcionalidades Principais

As seguintes funcionalidades foram implementadas:

*   **Integração com API `Trackin.API`**: Todas as operações de CRUD (Criação, Leitura, Atualização, Exclusão) para motos são realizadas através de chamadas HTTP para a API externa, garantindo a persistência e centralização dos dados. 🔄
*   **Sistema de Autenticação Local**: O fluxo completo de autenticação, incluindo onboarding, cadastro em múltiplas etapas, login e logout, é gerenciado localmente utilizando `AsyncStorage`. 🔐
*   **Tema Dinâmico (Claro/Escuro)**: Os usuários podem alternar entre os modos de tema claro e escuro através da tela de Perfil, com a estilização das telas adaptando-se dinamicamente à escolha. 🌓
*   **Arquitetura de Código Modular**: Implementação de uma camada de serviços (`src/services/motoService.ts`) para encapsular as interações com a API, promovendo uma clara separação de responsabilidades e facilitando a manutenção e escalabilidade do código. 🏗️
*   **Navegação Intuitiva**: Utilização do React Navigation para uma experiência de navegação fluida entre as diferentes telas do aplicativo. 🗺️

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

| Categoria         | Tecnologia/Biblioteca                                                                 | Descrição                                                              |
| :---------------- | :------------------------------------------------------------------------------------ | :--------------------------------------------------------------------- |
| **Framework**     | React Native + Expo                                                                   | Desenvolvimento mobile multiplataforma.                                |
| **Linguagem**     | TypeScript                                                                            | Linguagem de programação com tipagem estática.                         |\n| **Navegação**     | React Navigation (`@react-navigation/bottom-tabs`, `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/stack`) | Gerenciamento de navegação (pilha e abas).                             |
| **Armazenamento** | `AsyncStorage` (`@react-native-async-storage/async-storage`)                          | Armazenamento local de dados (para autenticação e onboarding).         |
| **Requisições HTTP** | Axios                                                                                 | Cliente HTTP para realizar requisições à API.                          |
| **Formulários**   | React Hook Form (`react-hook-form`) + Zod (`zod`) + `@hookform/resolvers`             | Validação de formulários e gerenciamento de estado.                    |
| **Estilização**   | `expo-linear-gradient`, `react-native-vector-icons`                                   | Componentes para gradientes e ícones.                                  |
| **Fontes**        | Expo Google Fonts (`@expo-google-fonts/poppins`)                                      | Fontes personalizadas para o aplicativo.                               |
| **Utilitários**   | `uuid` (`uuid`, `react-native-get-random-values`)                                     | Geração de IDs únicos.                                                 |
| **UI Components** | `@react-native-picker/picker`                                                         | Componente de seleção (dropdown).                                      |

## 🚀 Configuração e Execução

Para configurar e executar o projeto localmente, siga os passos abaixo:

### Pré-requisitos ✅

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

*   **Node.js** (versão LTS recomendada)
*   **npm** (gerenciador de pacotes do Node.js)
*   **Expo CLI**: Instale globalmente via npm: `npm install -g expo-cli`
*   **Expo Go**: Aplicativo mobile para testar em dispositivos físicos.
*   **API `Trackin.API` em execução**: O aplicativo depende de uma API RESTful externa. Certifique-se de que a `Trackin.API` esteja rodando e acessível. 

### Instalação 📦

1.  **Clone o repositório**: Baixe o código-fonte do projeto.
    ```bash
    git clone https://github.com/VictorAntonopoulos/trackin-apps.git
    cd trackin-apps
    ```
2.  **Instale as dependências**: Navegue até o diretório do projeto e instale todas as dependências necessárias.
    ```bash
    npm install
    ```

### Execução ▶️

1.  **Verifique a API**: Confirme que a `Trackin.API` está em execução e acessível no endereço configurado.
2.  **Inicie o aplicativo Expo**: No diretório raiz do projeto, execute o comando para iniciar o servidor de desenvolvimento do Expo.
    ```bash
    npx expo start
    ```
3.  **Abra no Expo Go ou Emulador**: Utilize o aplicativo Expo Go no seu smartphone para escanear o QR code exibido no terminal ou no navegador, ou execute em um emulador Android/iOS.

## 📂 Estrutura do Projeto

A estrutura de diretórios do projeto é organizada da seguinte forma:

```
trackin-app-att-master/
├── App.tsx             # Componente principal do aplicativo
├── app.json            # Configurações do Expo
├── assets/             # Imagens, ícones e outros recursos estáticos
├── index.ts            # Ponto de entrada do aplicativo
├── package.json        # Metadados do projeto e dependências
├── README.md           # Este arquivo
├── src/                # Código-fonte principal do aplicativo
│   ├── components/     # Componentes de UI reutilizáveis
│   │   └── ui/         # Componentes de interface de usuário (Button, Card, Input)
│   ├── context/        # Contextos globais (ex: ThemeContext para tema claro/escuro)
│   ├── models/         # Definições de tipos e interfaces (Moto.ts, RootStackParamList.ts)
│   ├── navigation/     # Configuração de navegação (AppRoutes.tsx, MainStack.tsx)
│   ├── screens/        # Telas principais do aplicativo
│   │   ├── Onboarding/ # Telas de onboarding inicial
│   │   └── Register/   # Telas do fluxo de cadastro em etapas
│   ├── services/       # Serviços de integração com a API (api.ts, motoService.ts, patioService.ts)
│   ├── storage/        # Armazenamento local (AuthStorage.ts, MotoStorage.ts)
│   └── styles/         # Definições de estilos (colors.ts, spacing.ts, typography.ts)
└── tsconfig.json       # Configurações do TypeScript
```

## 📈 Próximos Passos e Melhorias Futuras

Para futuras iterações do projeto, as seguintes melhorias são sugeridas:

*   **Tratamento de Erros e Paginação**: Refinar a integração com a API, incluindo tratamento de erros mais robusto e implementação de paginação para grandes volumes de dados. 🚧
*   **Integração com Outras Entidades da API**: Expandir a integração para outras entidades da `Trackin.API`, como Pátios e Sensores, conforme a necessidade. 🔗
*   **Testes**: Adicionar testes unitários e de integração para garantir a estabilidade e a qualidade do código. 🧪
*   **Autenticação via API**: Explorar a possibilidade de migrar a autenticação de usuários para a API externa em futuras sprints, centralizando todo o gerenciamento de usuários. 🔑
*   **Notificações**: Implementar notificações push para eventos importantes, como a entrada ou saída de uma moto do pátio. 🔔
*   **Otimização de Performance**: Realizar otimizações de performance para garantir uma experiência de usuário fluida em diferentes dispositivos. ⚡

