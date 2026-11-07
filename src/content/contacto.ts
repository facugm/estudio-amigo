/**
 * Número de WhatsApp del estudio, en formato internacional sin "+", espacios ni guiones
 * (por ejemplo, 5493410000000 para un celular de Rosario).
 * Mientras sea `null`, los botones llevan a la sección de contacto de la página.
 */
export const WHATSAPP_NUMERO: string | null = null;

/** Mensaje que aparece escrito al abrir el chat. */
export const MENSAJE_WHATSAPP =
  'Hola Estudio Amigo! Vi la web y quiero saber cómo pueden ayudar a mi marca.';

/** Destino de respaldo mientras no haya número cargado. */
export const ANCLA_CONTACTO = '#contacto';

export function linkWhatsApp(mensaje: string = MENSAJE_WHATSAPP): string {
  if (!WHATSAPP_NUMERO) return ANCLA_CONTACTO;
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}
