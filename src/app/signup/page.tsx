import Image from "next/image";
import styles from "../page.module.scss";
import logoImg from "/public/logocortado.png";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image className={styles.logo} src={logoImg} alt="Logo BSL" />
        <section className={styles.login}>
          <h1>Criando sua conta</h1>
          <form
          // onSubmit={handleLogin}
          >
            <input
              placeholder="Digite seu nome..."
              name="name"
              type="text"
              className={styles.input}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Digite seu email..."
              name="email"
              type="text"
              className={styles.input}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Digite sua senha..."
              type="password"
              name="password"
              className={styles.input}
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              // loading={loading}
            >
              Cadastrar
            </button>
          </form>

          <Link className={styles.text} href="/">
            Já possui uma conta? Faça o login
          </Link>
        </section>
      </div>
    </>
  );
}
