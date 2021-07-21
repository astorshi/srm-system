const { Router } = require("express");
const router = Router();
const Client = require("../db/models/clientModel");
const Comment = require("../db/models/commentModel");
const User = require("../db/models/userModel");

router.get("/card", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});

router.post("/new", async (req, res) => {
  const { name, surname, patronymic, email, phone, address } = req.body;
  // console.log('@@@@@===>', req.body);
  const id = req.session.passport.user._id;
  try {
    if (name) {
      const tmpClient = await Client.create({
        name,
        surname,
        patronymic,
        email,
        phone,
        address,
        creator: id,
      });
      const newClient = await Client.findById(tmpClient._id).populate(
        "creator"
      );
      // console.log('NEW CLIENTTTTT===>', newClient);
      res.json(newClient);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
});

router.get("/all", async (req, res) => {
  try {
    const allClients = await Client.find();
    res.json(allClients);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, surname, patronymic, email, phone, address } = req.body;
  const data = await Client.findByIdAndUpdate(id, {
    name,
    surname,
    patronymic,
    email,
    phone,
    address,
  });
  const response = await Client.find({ _id: id });
  res.json(response);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.find({ _id: id })
      .populate("comments")
      .populate("orders");
    // console.log(client);
    console.log("QQQQQQ=>>>", client);

    res.json(client);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Client.findByIdAndDelete(id);
  const client = await Client.find();
  res.json(client);
});

router.post("/:id", async (req, res) => {
  const { body, userId, userName } = req.body;
  const cardId = req.params.id;
  const author = await User.findById(userId);
  let dat = new Date();
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let dateNow = dat.toLocaleString("ru-RU", options);
  const newComment = await Comment.create({
    author: userId,
    authorName: userName,
    body,
    date: dateNow,
    card: cardId,
  });
  const authorComment = await Comment.find({ author: userId });
  const idAuthor = author._id;
  const commentClient = await Client.findByIdAndUpdate(
    cardId,
    { $push: { comments: newComment._id } },
    { new: true }
  ).populate("comments");
  // console.log("======>>>>>", commentClient);
  res.json(commentClient);
});
module.exports = router;
