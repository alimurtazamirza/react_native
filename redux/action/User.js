export const APILOADPROFILE_USER = "APILOADPROFILE_USER";

export const apiLoadProfileUser = (User) => {
  return { type: APILOADPROFILE_USER, user: User };
};
