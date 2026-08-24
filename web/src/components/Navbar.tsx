
export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Saver</a>
      </div>

  <div className="navbar-end">
    <button popoverTarget="profile_target">Profile</button>
      <div id="profile_target" popover="auto">
        <div className="flex max-sm:flex-col items-start">
          <ul className="menu w-full md:menu-horizontal">
            <li>
              <a>Solutions</a>
              <ul>
                <li><a>Design</a></li>
                <li><a>Development</a></li>
                <li><a>Hosting</a></li>
                <li><a>Domain register</a></li>
              </ul>
            </li>
            <li>
              <a>Products</a>
              <ul>
                <li><a>UI Kit</a></li>
                <li>
                  <a>Open source</a>
                  <ul>
                    <li><a>Auth management system</a></li>
                    <li><a>VScode theme</a></li>
                    <li><a>Color picker app</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a>Company</a>
              <ul>
                <li><a>About us</a></li>
                <li><a>Contact us</a></li>
                <li><a>Privacy policy</a></li>
                <li><a>Press kit</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
  </div>
  </div>
    );
}