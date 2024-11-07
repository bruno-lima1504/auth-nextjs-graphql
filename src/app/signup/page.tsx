"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../page.module.scss";
import logoImg from "/public/logocortado.png";
import Link from "next/link";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister() {
    console.log("passou aqui");

    setLoading(true);

    if (!name || !email || !password) {
      toast.error("Preencha todos os campos");
      setLoading(false);
      return;
    }

    const query = `
        mutation {
          createUser(data: {
            name: "${name}", 
            email: "${email}", 
            password: "${password}"
          }) {
            id
            name
            email
            createdAt    
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

      const result = response.data;
      if (result.errors) {
        toast.error("Erro ao criar usuário");
        console.log("Erro ao criar usuário:", result.errors);
      } else {
        toast.success("Usuário criado com sucesso");
        console.log("Usuário criado com sucesso:", result.data.createUser);
        router.push("/");
      }
    } catch (err) {
      console.log("Erro na requisição:", err);
      toast.error("Erro na requisição");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.containerCenter}>
      <Image className={styles.logo} src={logoImg} alt="Logo BSL" />
      <section className={styles.login}>
        <h1>Criando sua conta</h1>
        <div>
          <input
            placeholder="Digite seu nome..."
            name="name"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            placeholder="Digite seu email..."
            name="email"
            type="text"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Digite sua senha..."
            type="password"
            name="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleRegister} disabled={loading}>
            {loading ? "Carregando..." : "Cadastrar"}
          </button>
        </div>
        <Link className={styles.text} href="/">
          Já possui uma conta? Faça o login
        </Link>
      </section>
    </div>
  );
}
