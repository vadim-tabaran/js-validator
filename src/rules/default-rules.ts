
export let rules = [
  {
    name: 'required',
    validate: function(next) {
      next('Hi i am %window.location.href%');
    },
    message: 'Field '
  }
];
