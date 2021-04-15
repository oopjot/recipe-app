import axios from "axios";
import { addUser, addUsers } from "./actions";

const getUsers = () => 
    (dispatch) => {
        axios.get("/users")
            .then(res => {
                const users = res.data.map(u => ({
                    id: u._id,
                    bio: u.bio,
                    name: u.name,
                    picture: u.picture,
                    recipes: u.recipes
                }));
                dispatch(addUsers({users}));
            })
            .catch(err => console.log(err));
    };

const postUser = (body) => 
    (dispatch) => {
        axios.post("/users", body)
            .then(res => {
                const user = {
                    id: res.data._id,
                    name: res.data.name,
                };
                dispatch(addUser(user))
            })
            .catch((err) => console.log(err));
    };



export {
    getUsers,
    postUser
};