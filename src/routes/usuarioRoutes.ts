import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        mensagem: "Rota de usuários funcionando!"
    });
});

export default router;