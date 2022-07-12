import axios from "axios";

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/" //baseURL é uma URL que nunca irá mudar. Seria basicamente um URL básica
});

export default api; //Exportamos este arquivo para usarmos a API