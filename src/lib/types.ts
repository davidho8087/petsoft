export type Pet = {
  id: string;
  imageUrl: string;
  name: string;
  ownerName: string;
  age: number;
  notes: string;
};

export type PetListProps = {
  pets: Pet[];
};
