'use client';

import Link from 'next/link';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof Link>;

const SafeLink = ({ href, children, ...props }: LinkProps) => {
  // Provide a fallback for undefined href
  const safeHref = href || '#';
  
  return (
    <Link href={safeHref} {...props}>
      {children}
    </Link>
  );
};

export default SafeLink;