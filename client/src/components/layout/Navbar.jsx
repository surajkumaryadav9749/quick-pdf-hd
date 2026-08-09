import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../../constants/navigation";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo */}

        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="/quickPDFHD_logo.png"
            alt="QuickPDFHD logo"
            className="h-11 w-11"
          />

          <span className="text-2xl font-bold text-slate-900">quickPDFHD</span>
        </NavLink>

        {/* Navigation */}

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition duration-200 ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}

        <a
          href="/#upload"
          className="hidden rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg md:block"
        >
          Convert Images
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
