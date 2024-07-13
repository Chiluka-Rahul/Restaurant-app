import './index.css'

const TabItems = props => {
  const {tabDetails, clickTabItem, isActive} = props
  const {tabId, displayText} = tabDetails

  const activeTabClassName = isActive ? 'active-tab-btn' : ''

  const onClickTabItem = () => {
    clickTabItem(tabId)
    console.log('clicked')
  }

  return (
    <li className="tab-container">
      <button
        className={`tab-btn ${activeTabClassName}`}
        type="button"
        onClick={onClickTabItem}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItems
