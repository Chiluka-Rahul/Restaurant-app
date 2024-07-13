import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

class RestaurantItem extends Component {
  state = {
    quantity: 0,
  }

  incrementCart = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  decrementCart = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    }
  }

  renderItems = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const {itemDetails} = this.props
        const {quantity} = this.state
        const {
          dishCal,
          dishCurrency,
          dishDescription,
          dishImage,
          dishPrice,
          dishName,
          dishAvail,
          addOnCat,
        } = itemDetails

        const onClickAddToCart = () => {
          addCartItem({...itemDetails, quantity})
        }

        const dishAvailability = dishAvail === true ? '' : 'Not available'

        const addOn = addOnCat.length === 0 ? '' : 'Customizations available'

        const dishAvailClassName = dishAvail === true ? '' : 'active'

        return (
          <>
            <li className="item-container">
              <div>
                <h1 className="item-heading">{dishName}</h1>
                <p className="item-currency">
                  {dishCurrency} {dishPrice}
                </p>
                <div className="desc-cont">
                  <p className="desc">{dishDescription}</p>
                  <p className="calories">{dishCal} calories</p>
                </div>
                {dishAvail ? (
                  <div className="btn-container">
                    <button
                      className="btn"
                      type="button"
                      onClick={this.decrementCart}
                    >
                      -
                    </button>
                    <p className="count">{quantity}</p>
                    <button
                      className="btn"
                      type="button"
                      onClick={this.incrementCart}
                    >
                      +
                    </button>
                  </div>
                ) : null}
                <button type="button" onClick={onClickAddToCart}>
                  ADD TO CART{' '}
                </button>
                <p className={`cust-para ${dishAvailClassName}`}>
                  {`${addOn} ${dishAvailability}`}
                </p>
              </div>
              <div>
                <img src={dishImage} alt={dishName} className="item-img" />
              </div>
            </li>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <div>{this.renderItems()}</div>
  }
}

export default RestaurantItem
