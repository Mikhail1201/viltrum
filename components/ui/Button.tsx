type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "cyan" | "emerald" | "outline";
};

export default function Button({
  children,
  onClick,
  variant = "cyan",
}: Props) {
  const styles = {
    cyan: "bg-cyan-500 hover:bg-cyan-400 text-white",
    emerald: "bg-emerald-500 hover:bg-emerald-400 text-white",
    outline: "border border-slate-200 text-slate-600 bg-white",
  };

  return (
    <button
      onClick={onClick}
      className={`
        rounded-xl sm:rounded-2xl
        px-4 py-2.5
        sm:px-5 sm:py-3
        md:px-6 md:py-4
        text-sm sm:text-base
        font-semibold
        transition-all
        active:scale-95
        ${styles[variant]}
      `}
    >
      {children}
    </button>
  );
}