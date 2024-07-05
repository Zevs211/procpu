export default (instance) => ({
  login(payload) {
    return instance.post('/login', payload);
  },
  register(payload) {
    return instance.post('/register', payload);
  },
  logout() {
    return instance.delete('/logout');
  },
});