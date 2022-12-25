import {Router} from "express"
import bcrypt from "bcrypt"
import db from "../../database/database.js"

const router = Router()

router.post("/api/auth/signup", async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName


    // TODO: This check should rather be done in backend, but due to mongodb's odd way of handling unique indexes, this will do for now
    const findUserByEmail = await db.users.find({email: email}).toArray()
    if (findUserByEmail.length > 0) {
        res.status(500).send({data: `User with email ${email} already exists`}) // no-go in prod due to security issues
    } else {

        const user = {
            email: email,
            password: bcrypt.hashSync(password, 10), // TODO: Investigate why only hashSync works
            firstName: firstName,
            lastName: lastName
        }
        await db.users.insertOne(user)
        res.status(200).send({data: `${firstName + " " + lastName} was successfully added`})
    }
})

export default router
