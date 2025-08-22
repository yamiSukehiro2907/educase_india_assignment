const asyncHandler = require("express-async-handler");
const { pool } = require("../config/mysql");

function findDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

const getSchools = asyncHandler(async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    res.status(400);
    throw new Error("User latitude and longitude are required");
  }

  try {
    const [schools] = await pool.query("Select * from schools");
    const schoolsWithDistance = schools.map((school) => {
      const distance =
        findDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          school.latitude,
          school.longitude
        ) + " km";
      return { ...school, distance };
    });
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    res.status(200).json(schoolsWithDistance);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching schools.");
  }
});

const addSchool = asyncHandler(async (req, res) => {
  const body = JSON.parse(req.body);
  const { name, address, latitude, longitude } = body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).send("All fields are required");
  }

  try {
    const [result] = await pool.query(
      "Insert into schools (name, address, latitude, longitude) values (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    return res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error adding school");
  }
});

module.exports = {
  addSchool,
  getSchools,
};
