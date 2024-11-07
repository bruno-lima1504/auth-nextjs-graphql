"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "/public/logocortado.png";
import Link from "next/link";
import { api } from "@/services/api";
import { toast } from "sonner";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);

    if (email === "" || password === "") {
      toast.error("Email e senha são obrigatórios");
      setLoading(false);
      return;
    }

    const query = `
    query {
      AuthUser(data: {       
        email: "${email}", 
        password: "${password}"
      }) {
        id
        name
        email
        createdAt
        token    
      }
    }
    `;

    try {
      const response = await api.post(
        "/graphql",
        { query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.data;
      if (!result.data.AuthUser.token) {
        setLoading(false);
        return;
      }

      const expressTime = 60 * 60 * 24;
      document.cookie = `codako=${result.data.AuthUser.token}; max-age=${expressTime}; path=/; secure=${process.env.NODE_ENV === "production"};`;

      router.push("/dashboard");
    } catch (err) {
      console.error("Erro na requisição:", err);
      toast.error("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.containerCenter}>
      <Image className={styles.logo} src={logoImg} alt="Logo BSL" />
      <section className={styles.login}>
        <div>
          <input
            placeholder="Digite seu email"
            name="email"
            type="text"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Digite sua senha"
            name="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Carregando..." : "Acessar"}
          </button>
        </div>
        <Link className={styles.text} href="/signup">
          Não possui uma conta? Cadastre-se!
        </Link>
      </section>
    </div>
  );
}
