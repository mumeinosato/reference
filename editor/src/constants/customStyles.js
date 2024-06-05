export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: "5px",
    fontSize: "0.8rem",
    color: "#fff",
    lineHeight: "1.75rem",
    backgroundColor: "#1e1e1e",
    cursor: "pointer",
    border: "2px solid #232323",
    ":hover": {
      border: "2px solid #000000",
      boxShadow: "none",
    },
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#fff",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: "#1e1e1e",
      ":hover": {
        backgroundColor: "#1e1e1e",
        color: "#fff",
        cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#1e1e1e",
      maxWidth: "14rem",
      border: "2px solid #000000",
      borderRadius: "5px",

    };
  },
  singleValue: (styles) => ({
    ...styles,
    color: "#fff",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#fff",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
};
