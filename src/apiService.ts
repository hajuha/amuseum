import axios from 'axios';

export const getData = async (url:string) => {
  try {
    const res = await axios.get(url);
    return res?.data;
  } catch (err) {
    return err;
  }
}

export const getImage = async (id_image: string) => {
  try {
    let itemUrl = `https://hcloud.trealet.com/tiny${id_image}/?json`;
    // const imageData = await getData('https://mocki.io/v1/96f4f698-1e51-46d6-9ffe-fa4714c898a8');
    const imageData = await getData(itemUrl);
    const result = {
        desc: imageData.image.desc ? imageData.image.desc : '' ,
        url_full: "https://hcloud.trealet.com/" + imageData.image.url_full,
        title: imageData.image.title,
    }
    return result
  } catch (err) {
    return err;
  }
}