export const buildFileSelector = handleFileSelected => {
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  fileSelector.onchange = e => {
    handleFileSelected(e.target.files[0]);
  };
  return fileSelector;
};

export const createFormData = data => {
  const formData = new FormData();
  formData.append("file", data);
  return formData;
};
