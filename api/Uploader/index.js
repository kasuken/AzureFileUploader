const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1 } = require('uuid');

const multipart = require("parse-multipart");

module.exports = async function (context, req) {
    context.log('Uploader trigger function processed a request.');

    try {
        const bodyBuffer = Buffer.from(req.body);

        const boundary = multipart.getBoundary(req.headers['content-type']);
        const parts = multipart.Parse(bodyBuffer, boundary);
        const res = { body: { name: parts[0].filename, type: parts[0].type, data: parts[0].data.length } };

        const blobServiceClient = BlobServiceClient.fromConnectionString(
            process.env.StorageConnectionString
        );

        const containerName = "container" + uuidv1();;

        const containerClient = blobServiceClient.getContainerClient(containerName);
        await containerClient.create();

        containerClient.setAccessPolicy('blob');

        const blobName = res.body.name;

        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.upload(parts[0].data, parts[0].data.length);
    } catch (error) {
        console.log(error);
    }

    context.res = {
        status: 200,
        body: "uploaded"
    };
}