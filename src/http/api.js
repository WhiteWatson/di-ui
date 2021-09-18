import login from './modules/login'
import menu from './modules/menu'
import userList from './modules/user'
export default{
    ...login,
    ...menu,
    ...userList
}