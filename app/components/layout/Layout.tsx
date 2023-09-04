const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-[95%] w-11/12 border border-gray-500 bg-[#f0f2f5]">
        {children}
      </div>
    </div>
  </>
);

export default Layout;
