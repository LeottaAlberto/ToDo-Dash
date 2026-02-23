<script lang="ts" setup>
import type CreateCategoryComponent from '@/components/b-popup/src/CreateCategoryComponent.vue';
import ButtonComponent from '@/components/b-utility/src/ButtonComponent.vue';
import { useCategory } from '@/composable/useCategory';
import type CategoryInterface from '@/core/interface/CategoryInterface';
import { Position } from '@/enums';
import { ref } from 'vue';

const categoryFormRef = ref<InstanceType<typeof CreateCategoryComponent>>();

const { globalCategory, addCategory, removeCategory } = useCategory();

const selected = ref<(number | string)[]>([]);

const createCategory = ref(false);

const handleConfirmClick = async () => {
  if (categoryFormRef.value) categoryFormRef.value?.submitForm();
};

const handleAddActivity = (category: CategoryInterface) => {
  addCategory(category);
  createCategory.value = false;
};

function addSelected(id: number | string) {
  const index = selected.value.findIndex((cID) => cID == id);

  if (index > -1) selected.value.splice(index, 1);
  else selected.value.push(id);
}

const isSelected = (catID: string | number) => {
  return selected.value.some((i) => i === catID);
};
</script>
<template>
  <div class="flex flex-row w-full h-full">
    <LeftContainerComponent :filters="false" />
    <div class="flex justify-center w-full h-full py-5">
      <div class="flex flex-col items-center w-full max-w-11/12">
        <!-- Title -->
        <div class="py-5 px-10 rounded-t-xl w-full bg-zinc-800/50">
          <h1 class="font-bold text-3xl text-left text-white">Category Editor</h1>
        </div>

        <div class="flex flex-col justify-start p-5 w-full h-full bg-zinc-800/50">
          <!-- Header -->
          <div class="flex flex-row justify-between w-full pb-5">
            <div class="w-full">
              <SearchbarComponent />
            </div>
            <div class="flex flex-row w-fit">
              <ButtonComponent
                icon="pi-plus"
                :direction="Position.RIGHT"
                @click="createCategory = true"
              />
              <ButtonComponent
                icon="pi-trash"
                :direction="Position.RIGHT"
                :disable="selected.length === 0"
                @click="removeCategory(selected)"
              />
              <ButtonComponent
                icon="pi-save"
                :direction="Position.RIGHT"
                :disable="true"
                @click="true"
              />
            </div>
          </div>
          <!-- Table -->
          <div class="w-full">
            <div
              class="grid grid-cols-[0.4fr_1fr_2fr_2fr] border-2 border-neutral-700 font-bold uppercase text-md tracking-widest bg-neutral-800/50 rounded-t-md"
            >
              <p class="py-3 border-r-2 border-neutral-800 text-center">Selected</p>
              <p class="py-3 border-r-2 border-neutral-800 text-center">Category ID</p>
              <p class="py-3 border-r-2 border-neutral-800 text-center">Name</p>
              <p class="py-3 text-center">Color</p>
            </div>

            <div
              class="max-y-10! flex flex-col bg-neutral-800 border-2 border-t-0 border-neutral-700 rounded-b-md overflow-y-auto overflow-x-hidden"
            >
              <div
                v-for="cat in globalCategory"
                :key="cat.id"
                class="grid grid-cols-[0.4fr_1fr_2fr_2fr] items-center border-b border-neutral-700 last:border-0 hover:bg-neutral-700/30 transition-colors"
                @click="addSelected(cat.id)"
              >
                <!-- Selected -->
                <div
                  class="flex justify-center items-center px-3 h-10 border-r-2 border-neutral-900/50 bg-zinc-800/50"
                >
                  <!-- <input
                    type="checkbox"
                    :value="cat.id + ''"
                    :id="'sel-' + cat.id"
                    v-model="selected"
                    class="w-5 h-5 bg-zinc-600! text-zinc-600"
                  /> -->
                  <div
                    class="w-5 h-5 rounded-md transition-all duration-200"
                    :class="isSelected(cat.id) ? 'bg-violet-600' : 'bg-zinc-600'"
                  ></div>
                </div>
                <!-- ID -->
                <div
                  class="flex flex-row items-center px-3 h-10 border-r-2 border-neutral-900/50 truncate"
                  :title="cat.id + ''"
                >
                  <p class="font-mono text-xs text-zinc-500">
                    {{ cat.id.toString().substring(0, 28) }}...
                  </p>
                </div>

                <!-- Label -->
                <div class="flex flex-row items-center px-3 h-10 border-r-2 border-neutral-900/50">
                  <input
                    type="text"
                    v-model="cat.label"
                    class="w-full bg-transparent outline-none focus:text-violet-400 transition-colors"
                  />
                </div>

                <!-- Color -->
                <div class="flex flex-row justify-center items-center px-3 h-10 gap-3">
                  <div
                    class="relative w-6 h-6 rounded-full border border-white/10 shrink-0 shadow-inner"
                    :style="{ backgroundColor: cat.color }"
                  >
                    <input
                      type="color"
                      v-model="cat.color"
                      class="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    v-model="cat.color"
                    class="w-20 bg-transparent text-xs font-mono outline-none text-zinc-400"
                  />
                </div>
              </div>

              <div v-if="globalCategory.length === 0" class="p-10 text-center text-zinc-500 italic">
                No categories found.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <PopUpComponent
    :show="createCategory"
    title="Create New Category"
    footer_btn_title="Create"
    icon_button_2="pi-plus"
    :editable="false"
    @confirm="handleConfirmClick"
    @closed="createCategory = false"
  >
    <CreateCategoryComponent
      ref="categoryFormRef"
      @submit="(category: CategoryInterface) => handleAddActivity(category)"
    />
  </PopUpComponent>
</template>
