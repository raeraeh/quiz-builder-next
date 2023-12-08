import Image from 'next/image';
import styles from './page.module.css';
import { Box } from '@chakra-ui/react';
import SideBar from './components/SideBar';

export default function Home() {
  return (
    <main className={styles.main}>
      <SideBar />
    </main>
  );
}
