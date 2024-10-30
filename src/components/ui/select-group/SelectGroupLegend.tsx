import { cn } from '@/lib/utils';

type SelectGroupLegendProps = {
  children: string;
  hidden?: boolean;
  className?: string;
};

function SelectGroupLegend({ children, hidden = false, className = '', ...props }: SelectGroupLegendProps) {
  return (
    <legend className={cn('mb-2 text-xl font-bold', className, hidden && 'sr-only')} {...props}>
      {children}
    </legend>
  );
}

export default SelectGroupLegend;
