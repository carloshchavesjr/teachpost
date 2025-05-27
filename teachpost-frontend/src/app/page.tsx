'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
  
      if (result?.error) {
        toast.error('Email ou senha inválidos.');
      } else if (result?.ok) {
        router.push('/posts');
      } else {
        toast.error('Erro inesperado no login.');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      toast.error('Erro ao tentar fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-slate-100 shadow-2xl rounded-2xl p-8 w-full max-w-md mt-4">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-lg font-medium text-gray-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 border bg-slate-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Digite seu email"
              required
            />
          </label>

          <label className="flex flex-col text-lg font-medium text-gray-700">
            Senha
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 border bg-slate-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Digite sua senha"
              required
            />
          </label>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

<button
  type="submit"
  disabled={loading}
  className={`bg-indigo-600 text-white font-semibold py-3 rounded-lg mt-4 hover:bg-indigo-700 transition duration-300 flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  {loading ? (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    'Entrar'
  )}
</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
