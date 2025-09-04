export const validateRequestBody = (body: Record<string, any>, requiredFields: string[]): string[] => {
  const missingFields: string[] = [];
  for (let field of requiredFields) {
    if (!body[field]) {
      missingFields.push(field);
    }
  }
  return missingFields;
}