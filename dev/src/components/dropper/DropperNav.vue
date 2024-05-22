<template>
  <div class="dropper flex-all" ref="dropper">
    <div class="dropper-selected" @click="toggleDropdown">
      <a>{{ selectedOption ? selectedOption.label : 'Select a page' }}</a>
    </div>
    <transition name="dropdown">
      <div v-if="isOpen" class="dropper-menu">
        <a
          v-for="option in reorderedOptions"
          :key="option.value"
          @click="navigateTo(option.value)"
          class="dropper-item"
        >
          {{ option.label }}
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
import { watch } from 'vue'
export default {
  name: 'DropperNav',
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      selectedOption: null
    }
  },
  mounted() {
    this.setSelectedOptionByRoute(this.$route.path)
    watch(
      () => this.$route.path,
      (newPath) => {
        this.setSelectedOptionByRoute(newPath)
      }
    )
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  computed: {
    reorderedOptions() {
      if (!this.selectedOption) return this.options
      const remainingOptions = this.options.filter((option) => option != this.selectedOption)
      return remainingOptions
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    handleClickOutside(event) {
      if (this.$refs.dropper && !this.$refs.dropper.contains(event.target)) {
        this.isOpen = false
      }
    },
    navigateTo(route) {
      const targetRoute = this.options.find((option) => option.value === route)
      if (targetRoute) {
        this.selectedOption = targetRoute
        this.$router.push(targetRoute.value)
        this.isOpen = false
      }
    },
    setSelectedOptionByRoute(routePath) {
      const matchedOption = this.options.find((option) => option.value === routePath)
      if (matchedOption) {
        this.selectedOption = matchedOption
      } else {
        this.selectedOption = this.options[0]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.dropper {
  display: inline-flex;
  position: relative;
  border: none;
  z-index: 1;

  a {
    padding: 0 0.5rem;
    color: burlywood;
    // color: var(--ds-accent);
    font-size: 3rem;
    text-transform: capitalize;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    opacity: 1;
  }

  .dropper-menu {
    display: flex;
    gap: 0.5rem;
    padding: 0 0.5rem;
    background-color: #e8e6e2;
    // background-color: var(--ds-muted);

    .dropper-item {
      opacity: 0.75;

      &:hover {
        opacity: 1;
      }
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateX(0);
}

@media screen and (max-width: 768px) {
  .dropper {
    flex: 1 0 0%;
    overflow: auto;

    a {
      font-size: 1.5rem;
    }

    .dropper-menu {
      padding: 0;

      .dropper-item {
        padding: 0;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
