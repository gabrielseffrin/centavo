# Instruções

Centavo é um aplicativo de controle financeiro com funcionalidades de login e registro, desenvolvido para ajudar os usuários a gerenciar suas finanças de forma confiável e eficiente. 

## Índice 

- [Pré-requisitos](#pré-requisitos) 

- [Instalação](#instalação) 

- [Configuração](#configuração) 

- [Execução](#execução) 

- [Centavo](#centavo)

  

- ## Pré-requisitos 

  Antes de iniciar, certifique-se de que você tem as seguintes ferramentas instaladas: 

- [Node.js](https://nodejs.org/) (versão recomendada: 16 ou superior) 

- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) como gerenciador de pacotes 

## Instalação 

1. Clone o repositório:   

   ```
   git clone https://github.com/gabrielseffrin/centavo.git
   ```

2. Navegue até o diretório do projeto

   ```
   cd centavo
   ```

3. Instale as dependências

   ```
   yarn install
   ```

   

## Configuração

Certifique-se de configurar todas as variáveis de ambiente necessárias, caso o projeto utilize algum arquivo `.env`. Consulte a documentação ou os responsáveis pelo projeto se tiver dúvidas sobre como configurar essas variáveis.



## Execução

Para iniciar o servidor de desenvolvimento, execute o comando:

```
yarn start
```



# centavo

O _centavo_ é um aplicativo móvel voltado para o controle financeiro pessoal, permitindo que o usuário registre e acompanhe suas despesas e rendas de forma prática e rápida. O objetivo do app é ajudar as pessoas a terem um controle mais preciso das suas finanças durante o mês, com funcionalidades que oferecem insights valiosos sobre onde o dinheiro está sendo gasto e onde podem ser feitas economias.

## Objetivo do App

O principal propósito do _centavo_ é facilitar o registro contínuo de despesas e rendimentos, eliminando a necessidade de recorrer a planilhas complexas como as do Excel. O usuário poderá registrar seus gastos em tempo real, garantindo uma visão clara de sua situação financeira a qualquer momento.

## Público-Alvo

O aplicativo é voltado para pessoas que desejam uma maneira simples e eficiente de gerenciar suas finanças pessoais. O _centavo_ é ideal para quem precisa de um controle financeiro mais prático e acessível, evitando a perda de informações ao final do mês.

## Funcionalidades

### basicas

- [X] Registro de despesas: O usuário poderá inserir as suas despesas conforme elas ocorrem.
- [X] Registro de rendas: Permite ao usuário registrar suas fontes de entrada de dinheiro.
- [X] Comparativo despesas x rendas: Exibe um balanço financeiro entre despesas e receitas ao longo do mês.
- [X] Categorização de despesas: Os gastos podem ser organizados em categorias (ex: alimentação, transporte, lazer, etc.).
- [X] Registro de usuário (autenticação): O usuário deve se registrar e fazer login no aplicativo para que suas informações sejam armazenadas de forma personalizada.
- [X] Consulta de despesas e rendas: O usuário poderá visualizar uma lista de suas despesas e rendas já inseridas, com filtros por data e categoria.
- [ ] Edição e exclusão de despesas e rendas: O usuário poderá editar ou excluir despesas e rendas registradas anteriormente.
- [ ] Edição de perfil do usuário: O usuário poderá atualizar suas informações pessoais (ex: nome, e-mail, senha).

### futuras



- [ ] Geração de relatórios: O app deverá fornecer relatórios financeiros mensais que ajudam o usuário a visualizar o destino do seu dinheiro.
- [ ] Exportação de dados: Permitir que os usuários exportem seus dados financeiros para planilhas ou PDFs.
- [ ] Versão desktop: Expansão para uma versão de desktop que ofereça uma interface mais completa e recursos adicionais de controle financeiro.
- [ ] Notificações personalizadas: Lembrar o usuário de registrar suas despesas ou notificá-lo quando atingir um determinado limite de gastos em uma categoria.
- [ ] Salvar localização por GPS: Registrar automaticamente a localização geográfica (latitude e longitude) do local onde a despesa foi realizada, para que o usuário possa, no futuro, visualizar em gráficos ou mapas os locais onde gasta mais dinheiro.
- [ ] Gráficos de localização: Com base nas localizações salvas, gerar gráficos que mostrem as áreas ou regiões onde o usuário mais gasta, possibilitando uma análise visual dos hábitos de consumo.
- [ ] Backup e sincronização automática: O app deve salvar automaticamente as informações no Firebase e permitir acesso em múltiplos dispositivos.

## Protótipos de tela

Algumas telas do aplicativo:
login
cadastro de usuário
homepage
cadastro de despesas

​    https://www.figma.com/design/5xTT4vszshUfTCD6jqZGI5/centavo?node-id=0-1&node-type=canvas

## Modelagem do banco

O projeto terá banco de dados relacional.



Tabelas mapeadas:

users (tabela para usuários)
category_types (tabela para armazenar o tipo da categoria da despesa)
categories (tabela para armazenar as categorias)
locations (tabela para armazenar os locais de gastos)
transactions (tabela fato, contendo as transações de entradas e saídas)

​    ![image](https://github.com/user-attachments/assets/0fbb2112-6bdd-48e8-8c0d-c59881cb95e3)




## Planejamento de Sprints

### **Checkpoint 2: Roteamento e Esqueleto de Telas**

**Roteamento de Telas ** _1 a 2 semanas_

- [X] Espera-se ver todas as telas do app estilizadas e o usuário podendo navegar livremente entre elas, mesmo que com dados fake para simular o funcionamento da interface;
- [X] Configure o Expo Router, implemente o(s) layout.tsx necessários;
- [X] Configure os meta-dados das telas (como o título das Headers, no caso da navegação Stack);
- [X] Certifique-se de ter implementado no Expo Router todos os fluxos que você propôs, todas as telas do figma devem ser acessíveis, mesmo que não contenham todos os componentes propostos.

**Esqueletos das Telas **_1 semana a 1.5 semanas_

- [X] Todas as telas devem estar presentes nesta versão;
- [X] Crie os componentes necessários e use-os nas telas;
- [X] Certifique-se de que o app está pronto para iniciar a integração com banco de dados ou APIs (conforme o caso);
- [X] Use dados fake ou placeholders para demonstrar como a tela deve ser quando estiver pronta.

**Defesa do código em vídeo**

- [ ] Vídeo

**Implementação do Modelo de Dados**

- [ ] Todas as tabelas (ou Schemas, para bancos NoSQL) devem estar implementados no App ou na API utilizada pelo App;

- [ ] Crie validações Zod para os dados (caso isso não seja possível, notifique o professor para elaborarmos uma alternativa);

- [ ] Use um seeder ou crie dados manualmente para popular e demonstrar as telas e componentes da interface do App.

Implementação dos Componentes e Estilos das Telas:

- [ ] Crie e estilize todos os componentes de UI necessários para o seu aplicativo, você pode usar NativeWind ou qualquer outra técnica de estilização compatível com o React Native;

- [ ] Espera-se ver a maioria das telas do app estilizadas e o usuário podendo navegar livremente entre elas (usando Expo Router), desta vez com dados reais do banco ou da API para demonstrar o funcionamento da interface;

- [ ] Certifique-se de ter implementado todos os fluxos que você propôs, todas as telas do figma devem ser acessíveis, desta vez com todos os componentes propostos (no checkpoint anterior a entrega era parcial).


Integração de Funcionalidades:

### outros tópicos

**Sprint 1: Configuração Inicial e Autenticação de Usuário**

- [ ] Configuração do ambiente de desenvolvimento (Firebase, Git, setup do projeto).
- [ ] Implementação da autenticação de usuários (registro, login e logout).
- [ ] Criação das telas de login e registro.
- [ ] Testes iniciais da funcionalidade de autenticação.

**Sprint 2: Registro de Despesas e Rendas**

- [ ] Criação das telas de registro de despesas e rendas.
- [ ] Implementação da funcionalidade de salvar despesas e rendas no Firebase Firestore.
- [ ] Criação da listagem básica de despesas e rendas.
- [ ] Testes de inserção e recuperação de dados no Firestore.

**Sprint 3: Categorização e Edição de Despesas/Rendas**

- [ ] Implementação de categorias para despesas (ex: alimentação, transporte, lazer).
- [ ] Criação da funcionalidade de edição e exclusão de despesas/rendas.
- [ ] Atualização da listagem para permitir filtros por categoria.
- [ ] Testes das funcionalidades de edição, exclusão e filtros.

**Sprint 4: Comparativo de Despesas x Rendas**

- [ ] Implementação do cálculo do balanço mensal (despesas - rendas).
- [ ] Criação de gráficos ou tabelas para visualização do comparativo financeiro.
- [ ] Testes da funcionalidade e da visualização do balanço.

**Sprint 5: Geração de Relatórios Financeiros**

- [ ] Implementação da geração automática de relatórios financeiros mensais.
- [ ] Criação de funcionalidade de exportação de relatórios (PDF ou CSV).
- [ ] Testes de geração e exportação de relatórios.

**Sprint 6: Refinamento e Melhorias Finais**

- [ ] Melhorias na interface do usuário e usabilidade.
- [ ] Correção de bugs e problemas identificados durante os testes.
- [ ] Otimização de performance e ajustes no Firebase.
- [ ] Testes finais de integração e desempenho.