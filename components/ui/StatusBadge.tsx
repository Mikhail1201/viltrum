type Props = {
  status: string;
};

export default function StatusBadge({
  status,
}: Props) {
  const styles = {
    Activo: "bg-emerald-100 text-emerald-600",
    Inactivo: "bg-red-100 text-red-600",
    Egresado: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-medium ${
        styles[status as keyof typeof styles]
      }`}
    >
      {status}
    </span>
  );
}