import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HashFocus = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return undefined;
    }

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1))
        || (hash === "#upload" ? document.querySelector('input[type="file"]')?.nextElementSibling : null);
      if (!target) return;
      if (target.tabIndex < 0) target.setAttribute("tabindex", "-1");
      target.scrollIntoView({ block: "start" });
      target.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return null;
};

export default HashFocus;
