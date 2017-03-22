
export let rules = {
  required: {
    selector: 'required',
    name: 'required',
    validate: function(next) {
      next('hello world');
    },
    message: 'Field '
  }
};
