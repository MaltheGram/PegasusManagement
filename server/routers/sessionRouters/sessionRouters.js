import {Router} from "express"
import {checkAuth} from "../../middleware/auth/auth.js";

const router = Router()

router.get("/api/session", checkAuth, (req, res) => {
    if (req.session.isLoggedIn) {
        res.status(200).send({data: req.session})
    } else {
        res.status(401).send({data: "Not logged in"})
    }
})

router.get("/api/sessiondestroy", checkAuth, (req, res) => {
    req.session.destroy()
    res.redirect("/api/session")
})

export default router
