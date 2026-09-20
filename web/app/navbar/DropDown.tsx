export default function Dropdown() {
  return (
    <div className="dropdown relative inline-flex">
      <button
        id="dropdown-header"
        type="button"
        className="dropdown-toggle btn btn-primary"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="Dropdown"
      >
        Dropdown header
        <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
      </button>
      <ul
        className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-header"
      >
        <li className="dropdown-header gap-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png"
                alt="User Avatar"
              />
            </div>
          </div>
          <div>
            <h6 className="text-base-content text-base font-semibold">John Doe</h6>
            <small className="text-base-content/50 text-sm font-normal">
              jhon@doe.com
            </small>
          </div>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            My Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Settings
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Billing
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            FAQs
          </a>
        </li>
      </ul>
    </div>
  );
}