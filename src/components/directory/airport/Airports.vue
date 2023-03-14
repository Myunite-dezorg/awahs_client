<script lang="ts">
import { ref } from "vue";
import axios from "axios";
import Stats from "./AirportsStats.vue";

// import GET_AIRLINES from "./queries/airlines.gql";

interface Filters {
  codeIataAirport?: string;
  codeIcaoAirport?: string;
  codeIso2Country?: string;
}

interface Airport {
  id: string;
  gmt: string;
  codeIataAirport: string;
  codeIcaoAirport: number;
  codeIataCity: string;
  codeIso2Country: number;
  latitudeAirport: number;
  longitudeAirport: string;
  nameAirport: string;
  nameCountry: string;
  phone: string;
  timezone: string;

}

export default {
  components: {
    Stats,
  },
  setup() {
    const filters = ref<Filters>({});
    const airports = ref<Airport[]>([]);
    const loading = ref(false);

    const search = async () => {
      loading.value = true;
      const response = await axios.post("http://127.0.0.1:8000/graphql", {
        query: `
          query($codeIataAirport: String, $codeIcaoAirport: String, $codeIso2Country: String) {
            airports(
              codeIataAirport: $codeIataAirport,
              codeIcaoAirport: $codeIcaoAirport,
              codeIso2Country: $codeIso2Country,
              ) {
              edges{
                node{
                  id
                  codeIataAirport
                  codeIcaoAirport
                  codeIataCity
                  codeIso2Country
                  latitudeAirport
                  longitudeAirport
                  nameAirport
                  nameCountry
                  phone
                  timezone
                }
              }
            }
          }
        `,
        // variables: filters.value,
        variables: {
          codeIataAirport: filters.value.codeIataAirport?.toUpperCase(),
          codeIcaoAirport: filters.value.codeIcaoAirport?.toUpperCase(),
          codeIso2Country: filters.value.codeIso2Country?.toUpperCase(),
        },
      });
      loading.value = false;
      airports.value = response.data.data.airports.edges.map(
        (edge: any) => edge.node,
      );
    };
    watch(
      filters,
      (newFilters, oldFilters) => {
        // Only search if the filters have changed and are not empty
        if (
          JSON.stringify(newFilters) !== JSON.stringify(oldFilters)
          || Object.keys(newFilters).length === 0
        ) {
          search();
        }
      },
      { deep: true },
    );
    // Load the initial data
    search();

    return { filters, airports, loading, search };
  },
};
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-col sm:flex-row">
      <div class="sm:w-1/2">
        <div class="card w-96 bg-base-100 shadow-sm">
          <div class="card-body">
            <div class="flex-1">
              <input
                v-model="filters.codeIataAirport"
                type="text"
                class="input-bordered input w-full max-w-xs"
                placeholder="Iata"
              >
            </div>
            <div class="flex-1">
              <input
                v-model="filters.codeIcaoAirport"
                type="text"
                class="input-bordered input w-full max-w-xs"
                placeholder="Icao"
              >
            </div>
            <div class="flex-1">
              <input
                v-model="filters.codeIso2Country"
                type="text"
                class="input-bordered input w-full max-w-xs"
                placeholder="Country Code"
              >
            </div>
            <div>
              <button class="btn-active btn" @click="search">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="sm:w-1/4">
        <Stats />
      </div>
    </div>
      <div
        class="mb-3 pt-4 text-center text-lg transition-all duration-200 md:text-xl"
      >
        <span class="text-accent">A<span class="text-light uppercase">irports </span></span>
        <span class="text-bold text-base-content">C<span class="text-bold uppercase">odes</span></span>
      </div>
      <table class="table-bordered table-hover table w-full table-auto">
        <thead>
          <tr>
            <th>gmt</th>
            <th>codeIataAirport</th>
            <th>codeIcaoAirport</th>
            <th>codeIataCity</th>
            <th>codeIso2Country</th>
            <th>nameAirport</th>
            <th>nameCountry</th>
            <th>phone</th>
            <th>Time Zone</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!loading && airports.length === 0">
            <td colspan="4" class="text-center">
              No airports found.
            </td>
          </tr>
          <tr v-for="i in airports" :key="i.id" class="hover space-x-3">
            <td>{{ i.gmt }}</td>
            <td>{{ i.codeIataAirport }}</td>
            <td class="text-accent">
              {{ i.codeIcaoAirport }}
            </td>
            <td>{{ i.codeIataCity }}</td>
            <td>{{ i.codeIso2Country }}</td>
            <td>{{ i.nameAirport }}</td>
            <td>{{ i.nameCountry }}</td>
            <td>{{ i.phone }}</td>
            <td>{{ i.timezone }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>
