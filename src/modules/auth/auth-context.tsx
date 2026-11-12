"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PerfilUsuario, NivelAcesso } from "@/types";
import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  usuario: PerfilUsuario | null;
  nivelAcesso: NivelAcesso | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  usuario: null,
  nivelAcesso: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<PerfilUsuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function checkUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: perfil } = await supabase
            .from("perfis")
            .select("*")
            .eq("id", user.id)
            .single();

          if (perfil) {
            const p = perfil as any;
            setUsuario({
              id: p.id,
              nomeCompleto: p.nome_completo,
              email: p.email,
              cargo: p.cargo,
              nivelAcesso: p.nivel_acesso as NivelAcesso,
              ativo: p.ativo,
              createdAt: p.created_at,
              updatedAt: p.updated_at,
            });
          }
        }
      } catch (err) {
        console.warn("Autenticação inicial:", err);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        nivelAcesso: usuario?.nivelAcesso || null,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
