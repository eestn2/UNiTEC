class User{
    data: JSON | undefined = undefined;
    set(user: JSON){
        this.data = user;
    }
}
export default new User();