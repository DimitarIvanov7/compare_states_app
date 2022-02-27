import { builtinModules } from 'module';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import dotenv from "dotenv"
dotenv.config()


let dbURI = process.env.MONGODB_URI

const JobSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Data: {
        type: Schema.Types.Mixed,
        required: true
    },
    Created: {
        type: String
    }
});

const JobData = mongoose.model('job', JobSchema);

// module.exports = {
//     JobData: JobData,
//     dbURI: dbURI,
// }

export default {
    JobSchema,
    JobData
}


