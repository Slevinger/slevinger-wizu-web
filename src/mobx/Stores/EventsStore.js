import { AutoBinder } from "../../utils/AutoBinder";
import { decorate, observable, action, toJS } from "mobx";
import {
  getEventsApi,
  updateImageApi,
  updateEventApi,
  replayApi
} from "../api/eventsApis";
// import { navigate } from "../../utils/navigationRef";

export class EventsStore extends AutoBinder {
  apiStore;

  authStore;

  currentEventStore;

  events;

  statsStore;

  reachedOut;

  constructor(apiStore, authStore, statsStore, currentEventStore) {
    super();
    this.apiStore = apiStore;
    this.authStore = authStore;
    this.statsStore = statsStore;
    this.currentEventStore = currentEventStore;
    this.reset();
  }

  reset() {
    this.events = [];
    this.currentEventStore.reset();
    this.reachedOut = false;
  }

  async getEvents() {
    console.log("get events");
    const api = getEventsApi();
    this.reachedOut = true;
    const data = await this.apiStore.callApi(api);
    this.events = data;
    if (this.currentEvent) {
      this.setCurrentEvent(this.currentEvent._id);
    }
  }

  async addEvent() {
    const newEvent = this.currentEventStore.createCurrentEvent();
    this.events = [...this.events, newEvent];
    // navigate("EventDeatils");
  }

  async setCurrentEvent(event_id) {
    if (!this.reachedOut) {
      await this.getEvents();
    }
    const flatEvents = Object.keys(this.events).reduce(
      (acc, answer) => [
        ...acc,
        ...this.events[answer].map(event => ({ ...event, answer }))
      ],
      []
    );

    const event = event_id
      ? flatEvents.find(({ _id }) => _id === event_id)
      : null;
    this.currentEventStore.setCurrentEvent(event);
  }
}

decorate(EventsStore, {
  currentEvent: observable,
  events: observable,
  getEvents: action,
  setEventSeen: action,
  setSeen: action,
  approveInvite: action,
  commitEventChanges: action,
  updateImage: action,
  setLocation: action,
  setCurrentEvent: action
});
