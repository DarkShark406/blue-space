import { Router } from "express";

const router = Router();

router.get("/", (req: any, res: any) => {
  res.send("OK");
});

export default router;
