/* eslint-disable import/prefer-default-export */
const validateUrl = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s!"#'()*+,:;<>@[\\\]`{|}~]*$/;

export default validateUrl;