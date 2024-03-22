const resize_width = 1200;
const quality = 0.7;
export const formatFile = (file: File) => {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();

    reader.onload = function (event: any) {
      var img = new Image(); //create a image
      img.src = event.target.result; //result is base64-encoded Data URI
      img.name = event.target.name; //set name (optional)
      img.onload = function (el: any) {
        var canvas = document.createElement("canvas"); //create a canvas

        //scale the image to given width and keep aspect ratio
        var scaleFactor = resize_width / el.target.width;
        canvas.width = resize_width;
        canvas.height = el.target.height * scaleFactor;

        //draw in canvas
        var ctx = canvas.getContext("2d");
        ctx!.drawImage(el.target, 0, 0, canvas.width, canvas.height);

        //get the base64-encoded Data URI from the resize image
        var srcEncoded = ctx!.canvas.toDataURL(file.type, quality);

        //resolve with the scaled img
        resolve(srcEncoded);
      };
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
