import { NavLink } from "react-router-dom";
import Container from "../common/Container";
import { NAV_LINKS, LEGAL_LINKS } from "../../constants/navigation";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-3">
          {/* Logo */}
          <div>
            <NavLink to="/" className="mb-5 flex items-center gap-3">
              <img
                src="/quickPDFHD_logo-176.png"
                alt="QuickPDFHD logo"
                className="h-11 w-auto"
                width="176"
                height="96"
              />

              <span className="text-2xl font-bold text-white">QuickPDFHD</span>
            </NavLink>

            <p className="max-w-sm leading-7 text-slate-400">
              Convert JPG, PNG and WEBP images into high-quality PDF files
              instantly. Fast, secure, privacy-friendly and completely free.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className="transition-colors duration-200 hover:text-blue-400"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Legal</h3>

            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className="transition-colors duration-200 hover:text-blue-400"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 py-8 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} QuickPDFHD. All Rights Reserved.
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Built with ❤️ using the MERN Stack.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
