'use client';

// Hydration failed because initial UI does not match what was rendered on the server
// Even it is client component, But nextjs is first first render everthing on server and then render on the client.
// If there is a mismatch between the server and client, it will throw an error.
// solution : asChild ( something thing render twice button after a button)
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import PetForm from './pet-form';
import { useState } from 'react';

type PetButtonProps = {
  actionType: 'Add' | 'Edit' | 'Checkout';
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function PetButton({
  actionType,
  onClick,
  children,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === 'Checkout') {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === 'Add' ? (
          <Button size="icon">
            <PlusIcon />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === 'Add' ? 'Add a new pet' : 'Edit pet'}
          </DialogTitle>
        </DialogHeader>

        <PetForm
          actionType={actionType}
          onFromSubmission={() => setIsFormOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
