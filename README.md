# Track In - Sistema de Gestão de Motos no Pátio

O **Track In** é um aplicativo mobile desenvolvido com **React Native + Expo**, focado no controle, monitoramento e organização de motocicletas nos pátios da Mottu. A solução simula tecnologias como **RFID** e **visão computacional** para mapear as motos em tempo real.

## Funcionalidades

- Cadastro, edição e exclusão de motos
- Busca inteligente por modelo
- Separação por status: Disponível, Retirada, Em manutenção
- Upload de imagem da moto via URL
- Simulação de localização via aba "Scanner"
- Tela de status com agrupamento e visualização detalhada
- Fluxo moderno de onboarding, login e registro
- Suporte a temas (claro e escuro)
- Persistência local com AsyncStorage

## Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- React Navigation
- React Hook Form + Zod
- AsyncStorage
- Expo Google Fonts

## Como Executar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/trackin-app.git
cd trackin-app

2. Instale as dependências:
npm install

3.Inicie o projeto com Expo:
npx expo start
