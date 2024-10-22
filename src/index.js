import express, {json} from "express"

const app = express();
app.use(express.json());

const items = [{

    id: 1,
    name: "Maçã",
    quantity: 1,
    type: "Fruta",
},
{
    id: 2,
    name: "Banana",
    quantity: 2,
    type: "Fruta",
},
{
    id: 3,
    name: "Batata",
    quantity: 5,
    type: "Legume",
},
{
    id: 4,
    name: "Chuchu",
    quantity: 6,
    type: "Legume",
}]

app.listen(5000, () => {
    console.log("rodando")
})

app.get("/items", (req, res) => {
    const { type } = req.query
    if (type) {
        let listaTratada = items.filter((item) => {
            return item.type == type
        })

        if(listaTratada.length == 0){
            return res.status(400).send(listaTratada)
        }

        return res.status(200).send(listaTratada)
    }
    return res.status(200).send(items)
})

app.get("/items/:id", (req, res) => {
    const { id } = req.params
    if (parseInt(id) == 0 || parseInt(id) < 0) {
        return res.status(400).send("Erro! ID inválido")
    }
    let listaTratada = items.find((item) => {
        return item.id == id
    })
    if (!listaTratada) {
        return res.status(404).send("Não existe um item com esse ID")
    }
    return res.send(listaTratada)
})


app.post("/items", (req, res) => {

    const { name, quantity, type } = req.body
    console.log(name, quantity, type)

    if (!name || !quantity || !type) {
        return res.status(422).send("Verifique os campos do item");
    }

    let temRepetido = items.find((item) => {
        return item.name == name 
    })
    if(temRepetido){
        return res.status(409).send("Item repetido");
    }

    items.push({
        id: items.length + 1,
        name,
        quantity,
        type
    })


    return res.status(201).json({ message: "Item adicionado com sucesso", items });
})