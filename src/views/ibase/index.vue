<script lang="ts">
import { ContentLoader } from "vue-content-loader";
import Msgcodes from "../../components/ibase/codes/MsgCodes.vue";
import Airlines from "../../components/ibase/codes/Airlines.vue";

export default {
  name: "Tabs",
  components: {
    Msgcodes,
    Airlines,

  },
  data() {
    return {
      currentTab: "Msgcodes",
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
  <Suspense>
    <template #default>
      <div class="justify-center">
        <div class="card card-bordered">
          <div class="card-body">
            <div class="tabs">
              <ul>
                <li class="tab tab-lifted tab-active" :class="{ active: currentTab === 'Msgcodes' }" @click="currentTab = 'Msgcodes'">
                  Messages
                </li>
                <li class="tab" :class="{ active: currentTab === 'Airlines' }" @click="currentTab = 'Airlines'">
                  Airlines
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Component :is="currentTab" v-if="!isLoading" />
      </div>
      </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
