import Link from "next/link";
import backgroundImg from "@/img/background.png";
import Image from "next/image";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col text-white h-screen overflow-hidden ">
      <header>
        <h1 className="text-2xl font-bold p-4 text-green-700">
          Auto & All About Mobility Life
        </h1>
      </header>
      <main className="bg-gray-600 text-black flex flex-col flex-1 h-full overflow-hidden relative">
        <Image
          src={backgroundImg}
          alt={""}
          fill
          quality={300}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 to-black/20"></div>
        {children}
      </main>
      <footer>
        <div className="flex items-center py-2">
          <h1 className="text-lg font-bold border-r pl-2 pr-4 text-green-700">
            AutoLaoCompany
          </h1>

          <div className="px-4 flex-1 text-black">
            <div className="flex gap-15">
              <p>이용약관</p>
              <p>개인정보 처리방침​</p>
            </div>
            <div className="flex gap-8">
              <p>오토앤㈜ ┃ 최찬욱 대표 </p>
              <p>사업자등록번호: 138-81-72768 </p>
              <p>주소: 경기 안양시 만안구 전파로24번길 63</p>
            </div>
          </div>

          <div>
            <button className="bg-gray-800 px-20 py-2 rounded-md cursor-pointer hover:text-gray-200 mr-2">
              <Link href={"/auth/register"}>관리자 시스템 접속</Link>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
