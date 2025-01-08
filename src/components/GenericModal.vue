<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <h5 class="modal-title">{{ title }}</h5>
      <button class="close-button" @click="closeModal">X</button>
      <ul class="modal-content">
        <li v-for="(item, index) in details" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenericModal",
  props: {
    title: {
      type: String,
      default: "",
    },
    details: {
      type: Array,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Garante que o modal estará acima de todos os outros elementos */
}

.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.modal-content {
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
}
</style>
