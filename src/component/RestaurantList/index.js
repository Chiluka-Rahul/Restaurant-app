import {Component} from 'react'

import Loader from 'react-loader-spinner'
import RestaurantItem from '../RestaurantItem'
import TabItems from '../TabItems'
import Header from '../Header'

import './index.css'

const tabList = [
  {tabId: 'Salads and Soup', displayText: 'Salads and Soup'},
  {tabId: 'From The Barnyard', displayText: 'From The Barnyard'},
  {tabId: 'From the Hen House', displayText: 'From the Hen House'},
  {tabId: 'Fresh From The Sea', displayText: 'Fresh From The Sea'},
  {tabId: 'Biryani', displayText: 'Biryani'},
  {tabId: 'Fast Food', displayText: 'Fast Food'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class RestaurantList extends Component {
  state = {
    list: [],
    activeTabId: tabList[0].tabId,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantList()
  }

  clickTabItem = id => {
    this.setState({activeTabId: id})
  }

  getRestaurantList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)

    const updatedList = data.map(each => ({
      restaurantName: each.restaurant_name,
      restaurantId: each.restaurant_id,
      tableMenuList: each.table_menu_list.map(item => ({
        menuCat: item.menu_category,
        menuCatId: item.menu_category_id,
        categoryList: item.category_dishes.map(eachItem => ({
          dishType: eachItem.dish_Type,
          dishCal: eachItem.dish_calories,
          dishCurrency: eachItem.dish_currency,
          dishAvail: eachItem.dish_Availability,
          dishId: eachItem.dish_id,
          dishImage: eachItem.dish_image,
          dishDescription: eachItem.dish_description,
          dishPrice: eachItem.dish_price,
          dishName: eachItem.dish_name,
          addOnCat: eachItem.addonCat,
        })),
      })),
    }))
    this.setState({list: updatedList, apiStatus: apiStatusConstants.success})
    console.log(updatedList)
  }

  renderLoader = () => (
    <div className='loader'>
      <Loader type='ThreeDots' color='#0b69ff' height='50' width='50' />
    </div>
  )

  getFilteredList = () => {
    const {activeTabId, list} = this.state
    const filteredList = list[0].tableMenuList.filter(
      each => each.menuCat === activeTabId,
    )
    return filteredList
  }

  renderListView = () => {
    const {activeTabId} = this.state
    const filteredResult = this.getFilteredList()
    // console.log(filteredResult)

    return (
      <div className='app-container'>
        <Header />
        <hr className='hr-line' />
        <ul className='tab-list'>
          {tabList.map(eachTab => (
            <TabItems
              key={eachTab.tabId}
              tabDetails={eachTab}
              clickTabItem={this.clickTabItem}
              isActive={eachTab.tabId === activeTabId}
            />
          ))}
        </ul>
        <hr className='hr-line' />
        <ul>
          {filteredResult.map(category =>
            category.categoryList.map(item => (
              <RestaurantItem itemDetails={item} key={item.dishId} />
            )),
          )}
        </ul>
      </div>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderListView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderResult()}</div>
  }
}

export default RestaurantList
