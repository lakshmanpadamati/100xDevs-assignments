const express = require("express");
const app = express();
const z = require("zod");
app.use(express.json());
const schema = z.array(z.number(), z.string());
const userSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8).max(9),
    country: z.literal("IN").or(z.literal("US")),
    arr:z.array(z.number().or(z.string())).min(2)
  });
  
app.post("/", (req, res) => {
   const data= req.body;
  const resp = userSchema.safeParse(data);
  return res.send(resp);
});

app.listen(3000);
