import { action, makeAutoObservable, observable } from 'mobx';

export default class ExStore {
  constructor() {
    makeAutoObservable(this, {
      value: observable,
      toggleValue: action,
    });
  }
  value = 'Hello';

  toggleValue() {
    this.value = this.value === 'Hello' ? 'World' : 'Hello';
  }
}
