const {danger, warn} = require('danger')

// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 10) {
  warn('Por favor, adicione uma descrição ao PR com pelo menos 10 caracteres.');
}
// Adiciona mensagens no painel
message('Iniciando a validação do Pull Request...');
// Outras validações...
message('Todas as validações foram concluídas com sucesso!');