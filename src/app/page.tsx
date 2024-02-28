'use client';
import Image from "next/image";
import styles from "./(style)/page.module.css";
import { useSession } from "next-auth/react";

export default function About() {

  const { data: session } = useSession();

  return (
    <div className={styles.about}>
      coucou
    </div>
  );
}
