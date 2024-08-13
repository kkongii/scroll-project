import Link from 'next/link';
import Image from 'next/image';
import { Account } from '../account';

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="ml-20 mr-20 flex h-20 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Link href={'/'}>
            <Image src="/logo.png" alt="Logo" width={90} height={38} />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Account />
        </div>
      </nav>
    </div>
  );
}
