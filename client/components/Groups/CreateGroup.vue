<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateGroup',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/group',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'content', label: "Group Name", value: ''}
      ],
      title: 'Create Group',
      callback: () => {
        const message = 'Successfully created a group!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>