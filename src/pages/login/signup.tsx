import { SignupForm } from './SignupForm';

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Create your Safety Management account
        </p>

        <SignupForm />
      </div>
    </div>
  );
}

export { Signup };