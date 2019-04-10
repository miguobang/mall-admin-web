<template> 
  <user-update :isEdit="true"></user-update>
</template>
<script>
  import UserUpdate from './components/UserUpdate'
  export default {
    name: 'updateUser',
    components: { UserUpdate }
  }
</script>
<style></style>


