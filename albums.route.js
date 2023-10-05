import { Router } from 'express';
import connection from "../connection/mysql.source.js";
const albumsRoute = Router();

albumsRoute.get('/', (req,res)=>{
    let $query = 'SELECT * FROM `tpf_2`.albumes';
    connection.query($query, function(err, rows) {
        if(err){
            res.send(err);
            return;}
            res.send(rows);
    });
});

albumsRoute.post('/', (req,res)=>{
    let $query = 'INSERT INTO albumes (Nombre) VALUES (?, ?) ';
    let insertar_albumes = [req.body.Nombre];
    connection.query($query,insertar_albumes, function(err, rows) {
        if(err){
            res.status(500).send({
                message:"Error del servidor",
                detail: err 
            });
            return;
        }else
            res.send("Se creo el album " +  req.body.Nombre + " FELICIDADES ");
            });
    });
albumsRoute.put('/', (req,res)=>{
    let $query = 'UPDATE albumes set Nombre = ? WHERE Nombre = ?';
    let insertar_albumes = [req.body.Nombre, req.body.Nombre];
    connection.query($query,insertar_albumes, function(err, rows) {
        if(err){
            res.status(500).send({
                message:"Error del servidor",
                detail: err 
            });
        return;
        }else
            res.send (`Se modifico el album a ${req.body.albumes} `);
            });
    });
albumsRoute.delete('/', (req,res)=>{
    let $query = 'DELETE FROM albumes WHERE Nombre = ?';  
    let insertar_albumes = [req.body.Nombre];
    connection.query($query, insertar_albumes, function(err, rows) {
        if(rows?.affectedRows == 0){
        return res.status(404).send({
            message:"UPS, ocurrio algo inesperado... intentelo de nuevo"})}
        return res.send({
            message:"Se elimino el album " + req.body.Nombre
        });
    }
)});     
    
export default albumsRoute;
    