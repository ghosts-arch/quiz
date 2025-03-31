import type { Handle, ServerInit } from "@sveltejs/kit";
import { initDatabase } from "$lib/server/database/database";
export const init: ServerInit = async () => {
  initDatabase();
};
