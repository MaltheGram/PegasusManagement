import {Router} from "express"
import bcrypt from "bcrypt"
import db from "../../database/database.js"

const router = Router()

router.post("/api/auth/signup", async (req, res) => {
    const {email, password, firstName, lastName} = req.body

    const findUserByEmail = await db.users.find({email: email}).toArray()
    if (findUserByEmail.length !== 0) {
        res.status(422).send({data: `User with email ${email} already exists`}) // no-go in prod due to security issues
    } else {

        const user = {
            email: email,
            password: bcrypt.hashSync(password, 10),
            firstName: firstName,
            lastName: lastName,
            role: "user"
        }
        try {
            await db.users.insertOne(user)
            req.session.isLoggedIn = true
            req.session.email = email
            req.session.firstName = firstName
            req.session.lastName = lastName
            req.session.role = user.role

            res.status(200).send({data: `${firstName + " " + lastName} was successfully added`})

        } catch (error) {
            console.log(error)
            res.status(500).redirect("/")
        }
    }
})

router.post("/api/auth/login", async (req, res) => {
    const {email, password} = req.body
    let isLoggedIn = false
    const role = "user"
    const findUserByEmail = await db.users.find({email: email}).toArray()

    if (findUserByEmail.length === 0) {
        return res.status(401).send({data: "Login failed."})
    }

    try {
        const hashedPassword = findUserByEmail[0].password
        if (await bcrypt.compare(password, hashedPassword)) {
            const findUserByEmail = await db.users.find({email: email}).toArray()

            isLoggedIn = true
            req.session.isLoggedIn = isLoggedIn

            const userEmail = findUserByEmail[0].email
            const firstName = findUserByEmail[0].firstName
            const lastName = findUserByEmail[0].lastName
            const role = findUserByEmail[0].role

            req.session.email = userEmail
            req.session.firstName = firstName
            req.session.lastName = lastName
            req.session.role = role

            res.status(200).send({data: req.session})
        }

    } catch (error) {
        console.log(error)
        res.status(401).send({data: "Failed login."})
    }


})

export default router
