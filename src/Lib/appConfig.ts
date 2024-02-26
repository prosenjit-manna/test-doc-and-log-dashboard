const appConfig  = {
  api: {
    graphql: import.meta.env.VITE_API_URL 
  },
  storage: {
    user: 'app_user',
    app_local_store: 'app_local_store'
  }
};
export default appConfig;
