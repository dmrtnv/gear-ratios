import Settings from './Settings';

function Header() {
  return (
    <header className='flex w-full items-center justify-between border p-2'>
      <span>Logo</span>

      <Settings />
    </header>
  );
}

export default Header;
