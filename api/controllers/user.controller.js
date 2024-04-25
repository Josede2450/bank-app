// All the logic goes here

// Req means request and that what whe ask to the database
//Res means response and that what the get from the data base

export const test = (req, res) => {
  res.json({ message: "API is working!" });
};
