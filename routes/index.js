const user = require("../models/users");
const router = require("express").Router();

router.post("/createUser", async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    let newUser = new user({
      name,
      phone,
      email,
    });
    await newUser.save();

    res.status(200).json({ status: true, message: "user created" });
  } catch (err) {
    res.status(401).json({ status: false, message: err });
  }
});

router.get("/UserList", async (req, res) => {
  try {
    const userList = await user.find({});
    res
      .status(200)
      .json({ status: true, message: "User List", data: userList });
  } catch (err) {
    res.status(500).json({ status: false, message: err });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let user = await user.findById(id);
    if (user) {
      await User.findByIdAndDelete(id);
      res.status(200).json({ status: true, message: "user deleted" });
    } else {
      res.status(404).json({ status: true, message: "Not Found" });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err });
  }

  router.put("/editUser/:id", async (req, res) => {
    try {
      const { id } = req.params;
      let user = await user.findById(id);
      if (user) {
        await user.findByIdAndUpdate(id, { ...req.body });
        user = await user.findById(id);
        res
          .status(200)
          .json({ status: true, message: "user updated", data: user });
      } else {
        res.status(404).json({ status: true, message: "Not Found" });
      }
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
  });
});

module.exports = router;