<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="task hover:bg-grey"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex,
      }"
      @click.native="goToTask(task)"
    >
      <span class="w-full flex-no-shrink font-bold">{{ task.name }}</span>
      <p v-if="task.description" class="w-full flex-no-shrink text-sm">
        {{ task.description }}
      </p>
    </AppDrag>
  </AppDrop>
</template>

<script>
import moveTaskOrColumn from "@/mixins/moveTaskOrColumn.js";
import AppDrag from "./AppDrag.vue";
import AppDrop from "./AppDrop.vue";

export default {
  components: { AppDrag, AppDrop },
  mixins: [moveTaskOrColumn],
  props: {
    taskIndex: {
      type: Number,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
    },
  },
};
</script>

<style>
</style>