
export let rules = [
  {
    name: 'required',
    validate: function(next, value) {
      console.log(value);
      next(!!value);
    },
    message: 'Field %attributes["v-name"]% is required'
  }
];
