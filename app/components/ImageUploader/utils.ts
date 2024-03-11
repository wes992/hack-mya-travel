export const formatFile = (file: File) => {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.onload = (event) => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      console.log("error formatting file");
      reject();
    };
    reader.readAsDataURL(file);
  });
};

export const formatFiles = async (files: File[]) => {
  const base64Files = await Promise.allSettled(
    files.map(async (file) => {
      const formatted = await formatFile(file);
      return {
        name: file.name,
        desc: file.name,
        img: {
          data: formatted,
          contentType: file.type,
        },
      };
    })
  );

  const successfulFormats = base64Files.map((file) => {
    if (file.status === "fulfilled") {
      return file.value;
    }
  });

  return successfulFormats;
};
