import { Router } from 'express';
import connection from "../connection/mysql.source.js";
const userRoute = Router();

userRoute.get('/', (req,res)=>{
    let $query = 'SELECT * FROM `tpf_2`.Usuarios';
    connection.query($query, function(err, rows) {
        if(err){
            res.send(err);
            return;}
            res.send(rows);
    });
});

userRoute.post('/', (req,res)=>{
    let $query = 'INSERT INTO usuario (Nickname, Contraseña, Email) VALUES (?, ?, ?) ';
    let insertar_persona = [req.body.Nickname, req.body.contraseña, req.body.Email];
    connection.query($query,insertar_persona, function(err, rows) {
        if(err){
            res.status(500).send({
                message:"Error del servidor",
                detail: err 
            });
            return;
        }else
            res.send("Se creo el usuario " +  req.body.Nickname + " FELICIDADES ");
            });
    });

userRoute.put('/', (req,res)=>{
    let $query = 'UPDATE usuarios set Nickname = ?, contraseña = ?, WHERE Nickname = ?';
    let insertar_persona = [req.body.Nickname, req.body.contraseña, req.body.Nickname];
    connection.query($query,insertar_persona, function(err, rows) {
        if(err){
            res.status(500).send({
                message:"Error del servidor",
                detail: err 
            });
        return;
        }else
            res.send (`Se modifico el usuario a ${req.body.Nickname} `);
            });
    });

userRoute.delete('/', (req,res)=>{
    let $query = 'DELETE FROM Usuarios WHERE Nickname = ?';  
    let insertar_Usuarios = [req.body.Nickanme];
    connection.query($query, insertar_Usuarios, function(err, rows) {
        if(rows?.affectedRows == 0){
        return res.status(404).send({
            message:"UPS, ocurrio algo inesperado... intentelo de nuevo"})}
        return res.send({
            message:"Se elimino la persona " + req.body.Nickname
        });
    }
)});     

export default userRoute;
