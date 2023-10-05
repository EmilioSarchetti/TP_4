import { Router } from 'express';
import connection from "../connection/mysql.source.js";
const mediaRoute = Router();

mediaRoute.get('/', (req,res)=>{
    let $query = 'SELECT * FROM `tpf_2`.imagenes';
    connection.query($query, function(err, rows) {
        if(err){
            res.send(err);
            return;}
            res.send(rows);
    });
});

mediaRoute.post('/', (req,res)=>{
    let $query = 'INSERT INTO imagenes (URL) VALUES (?) ';
    let insertar_imagenes = [req.body.URL];
    connection.query($query,insertar_imagenes, function(err, rows) {
        if(err){
            res.status(500).send({
                message:"Error del servidor",
                detail: err 
            });
            return;
        }else
            res.send("Se cargo la imagen " +  req.body.URL + " FELICIDADES ");
            });
    });
mediaRoute.put('/', (req,res)=>{
    let $query = 'UPDATE imagenes set URL = ? , WHERE URL = ?';
    let insertar_imagenes = [req.body.URL, req.body.URL];
    connection.query($query,insertar_imagenes, function(err, rows) {
        if(err){
            res.status(500).send({
                message:"Error del servidor",
                detail: err 
            });
        return;
        }else
            res.send (`Se modifico tu imagen ${req.body.URL} `);
            });
    });
mediaRoute.delete('/', (req,res)=>{
    let $query = 'DELETE FROM imagenes WHERE URL = ?';  
    let insertar_imagenes = [req.body.URL];
    connection.query($query, insertar_imagenes, function(err, rows) {
        if(rows?.affectedRows == 0){
        return res.status(404).send({
            message:"UPS, ocurrio algo inesperado... intentelo de nuevo"})}
        return res.send({
            message:"Se elimino la imagen " + req.body.URL
        });
    }
)});     

export default mediaRoute;