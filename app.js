var app = new Vue({
    el: '#app',
    data: {
      message: 'La mia app vue',
      token: 'Pippo',
      x:2,
      y: 4,
      z: 0,
      orders: [],
      newOrder: {
        products: '',
        price: 0
      }
    },
    methods: {
      sum: function() {
        this.z = parseInt(this.x) + parseInt(this.y);
        localStorage.setItem('z', this.z);
      },
      loadOrders: function() {
          this.$http.get(`http://localhost:3001/${ this.token === 'admin' ? 'admin':'users'}/orders?token=${this.token}`)
          .then(function(response){ this.orders = response.body })

      },
      createNewOrder: function() {
        this.$http.post('http://localhost:3001/users/orders?token=' + this.token, this.newOrder)
        .then(function(response){
            this.loadOrders();
            this.newOrder.price = 0;
            this.newOrder.products = '';
         });
      },
      deleteOrder: function(id) {
          this.$http.delete(`http://localhost:3001/admin/orders/${id}?token=${this.token}`, this.newOrder)
          .then(function(response){
              this.loadOrders();
          });
      }
    },
    created() {
      //if (localStorage.getItem('z')) {
      //  this.z = localStorage.getItem('z');
      //}
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
      }
      this.loadOrders();
    },
    watch: {
      'z': function(newValue, oldValue) {
          console.log("ho cambiato z");
      },
      'x': function(newValue, oldValue) {
          this.sum();
      },
      'y':function(newValue, oldValue) {
          this.sum();
      },
      'token': function(newValue, oldValue) {
          localStorage.setItem('token', newValue);
          this.loadOrders();
      }
    }
})
