import {Router} from "express"
import {checkAdmin} from "../../middleware/auth/auth.js";

const router = Router()

router.get("/api/session", checkAdmin, (req, res) => {
    if (req.session.isLoggedIn) {
        res.status(200).send({data: req.session})
    } else {
        res.status(401).send({data: "Not logged in"})
    }
})

router.get("/api/sessiondestroy", checkAdmin, (req, res) => {
    req.session.destroy()
    res.redirect("/api/session")
})

export default router
