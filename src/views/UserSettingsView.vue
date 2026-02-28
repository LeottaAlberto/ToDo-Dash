<script lang="ts" setup>
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';
import { useUser } from '@/composable/useUser';
import type { UserInterface } from '@/core/interface/UserInterface';
import { Position } from '@/enums';
import { computed, onMounted, ref } from 'vue';

const { activeUser, isLoggedIn, login, persistUser } = useUser();

const imgUrl = computed(() => {
  return activeUser.value?.srcImg
    ? activeUser.value?.srcImg
    : 'https://primefaces.org/cdn/primevue/images/organization/walter.jpg';
});

const imgHover = ref(false);

const editMode = ref(false);

const inputStatus = computed(() => {
  return 'selection:outline-none focus:outline-none';
});

function editComplete(status: boolean) {
  if (status) persistUser();
  else login();

  editMode.value = false;
}

onMounted(() => {
  if (!isLoggedIn) {
    const user: UserInterface = {
      id: crypto.randomUUID(),
      name: 'Alberto',
      surname: 'Leotta',
      username: 'SurreLife',
      email: 'leottaalberto@gmail.com',
      password: 'pass123456',
      memInfo: new Date('october 22, 2025'),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, numquam. Deleniti, saepe aliquam culpa laborum id corrupti nisi pariatur rerum aliquid fugiat cumque, iste molestias exercitationem quia voluptatibus adipisci est!Praesentium architecto debitis provident aperiam quia saepe molestiae facilis possimus, maxime officia quibusdam perferendis accusamus alias consectetur dolore qui iure recusandae vel, ducimus blanditiis eos aut totam unde placeat. Deserunt.',
    };
    login(user);
  }
});
</script>

