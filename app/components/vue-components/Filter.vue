<template>
  <div class="filter">
    <input class="filter__input" type="text" v-model="searchString" />
    <button class="filter__clear-btn" @click="handleClear">Clear</button>
  </div>
</template>
<script>
export default {
  name: "SearchComponent",
  props: ["employees", "filterQueryString"],
  data() {
    return {
      searchString: "",
      originalEmployees: null,
    };
  },
  watch: {
    employees(newVal) {
      if (this.originalEmployees === null) {
        // set originalEmployees to the inital value of the employees prop
        this.originalEmployees = JSON.parse(JSON.stringify(newVal));
        if (!this.searchString) {
          this.searchString = this.filterQueryString;
        }
      }
    },
    searchString(term) {
      //   this.$emit('search', val)
      this.handleSearchString(term);
    },
  },
  methods: {
    handleSearchString(term) {
      const deepCloneEmpolyees = JSON.parse(JSON.stringify(this.originalEmployees));
      const filterEmpolyees = deepCloneEmpolyees.map((employee) => {
        employee.profile.address = employee.profile.address.replace(
          new RegExp(term, "gi"),
          (match) => `<mark>${match}</mark>`
        );
        employee.profile.name = employee.profile.name.replace(
          new RegExp(term, "gi"),
          (match) => `<mark>${match}</mark>`
        );
        employee.profile.about = employee.profile.about.replace(
          new RegExp(term, "gi"),
          (match) => `<mark>${match}</mark>`
        );
        return employee;
      });
      this.$emit("filter", filterEmpolyees, term);
    },
    handleClear() {
      this.searchString = "";
    },
  },
};
</script>