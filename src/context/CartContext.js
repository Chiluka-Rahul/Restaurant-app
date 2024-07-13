import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  incrementCartItemQuantity: () => {},
})

export default CartContext
