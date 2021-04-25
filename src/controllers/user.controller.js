const { userSchema } = require("../models/user.model");
const { sendResponse } = require("../utils/helper");

exports.createUser = async (req, res) => {
  try {
    let userDoc = await new userSchema(req.body).save();
    if (userDoc && userDoc._id) {
      sendResponse(res, 200, { message: "Success", result: userDoc });
    } else {
      sendResponse(res, 400, { message: userDoc.toString() });
    }
  } catch (error) {
    sendResponse(res, 400, {
      message: "An Unkown Error Occured",
      error: error.toString(),
    });
    return;
  }
};

exports.getUser = async (req, res) => {
  try {
    let userDoc = await userSchema.findOne({
      username: req.query.username,
      password: req.query.password,
    });

    console.log("get user", userDoc);
    if (userDoc) {
      sendResponse(res, 200, { message: "Success", result: userDoc });
    }
    if (userDoc === undefined || userDoc === null) {
      sendResponse(res, 201, { message: "No records found" });
    }
  } catch (error) {
    sendResponse(res, 400, {
      message: "An Unkown Error Occured",
      error: error.toString(),
    });
    return;
  }
};

exports.editPhotos = async (req, res) => {
  try {
    let userDoc = await userSchema.findOne({
      username: req.query.username,
    });
    if (userDoc && userDoc._id) {
      if (req.body.text === "edit") {
        img = req.body.img;
        userDoc.img = img;
        let updateDoc = await userSchema.findByIdAndUpdate(
          userDoc.id,
          {
            $set: userDoc,
          },
          {
            new: true,
          }
        );
        if (updateDoc && updateDoc.id) {
          sendResponse(res, 200, {
            message: "User updated successfully",
            res: userDoc,
          });
          return;
        } else {
          sendResponse(res, 400, {
            message: "User update failed",
            error: updateDoc.toString(),
          });
          return;
        }
      }
    } else {
      sendResponse(res, 400, { message: userDoc.toString() });
    }
  } catch (error) {
    sendResponse(res, 400, {
      message: "An Unkown Error Occured",
      error: error.toString(),
    });
    return;
  }
};
