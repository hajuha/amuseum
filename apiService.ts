import axios from 'axios';

export const getFileContent = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/streamline-example.txt`);
    return res;
  } catch(err) {
    return err;
  }
}

