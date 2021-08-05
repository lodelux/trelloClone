<template>
  <div class="board">
    <div class="flex flex-row items-start flex-wrap">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />
      <div class="column mt-3 flex">
        <input
          class=" p-2 mr-2 flex-grow bg-transparent focus:outline-none hover:bg-grey rounded "
          placeholder="+ Enter new Column Name"
          v-model="newColumnName"
          @change="createColumn"
        />
      </div>
    </div>
    <div class="task-bg" v-if="isTaskOpen" @click.self="goToBoard">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BoardColumn from "../components/BoardColumn.vue";
import AppButton from "../components/AppButton.vue";
export default {
  components: { BoardColumn, AppButton },
  data() {
    return {
      newColumnName: "",
    };
  },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name == "task";
    },
  },
  methods: {
    goToBoard() {
      this.$router.push({ name: "board" });
    },
    createColumn() {
      this.$store.commit("ADD_COLUMN", { name: this.newColumnName });
      this.newColumnName = "";
    },
  },
};
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
  cursor: pointer;
}

.board {
  @apply p-4  h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
