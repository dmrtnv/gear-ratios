import { Link2, Link2Off } from 'lucide-react';
import { TextAccordion, TextAccordionContent, TextAccordionTrigger } from './TextAccordion';

export function LinkButton({ link, toggle }: { link: boolean; toggle: () => void }) {
  return (
    <TextAccordion>
      <TextAccordionTrigger action={toggle} className='ml-2 mt-1'>
        {link ? <Link2 size={18} strokeWidth={2} /> : <Link2Off size={18} strokeWidth={2} />}
      </TextAccordionTrigger>
      <TextAccordionContent text={link ? 'linked' : 'unlinked'} />
    </TextAccordion>
  );
}
