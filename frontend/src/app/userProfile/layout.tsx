const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen container mx-auto flex-1 py-10">
      {children}
    </div>
  );
};

export default Layout;
