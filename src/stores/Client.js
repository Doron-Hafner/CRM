export default class Client {
    constructor(fName, lName, email, country, owner){
        this.id = null
        this.name = fName + lName
        this.email = email
        this.firstContact = null
        this.emailType = null
        this.sold = null
        this.owner = owner
        this.country = country
    }
}
