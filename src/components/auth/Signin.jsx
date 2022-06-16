import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';
import CustomLink from '../CustomLink';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';

export default function Signin() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title>Sign in</Title>
          <FormInput label="Email" name="email" placeholder="john@email.com" />
          <FormInput label="Password" name="password" placeholder="********" />
          <Submit value="Sign in" />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forgot Password?</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}
