const sql = require("./db.js");

// constructor
const Areas = function(areas) {
  this.name = areas.title;
  this.shortcode = areas.shortcode;
};

Areas.create = (newAreas, result) => {
  sql.query("INSERT INTO areas SET ?", newAreas, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newAreas });
    result(null, { id: res.insertId, ...newAreas });
  });
};

Areas.findById = (id, result) => {
  sql.query(`SELECT * FROM areas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Areas.getAll = (name, result) => {
  let query = "SELECT * FROM areas";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Areas.getAllPublished = result => {
  sql.query("SELECT * FROM areas WHERE shortcode", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Areas.updateById = (id, areas, result) => {
  sql.query(
    "UPDATE areas SET name = ?, shortcode = ?",
    [areas.name, areas.shortcode, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...areas });
      result(null, { id: id, ...areas });
    }
  );
};

Areas.remove = (id, result) => {
  sql.query("DELETE FROM areas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Areas.removeAll = result => {
  sql.query("DELETE FROM areas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} areas`);
    result(null, res);
  });
};

module.exports = Areas;
