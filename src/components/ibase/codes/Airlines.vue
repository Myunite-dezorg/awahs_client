<script lang="ts">
import { ref } from "vue";

// import GET_AIRLINES from "./queries/airlines.gql";
import axios from "axios";

interface Filters {
  codeIataAirline?: string;
  codeIcaoAirline?: string;
  iataPrefixAccounting?: number;
}

interface Airline {
  id: string;
  callsign: string;
  codeHub: string;
  founding: number;
  nameAirline: string;
  iataPrefixAccounting: number;
  sizeAirline: number;
  codeIso2Country: string;
  codeIataAirline: string;
  codeIcaoAirline: string;
  nameCountry: string;
  ageFleet: number;
  statusAirline: string;
  type: string;
  arlLogo: string;
}

export default {
  setup() {
    const filters = ref<Filters>({});
    const airlines = ref<Airline[]>([]);
    const loading = ref(false);

    const search = async () => {
      loading.value = true;
      const response = await axios.post("http://127.0.0.1:8000/graphql", {
        query: `
          query($codeIataAirline: String, $codeIcaoAirline: String) {
            airlines(
              codeIataAirline: $codeIataAirline,
              codeIcaoAirline: $codeIcaoAirline,
            ) {
              edges{
                node{
                  id
                  callsign
                  codeHub
                  founding
                  sizeAirline
                  nameAirline
                  codeIso2Country
                  codeIataAirline
                  codeIcaoAirline
                  nameCountry
                  iataPrefixAccounting
                  ageFleet
                  statusAirline
                  type
                  arlLogo
                }
              }
            }
          }
        `,
        // variables: filters.value,
        variables: {
          codeIataAirline: filters.value.codeIataAirline?.toUpperCase(),
          codeIcaoAirline: filters.value.codeIcaoAirline?.toUpperCase(),
        },
      });
      loading.value = false;
      airlines.value = response.data.data.airlines.edges.map(
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

    return { filters, airlines, loading, search };
  },
};
</script>

<template>
  <div class="justify content-center">
    <div class="card w-56 bg-base-100 shadow-sm">

      <div class="card-body" pt-4>
        
          <div class="flex-auto">
            <label class="input-group-md input-group">
              <span class="text-sm">CODE</span>
              <input
                v-model="filters.codeIataAirline"
                type="text"
                class="input input-md"
                placeholder="Iata"
              >
            </label>
          </div>
          <div class="flex-auto">
            <label class="input-group-md input-group">
              <span class="text-sm">CODE</span>
              <input
                v-model="filters.codeIcaoAirline"
                type="text"
                class="input input-md"
                placeholder="Icao"
              >
            </label>
          </div>
  

        <div>
          <button class="btn-active btn" @click="search">
            Search
          </button>
        </div>
      </div>
    </div>
    <div
      class="mb-3 pt-4 text-center text-lg transition-all duration-200 md:text-xl"
    >
      <span class="text-accent">A<span class="text-light uppercase">irlines </span></span>
      <span class="text-bold text-base-content">C<span class="text-bold uppercase">odes</span></span>
    </div>
    <table class="table-bordered table-hover table w-full table-auto">
      <thead>
        <tr>
          <th>Airline</th>
          <th>Icao</th>
          <th>Iata</th>
          <th>Callsign</th>
          <th>Founding</th>
          <th>Size Airline</th>
          <th>codeIso2Country</th>
          <th>Iata Prefix Accounting</th>
          <th>Age Fleet</th>
          <th>Status Airline</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!loading && airlines.length === 0">
          <td colspan="4" class="text-center">
            No airlines found.
          </td>
        </tr>
        <tr v-for="i in airlines" :key="i.id" class="hover space-x-3">
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img :src="i.arlLogo" alt="">
                </div>
              </div>
              <div>
                <div class="text-base font-bold">
                  {{ i.nameAirline }}
                </div>
                <div class="text-sm opacity-50">
                  {{ i.nameCountry }}
                </div>
              </div>
            </div>
          </td>
          <td>{{ i.codeIcaoAirline }}</td>
          <td class="text-accent">
            {{ i.codeIataAirline }}
          </td>
          <td>{{ i.callsign }}</td>
          <td>{{ i.founding }}</td>
          <td>{{ i.sizeAirline }}</td>
          <td>{{ i.codeIso2Country }}</td>
          <td>{{ i.iataPrefixAccounting }}</td>
          <td>{{ i.codeHub }}</td>
          <td>{{ i.ageFleet }}</td>
          <td>{{ i.statusAirline }}</td>
          <td>{{ i.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<!-- <template>
  <h1 class="mb-4 text-2xl">
    Airlines
  </h1>
  <div class="mb-4 flex">
    <div class="relative w-full">
      <input
        v-model="searchQuery"
        class="input input-bordered w-full pr-10"
        type="text"
        placeholder="Search..."
      >
      <button
        class="btn btn-primary absolute top-0 right-0 rounded-l-none"
        @click="search()"
      >
        Search
      </button>
    </div>
  </div>
  <div class="overflow-x-auto">
    <div
      class="mb-3 pt-4 text-center text-lg transition-all duration-200 md:text-xl"
    >
      <span class="text-accent">A<span class="text-light uppercase">irlines </span></span>
      <span class="text-base-content text-bold">C<span class="text-bold uppercase">odes</span></span>
    </div>
    <table class="table w-full table-auto">
      <thead>
        <tr>
          <th>Airline</th>
          <th class="hidden md:table-cell">
            Iata
          </th>
          <th class="hidden md:table-cell">
            Icao
          </th>
          <th class="hidden md:table-cell">
            English
          </th>
          <th class="hidden md:table-cell">
            Russian
          </th>
        </tr>
      </thead>
      <p v-if="error" class="text-center font-light text-slate-500">
        Something went wrong...
      </p>
      <p v-if="loading" class="text-center font-light text-pink-500">
        <button type="button" class="... bg-indigo-500" disabled>
          <svg class="... mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
            https://icons8.com/icon/J18pPgWKQBRT/spinning-circle
          </svg>
          Processing...
        </button>
      </p>
      <tbody>
        <tr v-for="airline in filteredAirlines" :key="airline.id" class="hover space-x-3">
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img :src="airline.arlLogo" alt="">
                </div>
              </div>
              <div>
                <div class="font-bold">
                  {{ airline.commentEng }}
                </div>
                <div class="text-sm opacity-50">
                  {{ airline.country }}
                </div>
              </div>
            </div>
          </td>
          <td class="text-accent hidden md:table-cell">
            {{ airline.iata }}
          </td>
          <td class="hidden md:table-cell">
            {{ airline.icao }}
          </td>
          <td class="hidden md:table-cell">
            {{ airline.commentEng }}
          </td>
          <td class="hidden md:table-cell">
            {{ airline.commentRus }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template> -->

<style>
.your-class input{
  float:left;
}
</style>
