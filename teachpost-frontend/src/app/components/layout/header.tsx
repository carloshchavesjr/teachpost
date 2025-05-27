"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(status === "authenticated");
  }, [status]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="bg-blue-950 dark:bg-slate-900 h-20 text-white py-6 shadow-md flex px-6 items-center justify-between border-b border-blue-900 dark:border-slate-700 transition-colors duration-300">
      {/* Título - sempre à esquerda */}
      <div className="text-lg md:text-2xl lg:text-3xl font-semibold uppercase tracking-wider text-slate-100 dark:text-slate-200">
        Teach&Post
      </div>

      {/* Área direita - usuário e controles */}
      <div className="flex items-center space-x-4">
        {isAuthenticated && session?.user && (
          <>
            {/* Nome do usuário - visível em todas as telas */}
            <div className="text-sm sm:text-base font-medium text-slate-100 dark:text-slate-200">
              Olá, {session.user.name}
            </div>
            
            {/* Botão de logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-gray-700 dark:hover:bg-slate-600 transition-all"
              aria-label="Sair"
              title="Sair"
            >
              <LogOut size={20} className="text-slate-100 dark:text-slate-200" />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;