import React from 'react';

import { useTransition } from 'react-spring';

import { Container } from './styles';

import { ToastMessage } from '../../hooks/toast';

import Toast from './Toast';

interface ToastProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastProps> = ({ messages }) => {
  const messageWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });

  return (
    <Container>
      {messageWithTransitions((props, item) => (
        <Toast key={item.id} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
