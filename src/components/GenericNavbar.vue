<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- Navbar Esquerdo -->
        <ul class="navbar-nav me-auto" v-if="isLoggedIn">
          <li v-for="(item, index) in leftMenuItems" :key="index" class="nav-item">
            <RouterLink 
              :to="item.to" 
              class="nav-link" 
              :class="{ active: isActive(item.to) }">
              <i :class="item.icon"></i> {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <!-- Navbar Direito (Apenas se logado) -->
        <ul class="navbar-nav ms-auto" v-if="isLoggedIn">
          <li v-for="(item, index) in filteredRightMenuItems" :key="index" class="nav-item">
            <RouterLink v-if="item.to" :to="item.to" class="nav-link" @click="item.action ? item.action() : ''">
              <i :class="item.icon"></i> {{ item.label }}
            </RouterLink>
            <a v-else class="nav-link" href="#" @click.prevent="item.action ? item.action() : ''">
              <i :class="item.icon"></i> {{ item.label }}
            </a>
          </li>
          <!-- Dropdown para itens com subitems -->
          <li v-for="(item, index) in filteredRightMenuDropdownItems" :key="index" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i :class="item.icon"></i> {{ item.label }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end custom-dropdown">
              <li class="dropdown-header">
                <strong>{{ user.name }}</strong><br>
                {{ selectedEmpresa.name }} - {{ selectedEmpresa.unidade }}
              </li>
              <li><hr class="dropdown-divider"></li>
              <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex">
                <RouterLink v-if="subItem.to" :to="subItem.to" class="dropdown-item">{{ subItem.label }}</RouterLink>
                <a v-else class="dropdown-item" href="#" @click.prevent="subItem.action ? subItem.action() : ''">
                  {{ subItem.label }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    leftMenuItems: {
      type: Array,
      default: () => []
    },
    rightMenuItems: {
      type: Array,
      default: () => []
    },
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => ({ name: 'User' })
    },
    selectedEmpresa: {
      type: Object,
      default: () => ({ name: 'Empresa', unidade: 'Filial' })
    }
  },
  computed: {
    filteredRightMenuItems() {
      // Retorna apenas os itens que não são dropdowns
      return this.rightMenuItems.filter(item => !item.type);
    },
    filteredRightMenuDropdownItems() {
      // Retorna apenas os itens que são dropdowns
      return this.rightMenuItems.filter(item => item.type === 'dropdown');
    }
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    }
  }
};
</script>

<style scoped>
.custom-navbar {
  background-color: #333;
}

.custom-navbar-brand,
.nav-link {
  color: #f4f4f4;
}

.nav-link:hover {
  color: #e0e0e0;
  background-color: #555;
  border-radius: 5px;
}

.nav-link.active {
  background-color: #555;
  color: #fff;
  border-radius: 5px;
}

.navbar-toggler {
  border-color: #e0e0e0;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}
</style>
