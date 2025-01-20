<template>
    <div class="card generic-card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <slot name="title">
          <h5 class="mb-0">{{ title }}</h5>
        </slot>
        <button
          v-if="showNewButton"
          class="btn btn-sm btn-primary"
          @click="$emit('newItem')"
        >
          <i class="fas fa-plus"></i> Novo
        </button>
      </div>
      <div class="card-body">
        <slot name="content">
          <p class="text-muted">Sem conteúdo disponível.</p>
        </slot>
      </div>
      <div class="card-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "GenericCard",
    props: {
      title: {
        type: String,
        required: false,
      },
      showNewButton: {
        type: Boolean,
        default: true,
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  