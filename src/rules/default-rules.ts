
export let rules = [
  {
    name: 'required',
    validate: function(next) {
      next('Hi i am %user.name%. I am %user.age% old!');
    },
    message: 'Field '
  }
];
