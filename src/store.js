import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils.js'

Vue.use(Vuex)

// localStorage.clear()
const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {
    ADD_TASK(state, { tasks, name }) {
      tasks.push({
        name: name,
        description: '',
        id: uuid(),
        userAssigned: null
      })
    },
    ADD_COLUMN(state, {name}) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
    UPDATE_COLUMN(state, {column, key,value}) {
      Vue.set(column,key,value)
    },
    UPDATE_TASK(state, { task, key, value }) {
      Vue.set(task, key, value)
    },
    MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex,toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex,0,taskToMove)
    },
    MOVE_COLUMN(state, {fromColumnIndex, toColumnIndex}) {
      const columns = state.board.columns
      const columnToMove = columns.splice(fromColumnIndex,1)[0]
      columns.splice(toColumnIndex,0,columnToMove)
    }
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  }
})