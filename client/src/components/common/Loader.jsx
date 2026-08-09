const Loader = ({
  text = "Loading...",
  fullScreen = false,
  overlay = false,
  size = "md",
}) => {
  const spinnerSizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div
        className={`${spinnerSizes[size]} animate-spin rounded-full border-blue-600 border-t-transparent`}
      />

      {/* Text */}
      <p className="text-center font-medium text-slate-600">{text}</p>
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10">{content}</div>
  );
};

export default Loader;
