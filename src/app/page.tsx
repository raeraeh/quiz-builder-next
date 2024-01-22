'use client';
import styles from './page.module.css';
import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import SideBar from './components/SideBar';
import DropdownMenu from './components/DropdownMenu';

export default function Home() {
  const [isMobile] = useMediaQuery('(max-width: 700px)');
  return (
    <main className={styles.main}>
      {isMobile ? (
        <Flex m={2}>
          <DropdownMenu>
            <SideBar />
          </DropdownMenu>
        </Flex>
      ) : (
        <SideBar />
      )}
    </main>
  );
}
