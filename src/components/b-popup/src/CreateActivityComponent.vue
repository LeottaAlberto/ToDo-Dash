<script setup lang="ts">
import { computed, ref } from 'vue';
import type ActivityInterface from '@/core/interface/ActivityInterface';

import { useUser } from '@/composable/useUser';
import type { UserInterface } from '@/core/interface/UserInterface';
import MultiSelectComponent from '@/components/b-utility/src/MultiSelectComponent.vue';
import { useCategory } from '@/composable/useCategory';
import PopUpComponent from './PopUpComponent.vue';
import CreateCategoryComponent from './CreateCategoryComponent.vue';
import type CategoryInterface from '@/core/interface/CategoryInterface';
import type { Option } from '@/core/interface/MultiSelectInterface';

const { otherUsers, addOther } = useUser();
const { globalCategory, addCategory } = useCategory();
const emit = defineEmits(['submit', 'closed']);
const formRef = ref<HTMLFormElement | null>(null);

const createCategory = ref(false);

const categoryFormRef = ref<InstanceType<typeof CreateCategoryComponent>>();

defineExpose({
  triggerSubmit,
});

const otherUsersOption = computed(() => {
  return otherUsers.value.map(
    (u) =>
      ({
        id: u.id,
        name: `${u.name} ${u.surname}`,
        label: u.username,
        srcImg: u.srcImg,
      }) as Option,
  );
});

const categoryOption = computed(() => {
  return globalCategory.value.map(
    (u) =>
      ({
        id: u.id,
        label: u.label,
        name: u.label,
        color: u.color,
      }) as Option,
  );
});

const title = ref('');
const priority = ref('');
const note = ref('');

const selectedUserIds = ref([]);

const selectedCategoryIds = ref<Option[]>([]);

const handleConfirmClick = async () => {
  if (categoryFormRef.value) categoryFormRef.value?.submitForm();
};

function submit() {
  const selectedCategories = computed(() => {
    const selectedOnes = globalCategory.value.filter((category) =>
      selectedCategoryIds.value.find((selCat) => selCat.id === category.id),
    );

    return selectedOnes.map((category, index) => ({
      id: category.id,
      label: category.label,
      name: category.label,
      color: category.color,
      primary: index === 0,
    }));
  });

  const activity: ActivityInterface = {
    id: crypto.randomUUID(),
    title: title.value,
    categories: selectedCategories.value,
    priority: priority.value,
    note: note.value,
    status: false,
    filters: [{ filter_name: priority.value, filter_id: 4, status: false }],
  };
  emit('submit', activity);
}

function triggerSubmit() {
  if (formRef.value) formRef.value.requestSubmit();
  return false;
}

const handleAddUser = () => {
  const newUser: UserInterface = {
    id: crypto.randomUUID(),
    name: 'Test',
    surname: 'Test',
    username: 'Testato',
    srcImg: 'https://primefaces.org/cdn/primevue/images/organization/walter.jpg',
  };

  addOther(newUser);
};

const handleAddActivity = (category: CategoryInterface) => {
  addCategory(category);
  createCategory.value = false;
};
</script>

<template>
  <div class="h-full flex min-w-2xl">
    <form class="flex flex-col justify-between w-full" ref="formRef" @submit.prevent="submit">
      <div class="flex flex-row gap-7 p-2">
        <!-- Quickly Col -->
        <div class="flex flex-col justify-between pt-6 pb-4 w-1/2">
          <!-- Title -->
          <div class="flex flex-col relative w-full">
            <label for="title-content" class="absolute left-0 -top-5">Title *</label>
            <span for="title-content" class="absolute right-0 -top-4 text-[10px]"
              >{{ title.length }} / 20</span
            >
            <input
              class="rounded-sm px-3 w-full outline-0 py-1.5 bg-neutral-800 border border-zinc-700 cursor-pointer hover:border-violet-500 transition-all"
              name="title-content"
              type="text"
              v-model="title"
              maxlength="20"
              required
            />
          </div>

          <!-- Category -->
          <div class="w-full flex flex-col justify-end">
            <label for="category-content" class="w-full tracking-wide">Category *</label>
            <MultiSelectComponent
              v-model="selectedCategoryIds"
              :options="categoryOption"
              :add-new="true"
              placeholder="Select Category"
              @add-new="createCategory = true"
              @remove-all="selectedCategoryIds = []"
            />
          </div>

          <div class="flex flex-col justify-center">
            <label for="given-to" class="w-full tracking-wide">Given To *</label>
            <MultiSelectComponent
              v-model="selectedUserIds"
              :options="otherUsersOption"
              placeholder="Select Users"
              @add-new="handleAddUser"
              @remove-all="selectedUserIds = []"
            />
          </div>
        </div>

        <!-- Description Col -->
        <div class="flex flex-col w-1/2">
          <h3 class="text-start w-full tracking-wide">Description & Notes</h3>

          <textarea
            v-model="note"
            id="note-content"
            name="note-content"
            class="min-x-90 h-50 resize-none rounded-md p-4 bg-neutral-800 focus:outline-0"
            maxlength="500"
          ></textarea>

          <label for="note-content" class="w-full text-align-end text-[10px]"
            >{{ note.length }} / 500</label
          >
        </div>
      </div>

      <!-- Priority -->
      <div class="w-full flex flex-col px-2 h-fit">
        <label for="note-content" class="w-full tracking-wide">Priority *</label>
        <select
          name="note-content"
          class="w-full btn rounded-md py-2 bg-neutral-800 outline-0 px-1 focus:outline-0"
          v-model="priority"
          required
        >
          <option>Lower</option>
          <option>Medium</option>
          <option>Higher</option>
        </select>

        <p class="text-[10px] w-full tracking-wide">*Required fields</p>
      </div>
    </form>
  </div>

  <PopUpComponent
    v-if="createCategory"
    title="Create New Category"
    footer_btn_title="Create"
    icon_button_2="pi-plus"
    :editable="false"
    @confirm="handleConfirmClick"
    @closed="createCategory = false"
  >
    <CreateCategoryComponent
      ref="categoryFormRef"
      @submit="(category) => handleAddActivity(category)"
    />
  </PopUpComponent>
</template>
