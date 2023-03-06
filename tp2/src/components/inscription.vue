<template>
<v-card
    class="mx-auto"
    max-width="344"
    title="User Registration">
   <v-container>
    <v-form ref="form">
      <v-text-field
        v-model="login"
        placeholder="saisissez le login"
        :counter="10"
        :rules="loginRules"
        label="Login"
        required
      ></v-text-field>
      <v-text-field
      label="Password"
      type="password"
      v-model="pwd"
      :counter="10"
      :rules="pwdRules"
      hint="Entrez votre mot de passe"
       required
    ></v-text-field>
 <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
          ></v-text-field>
      <v-select
        v-model="select"
        :items="civil"
        :rules="[v => !!v || 'Selectionnez une civilité']"
        label="Civilité"
        required
      ></v-select>
        
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'Vous devez accepter la charte avant de continuer!']"
        label="Accepter la charte"
        color="primary"
        required
      ></v-checkbox>
<div class="d-flex flex-column">
        <v-btn
          color="success"
          class="mt-4"
          block
          @click="valider"
        >
          Valider
        </v-btn>
        <v-btn
          color="error"
          class="mt-4"
          block
          @click="effacer"
        >
          Effacer
        </v-btn>

      </div>
    </v-form>
   </v-container>
  </v-card>
</template>
<script>

export default {
  name: 'InscriPtion',
  data: () => ({
      valid: true,
      login: '',
      pwd:'',
      email:'',
      loginRules: [
        v => !!v || 'Le login est obligatoire',
        v => (v && v.length <= 10) || 'Le login est supérieur à 10 caracteres',
      ],
       methods: {
      async valider () {
        const { valid } = await this.$refs.form.validate()

        if (valid) alert('le formulaire est valide!')
      },
      effacer () {
        this.$refs.form.reset()
      },
    },
       }),
}

</script>