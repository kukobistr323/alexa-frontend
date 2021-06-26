import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../service/account.service';
import {Account} from '../../model/account';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accounts: Account[] | undefined;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getAccounts()
      .subscribe(response => this.accounts = response);
  }

  addAccount(account: Account) {
    this.accounts?.unshift(account);
  }
}
