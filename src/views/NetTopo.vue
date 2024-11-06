<template>
  <div class="topo-back">
    <ToPo></ToPo>
  </div>
</template>

<script>
import ToPo from "../components/ToPo.vue";
export default {
  props: ["all_url"],
  components: {
    ToPo,
  },
};
</script>

<style scoped>
/* .topo-back {
  background-size: cover;
  background-image: url("../photo/cd_map.png");
} */
</style>
