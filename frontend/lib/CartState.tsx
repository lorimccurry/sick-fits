import { func } from 'prop-types';
import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type CartStateType = {
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>> | null;
  toggleCart?: () => void;
  closeCart?: () => void;
  openCart?: () => void;
};

type CartStateProviderProps = {
  children: ReactNode;
};

const defaultCartState = { cartOpen: false, setCartOpen: null };
const LocalStateContext: React.Context<CartStateType> = createContext(
  defaultCartState
);
const LocalStateProvider = LocalStateContext.Provider;

// Provider
function CartStateProvider({ children }: CartStateProviderProps): ReactElement {
  // this is a custom provider where data (state) and functionality (updaters) are stored and anyone can access via the consumer.

  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    return setCartOpen(false);
  }

  function openCart() {
    return setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

// Consumer
// custom hook to access cart local state
function useCart(): CartStateType {
  return useContext(LocalStateContext);
}

export { CartStateProvider, useCart };
