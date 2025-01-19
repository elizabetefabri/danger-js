export const validateResources = (parsedContent: { resource?: Record<string, unknown> }): string[] => {
    const errors: string[] = [];
  
    if (parsedContent.resource) {
      for (const resourceType of Object.keys(parsedContent.resource)) {
        if (!['aws_instance', 'aws_s3_bucket'].includes(resourceType)) {
          errors.push(`Recurso do tipo ${resourceType} não é permitido.`);
        }
      }
    }
  
    return errors;
  };