import { $axios } from "@/api/http";

const getUser = (count = 30) => {
  return new Promise((resolve, reject) => {
    $axios
      .get(`/users/?results=${count}`)
      .then((res) => {
        if (res?.results) {
          resolve(res.results);
        } else {
          console.log("error");
          res?.error ? reject("服務維護中") : reject("系統忙碌中，請稍後再試!");
        }
      })
      .catch(() => {
        reject("系統忙碌中，請稍後再試!");
      });
    // $axios
    //   .get(`/api/?results=${count}`)
    //   .then((res) => {
    //     if (res?.results) {
    //       console.log("call api");
    //       resolve(res.results);
    //     } else {
    //       console.log("error");
    //       res?.error ? reject("服務維護中") : reject("系統忙碌中，請稍後再試!");
    //     }
    //   })
    //   .catch(() => {
    //     reject("系統忙碌中，請稍後再試!");
    //   });
  });
};

export { getUser };
