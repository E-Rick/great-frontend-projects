import { cn } from "@/lib/utils";

type EmptyStateProps = {
  header: string;
  subheader: string;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export const EmptyState = ({
  header,
  subheader,
  actions,
  icon,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "m-auto flex h-full w-full flex-auto flex-col items-center justify-center gap-5 lg:flex-grow-0",
        className,
      )}
    >
      <div className="rounded-full bg-white p-3 shadow">{icon}</div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-medium text-primary">{header}</h2>
        <p className="text-base text-primary">{subheader}</p>
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
};
