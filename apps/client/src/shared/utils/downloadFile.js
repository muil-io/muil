const downloadFile = (data, name) => {
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(data);
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

export default downloadFile;
