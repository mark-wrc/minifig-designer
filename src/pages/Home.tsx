import { useState } from 'react';
import { GeneralDialog, GeneralDialogTitle, GeneralDialogDescription } from '@/components';
import { CategorySection, MinifigBuilderSection } from '@/containers';
import * as Dialog from '@radix-ui/react-dialog';

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-full p-8">
      <CategorySection />
      <MinifigBuilderSection />

      {/* Sample dialog (to be removed). Wrap the child close button with Dialog.Close if needed */}
      <>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">
          Open Dialog
        </button>
        <GeneralDialog open={open} onOpenChange={setOpen} disableClickOutside disableEscapeKey>
          <div>
            <GeneralDialogTitle title="Test Dialog Only" />
            <GeneralDialogDescription description="This is a placeholder description text only for the general dialog description" />
            <Dialog.Close>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                aria-label="Close"
              >
                Close
              </button>
            </Dialog.Close>
          </div>
        </GeneralDialog>
      </>
    </div>
  );
};

export default Home;
