const API = async()=>{
    const response = await axios.get(
      'http://localhost:4000/appointment'
    );
    return response;
  } 