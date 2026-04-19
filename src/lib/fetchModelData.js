import models from "../modelData/models";

/**
 * Hàm giả lập gọi API (Mock Fetch)
 * Tạm thời dùng cách này để test giao diện khi chưa có webServer.js
 */
function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    // Giả lập độ trễ mạng 200ms để giống với thực tế
    setTimeout(() => {
      try {
        if (url === "/user/list") {
          // Trả về danh sách người dùng
          resolve(models.userListModel());
        } else if (url.startsWith("/user/")) {
          // Trả về chi tiết 1 người dùng theo ID
          const userId = url.split("/")[2];
          const user = models.userModel(userId);
          if (user) resolve(user);
          else reject(new Error("User not found"));
        } else if (url.startsWith("/photosOfUser/")) {
          // Trả về ảnh của 1 người dùng theo ID
          const userId = url.split("/")[2];
          const photos = models.photoOfUserModel(userId);
          if (photos) resolve(photos);
          else reject(new Error("Photos not found"));
        } else if (url === "/test/info") {
          resolve(models.schemaInfo());
        } else {
          reject(new Error("API endpoint not found"));
        }
      } catch (error) {
        reject(error);
      }
    }, 200);
  });
}

export default fetchModel;
