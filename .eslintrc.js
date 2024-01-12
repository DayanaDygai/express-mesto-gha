module.exports = {
  rules: {
    "no-console": "off",
    extends: "airbnb-base",
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
