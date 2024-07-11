export class User {
  public id: number;
  private name: string;
  private email: string;
  private age: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.age = 0;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getAge(): number {
    return this.age;
  }

  public setAge(age: number): void {
    this.age = age;
  }
}
