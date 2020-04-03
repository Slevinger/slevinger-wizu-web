import { AutoBinder } from "../../utils/AutoBinder";
import { decorate, observable, action, toJS } from "mobx";
import get from "lodash/get";
import {
  updateImageApi,
  updateEventApi,
  replayApi,
  createEventApi
} from "../api/eventsApis";
// import { navigate } from "../../utils/navigationRef";

export class CurrentEventStore extends AutoBinder {
  apiStore;

  authStore;

  statsStore;

  currentEvent;

  lastUsed;

  constructor(apiStore, authStore, statsStore) {
    super();
    this.apiStore = apiStore;
    this.authStore = authStore;
    this.statsStore = statsStore;
    this.lastUsed = {};
    this.reset();
  }

  reset() {
    this.lastUsed = this.currentEvent;
    this.currentEvent = {
      location: { coords: { latitude: null, longitude: null }, address: {} }
    };
    console.log(get(this, "lastUsed.image_url"));
  }

  setCurrentEvent(event) {
    this.currentEvent = event;
    this.location = null;
  }

  updateCurrentEvent(event) {
    // try to update in the server
    // if fails
  }

  async createCurrentEvent() {
    try {
      const { data } = await this.apiStore.callApi(
        createEventApi(this.currentEvent)
      );
      this.currentEvent = data;
      // navigate("EventDetails");
      return data;
    } catch (error) {
      console.log(error);
      this.statsStore.addError(
        "failed creaing event :: err : " + (error.message || error)
      );
    }
  }

  deleteCurrentEvent() {}

  async setEventSeen() {
    try {
      if (this.currentEvent && this.currentEvent.answer === "not seen yet") {
        await this.setSeen();
      }
    } catch (err) {
      this.statsStore.addError(err);
    }
  }

  async setInterested() {
    try {
      const api = replayApi(this.currentEvent._id, "interested");
      await this.apiStore.callApi(api);
      await this.eventsStore.getEvents();
    } catch (err) {
      this.statsStore.addError(err);
    }
  }

  async setSeen() {
    try {
      const api = replayApi(this.currentEvent._id, "seen");
      await this.apiStore.callApi(api);
      await this.eventsStore.getEvents();
    } catch (err) {
      this.statsStore.addError(err);
    }
  }

  async approveInvite() {
    try {
      const api = replayApi(this.currentEvent._id, "confirm");
      await this.apiStore.callApi(api);
      await this.getEvents();
    } catch (err) {
      this.statsStore.addError(err);
    }
  }

  setEventName(name) {
    this.currentEvent.name = name;
  }

  setEventNature(event_nature) {
    this.currentEvent.event_nature = event_nature;
  }
  setEventDescription(description) {
    this.currentEvent.description = description;
  }
  setEventLocation(location) {
    this.currentEvent.location = Object.assign(
      this.currentEvent.location,
      location
    );
  }

  setEventDate(date) {
    this.currentEvent.date = date;
  }

  async updateImage(event_id, data) {
    try {
      const { username } = this.authStore;
      this.currentEvent.image_url = "http:\\www";

      const api = updateImageApi({ event_id, username, data });
      const answer = await this.apiStore.callApi(api);
      if (this.currentEvent) {
        this.currentEvent.image_url = answer;
      }
      // await this.eventsStore.getEvents();
      return answer;
      // this.events.find(({ _id }) => _id === event_id).image_url = answer;

      // const credentials = await Keychain.getGenericPassword();
    } catch (err) {
      console.log("error", err);
    }
  }

  async commitEventChanges() {
    if (this.currentEvent) {
      const api = updateEventApi(this.authStore.token, this.currentEvent);
      const answer = await this.apiStore.callApi(api);
      await this.eventsStore.getEvents();
      return answer;
    }
  }
}

decorate(CurrentEventStore, {
  currentEvent: observable,
  lastUsed: observable,
  setEventSeen: action,
  setSeen: action,
  setEventName: action,
  approveInvite: action,
  commitEventChanges: action,
  updateImage: action,
  setEventLocation: action,
  setCurrentEvent: action,
  createCurrentEvent: action,
  reset: action
});
