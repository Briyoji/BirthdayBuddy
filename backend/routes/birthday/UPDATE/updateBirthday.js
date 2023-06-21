const router = require("express").Router();

const { verifyUser } = require("../../../middleware/verifyUser");

const { CheckValidation, createBirthdayValidation } = require('../Helpers/validators');

const User = require("../../../models/User");
const Birthday = require("../../../models/Birthday");

router.put("/:id", createBirthdayValidation, verifyUser, async (req, res) => {

  // req.modeflag identifies whether data has to be set explicitly using the username.

  try {
    if (CheckValidation(req, res)) return null;
    
    const { username } = req.body;
    const modeflag = req.modeflag;

    // Ensuring the User exists.
    const user = await User.findOne({ _id: req.data.id });
    if (!user) return res.status(401).send("User not found");

    const dumpedBirthday = await Birthday.findById(req.params.id);
    if (!dumpedBirthday) return res.status(404).send("Birthday not found!");

    // Setting the birthday data.
    var birthdayData = {
      name: req.body.name,
      birthdate: new Date(Date.parse(req.body.birthdate)).toISOString().split('T')[0],
      note: req.body.note,
      createdBy: req.data.id,
    };

    // Checking for user existence with the provided username.
    if (username && username.length > 3) {
      // Checking if the user exists
      let fetchedUser = await User.findOne({ username: username.toLowerCase().trim(), public: true });
      
      // user exists and other data is not provided.
      if ( modeflag && fetchedUser ) {
        birthdayData.username = fetchedUser.username;
        birthdayData.birthdate = fetchedUser.birthdate;
      }
      
      // user exists and other data is provided.
      else if ( !modeflag && fetchedUser ) {

        // Checking if the user has the same birthdate.
        const birthdtaeToCompare = new Date(Date.parse(fetchedUser.birthdate)).toISOString().split('T')[0];
        
        if (birthdayData.birthdate === birthdtaeToCompare) {
          birthdayData.username = fetchedUser.username;
        } else {
          birthdayData.username = null;
        }
      }
      
      // user does not exist and other data is not provided.
      else if ( modeflag && !fetchedUser ) {
        res.status(404).send("User to fetch not found!");
      }

      // user does not exist and other data is provided.
      else {
        birthdayData.username = null;
      }
    }

    // Creating the birthday
    await Birthday.findByIdAndUpdate(req.params.id, birthdayData, { new: true });
    
    return res.status(200).send("Birthday updated successfully!");
  
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!");  
  }
})

module.exports = router;