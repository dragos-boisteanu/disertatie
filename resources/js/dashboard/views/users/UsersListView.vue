<template>
   <ViewContainer>
       <template slot="header">
           Users List
       </template>

      <ul class="">
          <li>
              user 1
          </li>
           <li>
              user 2
          </li>
           <li>
              user 3
          </li>
      </ul>
   </ViewContainer>
</template>

<script>
    import ViewContainer from '../ViewContainer';

    export default {
        components: {
            ViewContainer
        }
    }
</script>