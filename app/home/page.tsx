import Link from "next/link";

export default function page() {
  return (
    <div className="grid grid-cols-6 h-screen">
      <div className="col-span-3 flex justify-center">
        <h1 className="text-4xl mt-15 text-white">오토앤 종합 대차 플랫폼</h1>
      </div>
      <div className="col-span-3 flex flex-col items-end justify-center gap-5">
        <div className="w-full h-40 grid grid-cols-2 text-center">
          <p className="bg-white py-10 rounded-l-2xl flex flex-col font-bold">
            <span>손해보험사</span>
            <span>캐피탈사</span>
            <span>자동차공업사</span>
          </p>

          <div className="flex items-center justify-center bg-green-700">
            <Link
              href={"/auth/register"}
              className="text-white hover:text-gray-200 hover:underline"
            >
              대차 요청 시스템 접속​ 바로가기
            </Link>
          </div>
        </div>
        <div className="w-full h-40 grid grid-cols-2 text-center">
          <p className="bg-white py-10 rounded-l-2xl font-bold h-full flex items-center justify-center">
            렌터카​
          </p>

          <div className="flex items-center justify-center bg-green-700">
            <Link
              href={"/auth/register"}
              className="text-white hover:text-gray-200 hover:underline"
            >
              대차 공급 시스템 접속​ 바로가기​
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
