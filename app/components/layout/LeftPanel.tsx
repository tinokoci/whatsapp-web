const LeftPanel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-[30%] flex-col bg-[#e8e9ec]">{children}</div>
  );
};

export default LeftPanel;
