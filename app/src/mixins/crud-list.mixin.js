export default {
  data() {
    return {
      service: null,
      search: '',
      items: [],
      itemEditing: null,
      itemRemoving: null,
    }
  },
  methods: {
    async loadItems() {
      if (!this.service) {
        throw new Error('Please, init the service property on created method. Exemple: `this.service = new Service(this.$resource("api/usuarios{/id}"));`')
      }
      this.items = await this.service.findAll()
    },
    edit(itemEditing) {
      if (this.itemEditing) {
        this.itemEditing = null
      }
      this.itemEditing = itemEditing
    },
    onSave() {
      this.loadItems();
      this.itemEditing = null
    },
    remove(item) {
      if (this.itemRemoving) {
        this.itemRemoving = null
      }
      this.itemRemoving = item
    },
    async onRemove() {
      await this.service.remove(this.itemRemoving._id)
      this.loadItems();
      this.itemRemoving = null;
    }
  },
  mounted() {
    this.loadItems();
  }
}