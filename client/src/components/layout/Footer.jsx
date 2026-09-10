import { NavLink } from "react-router-dom";
import Container from "../common/Container";
import { NAV_LINKS, LEGAL_LINKS, TOOL_LINKS } from "../../constants/navigation";

const Footer = () => {
  const pdfTools = TOOL_LINKS.filter((link) => link.category === "PDF Tools");
  const imageTools = TOOL_LINKS.filter((link) => link.category === "Image Tools");

  return (
    <footer className="bg-footer text-slate-300">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-4">
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
              Browser-based tools for PDF, Word, Excel, and image files: convert, split, merge, scan, and resize.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">PDF Tools</h3>
            <ul className="space-y-3">
              {pdfTools.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className="transition-colors duration-200 hover:text-teal-500">
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 mt-8 text-lg font-semibold text-white">Image Tools</h3>
            <ul className="space-y-3">
              {imageTools.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className="transition-colors duration-200 hover:text-teal-500">
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className="transition-colors duration-200 hover:text-teal-500"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Legal</h3>

            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className="transition-colors duration-200 hover:text-teal-500"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 py-8 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} QuickPDFHD. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
