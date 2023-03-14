<script lang="ts">
import Airports from "../../../components/directory/airport/Airports.vue";


export default {
  name: "Tabs",
  components: {
    Airports

  },
  data() {
    return {
      currentTab: "Airports",
      isLoading: true,
    };
  },
  mounted() {
    // Simulate loading delay for demonstration purposes
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
};
</script>

<template>
  <Airports />
</template>
