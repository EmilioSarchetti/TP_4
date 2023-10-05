import userRoute from './routes/user.route.js';
import mediaRoute from "./routes/media.route.js";
import commentsRoute from "./routes/comments.route.js";
import albumsRoute from "./routes/albums.route.js";
//import categoriesRoute from "./routes/categories.route.js";

import connection from "./connection/mysql.source.js";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');

connection.connect((err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("Base de datos conectada");
    }
});


app.use(`/user`,userRoute)
app.use(`/albums`,albumsRoute)
//app.use(`/categories`,categoriesRouteRoute)
app.use(`/media`,mediaRoute)
app.use(`/comments`,commentsRoute)

app.use("*", async (req, res) => {
    res.status(403).send({error:'UNACCESIBLE'});
  });

// algoritmo de ruta y ruta

app.listen(8080, (err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("Servidor escuchando en el puerto 8080");
    }
});

