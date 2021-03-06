import Firebase from '../util/Firebase'
import { Model } from './Model';

export class User extends Model{

    constructor(id){
        super()

        if(id){
            this.getById(id)
        }
    }

    get name(){
        return this._data.name
    }

    set name(value){
        this._data = value
    }

    set email(value){
        this._data = value
    }

    get photo(){
        return this._data.photo
    }

    set photo(value){
        this._data = value
    }

    static getRef(){
        return Firebase.db().collection('/users')
    }

    static findByEmail(email){
        console.log(email)
        return User.getRef().doc(email)
    }

    getById(id){
        return new Promise((s, f)=>{

            User.findByEmail(id).onSnapshot(doc=>{
                this.fromJSON(doc.data())

                s(doc)
            })

        })
    }

    save(){
            return User.findByEmail(this.email).set(this.toJSON())
    }


}