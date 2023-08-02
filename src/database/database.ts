import mongoose from "mongoose";

export default async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('Mongoose connection Successfully established');
        })

        connection.on('error', (err) =>{
            console.log('Mongoose connection Error')
            process.exit();
        })
    }
    catch(error) {
        console.log("something went wrong")
        console.error(error);

    }
}