<template>
  <div class="dropper" ref="dropper">
    <div class="dropper-selected" @click="toggleDropdown">
      <a>{{ selectedOption ? selectedOption.label : 'Select a page' }}</a>
    </div>
    <transition name="dropdown">
      <ul v-if="isOpen" class="dropper-menu">
        <li
          v-for="option in reorderedOptions"
          :key="option.value"
          @click="navigateTo(option.value)"
          class="dropper-item"
        >
          {{ option.label }}
        </li>
      </ul>
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
  background: none;
  appearance: none;

  a {
    padding: 0 0.5rem;
    color: burlywood;
    font-size: 3rem;
    text-transform: capitalize;
    cursor: pointer;
    opacity: 1;
  }

  &:focus,
  &:active {
    outline: none;
  }

  .dropper-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-left: -15px;
    margin-right: -15px;
    padding: 0 15px;
    background-color: rgba(0, 0, 0, 0.05);
    list-style-type: none;
    z-index: 1000;

    .dropper-item {
      padding: 0 0.5rem;
      color: burlywood;
      font-size: 3rem;
      text-transform: capitalize;
      cursor: pointer;
      transition: all .3s ease-in-out;
      opacity: .75;

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
  transform: translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@media screen and (max-width: 768px) {
  .dropper {
    a {
      font-size: 1.5rem;
    }

    .dropper-menu {
      .dropper-item {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
