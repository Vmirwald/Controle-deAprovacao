<template>
    <div class="custom-navbar">
      <ul class="nav nav-tabs">
        <li
          v-for="item in items"
          :key="item.id"
          class="nav-item"
        >
          <button
            class="nav-link"
            :class="{ active: activeItem === item.id, disabled: item.disabled }"
            @click="selectItem(item)"
          >
            <i :class="item.icon" class="me-2"></i>
            {{ item.label }}
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "CustomNavbar",
    props: {
      items: {
        type: Array,
        required: true,
      },
      activeItem: {
        type: String,
        required: true,
      },
    },
    methods: {
      selectItem(item) {
        if (!item.disabled) {
          this.$emit("select", item.id);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-navbar {
    margin-top: 10px;
  }
  .nav-tabs {
    border-bottom: 1px solid #dee2e6;
  }
  .nav-link {
    cursor: pointer;
  }
  .nav-link.active {
    background-color: #0d6efd;
    color: white;
    border-color: #dee2e6 #dee2e6 #fff;
  }
  .nav-link.disabled {
    color: #6c757d;
    cursor: not-allowed;
  }
  </style>
  