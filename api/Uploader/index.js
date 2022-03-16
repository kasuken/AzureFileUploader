const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1} = require('uuid');

module.exports = async function (context, req) {
    context.log('Uploader trigger function processed a request.');

    req.body.files.forEach(async (file) => {

        const blobServiceClient = new BlobServiceClient(process.env.StorageConnectionString);
        const containerName = "container" + uuidv1();;
        const blobName = file.name;

        const containerClient = await blobServiceClient.getContainerClient(containerName);

        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        const uploadBlobResponse = await blockBlobClient.upload(file, {
            blockSize: 4 * 1024 * 1024, // 4MB block size
            maxSinglePutSize: 256 * 1024 * 1024, // 256MB
            parallelism: 5, // 5 parallel uploads
            onProgress: (ev) => {
                context.log(`Bytes uploaded: ${ev.loadedBytes}`);
            }
        });

        context.log(`Blob "${blobName}" uploaded successfully.`);
    });

    // const blobServiceClient = BlobServiceClient.fromConnectionString(
    //     process.env.StorageConnectionString
    // );

    // const containerName = "container" + uuidv1();;

    // const containerClient = blobServiceClient.getContainerClient(containerName);
    // await containerClient.create();

    // containerClient.setAccessPolicy('blob');

    // const blobName = "file1.txt";

    // const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // const data = "Hello, World!";
    // await blockBlobClient.upload(data, data.length);

    context.res = {
        status: 200,
        body: "uploaded"
    };
}