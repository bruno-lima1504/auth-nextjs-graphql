import Image from "next/image";
import styles from "../page.module.scss";
import logoImg from "/public/logocortado.png";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default async function Signup() {
  async function handleRegister(formData: FormData) {
    "use server";

    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!name || !email || !password) {
      console.log("Preencha todos os campos");
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

      const result = await response.data;

      if (result.errors) {
        console.log("Erro ao criar usuário:", result.errors);
      } else {
        console.log("Usuário criado com sucesso:", result.data.createUser);
      }
    } catch (err) {
      console.log("Erro na requisição:", err);
    }

    redirect("/");
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image className={styles.logo} src={logoImg} alt="Logo BSL" />
        <section className={styles.login}>
          <h1>Criando sua conta</h1>
          <form action={handleRegister}>
            <input
              placeholder="Digite seu nome..."
              name="name"
              type="text"
              className={styles.input}
              required
            />
            <input
              placeholder="Digite seu email..."
              name="email"
              type="text"
              className={styles.input}
              required
            />
            <input
              placeholder="Digite sua senha..."
              type="password"
              name="password"
              className={styles.input}
              required
            />

            <button type="submit">Cadastrar</button>
          </form>

          <Link className={styles.text} href="/">
            Já possui uma conta? Faça o login
          </Link>
        </section>
      </div>
    </>
  );
}
