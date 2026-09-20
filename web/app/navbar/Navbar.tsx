import Link from 'next/link';
import './navbar.css';
import Dropdown from './DropDown';

const links = [
  { href: '/projects', label: 'Projects', icon: <span className="icon-[tabler--library]"></span>},
  { href: '/users', label: 'Users', icon: <span className="icon-[tabler--users-group]"></span>},
  { href: '/trending', label: 'Trending', icon: <span className="icon-[tabler--trending-up]"></span>},
  { href: '/search', label: 'Search', icon: <span className="icon-[tabler--search]"></span>},
];

export default function Navbar() {
  return (
    <header className="navbar app-navbar px-5">
      <div className="navbar-start gap-10 items-center">
        <Link href="/" className="nav-title font-semibold">
          Saver
        </Link>
        <nav className="flex items-center justify-center p-">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
                <p>
                  {link.label} {link.icon}
                </p>
            </Link>
          ))}
        </nav>
      </div>

      <div className="navbar-end">
        <Dropdown/>
      </div>
    </header>
  );
}