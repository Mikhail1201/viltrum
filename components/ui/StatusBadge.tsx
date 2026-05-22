type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const styles = {
    Activo: "bg-emerald-100 text-emerald-600",
    Inactivo: "bg-red-100 text-red-600",
    Egresado: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`
        rounded-full
        px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2
        text-xs sm:text-sm
        font-medium
        whitespace-nowrap
        ${styles[status as keyof typeof styles]}
      `}
    >
      {status}
    </span>
  );
}