<template>
  <div class="flex flex-row w-full h-full">
    <LeftContainerComponent :filters="false" :settings="true" />
    <div class="p-15 w-full" v-if="activeUser">
      <!-- User Container -->
      <div class="flex flex-col w-full items-center gap-10 h-full">
        <!-- User Data -->
        <div
          class="flex flex-col justify-start items-center gap-1 px-10 rounded-xl w-3/5 min-h-190 h-full max-h-190 py-5 bg-zinc-800/50"
        >
          <!-- Head -->
          <div class="w-full h-fit py-5">
            <h1 class="text-start text-2xl font-semibold w-full">
              Account Profile
              <i
                v-if="!editMode"
                @click="editMode = true"
                class="pi pi-pencil text-xl text-violet-400"
              ></i>
            </h1>
          </div>
          <!-- Body -->
          <div class="flex flex-col justify-start items-center gap-2 w-full h-full">
            <!-- Img Container -->
            <div
              class="relative w-30 h-30 overflow-hidden rounded-full"
              @mouseenter="imgHover = true"
              @mouseleave="imgHover = false"
            >
              <Avatar :image="imgUrl" shape="circle" class="w-full h-full" />
              <!-- @click="" -->
              <div
                v-if="imgHover"
                class="flex justify-center items-center absolute w-full h-full right-0 top-0 bg-black/30"
              >
                <i class="pi pi-pencil text-2xl"></i>
              </div>
            </div>
            <!-- User Data -->
            <div class="grid grid-cols-2 gap-8 w-full py-3 rounded-md">
              <!-- Username -->
              <div class="relative col-span-2">
                <label
                  for="username"
                  class="absolute text-xs transition-all duration-75"
                  :class="activeUser.username.length === 0 ? 'top-2 left-2' : '-top-5 left-0'"
                  >Nickname</label
                >
                <input
                  id="user-username-settings"
                  name="username"
                  type="text"
                  v-model="activeUser.username"
                  :disabled="!editMode"
                  class="px-2 py-1 rounded-md outline-1 outline-violet-300/50 focus:border focus:border-violet-800! w-full"
                  :class="inputStatus"
                />
              </div>
              <!-- Email -->
              <div class="relative col-span-1">
                <label
                  for="email"
                  class="absolute text-xs transition-all duration-75"
                  :class="activeUser.email.length === 0 ? 'top-2 left-2' : '-top-5 left-0'"
                  >Email</label
                >
                <input
                  id="user-email-settings"
                  name="email"
                  type="email"
                  v-model="activeUser.email"
                  :disabled="!editMode"
                  class="px-2 py-1 rounded-md outline-1 outline-violet-300/50 focus:border focus:border-violet-800! w-full"
                  :class="inputStatus"
                />
              </div>
              <!-- Password -->
              <div class="relative col-span-1">
                <label
                  for="Password"
                  class="absolute text-xs transition-all duration-75"
                  :class="activeUser.password.length === 0 ? 'top-2 left-2' : '-top-5 left-0'"
                  >Password</label
                >
                <input
                  id="user-Password-settings"
                  name="Password"
                  :type="editMode ? 'text' : 'Password'"
                  v-model="activeUser.password"
                  :disabled="!editMode"
                  class="px-2 py-1 rounded-md outline-1 outline-violet-300/50 focus:border focus:border-violet-800! w-full"
                  :class="inputStatus"
                />
              </div>
              <!-- First Name -->
              <div class="relative col-span-1">
                <label
                  for="name"
                  class="absolute text-xs transition-all duration-75"
                  :class="activeUser.name.length === 0 ? 'top-2 left-2' : '-top-5 left-0'"
                  >First Name</label
                >
                <input
                  id="user-name-settings"
                  name="name"
                  type="text"
                  v-model="activeUser.name"
                  :disabled="!editMode"
                  class="w-full px-2 py-1 rounded-md outline-1 outline-violet-300/50 focus:border focus:border-violet-800!"
                  :class="inputStatus"
                />
              </div>
              <!-- Last name -->
              <div class="relative col-span-1">
                <label
                  for="surname"
                  class="absolute text-xs transition-all duration-75"
                  :class="activeUser.surname.length === 0 ? 'top-2 left-2' : '-top-5 left-0'"
                  >Last Name</label
                >
                <input
                  id="user-surname-settings"
                  name="surname"
                  type="text"
                  v-model="activeUser.surname"
                  :disabled="!editMode"
                  class="w-full px-2 py-1 rounded-md outline-1 outline-violet-300/50 focus:border focus:border-violet-800!"
                  :class="inputStatus"
                />
              </div>
              <!-- Biography -->
              <div v-if="activeUser.description" class="relative col-span-2">
                <label
                  for="username"
                  class="absolute text-xs transition-all duration-75"
                  :class="activeUser.description.length === 0 ? 'top-2 left-2' : '-top-5 left-0'"
                  >Biography</label
                >
                <textarea
                  id="user-description-settings"
                  name="description"
                  v-model="activeUser.description"
                  :readonly="!editMode"
                  class="col-span-2 px-2 py-1 w-full min-h-45 max-h-45 rounded-md outline-1 outline-violet-300/50"
                ></textarea>
              </div>
              <div class="flex flex-col">
                <h1 class="font-semibold">Member Information</h1>
                <h2>Member Since: {{ activeUser.memInfo.toDateString() }}</h2>
              </div>
            </div>
          </div>
          <!-- Footer -->
          <div v-if="editMode" class="flex flex-row justify-end gap-1.5 w-full">
            <ButtonComponent
              icon="pi-save"
              tool-tip="save"
              :background="true"
              @click="editComplete(true)"
            />
            <ButtonComponent
              icon="pi-times"
              tool-tip="cancel"
              :background="true"
              @click="editComplete(false)"
            />
          </div>
        </div>
        <!-- Delete Account Container -->
        <div
          class="flex flex-row justify-between items-center gap-2 w-3/5 h-fit px-10 py-5 rounded-xl bg-zinc-800/50"
        >
          <div class="flex flex-col justify-between w-full">
            <h1 class="w-full text-start font-semibold">Delete Account</h1>
            <p class="w-2/3 text-start">Deleting your account is permanent and can't be undone.</p>
          </div>
          <div class="w-2/3">
            <ButtonComponent :direction="Position.RIGHT" icon="pi-trash" label="Delete Account" />
          </div>
        </div>
      </div>
    </div>

    <input type="file" hidden="true" />
  </div>
</template>
