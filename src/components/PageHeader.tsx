import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

const PageHeader = ({ eyebrow, title, description, children }: PageHeaderProps) => {
  return (
    <header className="border-b border-border bg-secondary/40">
      <div className="container mx-auto px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="mt-5 text-balance">{title}</h1>
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
