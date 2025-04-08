import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './App.css';

function App() {
  const [imgs, setImg] = useState(null); // Guardar a imagem
  const [loading, setLoading] = useState(true); // Carregamento da imagem
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [minLoadingTime, setMinLoadingTime] = useState(1500);
  const [dadosJoao, setDadosJoao] = useState(null); // Guardar os dados de João

  const [contador, setCount] = useState(0); // Contador

  const fadeIn = useSpring({
    opacity: loading ? 0 : 1,
    transform: loading ? "scale(0.8)" : "scale(1)",
    config: { duration: 500 }
  });

  const apiGetImage = async () => {
    try {
      const response = await fetch("http://localhost:4000/img");
      const data = await response.json();
      setImg(data);
    } catch (error) {
      console.error("Erro ao buscar a imagem:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, minLoadingTime);
    }
  };

  const apiGetJoao = async () => {
    try {
      const response = await fetch("http://localhost:4000/joao");
      const data = await response.json();
      setDadosJoao(data);
    } catch (error) {
      console.error("Erro ao buscar os dados do Cliente:", error);
    }
  };

  const apiGetPokemon = async () => {
    try {
      const response = await fetch("http://localhost:4000/pokemon");
      const data = await response.json();
      setDadosJoao(data);
    } catch (error) {
      console.error("Erro ao buscar os dados do Cliente:", error);
    }
  };

  const apiGetFruta = async () => {
    try {
      const response = await fetch("http://localhost:4000/fruta");
      const data = await response.json();
      console.log("Dados da fruta:", data);
    } catch (error) {
      console.error("Erro ao buscar dados da fruta:", error);
    }
  };

  useEffect(() => {
    apiGetImage();
    apiGetFruta();
  }, []); // Somente a primeira vez, sem contador automático

  const refreshImage = () => {
    setLoading(true);
    setDadosJoao(null);  // Limpa os dados de João antes de recarregar
    apiGetImage();
    apiGetJoao();  // Recarrega os dados de João
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <div className="content-container">
        <div className="image-section">
          <animated.div style={fadeIn}>
            <div className="image-container">
              <img src={imgs?.img} alt="Imagem do João" className="api-image" />
            </div>
          </animated.div>
        </div>

        <div className="info-section">
          <div className="info-box">
            <h2>Dados do João</h2>
            {dadosJoao ? (
              <div>
                <p>Nome: {dadosJoao.nome}</p>
                <p>Idade: {dadosJoao.idade}</p>
                <p>CPF: {dadosJoao.cpf}</p>
                <p>E-mail: {dadosJoao.email}</p>
                <p>Profissão: {dadosJoao.profissao}</p>
              </div>
            ) : (
              <p>Carregando os dados...</p>
            )}
          </div>

          {/* Botão para carregar os dados de João quando clicado */}
          <div className="dados-joao-btn">
            <button onClick={apiGetJoao}>Carregar Dados de João</button>
            {dadosJoao && (
              <div>
                <h3>Dados de João</h3>
                <pre>{JSON.stringify(dadosJoao, null, 2)}</pre>
              </div>
            )}
          </div>

          <div className="contador-box">
            <h3>Contador: {contador}</h3>
          </div>

          <div className="controls">
            <button onClick={refreshImage} className="btn-refresh">
              Recarregar Dados
            </button>

            <div className="card">
              <button onClick={() =>setCount(contador+1)}>
                Contador: {contador}
              </button>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
