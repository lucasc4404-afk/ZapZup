"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LogoPlaceholder } from "@/components/ui/logo-placeholder";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setErro(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErro("Credenciais inválidas ou conta não cadastrada no Supabase.");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErro(err.message || "Erro inesperado ao conectar.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Card className="w-full max-w-md border-slate-200 dark:border-slate-800 shadow-xl">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <LogoPlaceholder size="lg" showText={false} />
        </div>
        <CardTitle className="text-2xl font-black text-slate-900 dark:text-white">
          Acesso ZapZup
        </CardTitle>
        <CardDescription className="text-xs">
          Entre com suas credenciais oficiais de Dono, Responsável ou Funcionário
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {erro && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{erro}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              E-mail Institucional
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="email"
                placeholder="seu.email@zapzup.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 text-xs"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 text-xs"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            disabled={carregando}
            className="w-full bg-zap-blue-600 hover:bg-zap-blue-700 font-bold gap-2"
          >
            {carregando ? "Autenticando..." : "Entrar na Plataforma"}
            <ArrowRight className="h-4 w-4" />
          </Button>

          <div className="pt-2 text-center text-xs text-slate-400">
            Ambiente seguro com autenticação Supabase & PostgreSQL
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
