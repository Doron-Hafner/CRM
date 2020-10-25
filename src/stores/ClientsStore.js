import { makeObservable, observable, computed, action, runInAction } from "mobx";
import Client from './Client'
import Axios from 'axios'

class ClientsStore {
    constructor(){
        this.clientList = []
        this.loadind = false
        makeObservable(this, {
            clientList: observable,
            loadind: observable,
            addClient: action,
        })
    }
    async fetchData ()  {
        this.loadind = false
        const { data, status } = await Axios.get('http://localhost:5000/clients')
        if(status === 200){
            runInAction(() => {this.clientList = data[0]
                                this.loading = true})
        }else {console.log(status)}
    }
    
    async addClient (fName, lName, email, country, owner) {
        const client = new Client(fName, lName, email, country, owner)
        //push To db
    }
}

export default new ClientsStore()
