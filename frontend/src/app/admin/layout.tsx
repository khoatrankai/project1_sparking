import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="bg-[#E0E9ED] flex">
        <div className="h-full relative z-50 min-w-52">
          <Sidebar />
        </div>
        <div className="flex-1 max-w-[calc(100%-13rem)]">{children}</div>
      </div>
    </>
  );
}
