type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div
      className="
        rounded-[32px]
        border
        border-white/40
        bg-white/40
        p-6
        shadow-lg
        backdrop-blur-xl
      "
    >
      {children}
    </div>
  );
}