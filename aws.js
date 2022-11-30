import AWS from "aws-sdk";

// AWS.config.update({ region: "eu-central-1" });

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
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

// https://{BUCKET NAME}.s3.{REGION}.amazonaws.com/{FILENAME}.
