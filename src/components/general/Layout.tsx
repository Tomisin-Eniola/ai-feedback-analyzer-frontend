import { Outlet } from 'react-router-dom';
import Logo from './Logo';

type Props = {};

export default function Layout({}: Props) {
  return (
    <div className='min-h-screen flex flex-col'>
      <header>
        <Logo />
      </header>

      <main className='flex-grow container mx-auto px-4 py-8'>
        <Outlet />
      </main>
    </div>
  );
}
