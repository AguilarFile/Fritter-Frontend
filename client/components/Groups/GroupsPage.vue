<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Groups for @{{ $store.state.username }}</h2>
      </header>
      <CreateGroup />
    </section>
    <section>
      <header>
        <h2>Groups:</h2>
      </header>
      <Group
          v-for="group in $store.state.groups"
          :key="group.id"
          :group="group"
      />
    </section>
  </main>
</template>

<script>
import CreateGroup from '@/components/Groups/CreateGroup.vue';
import Group from '@/components/Groups/Group.vue'

export default {
  name: 'GroupPage',
  components: {
    CreateGroup,
    Group
  },
  async mounted() {
    const r = await fetch(`/api/group/${this.$store.state.username}`);
    const res = await r.json();
    this.$store.commit('updateGroups', res);
  }
};
</script>