'use client';

import { usePetContext } from '@/lib/hooks';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

// To get the button from left to right then create a parent at FORM level to seperate the form.
// Then use flex flex-col (like not change but already in flex mode)
type PetFormProps = {
  actionType: 'Add' | 'Edit';
  onFromSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFromSubmission,
}: PetFormProps) {
  const { handleAddPet, selectedPet } = usePetContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get data from the form
    const formData = new FormData(e.currentTarget);
    const newPet = {
      // we know that alway the value be there just that typescript don't know. so do as string
      name: formData.get('name') as string,
      ownerName: formData.get('ownerName') as string,
      imageUrl:
        (formData.get('imageUrl') as string) ||
        'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
      age: +(formData.get('age') as string),
      notes: formData.get('notes') as string,
    };

    // Argument of type '{ [k: string]: FormDataEntryValue; }' is not assignable to parameter of type 'Pet'.
    handleAddPet(newPet);
    onFromSubmission();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={actionType === 'Edit' ? selectedPet?.name : ''}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={actionType === 'Edit' ? selectedPet?.ownerName : ''}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={actionType === 'Edit' ? selectedPet?.imageUrl : ''}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="text"
            required
            defaultValue={actionType === 'Edit' ? selectedPet?.age : ''}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            required
            defaultValue={actionType === 'Edit' ? selectedPet?.notes : ''}
          />
        </div>
      </div>

      {/* Button Moved to left with flex */}
      <Button type="submit" className="mt-5 self-end">
        {actionType === 'Add' ? 'Add a new pet' : 'Edit pet'}
      </Button>
    </form>
  );
}
