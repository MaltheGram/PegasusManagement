import {Router} from "express"
import bcrypt from "bcrypt"
import db from "../../database/database.js"

const router = Router()

router.post("/api/auth/signup", async (req, res) => {
    const {email, password, firstName, lastName} = req.body

    // TODO: This check should rather be done in backend, but due to mongodb's odd way of handling unique indexes, this will do for now
    const findUserByEmail = await db.users.find({email: email}).toArray()
    if (findUserByEmail.length !== 0) {
        res.status(422).send({data: `User with email ${email} already exists`}) // no-go in prod due to security issues
    } else {

        const user = {
            email: email,
            password: bcrypt.hashSync(password, 10), // TODO: Investigate why only hashSync works
            firstName: firstName,
            lastName: lastName
        }
        try {
            await db.users.insertOne(user)
            req.session.isLoggedIn = true
            req.session.email = email
            req.session.firstName = firstName
            req.session.lastName = lastName
            res.status(200).send({data: `${firstName + " " + lastName} was successfully added`})

        } catch (error) {
            res.send
            console.log(error)
            res.status(500).redirect("/")
        }
    }
})

router.post("/api/auth/login", async (req, res) => {
    const {email, password} = req.body
    let isLoggedIn = false

    const findUserByEmail = await db.users.find({email: email}).toArray()
    const hashedPassword = findUserByEmail[0].password

    if (await bcrypt.compare(password, hashedPassword)) {
        const findUserByEmail = await db.users.find({email: email}).toArray()

        isLoggedIn = true
        req.session.isLoggedIn = isLoggedIn

        const userEmail = findUserByEmail[0].email
        const firstName = findUserByEmail[0].firstName
        const lastName = findUserByEmail[0].lastName
        req.session.email = userEmail
        req.session.firstName = firstName
        req.session.lastName = lastName

        res.status(200).send({data: req.session})
    } else {
        res.status(401).send({data: "Failed login. Try again"})
    }


})

export default router
