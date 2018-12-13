const getProvinces = () => {
    return {
      type: 'GET_PROVINCES',
      payload: fetch(
        'https://geopagos-challenge.s3.amazonaws.com/provinces.json'
      ).then(response => response.json())
    };
  };
  
  const getLocations = ID => {
    return {
      type: 'GET_LOCATIONS',
      payload: fetch(
        `https://geopagos-challenge.s3.amazonaws.com/provinces/${ID}.json`
      ).then(response => response.json())
    };
  };
  
  const postForm = params => {
    return {
      type: 'POST_FORM',
      payload: fetch(
        `http://www.mocky.io/v2/2161145215546665?mocky-delay=500ms`,
        {
          method: 'POST',
          body: JSON.stringify(params)
        }
      )
    };
  };
  
  export { getProvinces, getLocations, postForm }