import Head from "next/head";
import styles from "@/styles/Home.module.css";
import UserTable from "@/UserTable";
import { Poppins } from 'next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['500']});

export default function Home() {
  return (
    <>
      <Head>
        <title>User management</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" type="image/svg" href='user-svgrepo-com.svg'/>
      </Head>
      <div className={styles.container}>
        <h1 className={poppins.className}>User Management</h1>
        <UserTable/>
      </div>
    </>
  );
}
