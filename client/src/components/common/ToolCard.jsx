import { Link } from "react-router-dom";

export const toolCardGridClass = "mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6";

const ToolCard = ({ to, title, description, icon: Icon }) => (
  <Link
    to={to}
    className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
  >
    <span aria-hidden="true" className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-2xl text-teal-600 transition group-hover:bg-teal-50">
      <Icon />
    </span>
    <h3 className="mt-3 text-sm font-semibold text-slate-900">{title}</h3>
    <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-slate-600" title={description}>{description}</p>
  </Link>
);

export default ToolCard;
