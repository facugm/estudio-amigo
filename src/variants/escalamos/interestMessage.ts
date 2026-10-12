export function buildInterestMessage(services: readonly string[]): string {
  if (services.length === 0) {
    return '';
  }
  return `Hola TEA, me interesan los siguientes servicios: ${services.join(', ')}. Me gustaría coordinar un diagnóstico para mi proyecto.`;
}
