export const downloadFile = (response, defaultFileName = "download") => {
  const blob = new Blob([response.data], {
    type: response.headers?.["content-type"],
  });

  const disposition = response.headers?.["content-disposition"];

  let fileName = defaultFileName;

  if (disposition) {
    const match = disposition.match(/filename="?([^"]+)"?/);

    if (match?.[1]) {
      fileName = match[1];
    }
  }

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);

  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
};