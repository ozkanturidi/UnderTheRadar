const Business = require("../models/Business");

const GetAllBusiness = async (req, res) => {
  const q = req.query;

  const filters = {
    ...(q.type && { businessType: q.type }),
  };

  try {
    const business = await Business.find(filters || "").populate({
      path: "comments",
      model: "Comment",
    });
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id).populate({
      path: "comments",
      model: "Comment",
    });
    if (!business) {
      throw new Error("there is no business with given details");
    }
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const EditBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      throw new Error("there is no business with given details");
    }

    if (req.userId !== business._id) {
      return res
        .status(404)
        .json({ message: "You are not authenticated to edit this account" });
    } else {
      await business.updateOne({
        $set: req.body,
      });
      res.status(200).json("updated succesfully");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const DeleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (req.userId !== business._id) {
      return res
        .status(404)
        .json({ message: "You are not authenticated to delete this account" });
    } else {
      await Business.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted succesfully");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getBusiness: GetBusiness,
  editBusiness: EditBusiness,
  deleteBusiness: DeleteBusiness,
  getAllBusiness: GetAllBusiness,
};
