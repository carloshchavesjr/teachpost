// hooks/useAuthRedirect.ts
'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useAuthRedirect = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const logoutMessage = searchParams.get('logout');
    const unauthorized = searchParams.get('unauthorized');

    if (logoutMessage === 'success') {
      toast.success('Logout realizado com sucesso!');
      // Limpa o parâmetro da URL
      router.replace('/');
    } else if (unauthorized) {
      toast.error('Faça login para acessar esta página');
      router.replace('/');
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      setIsAuthChecked(true);
    }
    // Removemos o redirecionamento automático aqui
  }, [status]);

  return { session, isAuthChecked };
};