import React from 'react';

import { Container } from './styles';

interface TooltipProperties {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProperties> = ({
  title,
  children,
  className = '',
}) => (
  <Container className={className}>
    {children}
    <span>{title}</span>
  </Container>
);
export default Tooltip;
