const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-500 p-4">
      {/* This container ensures the card doesn't get too wide on large screens */}
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};
export default AuthLayout;
