import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { FavoritesProvider } from '@/context/FavoritesContext';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <FavoritesProvider>
        <Header />
        {children}
        <Footer />
      </FavoritesProvider>
    </>
  );
};
export default PublicLayout;
