'use client';

import { Pet } from '@/lib/types';
import { createContext, useState } from 'react';
// 1. Create PetContextProvider.tsx in src/contexts
// 2. Import PetContextProvider in src/app/app/layout.tsx
// 4. Moved fetch api to layout.tsx and pass the fetched data to PetContextProvider as props
// 5. Import PetContext in src/components/pet-list.tsx to consume the context data.

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type PetContextType = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (pet: Omit<Pet, 'id'>) => void;
};

// 2. Create a context to be exported
export const PetContext = createContext<PetContextType | null>(null);

// 1. Create a function component with states and accept children object and data object
export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [pets, setPets] = useState(data);

  // keep track of the selected pet
  // states
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // Good practice to Pass function handler instead setState directly
  // event handler /actions

  const handleCheckoutPet = (id: string) => {
    // filter out the pet with the id
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  // let's omit the Id
  const handleAddPet = (newPet: Omit<Pet, 'id'>) => {
    // for to insert id because of the type
    setPets((prevPets) => [
      ...prevPets,
      {
        id: Date.now().toString(),
        ...newPet,
      },
    ]);
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
    // you can still do something else here
  };

  // 3. Provide the context to the children and value is the state that you wanted to transport around the app.
  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
