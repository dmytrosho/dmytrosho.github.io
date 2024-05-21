<template>
  <div class="dropper" ref="dropper">
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
    position: absolute;
    top: 0;
    left: 100%;
    padding: 0 0.5rem;
    background-color: #e8e6e2;
    // background-color: var(--ds-muted);
    list-style-type: none;

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

.dropdown-enter-active .dropper-item:nth-child(1) {
  transition-delay: 1s;
}

.dropdown-enter-active .dropper-item:nth-child(2) {
  transition-delay: 2s;
}

.dropdown-enter-active .dropper-item:nth-child(3) {
  transition-delay: 3s;
}

@media screen and (max-width: 768px) {
  .dropper {
    a {
      font-size: 1.5rem;
    }

    .dropper-menu {
      flex-direction: column;
      top: 100%;
      left: 0;
      margin-left: -1rem;
      margin-right: -1rem;
      border-radius: 0 0 1rem 1rem;

      .dropper-item {
        font-size: 1.5rem;
      }
    }
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  .dropdown-enter-to,
  .dropdown-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
