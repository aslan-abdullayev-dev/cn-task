
const ListItem = ({ item, onClick }: any) => {
    return (
        <li
            onClick={onClick}
            className={`List__item List__item--${item.color}`}
        >
            {item.name}
        </li>
    )
}

export default ListItem