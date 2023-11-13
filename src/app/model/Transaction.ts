export class Transaction {
    id: number;
    creationDate: string;
    transactionType: string;
    value: number;
    balance: number;
    accountNumber: number;
  
    constructor(transactionData: any) {
      this.id = transactionData.id;
      this.creationDate = transactionData.creationDate;
      this.transactionType = transactionData.transactionType == 'DEPOSIT' ? 'Depósito' : 'Retiro';
      this.value = transactionData.value;
      this.balance = transactionData.balance;
      this.accountNumber = transactionData.accountNumber;
    }
  }