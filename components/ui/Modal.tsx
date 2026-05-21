type Props = {
  children: React.ReactNode;
  open: boolean;
};

export default function Modal({
  children,
  open,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="rounded-[32px] bg-white p-8 shadow-2xl">
        {children}
      </div>
    </div>
  );
}