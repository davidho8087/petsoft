'use client';

import { createContext, useState } from 'react';
// 1. Create PetContextProvider.tsx in src/contexts
// 2. Import PetContextProvider in src/app/app/layout.tsx
// 4. Moved fetch api to layout.tsx and pass the fetched data to PetContextProvider as props
// 5. Import PetContext in src/components/pet-list.tsx to consume the context data.

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type SearchContextType = {
  searchQuery: string;
  handleChangeSearchQuery: (newValue: string) => void;
};

// 2. Create a context to be exported
export const SearchContext = createContext<SearchContextType | null>(null);

// 1. Create a function component with states and accept children object and data object
export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  // states
  const [searchQuery, setSearchQuery] = useState('');

  // derived state

  // event handler /actions
  const handleChangeSearchQuery = (newValue: string) => {
    setSearchQuery(newValue);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleChangeSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
