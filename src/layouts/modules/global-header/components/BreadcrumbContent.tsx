import { cloneElement } from 'react';
import type { ReactElement } from 'react';

interface Props {
  hasChildren: boolean;
  readonly icon: ReactElement;
  readonly label: ReactElement;
}

function BreadcrumbContent({ hasChildren, icon, label }: Props) {
  return (
    <span className={`${hasChildren ? 'cursor-pointer' : 'cursor-default'}`}>
      {cloneElement(icon, {
        className: 'mr-4px text-icon align-sub inline'
      } as any)}
      {label}
    </span>
  );
}

export default BreadcrumbContent;
