const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="relative w-full bg-[#00a884] py-14"></div>
    <div className="absolute left-1/2 top-6 mx-auto flex h-[95%] w-11/12 -translate-x-1/2 bg-[#f0f2f5]">
      {children}
    </div>
  </>
);

export default Layout;
