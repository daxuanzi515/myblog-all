import axios from "axios";

export const SendEmail = async ({
    fullName,
    email,
    message,
    setSend,
  }) => {
    try {
      const datas = { fullName, email, message };
      let res = await axios.post(`http：//localhost:5000/api/send`, datas);
      if (res) {
        setSend(res.data);
      }
      alert("Already Send Your Email");
    } catch (error) {
      alert(error.response.data.message);
    }
  };