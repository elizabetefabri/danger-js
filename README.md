
Aula Básica: Como Iniciar com Danger.js Localmente
Objetivo da Aula: Configurar o ambiente local para começar a usar o Danger.js em projetos GitHub, com passos básicos de instalação e organização.

Passo 1: Pré-requisitos
Antes de começarmos, verifique se você já tem os seguintes itens instalados no seu computador:

Node.js e npm:

Para verificar, rode:
bash
Copiar
Editar
node -v
npm -v
Se não estiverem instalados, baixe-os de Node.js.
Git:

Para verificar, rode:
bash
Copiar
Editar
git --version
Se não estiver instalado, baixe-o de Git.
Passo 2: Criar o Projeto
Abra o terminal e crie uma nova pasta para o projeto:

bash
Copiar
Editar
mkdir danger-js-tutorial
cd danger-js-tutorial
Inicialize o projeto Node.js:

bash
Copiar
Editar
npm init -y
Isso cria um arquivo package.json básico na pasta.

Passo 3: Instalar o Danger.js
Instale o Danger.js como uma dependência de desenvolvimento:

bash
Copiar
Editar
npm install --save-dev danger
Verifique se o Danger.js foi instalado corretamente:

bash
Copiar
Editar
npx danger --version
Passo 4: Configurar o Danger.js
Inicialize o Danger.js no projeto:

bash
Copiar
Editar
npx danger init
Isso cria um arquivo chamado dangerfile.js na raiz do projeto.

Verifique o conteúdo básico do dangerfile.js:

javascript
Copiar
Editar
// dangerfile.js
schedule(async () => {
  console.log("Danger está rodando!");
});
Passo 5: Criar um Workflow para GitHub Actions
Crie a pasta para workflows do GitHub:

bash
Copiar
Editar
mkdir -p .github/workflows
Crie um arquivo chamado danger.yml:

bash
Copiar
Editar
nano .github/workflows/danger.yml
Adicione o seguinte conteúdo ao arquivo:

yaml
Copiar
Editar
name: DangerJS

on:
  pull_request:
    branches:
      - main

jobs:
  danger:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm install
      - name: Run DangerJS
        run: npx danger ci
Passo 6: Testar Localmente
Para rodar o Danger.js localmente no terminal:
bash
Copiar
Editar
npx danger ci
Isso executa o arquivo dangerfile.js e exibe a saída no terminal.
Passo 7: Adicionar uma Regra Básica no dangerfile.js
Abra o arquivo dangerfile.js e adicione uma regra:

javascript
Copiar
Editar
// dangerfile.js
schedule(async () => {
  const modifiedFiles = danger.git.modified_files;
  if (modifiedFiles.includes('README.md')) {
    warn('Você modificou o README.md. Verifique se ele está atualizado!');
  }
});
O que isso faz?

Verifica se o arquivo README.md foi modificado em um pull request.
Emite um warning caso tenha sido alterado.
Passo 8: Criar um PR para Testar
Faça o primeiro commit:

bash
Copiar
Editar
git init
git add .
git commit -m "Inicializando projeto com DangerJS"
Crie um novo branch:

bash
Copiar
Editar
git checkout -b test-danger
Adicione uma mudança no README.md:

bash
Copiar
Editar
echo "# DangerJS Tutorial" > README.md
git add README.md
git commit -m "Atualizando README.md"
Suba o código para o GitHub:

bash
Copiar
Editar
git remote add origin <URL_DO_REPOSITORIO>
git push --set-upstream origin test-danger
Abra um Pull Request no GitHub para o branch main.

Verifique os warnings do Danger.js no PR.

npx danger init

Welcome to Danger Init - this will take you through setting up Danger for this project.
There are four main steps we need to do:

 - [ ] Create a Dangerfile and add a few simple rules.
 - [ ] Potentially create a GitHub account for Danger to use, for messaging.
 - [ ] Set up an access token for Danger to comment with.
 - [ ] Set up Danger to run on your CI.

