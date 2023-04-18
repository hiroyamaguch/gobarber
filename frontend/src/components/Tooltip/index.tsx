import React from 'react';

import { Container } from './styles';

interface TooltipProperties extends React.PropsWithChildren {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProperties> = ({
  title,
  children,
  className = '',
}: TooltipProperties) => (
  <Container className={className}>
    {children}
    <span>{title}</span>
  </Container>
);

Tooltip.defaultProps = {
  className: '',
};

export default Tooltip;
