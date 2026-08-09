const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",

  secondary:
    "bg-white text-slate-900 border border-slate-300 hover:bg-slate-100",

  outline:
    "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",

  danger: "bg-red-600 text-white hover:bg-red-700",

  success: "bg-green-600 text-white hover:bg-green-700",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        font-semibold
        transition-all
        duration-300
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${fullWidth ? "w-full" : ""}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
