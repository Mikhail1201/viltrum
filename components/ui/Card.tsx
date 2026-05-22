type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div
      className="
        rounded-2xl sm:rounded-[28px] md:rounded-[32px]
        border border-white/40
        bg-white/40
        p-4 sm:p-5 md:p-6
        shadow-lg
        backdrop-blur-xl
      "
    >
      {children}
    </div>
  );
}