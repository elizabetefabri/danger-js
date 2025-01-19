import { parseToObject } from "hcl2-parser";
import { parseTerraformFile } from "../../helpers/parserHelper";

// Tags obrigatórias
const REQUIRED_TAGS = ["Owner", "Environment", "Project"];

export const validateTags = (fileContent: string): string[] => {
  const errors: string[] = [];
  const parsedContent = parseTerraformFile(fileContent);

  if (parsedContent.resource) {
    for (const [resourceType, resources] of Object.entries(
      parsedContent.resource as Record<string, Record<string, unknown>>
    )) {
      for (const [resourceName, attributes] of Object.entries(
        resources as Record<string, { tags?: Record<string, string> }>
      )) {
        const tags = attributes.tags || {};
        const missingTags = REQUIRED_TAGS.filter((tag) => !(tag in tags));
        if (missingTags.length > 0) {
          errors.push(
            `Recurso ${resourceName} (${resourceType}) está faltando as tags obrigatórias: ${missingTags.join(
              ", "
            )}.`
          );
        }
      }
    }
  }
  return errors;
};
