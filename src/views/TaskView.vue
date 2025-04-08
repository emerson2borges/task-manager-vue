<template>
    <div>
      <h1>Gerenciar Tarefas</h1>
        <!-- Formulário para adicionar nova tarefa -->
        <form @submit.prevent="addTask" v-if="!editingTask">
            <input type="text" v-model="newTaskTitle" placeholder="Título da tarefa" required />
            <input type="text" v-model="newTaskDescription" placeholder="Descrição da tarefa" required />
            <button type="submit">Adicionar</button>
            <button type="button" @click="clearForm">Limpar</button>
        </form>

        <!-- Formulário para editar tarefa -->
        <form @submit.prevent="saveEditedTask" v-else>
            <input type="text" v-model="editingTask.title" placeholder="Título da tarefa" required />
            <input type="text" v-model="editingTask.description" placeholder="Descrição da tarefa" required />
            <button type="submit">Salvar Alterações</button>
            <button type="button" @click="cancelEditing">Cancelar</button>
        </form>

        <!-- Listagem de tarefas -->
        <div v-for="task in tasks" :key="task.id">
            <TaskItem
                :task="task"
                @edit-task="editTask(task)"
                @delete-task="deleteTask(task.id)"
                @toggle-done="toggleTaskDone(task.id)"
            />
        </div>
    </div>
  </template>
  
<script>
  import TaskItem from '../components/TaskItem.vue';
  import axios from 'axios'; // Importa o Axios configurado
  
  export default {
    components: { TaskItem },
    data() {
        return {
            tasks: [],
            newTaskTitle: '',
            newTaskDescription: '',
            editingTask: null, // Tarefa que está sendo editada
        };
    },
    methods: {
        async fetchTasks() {
            try {
                const response = await axios.get('/tasks');
                console.log('Tarefas retornadas:', response.data);

                // Verificar se response.data é realmente um array
                if (Array.isArray(response.data)) {
                    this.tasks = response.data;
                } else {
                    console.error('Erro: dados retornados não são um array:', response.data);
                    this.tasks = []; // Evita problemas se os dados forem inválidos
                }
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
                this.tasks = []; // Garante que tasks permaneça um array
            }
        },
        async addTask() {
            try {
                const newTask = {
                    title: this.newTaskTitle,
                    description: this.newTaskDescription,
                    done: false,
                };
                const response = await axios.post('/tasks', newTask); // Envia a nova tarefa para o servidor
                this.tasks.push(response.data.task); // Adiciona a nova tarefa na lista de tarefas
                this.clearForm(); // Chama o método para limpar os campos
            } catch (error) {
                console.error('Erro ao adicionar tarefa:', error);
            }
        },
        async editTask(task) {
            this.editingTask = { ...task }; // Clona a tarefa para edição
        },
        async saveEditedTask() {
            try {
                // Faz a requisição para atualizar os dados no backend
                const response = await axios.put(`/tasks/${this.editingTask.id}`, this.editingTask);

                // Atualiza os dados da tarefa no array com o retorno do backend
                const index = this.tasks.findIndex((t) => t.id === response.data.task.id);
                if (index !== -1) {
                    this.tasks.splice(index, 1, response.data.task); // Atualiza a tarefa
                }

                // Reseta o modo de edição
                this.editingTask = null;
            } catch (error) {
                console.error('Erro ao salvar a tarefa editada:', error);
            }

        },
        async deleteTask(taskId) {
            try {
                await axios.delete(`/tasks/${taskId}`); // Envia a requisição para excluir a tarefa no servidor
                this.tasks = this.tasks.filter((task) => task.id !== taskId);
            } catch (error) {
                console.error('Erro ao excluir tarefa:', error);
            }
        },
        clearForm() {
            // Método para limpar os campos do formulário
            this.newTaskTitle = '';
            this.newTaskDescription = '';
        },
        async toggleTaskDone(taskId) {
            try {
                // Garantir que this.tasks é um array
                if (!Array.isArray(this.tasks)) {
                throw new Error('this.tasks não é um array válido');
                }

                const task = this.tasks.find((t) => t.id === taskId);
                if (!task) {
                console.error('Tarefa não encontrada');
                return;
                }

                // Alternar o status de "done"
                const updatedTask = { ...task, done: !task.done };

                // Atualizar no backend
                const response = await axios.put(`/tasks/${taskId}`, updatedTask);

                // Atualizar no frontend
                const index = this.tasks.findIndex((t) => t.id === taskId);
                if (index !== -1) {
                this.tasks.splice(index, 1, response.data.task);
                }
            } catch (error) {
                console.error('Erro ao atualizar o status da tarefa:', error);
            }
            }


    },
    mounted() {
        this.fetchTasks(); // Busca as tarefas ao carregar o componente
  },

  };
</script>

<style scoped>
    .task-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f9f9f9;
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
    }

    form {
        margin-bottom: 20px;
    }

    input {
        margin-right: 10px;
        padding: 5px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    button {
        margin-left: 5px;
        padding: 5px 10px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    button:hover {
        background-color: #d1d1d1;
    }
</style>