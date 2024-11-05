import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "/public/logocortado.png";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  async function handleLogin(formData: FormData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email);
    console.log(password);

    if (email === "" || password === "") {
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

      console.log(result.data.AuthUser.token);
      if (!result.data.AuthUser.token) {
        return;
      }

      const expressTime = 60 * 60 * 24;
      const cookieStore = await cookies();
      cookieStore.set("codako", result.data.AuthUser.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      });

      if (result.errors) {
        console.log("Erro ao logar:", result.errors);
      } else {
        console.log("Usuário autenticado com sucesso:", result.data);
      }
    } catch (err) {
      console.log("Erro na requisição:", err);
    }

    redirect("/dashboard");
  }
  return (
    <>
      <div className={styles.containerCenter}>
        <Image className={styles.logo} src={logoImg} alt="Logo BSL" />
        <section className={styles.login}>
          <form action={handleLogin}>
            <input
              placeholder="Digite seu email"
              name="email"
              type="text"
              className={styles.input}
              required
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Digite sua senha"
              name="password"
              type="password"
              className={styles.input}
              required
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              // loading={loading}
            >
              Acessar
            </button>
          </form>

          <Link className={styles.text} href="/signup">
            Não possui uma conta? Cadastre-se!
          </Link>
        </section>
      </div>
    </>
  );
}
