import { FaCheck, FaX, FaRotateLeft, FaPencil } from 'react-icons/fa6'


const ListItem = ({listData, handleComplete, handleDelete, handleEdit}) => {
    return (
        <div>
            {listData && listData.map && listData.map((listItem) => {
                let completed = listItem.completed ? "list-item completed" : "list-item"
                const handleCompleteIcon = () => {
                    if(listItem.completed) {
                        return <FaRotateLeft onClick={() => handleComplete(listItem._id, listItem.completed)} className="icon" /> 
                    } else {
                        return <FaCheck onClick={() => handleComplete(listItem._id, listItem.completed)} className="icon" />
                    }
                }
                
                return (
                    <div className={completed} key={listItem.id}>
                        <div>
                            <div className="list-id"> {listItem.id}. </div> {listItem.description}
                            {handleCompleteIcon()}
                            <FaX onClick={() => handleDelete(listItem._id)} className="icon" />
                            <FaPencil onClick={() => handleEdit(listItem._id)} className="icon" />
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
 
export default ListItem;