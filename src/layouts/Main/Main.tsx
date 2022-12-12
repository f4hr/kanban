import React from 'react';

import './Main.css';
// Components
import { ScrollArea, Separator } from '../../components';
import { Navbar } from '../../features/Navbar';
import { Tapbar } from '../../features/Tapbar';

interface MainLayoutProps extends React.PropsWithChildren {
  title: React.ReactNode;
}

export function Main({ children, title }: MainLayoutProps) {
  return (
    <div className="main">
      <Navbar />
      <Tapbar />
      <main className="main__container">
        <div className="main__title">{title}</div>
        <Separator />
        <div className="main__content">
          <ScrollArea>{children}</ScrollArea>
        </div>
      </main>
    </div>
  );
}
