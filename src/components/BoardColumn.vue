<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column mt-3"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex,
      }"
    >
      <div class="flex items-center mb-2 font-bold text-xl p-1">
        <input
          type="text"
          :value="column.name"
          @change="updateColumn($event, column, 'name')"
          class="
            rounded
            hover:bg-grey
            focus:outline-none
            font-bold
            w-full
            flex-no-shrink
            border-b border-gray
            p-1
            text-2xl
            bg-transparent
          "
        />
      </div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :taskIndex="$taskIndex"
          :columnIndex="columnIndex"
          :column="column"
          :task="task"
          :board="board"
        />
        <input
          type="text"
          class="
            block
            p-2
            w-full
            bg-transparent
            hover:bg-grey
            rounded
            focus:outline-none
          "
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from "./ColumnTask";
import moveTaskOrColumn from "@/mixins/moveTaskOrColumn.js";
import AppDrag from "./AppDrag.vue";
import AppDrop from "./AppDrop.vue";

export default {
  mixins: [moveTaskOrColumn],
  components: { ColumnTask, AppDrag, AppDrop },

  methods: {
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "column");
    },
    updateColumn(e, column, key) {
      this.$store.commit("UPDATE_COLUMN", {
        column,
        key,
        value: e.target.value,
      });
      e.target.blur();
    },
    createTask(e, tasks) {
      if (e.target.value) {
        this.$store.commit("ADD_TASK", { tasks: tasks, name: e.target.value });
        e.target.value = "";
      }
    },
  },
};
</script>

<style>
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>