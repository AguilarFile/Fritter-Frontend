<!-- Default page that also displays freets -->

<template>
    <main>
      <section>
        <header>
          <h2>@{{ $store.state.profile }}'s Profile</h2>
          <div>
            <button v-if = "!$store.state.following" @click="follow">
            Follow
            </button>
            <button v-if = "$store.state.following" @click="unfollow">
            Unfollow
            </button>
            <button v-if = "$store.state.following" @click="toggleGroup">
            Add to a group 
            </button>
            <div v-if = "showGroup">
              <div v-for="(value, key, index) in $store.state.groups" :key="index">
                <input type="checkbox" :id="key" v-model="value.checked" @click="groupify(value.name, $event.target.checked)">
                <label :for="key"> {{ value.name }}</label>
              </div>
            </div>
          </div>
        </header>
      </section>
      <section>
        <section
          v-if="$store.state.freets.length"
        >
          <FreetComponent
            v-for="freet in $store.state.freets"
            :key="freet.id"
            :freet="freet"
          />
        </section>
        <article
          v-else
        >
          <h3>No freets found.</h3>
        </article>
      </section>
    </main>
  </template>
  
  <script>
  import FreetComponent from '@/components/Freet/FreetComponent.vue';
  import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';
  
  export default {
    name: 'ProfilePage',
    components: {FreetComponent, GetFreetsForm},
    async mounted() {
      const r = await fetch(`/api/group/${this.$store.state.username}`);
      const res = await r.json();
      for (let i = 0; i < res.length; i++){
        const b = await fetch(`/api/groupPair/${res[i].name}/${this.$store.state.profile}`);
        const bond = await b.json();
        res[i].checked = (bond)? true : false;
      }
      this.$store.commit('updateGroups', res);
    },

    data () {
      return {
        showGroup: false,
        Groups: [],
        names: {
          jack: true,
          john: false,
          mike: false
        }
      }
    },
    methods: {
      async follow() {
        const params = {method: "POST", headers: {'Content-Type': 'application/json'}};
        const r = await fetch(`/api/follow/${this.$store.state.profile}`, params);

        this.$store.commit('updateFollowing', true);
      },
      async unfollow() {
        const params = {method: "DELETE", headers: {'Content-Type': 'application/json'}};
        const r = await fetch(`/api/follow/${this.$store.state.profile}`, params);

        this.$store.commit('updateFollowing', false);
      },

      async groupify(name, checked) {
        const method = (checked)? "POST" : "DELETE";
        const params = {method: method, headers: {'Content-Type': 'application/json'}};
        const r = await fetch(`/api/groupPair/${name}/${this.$store.state.profile}`, params);
      },

      toggleGroup() {
        this.showGroup = !this.showGroup;
      }
    }
  };
  </script>
  
  <style scoped>
  section {
    display: flex;
    flex-direction: column;
  }
  
  header, header > * {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  
  button {
      margin-right: 10px;
  }
  
  section .scrollbox {
    flex: 1 0 50vh;
    padding: 3%;
    overflow-y: scroll;
  }
  </style>
  