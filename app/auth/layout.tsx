export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col text-white h-screen overflow-hidden">
      <header className="bg-green-600">
        <h1 className="text-2xl font-bold p-2">Auto & All About Mobility Life</h1>
      </header>
      <main className="bg-gray-200 text-black flex-1">{children}</main>
      <footer className="bg-green-600 p-2">
        <div className="flex items-center">
          <h1 className="text-lg font-bold border-r pl-2 pr-4">
            AutoLaoCompany
          </h1>

          <div className="px-4 gap-8 flex-1">
            <div className="flex gap-8">
             <p>이용약관</p>
              <p>개인정보 처리방침​</p>
            </div>
            <div className="flex gap-8">
              <p>오토앤㈜ ┃ 최찬욱 대표 </p>
              <p>사업자등록번호: 138-81-72768 </p>
              <p>주소: 경기 안양시 만안구 전파로24번길 63</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
