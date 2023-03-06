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
      counter
      maxlength="10"
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
      select: null,
      civil: [
        'Homme',
        'Femme'
      ],
       checkbox: false,
      loginRules: [
        v => !!v || 'Le login est obligatoire',
        v => (v && v.length <= 10) || 'Le login est supérieur à 10 caracteres',
      ],
        pwdRules: [
        v => !!v || 'Le mot de passe est obligatoire',
        v => (v && v.length >= 10) || 'Le mot de passe  est inférieur à 11 caracteres',
                /*
    Formé d'un minimum de 8 caractères. Ajustez-le en modifiant {8,}
    Au moins une lettre majuscule. Vous pouvez supprimer cette condition en supprimant (?=.* ?[A-Z])
    Au moins une lettre minuscule. Vous pouvez supprimer cette condition en supprimant (?=.* ?[a-z])
    Au moins un chiffre. Vous pouvez supprimer cette condition en supprimant (?=.* ?[0-9])
    Au moins un caractère spécial, Vous pouvez supprimer cette condition en supprimant (?=.* ?[#?!@$%^&*-])
*/
        v =>{  const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,10}$/
            return pattern.test(v) || "Le mot de passe est incorrect.il faut au moins une lettre majuscule,une lettre minuscule,un chiffre, un caractere spécial et 8 caracteres minimum!"
          },
      ],
       emailRules: [
         v => !!v || "L'email est obligatoire",
        v => (v && v.length >= 20) || "L'email est inferieur a 20 caracteres",
        v =>{  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(v) || "L'e-mail est incorrect"
          },
       ],
    }), 
       methods: {
      async valider () {
        const { valid } = await this.$refs.form.validate()

        if (valid) alert('le formulaire est valide!')
      },
      effacer () {
        this.$refs.form.reset()
      },
    },
     
}

</script>