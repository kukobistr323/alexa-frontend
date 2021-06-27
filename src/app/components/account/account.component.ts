import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from '../../model/account';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() account: Account | undefined;
  @Output() deletedAccount: EventEmitter<Account> = new EventEmitter();

  constructor(private accountService: AccountService) {
  }

  deleteAccount() {
    this.accountService.delete(this.account?.id)
      .subscribe(response => this.deletedAccount.emit(this.account));
  }

  ngOnInit(): void {
  }

}
