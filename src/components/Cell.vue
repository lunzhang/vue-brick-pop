<template>
  <div class="cell" v-bind:style="{ backgroundColor: this.color}"></div>
</template>

<script>
export default {
  name: 'Cell',
  props: ['color'],
  created() {
    console.log(this.color);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell {
  width: 25px;
  height: 25px;
  display: inline-block;
  margin: 1px;
  border-radius: 5px;
}
</style>
