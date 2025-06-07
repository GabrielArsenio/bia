export default {
  data() {
    return {
      service: null,
      form: {},
      isOpen: false,
    }
  },
  watch: {
    document() {
      if (!this.document) {
        this.isOpen = false;
        this.form = {};
        return;
      }
      if (typeof this.document === "object") {
        this.isOpen = true;
        this.form = Object.assign({}, this.document);
      }
    },
    isOpen(newVal) {
      if (!newVal) {
        this.cancel()
      }
    }
  },
  methods: {
    async load() {
      if (!this.service) {
        throw new Error('Please, init the service property on created method. Example: `this.service = new Service(\'api/usuarios\');`')
      }
    },
    async save() {
      const responseData = await this.service.save(this.form)
      this.$emit("save", responseData)
      this.isOpen = false
    },
    cancel() {
      this.$emit("cancel");
      this.isOpen = false;
      this.form = {}
    },

  },
  mounted() {
    this.load();
  }
}