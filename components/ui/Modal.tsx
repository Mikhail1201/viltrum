type Props = {
  children: React.ReactNode;
  open: boolean;
};

export default function Modal({ children, open }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4 sm:px-6">
      <div
        className="
          w-full
          max-w-[95vw] sm:max-w-lg md:max-w-xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl sm:rounded-[28px] md:rounded-[32px]
          bg-white
          p-5 sm:p-6 md:p-8
          shadow-2xl

          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        "
      >
        {children}
      </div>
    </div>
  );
}