import { Router } from 'express';
import connection from "../connection/mysql.source.js";
const commentsRoute = Router();

commentsRoute.get('/', (req,res)=>{
    let $query = 'SELECT * FROM `tpf_2`.comentarios';
    connection.query($query, function(err, rows) {
        if(err){
            res.send(err);
            return;}
            res.send(rows);
    });
});

commentsRoute.post('/', (req,res)=>{
    let $query = 'INSERT INTO comentarios (Texto) VALUES (?) ';
    let insertar_comentarios = [req.body.Texto];
    connection.query($query,insertar_comentarios, function(err, rows) {
        if(err){
            res.status(500).send({
                message:"Error del servidor",
                detail: err 
            });
            return;
        }else
            res.send("Se creo el comentario " +  req.body.Texto);
            });
    });
commentsRoute.put('/', (req,res)=>{
    let $query = 'UPDATE comentarios set Texto = ? WHERE Texto = ?';
    let insertar_comentarios = [req.body.Texto,req.body.Texto];
    connection.query($query,insertar_comentarios, function(err, rows) {
        if(err){
            res.status(500).send({
                message:"Error del servidor",
                detail: err 
            });
        return;
        }else
            res.send (`Se modifico el comentario ${req.body.Texto} `);
            });
    });
commentsRoute.delete('/', (req,res)=>{
    let $query = 'DELETE FROM comentarios WHERE Texto = ?';  
    let insertar_comentarios = [req.body.Texto];
    connection.query($query, insertar_comentarios, function(err, rows) {
        if(rows?.affectedRows == 0){
        return res.status(404).send({
            message:"UPS, ocurrio algo inesperado... intentelo de nuevo"})}
        return res.send({
            message:"Se elimino el comentario" + req.body.Texto
        });
    }
)}); 

export default commentsRoute;