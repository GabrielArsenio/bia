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
        throw new Error('Please, init the service property on created method. Exemple: `this.service = new Service(this.$resource("api/usuarios{/id}"));`')
      }
    },
    async save() {
      const res = await this.service.save(this.form)
      this.$emit("save", res.body)
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