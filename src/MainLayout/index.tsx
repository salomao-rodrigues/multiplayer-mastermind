import React, { ReactNode } from 'react';

import './index.scss';

interface MainLayoutProps {
  children?: ReactNode[] | ReactNode
};

const MainLayout: React.SFC<MainLayoutProps> = ({ children }) => (
  <main id="main-layout">
    <nav>Navigation bar</nav>
    { children }
    <div>Poc here</div>
    <footer>Copyright © 2018 Wishing Portal Ltd</footer>
  </main>
);

export default MainLayout;
