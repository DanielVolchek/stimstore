import { getUserSession } from "@/utils/auth";

export default async function Items() {
  const user = await getUserSession();
}
