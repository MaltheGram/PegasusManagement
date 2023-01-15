export const checkAdmin = async (req, res, next) => {
    if (req.session.role !== "admin") {
        res.redirect("/")
    } else {
        next()
    }
}
