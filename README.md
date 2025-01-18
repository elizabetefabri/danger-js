# Tutorial Básico: Como Iniciar com Danger.js Localmente

Este guia ensina como configurar o ambiente local para usar o [Danger.js](https://danger.systems/js/) em projetos GitHub. Abaixo estão os passos básicos de instalação e organização.

## Pré-requisitos

Antes de começar, verifique se você já possui os seguintes itens instalados no computador:

### 1. Node.js e npm
Execute os comandos abaixo no terminal para verificar:
```bash
node -v
npm -v
```
Se não estiverem instalados, faça o download de [Node.js](https://nodejs.org/).

### 2. Git
Verifique a instalação do Git com:
```bash
git --version
```
Se não estiver instalado, baixe-o em [Git](https://git-scm.com/).

---

## Passo 1: Criar o Projeto

1. Crie uma pasta para o projeto e navegue até ela:
   ```bash
   mkdir danger-js-tutorial
   cd danger-js-tutorial
   ```

2. Inicialize o projeto Node.js:
   ```bash
   npm init -y
   ```

Isso criará um arquivo `package.json` básico na pasta.

---

## Passo 2: Instalar o Danger.js

1. Instale o Danger.js como uma dependência de desenvolvimento:
   ```bash
   npm install --save-dev danger
   ```

2. Verifique se o Danger.js foi instalado corretamente:
   ```bash
   npx danger --version
   ```

---

## Passo 3: Configurar o Danger.js

1. Inicialize o Danger.js no projeto:
   ```bash
   npx danger init
   ```

   Isso criará o arquivo `dangerfile.js` na raiz do projeto.

2. Verifique o conteúdo inicial do `dangerfile.js`:
   ```javascript
   // dangerfile.js
   schedule(async () => {
     console.log("Danger está rodando!");
   });
   ```

---

## Passo 4: Criar um Workflow para GitHub Actions

1. Crie a pasta para os workflows do GitHub:
   ```bash
   mkdir -p .github/workflows
   ```

2. Crie o arquivo `danger.yml`:
   ```bash
   nano .github/workflows/danger.yml
   ```

3. Adicione o seguinte conteúdo:
   ```yaml
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
   ```

---

## Passo 5: Testar Localmente

Para rodar o Danger.js localmente no terminal, use:
```bash
npx danger ci
```

Isso executa o arquivo `dangerfile.js` e exibe a saída no terminal.

---

## Passo 6: Adicionar uma Regra Básica no `dangerfile.js`

1. Abra o arquivo `dangerfile.js` e adicione a seguinte regra:
   ```javascript
   // dangerfile.js
   schedule(async () => {
     const modifiedFiles = danger.git.modified_files;
     if (modifiedFiles.includes('README.md')) {
       warn('Você modificou o README.md. Verifique se ele está atualizado!');
     }
   });
   ```

2. O que essa regra faz:
   - Verifica se o arquivo `README.md` foi modificado em um pull request.
   - Emite um **warning** caso tenha sido alterado.

---

## Passo 7: Criar um Pull Request para Testar

1. Faça o primeiro commit:
   ```bash
   git init
   git add .
   git commit -m "Inicializando projeto com DangerJS"
   ```

2. Crie um novo branch:
   ```bash
   git checkout -b test-danger
   ```

3. Adicione uma mudança ao `README.md`:
   ```bash
   echo "# DangerJS Tutorial" > README.md
   git add README.md
   git commit -m "Atualizando README.md"
   ```

4. Suba o código para o GitHub:
   ```bash
   git remote add origin <URL_DO_REPOSITORIO>
   git push --set-upstream origin test-danger
   ```

5. Abra um Pull Request no GitHub para o branch `main`.

6. Verifique os warnings do Danger.js no Pull Request.

---

## Configuração do Token de Acesso Pessoal

1. Gere um token de acesso pessoal no GitHub:  
   Acesse [GitHub Tokens](https://github.com/settings/tokens/new).

2. Para projetos open source, forneça apenas o escopo `public_repo`.

3. Adicione o token como uma variável no ambiente da sua CI, usando o nome `DANGER_GITHUB_API_TOKEN`.

---

## Recursos Úteis

- Teste novas regras localmente com:
  ```bash
  npx danger pr
  ```

- Consulte exemplos de `Dangerfiles` para se inspirar:
  - [Artsy](https://github.com/artsy/eigen/blob/master/dangerfile.ts)
  - [React Native](https://github.com/facebook/react-native/blob/main/packages/react-native-bots/dangerfile.js)
  - [MUI](https://github.com/mui/material-ui/blob/main/dangerfile.ts)

🎉 Danger.js em seus projetos. Se tiver dúvidas, confira a [documentação oficial](http://danger.systems/js/).
