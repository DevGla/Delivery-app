import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../../context/cartContext';

export default function ProductsCards({ p }) {
  const { cart, setCart } = useContext(CartContext);
  const [qtd, setQtd] = useState(0);

  function soma(nome, preco) {
    const price = Number(preco.replace(',', '.'));
    const number = -1;
    setQtd(qtd + 1);
    const cartcp = [...cart];
    const searchIndex = cartcp.findIndex((item) => item.nome === nome);
    if (searchIndex === number) {
      cartcp.push({ nome, qtd: 1, price });
    } else {
      cartcp[searchIndex].qtd = qtd + 1;
    }
    setCart(cartcp);
    // localStorage.setItem('cart', JSON.stringify(cartcp));
  }

  function subtrai(nome) {
    setQtd(Number(qtd - 1));
    const cartcp = [...cart];
    const searchIndex = cartcp.findIndex((item) => item.nome === nome);
    if (cartcp[searchIndex].qtd === 1) {
      cartcp.splice(searchIndex, 1);
      setCart(cartcp);
    } else {
      cartcp[searchIndex].qtd = qtd - 1;
      setCart(cartcp);
    }
  }

  // useEffect(() => {
  //   // console.log(cart);
  // }, [cart]);

  return (
    <div className="Class">
      <div>
        <p data-testid={ `customer_products__element-card-price-${p.id}` }>
          {p.price}
        </p>
        <img
          width="100px"
          className="imagem"
          data-testid={ `customer_products__img-card-bg-image-${p.id}` }
          src={ p.url_image }
          alt={ p.name }
        />

        <p data-testid={ `customer_products__element-card-title-${p.id}` }>
          {p.name}
        </p>
        <button
          data-testid={ `customer_products__button-card-rm-item-${p.id}` }
          type="button"
          onClick={ () => subtrai(p.name) }
          disabled={ !qtd }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${p.id}` }
          placeholder="0"
          value={ qtd }
          type="text"
          min="0"
          onChange={ (e) => setQtd(Number(e.target.value)) }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${p.id}` }
          type="button"
          onClick={ () => soma(p.name, p.price) }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductsCards.propTypes = {
  p: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
  }).isRequired,
};
