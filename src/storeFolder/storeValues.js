const email = (state = { email: "",name:"" }, action) => {
    if (action.type === 'ADD_EMAIL') {
        return {
            email: action.email
            
        }
    }
    if (action.type === 'ADD_NAME') {
        return {
            name: action.hospitalName,
            email:action.emailValue
        }
    }
    
    return state;
}
export default email;