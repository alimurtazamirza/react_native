export const APILOGIN_USER = "LOGIN_USER";
export const APIPROFILE_CHANGE = "APIPROFILE_CHANGE";
export const APIPHOTO_CHANGE = "APIPHOTO_CHANGE";
export const APIPHOTO_DELETE = "APIPHOTO_DELETE";
export const APIUPDATE_USER = "APIUPDATE_USER";
export const APILOAD_USER = "APILOAD_USER";
export const APIFRIEND_CHANGE = "APIFRIEND_CHANGE";

export const apiLoadUser = (User) => {
  return { type: APILOAD_USER, user: User };
};

export const apiChangeFriend = (User) => {
  return { type: APIFRIEND_CHANGE, friends: User };
};

export const apiLoginUser = (user) => {
  return { type: APILOGIN_USER, user: user };
};

export const apiProfileChange = (profileImages) => {
  return { type: APIPROFILE_CHANGE, profileImages: profileImages };
};

export const apiPhotoChange = (imageUris) => {
  return { type: APIPHOTO_CHANGE, imageUris: imageUris };
};

export const apiPhotoDelete = (imageUris) => {
  return { type: APIPHOTO_DELETE, imageUris: imageUris };
};

export const apiUpdateUser = (updatedUuser) => {
  return { type: APIUPDATE_USER, user: updatedUuser };
};
