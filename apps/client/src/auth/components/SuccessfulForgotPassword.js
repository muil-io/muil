import React from 'react';
import Auth from './Auth';

const SuccessfulForgotPassword = () => (
  <Auth
    title="Thanks!"
    subtitle="A reset email will be sent to you."
    linkText={['Try login']}
    linkUrl={['/login']}
  />
);

export default SuccessfulForgotPassword;