But before we start, we need one bit of information from you.
Is this is for an Open Source or private project?

[1] Open Source
[2] Private Repo
[0] CANCEL

A escolha entre Open Source ou Private Repo depende do tipo de projeto que você está configurando:

1. Open Source
Escolha Open Source se o repositório for público e qualquer pessoa puder acessá-lo.
Isso significa que as mensagens e integrações serão abertas a todos.
2. Private Repo
Escolha Private Repo se o repositório for privado, acessível apenas para membros autorizados.
Essa é a escolha ideal para projetos internos ou corporativos.

Como escolher?
Digite o número correspondente e pressione Enter:

Para Open Source: 1
Para Private Repo: 2

# retornou
## Step 1: Creating a starter Dangerfile


I've set up an example Dangerfile for you in this folder.

> cat /home/elizabete/www/estudo-danger/danger-js-tutorial/dangerfile.js 

  const {danger, warn} = require('danger')
  
    
  // No PR is too small to include a description of why you made a change
  if (danger.github.pr.body.length < 10) {
    warn('Please include a description of your PR changes.');
  }
  
    

There's a collection of small, simple rules in here, but Danger is about being able to easily
iterate. The power comes from you having the ability to codify fixes for some of the problems
that come up in day to day programming. It can be difficult to try and see those from day 1.

If you'd like to investigate the file, and make some changes - I'll wait here,
press return when you're ready to move on...

O Danger.js criou um arquivo dangerfile.js básico para você, que já contém um exemplo de regra. Vamos revisar o que ele fez e decidir o próximo passo.

O que o dangerfile.js está fazendo?
Importa os métodos danger e warn:
javascript
Copiar
Editar
const { danger, warn } = require('danger');
Adiciona uma regra:
Verifica se o corpo da Pull Request (danger.github.pr.body) tem menos de 10 caracteres.
Caso tenha, emite um warning pedindo uma descrição mais detalhada:
javascript
Copiar
Editar
if (danger.github.pr.body.length < 10) {
  warn('Please include a description of your PR changes.');
}

 nano dangerfile.js

## Step 3: Configuring a GitHub Personal Access Token

Here's the link, you should open this in the private session where you just created the new GitHub account

https://github.com/settings/tokens/new

For Open Source projects, I'd recommend giving the token the smallest scope possible.
This means only providing access to public_repo in the token.
This token limits Danger's abilities to just writing comments on OSS projects. We recommend
this because the token can quite easily be extracted from the environment via pull requests.

It is important that you do not store this token in your repository, as GitHub will
automatically revoke your token when pushed.


👍, please press return when you have your token set up...

↵ 

## Add to CI

You need to expose a token called DANGER_GITHUB_API_TOKEN and the value is the GitHub Personal Access Token.
Depending on the CI system, this may need to be done on the machine (in the ~/.bashprofile) or in a web UI somewhere.
We have a guide for all supported CI systems on danger.systems:
http://danger.systems/js/guides/getting_started.html#setting-up-danger-to-run-on-your-ci

## Useful info

- One of the best ways to test out new rules as you build them is via bundle exec danger pr.
- You can have Danger output a lot of info via the --verbose option.
- You can look at the following Dangerfiles to get some more ideas:

  * https://github.com/artsy/eigen/blob/master/dangerfile.ts
  * https://github.com/facebook/react-native/blob/main/packages/react-native-bots/dangerfile.js
  * https://github.com/mui/material-ui/blob/main/dangerfile.ts#L4
  * https://github.com/styleguidist/react-styleguidist/blob/master/dangerfile.ts
  * https://github.com/storybookjs/storybook/blob/master/.ci/danger/dangerfile.ts


🎉

And you're good to go. Danger is a collaboration between Orta Therox, Gem 'Danger' Maslen,
and every who has sent PRs.

If you like Danger, let others know. If you want to know more, follow @orta@webtoo.ls on Mastodon!
If you don't like something about Danger, help us improve the project - it's all done on volunteer time! xxx
Remember: it's nice to be nice.