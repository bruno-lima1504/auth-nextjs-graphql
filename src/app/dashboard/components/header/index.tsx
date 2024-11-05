"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import logoImg from "/public/logocortado.png";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  async function handleLogout() {
    deleteCookie("codako", { path: "/" });

    router.replace("/");
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            alt="Logo"
            src={logoImg}
            width={160}
            height={60}
            priority={true}
          />
        </Link>
        <nav>
          <form action={handleLogout}>
            <button>
              <LogOutIcon size={24} color="#FFF" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
