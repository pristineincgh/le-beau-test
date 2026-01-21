'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (businessId: string) => void;
  isFavorite: (businessId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('leBeau_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Persist changes
  useEffect(() => {
    localStorage.setItem('leBeau_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (businessId: string) => {
    setFavorites((prev) =>
      prev.includes(businessId)
        ? prev.filter((id) => id !== businessId)
        : [...prev, businessId]
    );
  };

  const isFavorite = (businessId: string) => {
    return favorites.includes(businessId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
