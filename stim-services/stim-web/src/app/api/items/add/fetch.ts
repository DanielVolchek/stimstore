import "client-only";

import { baseRouteSchema, buildRouteSchema } from "@/utils/zod";
import fetchWithMessageHandling from "@/utils/fetchWithErrorHandling";

const ROUTE = "/api/items/add";

export default async function fetchRoute() {
  const data = await fetchWithMessageHandling(ROUTE, {}, { withAuth: true });
}
