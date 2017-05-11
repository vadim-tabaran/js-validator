
export let rules = [
  {
    name: 'required',
    validate: function(next, value) {
      next(!!value);
    },
    message: 'Field %attributes["v-name"]% is required'
  },
  {
    name: 'email',
    validate: function(next, value) {
      console.log('here', value);
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      next(re.test(value));
    },
    message: 'Please enter a valid email address'
  },
];
