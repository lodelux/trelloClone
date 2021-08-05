<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input @click.prevent @change="updateTask($event,task,'name')" @keyup.enter="updateTask($event,task, 'name')" type="text" :value="task.name" class="focus:outline-none font-bold w-full flex-no-shrink border-b border-gray pb-1 text-2xl"></input>
      <textarea @click.prevent @change="updateTask($event,task, 'description')" class=" relative h-64 mt-2 px-2 leading-normal  w-full flex-no-shrink  focus:outline-none">{{task.description}}</textarea>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    task() {
      return this.$store.getters.getTask(this.$route.params.id);
    },
  },
  methods: {
    updateTask(e, task, key) {
      this.$store.commit("UPDATE_TASK", {
        task,
        key: key,
        value: e.target.value,
      });
      e.target.blur()
    },
  },
};
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
