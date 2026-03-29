import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="bg-green-700">
        <h1 className="text-2xl font-bold p-2 text-white">AutoLaoCompany</h1>
      </header>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 border">
          {children}
        </main>
      </div>
    </div>
  );
}
