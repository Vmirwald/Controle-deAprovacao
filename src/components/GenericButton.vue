<template>
  <button
    :class="['btn', btnClass]"
    @click="handleClick"
  >
    <i v-if="iconClass" :class="iconClass"></i>
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'GenericButton',
  props: {
    label: {
      type: String,
      required: false, // Permite que o label seja opcional
      default: '',
    },
    action: {
      type: String,
      required: false, // Permite que o action seja opcional
      default: null,
    },
    iconClass: {
      type: String,
      required: false,
      default: '',
    },
    btnClass: {
      type: String,
      required: false,
      default: 'btn-primary', // Classe padrão
    },
  },
  methods: {
    handleClick() {
      // Verifica se a ação está definida antes de manipulá-la
      if (this.action && typeof this.action === 'string') {
        this.$emit(this.action.toLowerCase());
      } else {
        console.warn('Nenhuma ação definida para este botão.');
      }
    },
  },
};
</script>

<style scoped>
button {
  margin: 0.5rem;
}
</style>
