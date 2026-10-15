import { VariantDefinition, VariantId } from './types';
import { nefiuVariant } from './nefiu';
import { escalamosVariant } from './escalamos';
import { creativewiseVariant } from './creativewise';

export const VARIANTS: readonly VariantDefinition[] = [
  nefiuVariant,
  escalamosVariant,
  creativewiseVariant
];

export const DEFAULT_VARIANT_ID: VariantId = 'nefiu';

export function isVariantId(value: unknown): value is VariantId {
  return (
    typeof value === 'string' &&
    ['nefiu', 'escalamos', 'creativewise'].includes(value)
  );
}
