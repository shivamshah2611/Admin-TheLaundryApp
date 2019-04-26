import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  showSpinner: boolean = true;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users = [];
    this.usersService.getUsers().then(users => {
      this.users = users;
      this.showSpinner = false;
    });

    console.log(this.users);
  }

}
