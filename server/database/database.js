import {MongoClient} from "mongodb"

const PORT = 27017
const url = `mongodb://127.0.0.1:${PORT}`
const client = new MongoClient(url)

await client.connect()

const pegasus = client.db("Pegasus")
export const projects = pegasus.collection("projects")

export default {
    projects
}
