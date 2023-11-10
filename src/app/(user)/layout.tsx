import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import JSON_LD from '@/components/js-ld/js-ld';


export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
      <div style={{ marginBottom: "100px" }}></div>
      <AppFooter />
      <JSON_LD />
    </>
  );
}
