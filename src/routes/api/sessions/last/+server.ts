import { json } from "@sveltejs/kit";
import { SessionStatistiques } from "$lib/server/database/models/session_statistiques";
import type { RequestHandler } from "../$types";

export const GET: RequestHandler = async ({ request }): Promise<Response> => {
  const result = await SessionStatistiques.lastSessions();
  return json(result);
};
