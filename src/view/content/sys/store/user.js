export default {
    namespaced:true,
    state:{
        userForm:{}
    },
    actions:{
        handleQuery({state}){
            console.log(state.userForm)
        },
        handleReset(){
            arguments[1].resetFields()
        },
        addUser(){

        }
    }
}