<template> 
  <user-add :isEdit="false"></user-add>
</template>
<script>
  import UserAdd from './components/UserAdd'
  export default {
    name: 'addUser',
    components: { UserAdd }
  }
</script>
<style></style>


