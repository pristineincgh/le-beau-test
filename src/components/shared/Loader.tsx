interface LoaderProps {
  screen?: 'default' | 'full';
}

const Loader = ({ screen = 'default' }: LoaderProps) => {
  if (screen === 'full') {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-linear-to-br from-[#084f5c] via-[#084f5c] to-[#063945]">
        <div className="spinner"></div>
      </div>
    );
  }
  return <div className="spinner"></div>;
};

export default Loader;
