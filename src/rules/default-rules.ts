
export let rules = [
  {
    name: 'required',
    validate: function(next, value) {
      console.log('required valida');
      next(!!value);
    },
    message: 'Field %attributes["v-name"]% is required'
  }
];
