<template>
  <!-- SEO Head -->
  <Head>
    <title>Best Schools Ranking in Indonesia 2025</title>
    <meta
      name="description"
      content="Discover the top-ranked schools in Indonesia based on education ministry data and student reviews. Compare over 5,000 schools across all education levels."
    />
  </Head>

  <div class="min-h-screen">
    <!-- Main Ranking Component -->
    <RankingIndex />
  </div>
</template>

<script setup>
// Import the main ranking component
import RankingIndex from "~/components/ranking/index.vue";

// SEO and meta configuration
useHead({
  title: "Best Schools Ranking in Indonesia 2025",
  meta: [
    {
      name: "description",
      content:
        "Discover the top-ranked schools in Indonesia based on education ministry data and student reviews. Compare over 5,000 schools across all education levels.",
    },
    { property: "og:title", content: "Best Schools Ranking in Indonesia 2025" },
    {
      property: "og:description",
      content: "The most comprehensive school ranking in Indonesia",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>

<style scoped>
/* Any page-specific styles can go here */
</style>
