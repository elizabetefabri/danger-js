import { danger, fail, message } from 'danger';
import { validateTags } from './terraform/validateTags';
import { validateResources } from './terraform/validateResources';
import { parseTerraformFile } from '../helpers/parserHelper';

export const runTerraformValidations = async (files: string[]) => {
    for (const file of files) {
        try{
            const fileContent = await danger.github.utils.fileContents(file);

            // Validação de Tags
            const tagErrors = validateTags(fileContent);
            for (const error of tagErrors) {
                fail(error)
            }
    
            // Validação de Recursos
            const parsedContent = parseTerraformFile(fileContent);
            const resourceErrors = validateResources(parsedContent);
            for(const error of resourceErrors) {
                fail(error);
            }
        } catch(error) {
            fail(`Erro ao validar o arquivo ${file}: ${error.message}`);
        }
    }

    message('Validações de Terraform concluídas.');
};