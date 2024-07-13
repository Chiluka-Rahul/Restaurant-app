import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const Header = () => {
  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartListCount = cartList.length

        return (
          <>
            <span className="cart-count-badge">{cartListCount}</span>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <div className="container">
      <h1 className="main-heading">UNI Resto Cafe</h1>
      <div className="right-container">
        <p className="my-orders">My Orders</p>
        <div className="cart-icon">
          <AiOutlineShoppingCart />
          {renderCartItemsCount()}
        </div>
      </div>
    </div>
  )
}

export default Header
