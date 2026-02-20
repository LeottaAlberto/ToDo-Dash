import type { UserInterface } from '@/core/interface/UserInterface';
import { computed, ref } from 'vue';

const activeUser = ref<UserInterface | null>(null);

const otherUsers = ref<UserInterface[]>([]);

export function useUser() {
  const isLoggedIn = computed(() => activeUser.value !== null);

  const login = (user: UserInterface) => {
    if (activeUser.value != null) return false;

    activeUser.value = user;
    return true;
  };

  const logout = () => {
    activeUser.value = null;
  };

  const addOther = (user: UserInterface) => {
    const exists = otherUsers.value.some((u) => u.id === user.id);
    if (!exists) otherUsers.value.push(user);
  };

  const removeOther = (id: number | string) => {
    otherUsers.value.filter((user) => user.id !== id);
  };

  return {
    activeUser,
    otherUsers,
    isLoggedIn,
    login,
    logout,
    addOther,
    removeOther,
  };
}
