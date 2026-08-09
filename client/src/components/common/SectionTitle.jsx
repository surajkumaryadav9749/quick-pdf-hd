const SectionTitle = ({ badge, title, subtitle, align = "center" }) => {
  const alignment = {
    left: "text-left items-start",
    center: "text-center items-center",
  };

  return (
    <div className={`mb-14 flex flex-col ${alignment[align]}`}>
      {badge && (
        <span className="mb-4 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
          {badge}
        </span>
      )}

      <h2 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
