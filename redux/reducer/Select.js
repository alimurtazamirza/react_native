import { APIGET_SELECT } from "../action/Select";

const initialState = {
  gender: [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Femle" },
  ],
  looking: [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Femle" },
  ],
  marial_status: [
    { label: "No Answer", value: "No Answer" },
    { label: "Employed", value: "Employed" },
    { label: "Self-employed", value: "Self-employed" },
    { label: "Currently not employed", value: "Femle" },
  ],
  occupation: [
    { label: "No Answer", value: "No Answer" },
    { label: "Single", value: "Single" },
    {
      label: "Divorced / Separated",
      value: "Divorced / Separated",
    },
    { label: "Widowed", value: "Widowed" },
    {
      label: "It is Complicated",
      value: "It is Complicated",
    },
  ],
  religion: [
    { label: "No Answer", value: "No Answer" },
    { label: "Islam", value: "Islam" },
    {
      label: "Christian",
      value: "Christian",
    },
    { label: "Athiest", value: "Athiest" },
    { label: "Jew", value: "Jew" },
  ],
  language_spoken: [
    { label: "No Answer", value: "No Answer" },
    { label: "Islam", value: "Islam" },
    {
      label: "Christian",
      value: "Christian",
    },
    { label: "Athiest", value: "Athiest" },
    { label: "Jew", value: "Jew" },
  ],
  purpose: [
    { label: "No Answer", value: "No Answer" },
    { label: "Islam", value: "Islam" },
    {
      label: "Christian",
      value: "Christian",
    },
    { label: "Athiest", value: "Athiest" },
    { label: "Jew", value: "Jew" },
  ],
  preffered_age: [
    { label: "No Answer", value: "No Answer" },
    { label: "Islam", value: "Islam" },
    {
      label: "Christian",
      value: "Christian",
    },
    { label: "Athiest", value: "Athiest" },
    { label: "Jew", value: "Jew" },
  ],
  smoker: [
    { label: "No Answer", value: "No Answer" },
    { label: "Islam", value: "Islam" },
    {
      label: "Christian",
      value: "Christian",
    },
    { label: "Athiest", value: "Athiest" },
    { label: "Jew", value: "Jew" },
  ],
  drinker: [
    { label: "No Answer", value: "No Answer" },
    { label: "Islam", value: "Islam" },
    {
      label: "Christian",
      value: "Christian",
    },
    { label: "Athiest", value: "Athiest" },
    { label: "Jew", value: "Jew" },
  ],
  ethnicity: [
    { label: "No Answer", value: "No Answer" },
    { label: "Islam", value: "Islam" },
    {
      label: "Christian",
      value: "Christian",
    },
    { label: "Athiest", value: "Athiest" },
    { label: "Jew", value: "Jew" },
  ],
  height: [
    { label: "No Answer", value: "No Answer" },
    { label: "Islam", value: "Islam" },
    {
      label: "Christian",
      value: "Christian",
    },
    { label: "Athiest", value: "Athiest" },
    { label: "Jew", value: "Jew" },
  ],
  languages: [
    { label: "English", value: 1 }
  ],
};

const selectReducer = (state = initialState, action) => {
  switch (action.type) {
    case APIGET_SELECT:
      let newState = action.Data;
      return { ...state, ...newState };

    default:
      return state;
  }
  return state;
};

export default selectReducer;
