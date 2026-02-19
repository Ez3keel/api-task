import axios from "axios";

//URL da API para buscar os usuários
//JSON Server está rodando na porta 3000, então a URL é essa.
const URL = "http://localhost:3000/user";

//Função para buscar os usuários da API - GET
export const getusers = async (req, res) => {
    try {
        const response = await axios.get(URL); //Envia uma req GET para a API para buscar os usuários
        res.json(response.data);
    } catch (error) {
        console.log(`Erro ao buscar usuários: ${error}`);
        res.status(500).json({ message: "Erro ao buscar usuários:"});
    }
}


//Função para fazer o POST de um novo usuário
export const addUser = async (req, res) => {
    try {
        //O json server vai criar um ID unico para cada usuário adicionado 
        const { name, age, email } = req.body; //Pega os dados do usuário do corpo da requisição
        //Como posso fazer com que seja obrigatorio o preenchimento de todos os Campos?
        //validação simples para verificar se os campos estão preenchidos
        if(!name.trim() || !age || !email.trim()){
            return res.status(400).json({ message: "Todos os campos são obrigatórios!"});
        }
        const newUser = { name, age, email}; //Cria um novo objeto de usuário com os dados recebidos no corpo da requisição
        const response = await axios.post(URL, newUser); //Envia uma requisição POST para API adicionar o usuário
        res.status(201).json({ message: "Usuário adicionado com sucesso!"}); //Retorna uma resposta de sucesso para o cliente
    } catch (error) {
        console.log(`Erro ao adicionar usuário: ${error}`);
        res.status(500).json({ message: "Erro ao adicionar usuário!"});
    }
}

//DELETE
export const deleteUser = async (req, res) => {
    try {
        const { id }  = req.params;
        console.log(id);

        if(!id){ //validação simples
            return res.status(400).json({message: "ID é obrigatório!"});
        }

        //Faz a requisição Delete para o JSON Server
        await axios.delete(`${URL}/${id}`);

        res.status(200).json({message: "Usuário deletado com sucesso!"});

    } catch (error) {
        console.log(`Erro ao deletar usuário: ${error}`);
        res.status(500).json({ message: "Erro ao deletar usuário!"});
    }
}

//PUT
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {name, age, email} = req.body;
        
        if(!id){ //validação simples
            return res.status(400).json({message: "ID é obrigatório!"});
        }

        await axios.put(`${URL}/${id}`, {name, age, email});

        res.status(204).json({message: "Usuário editado com sucesso!"});
        
    } catch (error) {
        console.log(`Erro ao editar usuário ${error}`);
        res.status(500).json({ message: "Erro ao editar usuário!"});
    }
}

//PATCH
export const updateDataUser = async (req, res) => {
    try {
        
        const {id} = req.params;

        const allowedFields = ["name", "age", "email"];
        const updates = {};

        for(var i = 0; i < allowedFields.length; i++){
            const field = allowedFields[i];

            if(req.body[field] !== undefined){
                updates[field] = req.body[field];
            }
        }
        
        if(Object.keys(updates).length === 0){
            return res.status(400).json({message: "Nenhum campo enviado!"});
        }

        await axios.patch(`${URL}/${id}`, updates);
        
        res.status(204).json({message: "Usuário editado com sucesso!"});
        // const data = req.body;

        console.log(data)

    } catch (error) {
        console.log(`Erro ao atualizar usuário ${error}`);
        res.status(500).json({ message: "Erro ao atualizar usuário!"});
    }
}