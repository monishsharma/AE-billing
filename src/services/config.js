export default (api) => {

    const getAppConfig = () => {
        return api.get(`/config/config-detail`);
    }

    const postAppConfig = (payload) => {
        return api.post(`/config/post-config-detail`, payload);
    }

    const updateAppConfig = (payload, configKey) => {
        return api.post(`/config/post-config-value?configKey=${configKey}`, payload);
    }



  return {
    getAppConfig,
    postAppConfig,
    updateAppConfig
  };
};
