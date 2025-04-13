import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";

interface PageLayoutProps {
  children: ReactNode;
  onSearch?: (term: string) => void;
}

export function PageLayout({ children, onSearch }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header onSearch={onSearch} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default PageLayout;