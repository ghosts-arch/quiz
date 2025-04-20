import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }): Promise<Response> => {
  try {
    let { name } = await request.json();
    if (!name) {
      return json(
        { error: "Name is required" },
        {
          status: 400,
        }
      );
    }
    return json({ name: name }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      return json({ error: "Invalid JSON" }, { status: 400 });
    }
    return json({ error: "Unexpected error" }, { status: 500 });
  }
};
