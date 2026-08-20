import React from 'react';
import { LoginLayout } from './LoginLayout';
import { LoginForm } from './LoginForm';

export const Login: React.FC = () => {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
};
