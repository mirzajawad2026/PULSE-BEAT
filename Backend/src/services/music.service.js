const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_IMAGE_KIT,
});

async function uploadFile(fileBuffer, originalName = "music.mp3") {
  if (!fileBuffer) {
    throw new Error("No file buffer provided");
  }

  const stream = require("stream");
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileBuffer);

  const result = await imagekit.files.upload({
    file: bufferStream,
    fileName: originalName || `music-${Date.now()}.mp3`,
    folder: "/music",
    useUniqueFileName: true,
  });

  return result;
}

module.exports = {
  uploadFile,
};
