import { useState, useEffect } from 'react'
import ListItem from './LIstItem'


const Home = () => {

    const handleComplete = (itemId, completed) => {
        fetch("/list/" + itemId, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: (completed) ? false : true
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.modifiedCount === 1) {
                let newData = listData.map(function(item) {
                    console.log(item['_id'])
                    if(item['_id'] === itemId) {
                        console.log('im in here')
                        item['completed'] = (completed) ? false : true
                        return item
                    } else {
                        return item
                    } 
                })
                setListData(newData)
            }
        })
    }
    //todo
    const handleAdd = () => {
        console.log('add')
    }
    //todo
    const handleDelete = () => {
        console.log('delete')
    }
    const handleEdit = () => {
        console.log('edit')
    }

    const [listData, setListData] = useState({})

    useEffect(() => {
      fetch("/list").then(
        response => response.json()
      ).then(
        data => {
          setListData(data)
        }
      )
    }, [])


    return  (
        <div className="home">
            <h2>List</h2>
            <ListItem 
                handleComplete={handleComplete}  
                handleDelete={handleDelete}
                handleEdit={handleEdit} 
                listData={listData} 
            />
            <button onClick={handleAdd}>Add New Item</button>
        </div>
    );
}
 
export default Home;