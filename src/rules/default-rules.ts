
export let rules = [
  {
    name: 'required',
    validate: function(next, value) {
      next(!!value);
    },
    message: 'Field %attributes["v-name"]% is required'
  }
];
