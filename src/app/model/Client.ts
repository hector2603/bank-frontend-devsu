import { Account } from './Account';

export class Client {
  id: number;
  name: string;
  gender: string;
  age: number;
  identification: string;
  address: string;
  phone: string;
  status: boolean;
  password: string;
  accounts: Account[];

  constructor(clientData: any) {
    this.id = clientData.id;
    this.name = clientData.name;
    this.gender = clientData.gender;
    this.age = clientData.age;
    this.identification = clientData.identification;
    this.address = clientData.address;
    this.phone = clientData.phone;
    this.status = clientData.status ? true : false;
    this.password = clientData.password || null;
    this.accounts = clientData.accounts
      ? clientData.accounts.map((accountData: any) => new Account(accountData))
      : [];
  }
}