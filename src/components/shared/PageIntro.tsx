import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Crumb {
  label: string;
  href?: string;
}

interface PageIntroProps {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  eyebrow?: string;
}

const PageIntro = ({ title, description, crumbs = [], eyebrow }: PageIntroProps) => (
  <section className="w-full px-6 mb-8">
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="contents">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {crumb.href ? (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <div className="max-w-2xl">
      {eyebrow && (
        <p className="text-xs font-light uppercase tracking-[0.14em] text-muted-foreground mb-3">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl md:text-4xl font-light text-foreground">{title}</h1>
      {description && (
        <p className="text-sm font-light text-muted-foreground leading-relaxed mt-4">
          {description}
        </p>
      )}
    </div>
  </section>
);

export default PageIntro;