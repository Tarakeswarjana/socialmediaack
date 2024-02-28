const UserModel = require('../Model/User')
const todoModel = require('../Model/Todo');
const todo = require('../Model/Todo');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}


exports.create = async (req, res) => {
    try {
        const newpassPromise = hashPassword(req.body.password);

        if (!req.body.email) {
            return res.status(400).send({ message: "Email cannot be empty!" });
        }

        // Wait for the promise to resolve
        const newpass = await newpassPromise;

        const user = new UserModel({
            email: req.body.email,
            password: newpass,
            firstname: req.body.firstname,
            lastName: req.body.lastName,
            profilePic: req.body.profilePic
        });

        await user.save();

        return res.status(201).send({
            message: "User created successfully!!",
            user: user
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    }
};
exports.userLogin = async (req, res) => {
    console.log("new")
    const password1 = req.body.password
    const userdata = await UserModel.find({ email: req.body.email })
    const dbPass = userdata[0].password
    console.log(dbPass, password1)
    const match = await bcrypt.compare(password1, dbPass);

    if (match) {
        const token = jwt.sign({ userId: userdata._id }, 'yourSecretKey', { expiresIn: '1h' });

        // Save the token in the user table (update your UserModel schema accordingly)
        userdata.token = token;

        await UserModel.findByIdAndUpdate(userdata._id, { $set: { token } })


        res.status(200).json({ msg: 'Logged in successfully', data: userdata, token });

        // res.status(200).send({ msg: "loged in sucsessfuly", data: userdata })
    } else {
        res.status(500).json({ msg: 'wrong Password', });

    }
}


exports.getAllUsers = async (req, res) => {
    const data = await UserModel.find()

    res.status(200).send({ msg: "data fetch sucsess", data: data })

}



exports.findAll = async (req, res) => {
    console.log("hit")
    try {
        const user = await UserModel.find();
        console.log("===", user);
        let tempobj = { data: user, message: "data sucsessfully persed" }
        res.status(200).json(tempobj);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.findOne = async (req, res) => {
    // const id = req.params.id;
    // const userdata = await UserModel.findById(id)
    const email = req.body.email;
    const userdata = await UserModel.findOne({ email: email })
    res.status(200).json(userdata)
}

exports.UpdateOne = async (req, res) => {
    const id = req.params.id;
    const userdata = await UserModel.findByIdAndUpdate({ _id: id }, { firstname: req.body.firstName },
        { new: true })

    res.status(200).json(userdata)
}

exports.DeleteOne = async (req, res) => {
    const id = req.params.id;
    const userdata = await UserModel.deleteOne({ _id: id },)

    res.status(200).json(userdata)
}

//..............Todo...........

exports.Addtodo = async (req, res) => {
    const inputtodo = new todoModel({ todo: req.body.tododata })
    const tododata = await inputtodo.save().then((data) => {
        res.send({ data: data })
    }).catch((err) => {
        res.send(err)
    })
}

exports.allTodo = async (req, res) => {
    const alltodo = await todoModel.find()
    res.status(200).send({ data: alltodo, msg: "data perse sucsessfully" })

}
exports.findonetodo = async (req, res) => {
    const onetodo = await todoModel.findOne({ _id: req.params.id })

    res.status(200).send({ data: onetodo, msg: "data perse sucsessfully" })
}

exports.updateonetodo = async (req, res) => {
    console.log("rrr")
    // const updateonetodo = await todoModel.findOne({ _id: req.params.id }, { tododata: req.body.todo }, { new: true })
    // const updateonetodo = await todoModel.updateOne({ _id: req.params.id }, { tododata: req.body.todo }, { new: true })
    // const updateonetodo = await todoModel.findByIdAndUpdate({ _id: req.params.id }, { tododata: req.body.todo }, { new: true })

    // const updateonetodo = await todoModel.updateMany({ _id: req.params.id }, { tododata: req.body.todo }, { new: true })

    if (updateonetodo) {
        res.status(200).send({ data: updateonetodo, msg: " updated sucsessfully" })

    }

}

exports.findbytodos = async (req, res) => {

    const datas = await todo.find({ todo: req.body.todo })
    res.status(200).json({ data: datas, msg: "sucsess" })
}





