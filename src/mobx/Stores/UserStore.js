import { AutoBinder } from "../../utils/AutoBinder";
import { decorate, observable, action } from "mobx";
import {
  updateProfileImageApi,
  updateUserCoverPhotoApi,
  replayApi
} from "../api/userApis";
import { getUserDetailsApi } from "../api/feedApi";
import { createFormData } from "../../utils";

// import * as Keychain from "react-native-keychain";

export class UserStore extends AutoBinder {
  apiStore;
  authStore;
  modalStore;
  statsStore;
  user;

  _token;

  constructor(modalStore, apiStore, authStore, statsStore) {
    super();
    this.apiStore = apiStore;
    this.modalStore = modalStore;
    this.authStore = authStore;
    this.statsStore = statsStore;
  }

  async confirmFriendRequest(user_id) {
    try {
      const correspondence = await this.apiStore.callApi(
        replayApi(user_id, "confirm")
      );
      await this.authStore.fetchUser();

      return correspondence;
    } catch (error) {
      this.statsStore.addError(error.message || error);
    }
  }

  async ignoreFriendRequest(user_id) {
    try {
      const correspondence = await this.apiStore.callApi(
        replayApi(user_id, "ignore")
      );
      await this.authStore.fetchUser();

      return correspondence;
    } catch (error) {
      this.statsStore.addError(error.message || error);
    }
  }

  async updateProfileImage(file) {
    try {
      const api = updateProfileImageApi({ data: createFormData(file) });
      const answer = await this.apiStore.callApi(api);
      if (this.authStore.user) {
        this.authStore.user.profileImage = answer;
      }
      // await this.getEvents();
      return answer;
      // this.events.find(({ _id }) => _id === event_id).image_url = answer;

      // const credentials = await Keychain.getGenericPassword();
    } catch (err) {
      console.log("error", err);
    }
  }
  async setCoverPhoto(file) {
    try {
      const api = updateUserCoverPhotoApi({ data: createFormData(file) });
      const answer = await this.apiStore.callApi(api);
      if (this.authStore.user) {
        this.authStore.user.coverPhoto = answer;
      }
      // await this.getEvents();
      return answer;
      // this.events.find(({ _id }) => _id === event_id).image_url = answer;

      // const credentials = await Keychain.getGenericPassword();
    } catch (err) {
      console.log("error", err);
    }
  }

  async getUserDetails(_id) {
    try {
      let user = this.authStore.user.friends.find(friendId => {
        return _id === friendId._id || friendId;
      });

      if (user.username) {
        return user;
      }
      user = await this.apiStore.callApi(getUserDetailsApi(_id));

      this.authStore.user.friends = this.authStore.user.friends.map(friendId =>
        friendId === _id ? user : friendId
      );
    } catch (error) {
      console.log(error);
    }
  }
}

decorate(UserStore, {
  updateProfileImage: action,
  confirmFriendRequest: action,
  getUserDetails: action
});
