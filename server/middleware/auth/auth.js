export const checkAuth = async (req, res, next) => {
    if (!req.session.role) {
        res.redirect("/")
    } else {
        next()
    }
}
