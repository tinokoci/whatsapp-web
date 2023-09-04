const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="left-1/2 top-6 mx-auto flex h-[95%] w-11/12 -translate-x-1/2 bg-[#f0f2f5]">
      {children}
    </div>
  </>
);

export default PageWrapper;
