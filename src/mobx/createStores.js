import { AuthStore } from "./Stores/AuthStore";
import { ApiStore } from "./helpers/ApiStore";
import { ModalStore } from "./helpers/ModalStore";
import { EventsStore } from "./Stores/EventsStore";
import { UserStore } from "./Stores/UserStore";
import { StatsStore } from "./Stores/StatsStore";
import { MediaStore } from "./Stores/MediaStore";
import { CurrentEventStore } from "./Stores/CurrentEventStore";
import { NavigationStore } from "./helpers/NavigationStore";

export const createStores = props => {
  const mediaStore = new MediaStore();
  const statsStore = new StatsStore();
  const navigationStore = new NavigationStore();
  const modalStore = new ModalStore(statsStore);
  const apiStore = new ApiStore(modalStore, statsStore);
  const authStore = new AuthStore(apiStore, statsStore, navigationStore);
  const currentEventStore = new CurrentEventStore(
    apiStore,
    authStore,
    statsStore
  );
  const eventsStore = new EventsStore(
    apiStore,
    authStore,
    statsStore,
    currentEventStore
  );
  const userStore = new UserStore(modalStore, apiStore, authStore, statsStore);

  return {
    apiStore,
    modalStore,
    authStore,
    eventsStore,
    userStore,
    statsStore,
    navigationStore,
    mediaStore,
    currentEventStore
  };
};
