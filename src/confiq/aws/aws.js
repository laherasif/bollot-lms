
import AWS from 'aws-sdk'

export const S3_BUCKET = 'bolloot';
const REGION = 'us-east-1';


AWS.config.update({
    accessKeyId: "AKIA5CYBVB45T33ZHF6Y",
    secretAccessKey: "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",
});



export const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})
