import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardMainPage = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default DashboardMainPage;
