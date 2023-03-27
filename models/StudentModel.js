
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    fname: { type: String, required: true, trim: true },
    standard: { type: String, required: true },
    fees: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, }
})


const StudentModel = mongoose.model("student", studentSchema);

export default StudentModel;



