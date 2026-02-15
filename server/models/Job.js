import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, requirde: true },
    description: { type: String, requirde: true },
    location: { type: String, requirde: true },
    category: { type: String, requirde: true },
    level: { type: String, requirde: true },
    salery: { type: Number, requirde: true },
    date: { type: Number, requirde: true },
    visible: { type: Boolean, default: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
})


const Job = mongoose.model('Job', jobSchema)

export default Job