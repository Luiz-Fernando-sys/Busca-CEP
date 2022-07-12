//Este é o componente principal do Projeto do React
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './styles.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('') //Passando o valor vazio quando for chamado o "input" e passando o valor que o usuário digitou no cep para dentro do "setInput" desta constante. E então ele salvará nesta constante o valor do CEP que o usuário digitou. |||| 'input' é o nome que demos para a constante
  const [cep, setCep] = useState({}); //Esse setCep começa como vazio para o fato do usuário não ter digitado nenhum CEP ainda, e então depois aí sim passamos o valor do CEP que o usuário digitar para dentro dele. |||| 'cep' é o nome que demos para a constante

  async function handleSearch(){
    if(input === ''){ //Se o usuário não digitou nenhum CEP e apertou o botão de pesquisar, um alerta é exibido pedindo para ele preencher algum CEP
      alert("Preencha algum CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json/`); //Passamos para o arquivo responsável da API por montar a URL inteira do CEP do JSON, esperamos ele retornar o arquivo JSON e guardamos desta constante que chamamos de "response"
      setCep(response.data)
      setInput(""); //Assim que o usuário digita o CEP dele, nós zeramos o campo do input para vazio de novo para que ele possa escrever um novo CEP
    }catch{
      alert("OPS, erro ao buscar");
      setInput("") //Se caso o usuário digitar um CEP errado ou então colocar alguma informação errada, nós zeramos também o CEP para ele poder digitar novamente
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className="SearchButton" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && ( //Se tem alguma coisa guardada dentro do CEP, significa que o usuário digitou algo. Então podemos mandar ele exibir na tela as informações do CEP da pessoa e aí sim exibir o campo em branco onde se exibe as informações do CEP da pessoa
      //Se o usuário não digitou nenhum CEP ainda, então significa que não precisa exibir este campo com informações.
      //Isso ocorrerá somente da primeira vez é claro. Não ocorrerá se o usuário tiver pesquisado já um CEP. Pois se ele já tiver pesquisado um CEP antes, ele deixaria um campo em branco do CEP lá e só pesquisaria outro CEP substituindo as informações respectivas ao novo CEP criado.
        <main className='informations_cep'>
          <h2>CEP:{cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
