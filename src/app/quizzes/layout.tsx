'use client';
import { Flex, useMediaQuery } from '@chakra-ui/react';
import SideBar from '../components/SideBar';
import DropdownMenu from '../components/DropdownMenu';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobile] = useMediaQuery('(max-width: 700px)');
  return (
    <div className="section">
      {isMobile ? (
        <Flex m={2} className="container">
          <DropdownMenu>
            <SideBar />
          </DropdownMenu>
        </Flex>
      ) : (
        <SideBar />
      )}

      {children}
    </div>
  );
}
