import Server from "./Server";

const getPhotos = (id) => Server.get(`/user_photos/${id}`);

const deletePhoto = (id, user_id) =>
  Server.post(`/delete_user_photos`, { id: id, user_id: user_id });

const addPhoto = (photo, onUploadProgress) => {
  const data = new FormData();
  data.append("user_id", photo.user_id);
  data.append("path", {
    name: "gallery",
    type: "image/*",
    uri: photo.image,
  });
  return Server.post(`/add_user_photos`, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const addProfilePhoto = (photo, onUploadProgress) => {
  const data = new FormData();
  data.append("user_id", photo.user_id);
  data.append("value", photo.type);
  data.append("file", {
    name: "gallery",
    type: "image/*",
    uri: photo.image,
  });
  return Server.post(`/add_profile_photos`, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getPhotos,
  deletePhoto,
  addPhoto,
  addProfilePhoto,
};
