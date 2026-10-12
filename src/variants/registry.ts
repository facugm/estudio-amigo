import { VariantDefinition, VariantId } from './types';
import { orillaVariant } from './orilla';
import { nefiuVariant } from './nefiu';
import { escalamosVariant } from './escalamos';
import { creativewiseVariant } from './creativewise';

export const VARIANTS: readonly VariantDefinition[] = [
  orillaVariant,
  nefiuVariant,
  escalamosVariant,
  creativewiseVariant
];

export const DEFAULT_VARIANT_ID: VariantId = 'orilla';

export function isVariantId(value: unknown): value is VariantId {
  return (
    typeof value === 'string' &&
    ['orilla', 'nefiu', 'escalamos', 'creativewise'].includes(value)
  );
}
