import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';

function Layout() {
  return (
    <div>
      <Header />

      <main className='mt-8'>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
