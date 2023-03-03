<template>
<v-table>
    <thead>
      <tr>
        <th></th>
        <th class="text-left">
          Country
        </th>
        <th class="text-left">
         Calling Code
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item,index) in pays"
        :key="item.name"
      >
      <td>{{index}}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.callingCodes[0] }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { countries } from "../js/countries.js"; 
export default {
  name: "ExerCice2",
  data(){return{
     pays: countries
  } 
}
}
</script>

<style scoped>
.mdl-card{
  min-height: 70px ;
}
</style>