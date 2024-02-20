import { FC, Fragment, useCallback, useMemo, useState } from 'react';

import './style.css';
import ListItem from './components/ListItem/ListItem';

export const App: FC<{ items: any[] }> = ({ items = [] }) => {
  const [selectedItems, setSelectedItems] = useState<any>({})
  const [serachKey, setSearchKey] = useState("")


  const handleButtonClick = (buttonName: string) => {
    const selectedItemsCopy = { ...selectedItems }
    if (selectedItems[buttonName]) {
      delete selectedItemsCopy[buttonName]
    } else {
      selectedItemsCopy[buttonName] = true
    }
    setSelectedItems(selectedItemsCopy)
  }

  const handleSelectAll = () => {
    const newSelectedItems = {}
    items.forEach((item: any) => newSelectedItems[item.name] = true)
    setSelectedItems(newSelectedItems)
  }

  const handleUnselectAll = () => {
    setSelectedItems({})
  }

  const handleChangeSeach = (e: any) => {
    setSearchKey(e.target.value)
  }

  const handleClearSearch = (e: any) => {
    setSearchKey("")
  }

  const lastSelectedName = Object.keys(selectedItems).map((name: any) => <span style={{ color: "red", paddingRight: "10px" }}>{name}</span>)


  const itemsAfterSearch = useMemo(() => {
    if (!serachKey) return items
    return items.filter((item: any) => item.name.toLowerCase().includes(serachKey.toLowerCase()))
  }, [serachKey])

  return (
    <Fragment>
      <div>
        <div>{lastSelectedName}</div>
        <div>
          <input
            type="search"
            value={serachKey}
            onChange={handleChangeSeach}
          />
          <button onClick={handleClearSearch}>Clear filter</button>
        </div>
        <div>
          <button onClick={handleSelectAll}>select all</button>
          <button onClick={handleUnselectAll}>unselect all</button>
        </div>
      </div>
      <ul className="List">
        {itemsAfterSearch.map((item) => (
          <span
            className={`List__item-wrapper ${selectedItems[item.name] ? "active" : ""}`}
          >
            <ListItem
              key={item.name}
              item={item}
              onClick={() => handleButtonClick(item.name)}
            />
          </span>
        ))}
      </ul>
    </Fragment>
  );
};
