import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "/public/logocortado.png";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image className={styles.logo} src={logoImg} alt="Logo BSL" />
        <section className={styles.login}>
          <form
          // onSubmit={handleLogin}
          >
            <input
              placeholder="Digite seu email"
              type="text"
              className={styles.input}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Digite sua senha"
              type="password"
              className={styles.input}
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
