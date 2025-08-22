const asyncHandler = require("express-async-handler");
const { pool } = require("../config/mysql");
// function findDistance() {}

// const getSchools = asyncHandler(async (req, res) => {
//   const { userLatitude, userLongtitude } = req.query;

//   if (!userLatitude || !userLongtitude) {
//     res.status(400);
//     throw new Error("User latitude and longitude are required");
//   }

//   try {
//     const [schools] = await pool.query("Select * from schools");
//     const schoolsWithDistance = schools.map((school) => {
//       const distance = findDistance(
//         parseFloat(userLatitude),
//         parseFloat(userLongtitude),
//         school.latitude,
//         school.longtitude
//       );
//       return { ...school, distance };
//     });
//     schoolsWithDistance.sort((a, b) => a.distance - b.distance);
//   } catch (err) {
//     res.status(500).send("Error fetching schools.");
//   }
// });

const addSchool = asyncHandler(async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || !latitude || !longitude) {
    res.status(400).send("All fields are required");
  }

  try {
    const [school] = await pool.query(
      "Insert into schools (name , address , latitude , longitude) values (? , ? , ? , ?)",
      [name, address, latitude, longitude]
    );

    res
      .status(201)
      .json({ message: "School added successfully", schoolId: school.insertId });
  } catch (err) {
    console.error(err)
    res.status(500).send("Error adding school");
  }
});

module.exports = {
    addSchool
}
