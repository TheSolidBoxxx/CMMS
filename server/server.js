import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "CMMS",
    password: "",
    port: 5432,
  });

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.connect();

app.get('/api', (req, res) => {
  db.query("SELECT * FROM plan", (err, resu) => {
    if (err) {
      console.error("Error executing query", err.stack);
    } else {
      res.json(resu.rows);
    }
    //db.end();
  });
});

app.get('/usrs', (req, res) => {
  db.query("SELECT * FROM users", (err, resu) => {
    if (err) {
      console.error("Error executing query", err.stack);
    } else {
      res.json(resu.rows);
    }
    //db.end();
  });
});

app.post("/usrs", (req, res) => {
  console.log(req.body);
  db.query(`SELECT * FROM users WHERE username = '${req.body.username}'`, (err, resu) => {
    if (err) {
      res.send(false);
    } else {
      if(resu.rows.length > 0)
        resu.rows[0]["passwd"] == req.body.passwd ? res.send(true) : res.send(false);
    }
    //db.end();
  });
});
  
app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});

app.post("/api", (req, res) => {
  console.log(req.body); // From body-parser
  db.query("INSERT INTO plan(no_req, denominacion, tipo, fecha_plan, prioridad, hecho, no_responsable, apellido, ubicacion, grado, descripcion, intervalo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
    [req.body.no_req, req.body.denominacion, req.body.tipo, req.body.fecha_plan, req.body.prioridad, req.body.hecho, req.body.no_responsable, req.body.apellido, req.body.ubicacion, req.body.grado, req.body.descripcion, req.body.intervalo]
  )
});

app.patch("/api", (req, res) => {
  console.log(req.body); // From body-parser
  db.query("UPDATE plan SET inicio = $1, fin = $2, tiempo_real = $3, hecho = $4 WHERE id = $5",
    [req.body.inicio, req.body.fin, req.body.tiempo_real, req.body.hecho, req.body.id]
  )
});

app.delete("/api", (req, res) => {
  var str = `DELETE FROM plan WHERE id IN(${req.body.selected[0]}`

  for(let i = 1; i < req.body.numSelected; i++){
    str += `, ${req.body.selected[i]}`;
  }
  str += ');'
  console.log(str);
  db.query(str);
});