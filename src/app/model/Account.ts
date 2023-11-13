import { Transaction } from './Transaction';

export class Account {
    accountNumber: number;
    accountType: string;
    initialBalance: number;
    balance: number;
    status: string;
    clientId: number;
    transactions: Transaction[];
  
    constructor(accountData: any) {
      this.accountNumber = accountData.accountNumber;
      this.accountType = accountData.accountType == 'SAVINGS' ? 'Ahorros' : accountData.accountType == 'CURRENT' ? 'Corriente' : accountData.accountType;
      this.initialBalance = accountData.initialBalance;
      this.balance = accountData.balance;
      this.status = accountData.status ? 'Activo' : 'Inactivo';
      this.clientId = accountData.clientId;
      this.transactions = accountData.transactions ? accountData.transactions.map((transactionData: any) => new Transaction(transactionData)) : [];
    }
  }