export default (api) => {

    const getConfig = () => {
        return api.get(`/config/config-detail`);
    }

    const postConfig = (payload) => {
        return api.post(`/config/post-config-detail`, payload);
    }

    const updateConfig = (payload, key) => {
        return api.patch(`/config/update/config/${key}`, payload);
    }



  return {
    getConfig,
    postConfig,
    updateConfig
  };
};
