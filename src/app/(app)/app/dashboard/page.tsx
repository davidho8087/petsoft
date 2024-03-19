import Branding from '@/components/branding';
import ContentBlock from '@/components/content-block';
import PetButton from '@/components/pet-button';
import PetDetails from '@/components/pet-details';
import PetList from '@/components/pet-list';
import SearchForm from '@/components/search-form';
import Stats from '@/components/stats';

// data passed to petlist component to listing the pets , we need to click selected list to get pet details
// Pe-details is component at the same level as pet-list component. Both in the same page.
// To keep track of something, we use states amd useEffect
// server component cannot use states and useEffect
// We cannot use client components, otherwise all imports and the page will be client components.
// But the data must also assign to state in order to manupulate the data in the pet details component.
// solutions: use Context Api and Fetch api statement moved to layout.tsx because contextapi was imported in layout.tsx
// Pet-details component can consume the context data but it must become client component in order to use the context data.

export default async function DashboardPage() {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <Branding />
        <Stats />
      </div>

      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <PetList />
            <div className="absolute bottom-4 right-4">
              <PetButton actionType="Add" />
            </div>
          </ContentBlock>
        </div>

        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
