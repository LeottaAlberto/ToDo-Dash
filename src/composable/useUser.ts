import type { UserInterface } from '@/core/interface/UserInterface';
import { computed, ref } from 'vue';

const activeUser = ref<UserInterface | undefined>();

const otherUsers = ref<UserInterface[]>([]);

export function useUser() {
  const isLoggedIn = computed(() => activeUser.value !== undefined);

  function login(): void;
  function login(user: UserInterface): void;

  function login(payload?: UserInterface) {
    const sessionValStr = sessionStorage.getItem('active-user');

    if (sessionValStr) {
      try {
        const parsed = JSON.parse(sessionValStr);
        if (parsed.memInfo) parsed.memInfo = new Date(parsed.memInfo);
        activeUser.value = parsed;
      } catch {
        activeUser.value = payload;
      }
    } else activeUser.value = payload;

    if (activeUser.value) persistUser();
  }

  const logout = () => {
    sessionStorage.removeItem('active-user');
    activeUser.value = undefined;
  };

  const persistUser = () => {
    if (activeUser.value) {
      sessionStorage.setItem('active-user', JSON.stringify(activeUser.value));
    }
  };

  const addOther = (user: UserInterface) => {
    const exists = otherUsers.value.some((u) => u.id === user.id);
    if (!exists) otherUsers.value.push(user);
  };

  const removeOther = (id: number | string) => {
    otherUsers.value = otherUsers.value.filter((user) => user.id !== id);
  };

  return {
    activeUser,
    otherUsers,
    isLoggedIn,
    login,
    logout,
    persistUser,
    addOther,
    removeOther,
  };
}
