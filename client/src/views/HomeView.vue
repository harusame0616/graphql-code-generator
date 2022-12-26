<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { graphql } from "../gql/gql";

const getBooks = graphql(`
  query getBooks {
    books {
      bookId
      title
    }
  }
`);

const { result } = useQuery(getBooks);

const isLoading = computed(() => !result.value);
const books = computed(() => result.value?.books);
</script>

<template>
  <main>
    <div v-if="isLoading">is loading...</div>
    <div v-else>
      <div v-for="book of books" :key="book?.bookId">
        {{ book?.title }}
      </div>
    </div>
  </main>
</template>
