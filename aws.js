import AWS from "aws-sdk";

export const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  // accessKeyId: process.env.ACCESS_KEY,
  // secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

export const uploadAudio = (filename, bucketName, file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: filename,
      Bucket: bucketName,
      Body: file,
      ContentType: "audio/mp3",
      ACL: "public-read",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

export const uploadAvatar = (filename, bucketName, file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: filename,
      Bucket: bucketName,
      Body: file,
      ContentType: "image/png",
      ACL: "public-read",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};
