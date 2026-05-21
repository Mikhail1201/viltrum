type Props = {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  actions,
}: Props) {
  return (
    <div className="rounded-[32px] border border-white/40 bg-white/40 p-8 shadow-lg backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-slate-800">
            {title}
          </h1>

          <p className="mt-3 text-xl text-slate-500">
            {subtitle}
          </p>
        </div>

        {actions}
      </div>
    </div>
  );
}