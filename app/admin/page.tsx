import { checkAuth } from "@/libs/checkAuth";
import { Role } from "@/libs/role";

export default async function page() {
  await checkAuth([Role.admin]);
  return <div>No permission : Only Admin!</div>;
}
