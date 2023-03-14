<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const currentTime = ref(new Date());
    const isUtc = ref(false);

    setInterval(() => {
      currentTime.value = new Date();
    }, 1000);

    const displayTime = computed(() => {
      const time = isUtc.value
        ? currentTime.value.getUTCHours()
        : currentTime.value.getHours();
      const paddedTime = time.toString().padStart(2, "0");
      return `${paddedTime}:${currentTime.value
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${currentTime.value
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
    });

    const toggleUtc = () => {
      isUtc.value = !isUtc.value;
    };

    return {
      currentTime,
      isUtc,
      displayTime,
      toggleUtc,
    };
  },
});
</script>

<template>
  <div class="flex items-center space-x-2">
    <div class="font-mono text-bold text-accent text-sm">
      {{ displayTime }}
    </div>
    <div>
      <button class="btn btn-sm btn-ghost" aria-pressed="true" @click="toggleUtc">
        <span class="text-bold text-sm text-pink-500">{{ isUtc ? "Local Time" : "UTC" }}</span>
      </button>
    </div>
  </div>
</template>
