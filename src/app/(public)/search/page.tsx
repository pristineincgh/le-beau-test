import SearchContainer from '@/components/sections/search/SearchContainer';
import Loader from '@/components/shared/Loader';
import { Suspense } from 'react';

const SearchPage = () => {
  return (
    <Suspense fallback={<Loader screen="full" />}>
      <SearchContainer />
    </Suspense>
  );
};

export default SearchPage;
