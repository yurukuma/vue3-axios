import { $axios } from "@/api/http";

const getUser = (count = 30) => {
  return new Promise((resolve, reject) => {
    // $axios
    //   .get(`${process.env.VUE_APP_API_ENDPOINT}/?results=${count}`)
    //   .then((res) => {
    //     if (res?.results) {
    //       resolve(res.results);
    //     } else {
    //       res?.error ? reject("服務維護中") : reject("系統忙碌中，請稍後再試!");
    //     }
    //   })
    //   .catch(() => {
    //     reject("系統忙碌中，請稍後再試!");
    //   });
    $axios
    .get(`https://randomuser.me/api/?results=${count}`)
    .then((res) => {
      if (res?.results) {
        resolve(res.results);
      } else {
        res?.error ? reject("服務維護中") : reject("系統忙碌中，請稍後再試!");
      }
    })
    .catch(() => {
      reject("系統忙碌中，請稍後再試!");
    });
  });
};

export { getUser };
