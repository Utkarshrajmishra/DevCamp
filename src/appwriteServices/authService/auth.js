import { Client, Account, ID } from "appwrite";
import config from "../../config/config";

class AuthServices{
     client=new Client();
     account;
     
     constructor(){
        this.client
          .setEndpoint(config.appwriteUrl)
          .setProject(config.appwriteProjectId); 
        
        this.account=new Account(this.client);
     }
     
     async createAccount({email,password, name})
     {
        try {
            const userAccount= await this.account.create(ID.unique(), email, password);
            if(userAccount) return 
            else return userAccount;

        } catch (error) {
            throw error;
        }
     }

     async login({email,password})
     {
         try {
           return await this.account.createEmailPasswordSession(
             email,
             password
           );
         } catch (error) {
           throw error;
         }
     }

     async getCurrentUser(){
        try {
          return await this.account.get();
        } catch (error) {
          console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
     }

     async logout(){
         try {
            await this.account.deleteSession();
        } catch (error) {
            console.log('Appwrite service :: logout :: error', error);
        }
    }     
}

const authServices= new AuthServices();

export default authServices;