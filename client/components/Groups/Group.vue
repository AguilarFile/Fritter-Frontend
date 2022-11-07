<template>
    <main>
        <h3>{{ group.name }}</h3>
    </main>
</template>

<script>
export default {
    name: 'Group',
    props: {
      // Data from the stored freet
      group: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        editing: false, // Whether or not this freet is in edit mode
        draft: this.freet.content, // Potentially-new content for this freet
        reacted: this.freet.reacted,
        alerts: {} // Displays success/error messages encountered during freet modification
      };
    },
    methods: {

    }
  };
</script>