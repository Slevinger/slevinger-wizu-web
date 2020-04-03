import { decorate, observable, action, computed } from "mobx";
import { AutoBinder } from "../../utils/AutoBinder";
import { createBrowserHistory } from "history";

export class NavigationStore extends AutoBinder {
  history;

  constructor() {
    super();
    this.history = createBrowserHistory();
    // debugger;
    // this.history = useHistory();
  }

  push(path) {
    this.history.push(path);
  }
  pop() {
    this.history.pop();
  }

  get currentPath() {
    debugger;

    return this.history.location.pathname;
  }

  replace(path) {
    debugger;
    this.history.replace(path);
  }
}

decorate(NavigationStore, {
  currentPath: computed,
  navigate: action,
  push: action,
  pop: action,
  replace: action
});
