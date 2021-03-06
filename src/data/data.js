const getProvinces = () => {
  return {
    type: "GET_PROVINCES",
    payload: fetch(
      "https://geopagos-challenge.s3.amazonaws.com/provinces.json"
    ).then(response => response.json())
  };
};

const getLocations = ID => {
  return {
    type: "GET_LOCATIONS",
    payload: fetch(
      `https://geopagos-challenge.s3.amazonaws.com/provinces/${ID}.json`
    ).then(response => response.json())
  };
};

const postForm = params => {
  return {
    type: "POST_FORM",
    payload: fetch(
      `http://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=500ms`,
      {
        method: "POST",
        body: JSON.stringify(params)
      }
    )
      .then(response => response.json())
      .then(response => console.log(response))
  };
};

export { getProvinces, getLocations, postForm };
