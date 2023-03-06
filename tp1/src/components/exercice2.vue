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
          <fieldset>
            <legend>Editor</legend>
            <div class="form-group">

                <select v-model="selectCountry" class="form-control custom-select"  >
                    
                    <option v-bind:value="fc"  v-for="fc in pays" :key="fc.name" >
                        {{fc.name}}
                    </option>
                   
                </select>
                <input type="text" v-bind:value="selectCountry.callingCodes">
            </div>

        </fieldset>
</template>

<script>
import { countries } from "../js/countries.js"; 
export default {
  name: "ExerCice2",
  data(){return{
     pays: countries,
      selectCountry: {}
  } 
}
}
</script>

<style scoped>
.mdl-card{
  min-height: 70px ;
}
</style>