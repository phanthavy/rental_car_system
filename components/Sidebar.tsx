"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogut = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    window.location.href = "/auth/login";
  };

  return (
    <aside className="w-64 bg-green-700 text-white h-screen flex flex-col overflow-hidden">
      <h2 className="mb-4 text-lg px-2 py-5">Admin : ...</h2>

      <ul className="space-y-2">
        {/* homeAdmin */}
        <li>
          <Link
            href="/admin/home"
            className={`block w-full ${pathname === "/admin/home" ? "bg-gray-200 text-black" : ""}`}
          >
            Home
          </Link>
        </li>

        {/* notification list */}
        <li>
          <Link
            href="/admin/notification"
            className={`block ${pathname === "/admin/notification" ? "bg-gray-200 text-black" : ""}`}
          >
            Notification List
          </Link>
        </li>
        {/* account setting */}
        <li>
          <button className="">Account setting</button>
        </li>
      </ul>
      <button
        onClick={handleLogut}
        className="mt-150 bg-white text-black cursor-pointer"
      >
        Log out
      </button>
    </aside>
  );
}
