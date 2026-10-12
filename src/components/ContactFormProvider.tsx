import { createContext, useContext, useState, ReactNode } from 'react';

export interface ContactDraft {
  name: string;
  email: string;
  message: string;
}

export function validateContact(
  draft: ContactDraft
): Partial<Record<keyof ContactDraft, string>> {
  const errors: Partial<Record<keyof ContactDraft, string>> = {};

  if (!draft.name.trim()) {
    errors.name = 'El nombre es obligatorio';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(draft.email.trim())) {
    errors.email = 'El email no es válido';
  }

  if (draft.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  return errors;
}

interface ContactFormContextValue {
  draft: ContactDraft;
  errors: Partial<Record<keyof ContactDraft, string>>;
  status: 'editing' | 'confirmed';
  setField: (field: keyof ContactDraft, value: string) => void;
  submit: () => boolean;
  reset: () => void;
}

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

const initialDraft: ContactDraft = {
  name: '',
  email: '',
  message: ''
};

export function ContactFormProvider({ children }: { children: ReactNode }): JSX.Element {
  const [draft, setDraft] = useState<ContactDraft>(initialDraft);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactDraft, string>>>({});
  const [status, setStatus] = useState<'editing' | 'confirmed'>('editing');

  const setField = (field: keyof ContactDraft, value: string) => {
    setDraft(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const submit = (): boolean => {
    const errs = validateContact(draft);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setStatus('editing');
      return false;
    }

    setErrors({});
    setStatus('confirmed');
    return true;
  };

  const reset = () => {
    setErrors({});
    setStatus('editing');
  };

  return (
    <ContactFormContext.Provider
      value={{
        draft,
        errors,
        status,
        setField,
        submit,
        reset
      }}
    >
      {children}
    </ContactFormContext.Provider>
  );
}

export function useContactForm(): ContactFormContextValue {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error('useContactForm must be used within a ContactFormProvider');
  }
  return context;
}
