import Axios from 'axios'
import React, {useState} from 'react'

export default function ReactForm() {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [users,setUsers] = useState([])

    const handleSubmit = () => {

        let encodedPassword = btoa(password)

        Axios.post('http://localhost:9000/create_user', {
            username : username,
            password: encodedPassword
        }).then(()=>{
            setUsers([...users,{
                username : username,
                password: encodedPassword
            }])
            console.log("request Send!")
        })
        
    }

    const getAllUsers = () => {
        Axios.get('http://localhost:9000/get_all_users').then((response)=>{
            setUsers(response.data)
        })
    }

    const deleteUser = (id) => {
        Axios.delete(`http://localhost:9000/delete_user/${id}`).then(()=>{
            console.log("User Deleted")
        })
    }

    return (
        <div>
            <form>
                <input type="text" placeholder='username' name="username" value={username} onChange={e=>setUsername(e.target.value)} />
                <input type="password" placeholder='password' name="password" value={password} onChange={e=>setPassword(e.target.value)} />
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>

            <button onClick={getAllUsers}>Get All Users</button>

            <ul>
                {
                    users.map((user,key)=>{
                        return <li key={key}>{user.username}  <button onClick={()=>deleteUser(user.id)}>Delete</button></li>
                    })
                }
            </ul>
        </div>
    )
}
