import axios from "axios";

//URL da API para buscar os usuários
//JSON Server está rodando na porta 3000, então a URL é essa.
const URL = "http://localhost:3000/user";

//Função para buscar os usuários da API
export const getusers = async (req, res) => {
    try {
        const response = await axios.get(URL);
        res.json(response.data);
    } catch (error) {
        console.log(`Erro ao buscar usuários: ${error}`);
    }
}