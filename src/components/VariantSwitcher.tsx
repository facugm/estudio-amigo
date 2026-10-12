import { useRef, KeyboardEvent } from 'react';
import { useVariant } from '../variants/VariantProvider';
import { VARIANTS } from '../variants/registry';

export function VariantSwitcher(): JSX.Element {
  const { variant, setVariantId } = useVariant();
  const radioRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % VARIANTS.length;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + VARIANTS.length) % VARIANTS.length;
      e.preventDefault();
    }

    if (nextIndex !== index) {
      const nextVariant = VARIANTS[nextIndex]!;
      setVariantId(nextVariant.id);
      radioRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <fieldset className="variant-switcher">
      <legend className="sr-only">Propuesta de diseño</legend>
      <div className="variant-switcher-group" role="radiogroup">
        {VARIANTS.map((v, index) => {
          const isChecked = variant.id === v.id;
          const labelText = `${v.number} ${v.label}`;
          return (
            <label
              key={v.id}
              className={`variant-option ${isChecked ? 'is-active' : ''}`}
            >
              <input
                type="radio"
                name="variant-proposal"
                value={v.id}
                checked={isChecked}
                onChange={() => setVariantId(v.id)}
                onKeyDown={e => handleKeyDown(e, index)}
                ref={el => {
                  radioRefs.current[index] = el;
                }}
                aria-label={labelText}
                className="variant-radio"
              />
              <span className="variant-number">{v.number}</span>
              <span className="variant-label">{v.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
