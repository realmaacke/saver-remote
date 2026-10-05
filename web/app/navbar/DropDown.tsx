import Link from 'next/link';

type User = {
  isConnected: boolean;
  username: string;
  email: string;
  avatar?: string;
};

export default function Dropdown({ user }: { user: User }) {
  if (!user.isConnected) {
    return (
      <div className="dropdown relative inline-flex">
        <button
          id="dropdown-header"
          type="button"
          className="dropdown-toggle flex items-center gap-1 cursor-pointer"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="Dropdown"
        >
          <span className="icon-[tabler--user-circle] size-5"></span>
          <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-5"></span>
        </button>
        <ul
          className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-header"
        >
          <li className="dropdown-header gap-2">
            <div className="avatar">
              <span className="icon-[tabler--user-circle] size-5"></span>
            </div>
            <div>
              <Link href="/login" className="btn nav-signin">
                Sign in here!
              </Link>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="dropdown relative inline-flex">
      <button
        id="dropdown-header"
        type="button"
        className="dropdown-toggle flex items-center gap-1 cursor-pointer"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="Dropdown"
      >
        <span className="icon-[tabler--user-circle] size-5"></span>
        <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-5"></span>
      </button>
      <ul
        className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-header"
      >
        <li className="dropdown-header gap-2">
          <div className="avatar">
            {user.avatar ? (
              <div className="w-10 rounded-full">
                <img src={user.avatar} alt="User Avatar" />
              </div>
            ) : (
              <span className="icon-[tabler--user-circle] size-5"></span>
            )}
          </div>
          <div>
            <h6 className="text-base-content text-base font-semibold">{user.username}</h6>
            <small className="text-base-content/50 text-sm font-normal">
              {user.email}
            </small>
          </div>
        </li>
        <li>
          <a className="dropdown-item" href="/user/profile">
            My Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/user/settings">
            Settings
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/aut/signout">
            Sign-out
          </a>
        </li>
      </ul>
    </div>
  );
}