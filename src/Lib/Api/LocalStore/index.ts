import appConfig from 'Lib/appConfig';
import { LocalStore } from './localStore.interface';

const defaultValue: LocalStore = {
  token: null,
};

export const localStore = {
  update: (data: Partial<LocalStore>) => {
    const old = localStore.get();
    const newData = {
      ...old,
      ...data
    };
    localStore.set(newData);
  },
  set: (data: LocalStore) => {
    let stringData = '';
    try {
      stringData = JSON.stringify(data);
    } catch {
      stringData = JSON.stringify(defaultValue);
    }
    localStorage.setItem(appConfig.storage.app_local_store, stringData);
  },
  get: () => {
    try {
      const d = localStorage.getItem(appConfig.storage.app_local_store);
      if (d) {
        return JSON.parse(d) as LocalStore;
      }
      return defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
};
