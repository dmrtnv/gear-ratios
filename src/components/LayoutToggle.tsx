import { useLayout } from '@/contexts/LayoutProvider';
import { cn } from '@/lib/utils';
import { AppWindow, Columns3 } from 'lucide-react';

type LayoutToggleProps = {
  className?: string;
  iconSize?: number;
};

function LayoutToggle({ className = '', iconSize = 24 }: LayoutToggleProps) {
  const { layout, setLayout } = useLayout();

  return (
    <button
      onClick={() => {
        setLayout(layout === 'tabs' ? 'columns' : 'tabs');
      }}
      className={cn(
        'group flex aspect-square cursor-pointer items-center justify-center rounded-lg p-2 transition-colors ease-in-out hover:bg-muted active:bg-muted-md',
        className,
      )}
    >
      {layout === 'tabs' ? (
        <Columns3
          size={iconSize}
          strokeWidth={2.4}
          className='text-muted-foreground-lg transition-colors ease-in-out group-hover:text-muted-foreground-md group-active:text-muted-foreground'
        />
      ) : (
        <AppWindow
          size={iconSize}
          strokeWidth={2.4}
          className='text-muted-foreground-lg transition-colors ease-in-out group-hover:text-muted-foreground-md group-active:text-muted-foreground'
        />
      )}
    </button>
  );
}

export default LayoutToggle;
