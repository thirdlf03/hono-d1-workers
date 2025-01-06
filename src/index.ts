import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.json({message: "Hello, World!"});
});

app.get("/users/:id", async (c) => {
  const userID = c.req.param("id");
  console.log(userID);
  try {
    let { results } = await c.env.DB.prepare(
        "SELECT * FROM Users WHERE UserID = ?",
    )
        .bind(userID)
        .all();
    return c.json(results);
  } catch (e: any) {
    return c.json({ err: e.message }, 500);
  }
});


export default app;