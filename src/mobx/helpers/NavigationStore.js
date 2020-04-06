import { decorate, observable, action, computed } from "mobx";
import { AutoBinder } from "../../utils/AutoBinder";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

export class NavigationStore extends AutoBinder {
  history;

  constructor() {
    super();
    this.history = history;
  }

  push(path) {
    this.history.push(path);
  }
  pop() {
    this.history.pop();
  }

  get currentPath() {
    return this.history.location.pathname;
  }

  replace(path) {
    this.history.replace(path);
  }
}

decorate(NavigationStore, {
  history: observable,
  currentPath: computed,
  navigate: action,
  push: action,
  pop: action,
  replace: action
});
