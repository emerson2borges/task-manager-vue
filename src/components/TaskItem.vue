<template>
  <div class="task-item">
    <input
      type="checkbox"
      :checked="task.done"
      @change="$emit('toggle-done')"
    />
    <div>
      <p><strong>{{ task.title }}</strong></p>
      <p>{{ task.description }}</p>
    </div>

    <div>
      <button @click="$emit('edit-task', task.id)">Editar</button>
      <button @click="$emit('delete-task', task.id)">Excluir</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
  .task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background: #f9f9f9;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
