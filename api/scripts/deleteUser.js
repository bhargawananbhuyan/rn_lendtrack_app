const User = require("../models/User")
const readline = require('readline-sync')
const { connect } = require("mongoose")
require('dotenv').config()

const deleteUser = async () => {
    try {
        await connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log('connected to database.'))
		.catch((e) => console.log(e.message))


        const email = String(readline.questionEMail())
        const userToDelete = await User.findOneAndDelete({email})
        console.log({
            success: `user ${userToDelete?.email} deleted successfully.`
        })
        process.exit()
    } catch (error) {
        console.error(error?.message)
        process.exit()
    }
}

deleteUser()