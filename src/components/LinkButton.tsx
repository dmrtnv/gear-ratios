import { Lock, LockOpen } from 'lucide-react';
import { TextAccordion, TextAccordionContent, TextAccordionItem, TextAccordionTrigger } from './TextAccordion';

export function LinkButton({ link, toggle }: { link: boolean; toggle: () => void }) {
  return (
    <TextAccordion closeAfterMilliseconds={2000}>
      <TextAccordionItem id='link'>
        <TextAccordionTrigger action={toggle} className='ml-2'>
          {link ? <Lock size={18} strokeWidth={2} /> : <LockOpen size={18} strokeWidth={2} />}
        </TextAccordionTrigger>
        <TextAccordionContent>{link ? <span>linked</span> : <span>unlinked</span>}</TextAccordionContent>
      </TextAccordionItem>
    </TextAccordion>
  );
}
