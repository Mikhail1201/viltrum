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
    emerald:
      "bg-emerald-500 hover:bg-emerald-400 text-white",
    outline:
      "border border-slate-200 text-slate-600 bg-white",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-6 py-4 font-semibold transition-all ${styles[variant]}`}
    >
      {children}
    </button>
  );
}