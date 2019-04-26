import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[];

  constructor(private afstore: AngularFirestore) {}

  async getUsers(): Promise<User[]> {
    this.users = [];

    var db = this.afstore.firestore.collection('users');

    return await db
      .get()
      .then(users => {
        users.forEach(user => {
          this.users.push(
            new User(
              user.id,
              user.data().username,
              user.data().userphone,
              user.data().useremail,
              user.data().joinDate
            )
          );
        });
        console.log(this.users);
        return this.users;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
