import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Account} from '../../model/account';
import {AccountService} from '../../service/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {

  firstName = '';
  lastName = '';
  email = '';

  @Output() addAccount: EventEmitter<Account> = new EventEmitter();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  createAccount() {
    if (this.email.trim() && this.firstName.trim() && this.lastName.trim()) {
      const account: Account = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      };

      this.accountService.create(account)
        .subscribe(response => this.addAccount.emit(response),
          error => this.handleUnauthorized(error)
        );
    }
  }

  handleUnauthorized(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
  }
}
