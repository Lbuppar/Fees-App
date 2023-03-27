import mongoose from 'mongoose';
import StudentModel from "../models/StudentModel.js"
class SchoolController {

    // Home page
    static homePage = (req, res) => {
        res.render("index")
    }

    // Login page
    static loginPage = (req, res) => {
        res.render("login", { emailPassword: "" })
    }

    // Login Authentication
    static loginAuthentication = async (req, res) => {

        try {
            const { email, password } = req.body;
            const students = await StudentModel.find();

            if (email && password) {
                const user = await StudentModel.findOne({ email: email });
                if (user != null && email == user.email && password == user.password) {
                    if (user.fname === 'handler') {
                        res.render("fees", { students: students })
                    } else {
                        res.render("users", { students: students })
                    }
                } else {
                    res.render("login", { emailPassword: "Email or password is not valid" })
                }


            } else {
                res.render("login", { emailPassword: "Please Fill the fileds" })
            }

        } catch (error) {
            console.log(error);
        }

    }



    // create student document
    static createDoc = async (req, res) => {
        try {

            const { fname, standard, fees, email, password } = req.body;


            if (fname && standard && fees && email && password) {

                const findEmail = await StudentModel.findOne({ email: email })

                if (findEmail == null) {

                    const stu = new StudentModel({
                        fname: fname,
                        standard: standard,
                        fees: fees,
                        email: email,
                        password: password
                    })

                    await stu.save();
                    const students = await StudentModel.find();
                    res.render("fees.ejs", { students: students })

                } else {
                    const students = await StudentModel.find();
                    res.render("fees.ejs", { students: students })

                }
            } else {
                const students = await StudentModel.find();
                res.render("fees.ejs", { students: students })
            }

        } catch (error) {
            res.render("fees")
            console.log(error);
        }
    }

    // Delete document

    static deleteDoc = async (req, res) => {

        try {

            const deleteDocById = await StudentModel.findByIdAndDelete(req.params.id)
            const students = await StudentModel.find()
            res.render("fees.ejs", { students })

        } catch (error) {
            console.log(error);
        }
    }


    static editDoc = async (req, res) => {
        try {
            const student = await StudentModel.findById(req.params.id)
            res.render("edit", { student })
        } catch (error) {
            console.log(error);
        }


    }

    static updateDoc = async (req, res) => {
        try {
            const { fname, standard, fees, email, password } = req.body;
            const student = await StudentModel.findByIdAndUpdate(`${req.params.id}`, { fname: fname, standard: standard, fees: fees, email: email, password: password })
            const students = await StudentModel.find();
            res.render("fees", { students })

        } catch (error) {
            console.log(error);
        }

    }



}


export default SchoolController;


