import { AutoBinder } from "../../utils/AutoBinder";
import { decorate, observable, computed, action, toJS } from "mobx";
import {
  loginApi,
  silentLogin,
  createUserApi,
  updateProfileImageApi
} from "../api/authApis";
// import { navigate } from "../../utils/navigationRef";
// import { AsyncStorage } from "react-native";
// import * as Keychain from "react-native-keychain";

export class AuthStore extends AutoBinder {
  apiStore;

  statsStore;

  user;

  _token;

  constructor(apiStore, statsStore, navigationStore) {
    super();
    this.apiStore = apiStore;
    this.statsStore = statsStore;
    this.navigationStore = navigationStore;
    // this.token = "osPvttpvaa4F";
    // this.username = "c";
  }

  reset() {
    this.user = null;
    this._token = null;
  }

  async login({ username, password }) {
    console.log("login");
    try {
      const response = await this.apiStore.callApi(
        loginApi({ username, password })
      );

      if (response) {
        const { token, user } = response;
        if (token) {
          this._token = token;
          localStorage.setItem("token", token);
          console.log(`${token} is set`);
          this.user = user;
          this.navigationStore.push("/");

          //navigate("EventsList");
        }
      }
    } catch (error) {
      console.log(error);
      this.statsStore.addError(error.message);
    }
  }
  async signup({ username, phone, email, password }) {
    console.log("try signup", { username, password });
    try {
      const response = await this.apiStore.callApi(
        createUserApi({ username, phone, email, password })
      );
      if (response) {
        const { token, user } = response;

        if (token) {
          this._token = token;
          localStorage.setItem("token", token);
          console.log(`${token} is set`);
          this.user = user;
          this.navigationStore.push("/");
          // navigate("EventsList");
        }
      }
    } catch (error) {
      this.statsStore.addError(error.message);
    }
  }

  async tryLocalSignin() {
    const token = localStorage.getItem("token");
    console.log("token", token);
    this._token = token;
    if (!token) {
      this.navigationStore.push("/auth/signup");
    } else {
      await this.fetchUser();
      if (this.user) {
        this.navigationStore.push("/home/profile");
      }
    }
  }

  async fetchUser() {
    const user = await this.apiStore.callApi(silentLogin());

    this.user = user;
  }

  get token() {
    return this._token && `Barear ${this._token}`;
  }

  async logout() {
    localStorage.removeItem("token");
    this.reset();
    // Keychain.resetGenericPassword();
  }
}

decorate(AuthStore, {
  user: observable,
  token: computed,
  logout: action,
  login: action,
  signup: action,
  reset: action,
  fetchUser: action,
  tryLocalSignin: action
});
