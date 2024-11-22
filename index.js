import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
var titulo = [];
var contenido =[];
var indice = null;


// Middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.render(__dirname +"/views/index.ejs",
        {titulo: titulo,
         contenido: contenido,
        }
    );
})

app.post("/submit", (req, res)=>{  // de la pagina principal voy a nuevo
    res.render(__dirname+"/views/nuevo.ejs")
})

app.post("/modify", (req, res)=>{ // de la pagina principal voy a update
    indice = req.body.messageIndex;
    res.render(__dirname+"/views/update.ejs",
        {ti: titulo[indice],
         co: contenido[indice],
        }
    )
})

app.post("/delete", (req, res)=>{ // eliminar es facil
    indice = req.body.messageIndex;
    titulo.splice(indice,1);
    res.redirect("/");
})

app.post("/modificar", (req, res)=>{    // de update vuelvo a la pagina principal
    titulo[indice]=req.body.ftitle2;
    contenido[indice]=req.body.lcont2;
    res.redirect("/");
})

app.post("/postear", (req, res)=>{ // de nuevo vuelvo a la pagina principal
    titulo.push(req.body.ftitle);
    contenido.push(req.body.lcont);
    res.redirect("/")
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})