import {redirect } from "next/navigation";

export default function page() {
  const redirects = redirect('/home')
  return redirects
}
