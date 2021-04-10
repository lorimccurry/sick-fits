import { useEffect, useState } from 'react';

interface UseFormReturn {
  inputs: Inputs;
  handleChange: (event) => void;
  resetForm: () => void;
  clearForm: () => void;
}

interface Inputs {
  name?: string;
  description?: string;
  price?: number;
}

export default function useForm(initial = {}): UseFormReturn {
  const [inputs, setInputs] = useState(initial);

  // prevents infinite loop of setInputs to initial
  // gives useEffect something to watch that only
  // changes when initial is first passed in
  const initialValues = Object.values(initial).join('');
  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = Object.assign(event.target);
    const { name, type } = event.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      // first thing out of files arr
      [value] = event.target.files;
    }

    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
