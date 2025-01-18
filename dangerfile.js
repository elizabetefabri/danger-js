const {danger, fail, warn} = require('danger')

// Certifique-se de que o PR não está direcionado para `main`
if (danger.github.pr.base.ref === 'main') {
  fail('Pull Requests não podem ser direcionados para a branch `main`. Use `development` como destino.');
}

// Verifica se a branch de origem segue o padrão esperado
// Verifica se a branch de origem segue o padrão esperado
const branchName = danger.github.pr.head.ref; // Nome da branch de origem
const validBranchPatterns = [/^feature\//, /^hotfix\//]; // Padrões válidos

const isValidBranch = validBranchPatterns.some((pattern) => pattern.test(branchName));

if (!isValidBranch) {
  fail(`A branch \`${branchName}\` não segue os padrões esperados. Use os prefixos \`feature/\` ou \`hotfix/\`.`);
} else {
  message(`A branch \`${branchName}\` segue o padrão esperado. 👍`);
}

// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 10) {
  warn('Por favor, adicione uma descrição ao PR com pelo menos 10 caracteres.');
}
// Adiciona mensagens no painel
message('Iniciando a validação do Pull Request...');
// Outras validações...
message('Todas as validações foram concluídas com sucesso!');