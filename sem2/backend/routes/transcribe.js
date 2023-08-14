const axios = require("axios");
const fs = require("fs");
const path= require("path");
const FormData = require("form-data");
const router = require("./user");
const filesize = require('filesize');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const {Router} = require('express');
const port = 5001;



ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);



const OPENAI_API_KEY= process.env.OPENAI_API_KEY;
const destinationPath = path.resolve(__dirname, '..');
const filePath = path.join(destinationPath,"uploads/", "test.mp4");
const model = "whisper-1";
var transcribedScript = [];

router.post("/transcribe", async (req, res) => {
    const inputFilePath = filePath;
    const chunkSizeInMB = 23; // Split into 10 MB chunks

    var chunknum = await splitVideoBySize(inputFilePath, chunkSizeInMB);

    console.log("here")

    for (var i = 1; i < chunknum; i++) {
        const formData = new FormData();
        let chunkPath = path.join(destinationPath,`uploads/chunks/chunk_${i}.mp4`)
        formData.append("model", model);
        formData.append("file", fs.createReadStream(chunkPath));
        console.log(`transcribing chunk_${i}.mp4`)
        await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": `multipart/form-data; boundary = ${formData._boundary}`,
            },
            maxContentLength: 100000000,
            maxBodyLength: 1000000000
        })
        .then((res) => {
            console.log(res.data);

            transcribedScript.push(res.data)
        })

        if (i%3 === 0) {
            console.log("API call break")
            await sleep(60000)
        }

        if (i == chunknum - 1){
          console.log(" === done ===")
        }
    }
    fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully!");
        }
      });
      
      for (var i=1; i<chunknum; i++) {
          let chunkPath = path.join(destinationPath,`uploads/chunks/chunk_${i}.mp4`)

          fs.unlink(chunkPath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("File deleted successfully!");
            }
          });
      }


      axios.post(`http://localhost:${port}/summary`)
})



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function splitVideoBySize(inputFilePath, chunkSizeInMB) {
    try {
      // Create a folder to store the video chunks
  
      var durationInSeconds;
      durationInSeconds = await getVideoDuration(inputFilePath);

      const chunkSizeInBytes = chunkSizeInMB * 1000 * 1000;
  
      let startTime = 0;
      let chunkNumber = 1;
      const chunkPromises = [];
    
    while (startTime < durationInSeconds) {
      const outputFilePath = path.join(destinationPath,"uploads/", `chunks/chunk_${chunkNumber}.mp4`);

      const promise = new Promise((resolve, reject) => {
        ffmpeg(inputFilePath)
          .setStartTime(startTime)          
          .outputOptions('-vn') // Disable video processing
          .outputOptions('-acodec', 'libmp3lame') 
          .outputOptions('-fs', chunkSizeInBytes)
          .output(outputFilePath)
          .on('end', () => {
            console.log(`Chunk ${chunkNumber} saved to ${outputFilePath}`);
            resolve(); // Resolve the promise once the chunk processing is complete
          })
          .on('error', (err) => {
            console.error(`Error occurred while processing chunk ${chunkNumber}:`, err.message);
            reject(err);
          })
          .run();
      });
      await promise;

      chunkPromises.push(promise);
     
      startTime += await getVideoDuration(outputFilePath);

      chunkNumber++;

      
    }

    function getVideoDuration(videoFilePath) {
      return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoFilePath, (err, metadata) => {
          if (err) {
            reject(err);
          } else {
            const duration = metadata.format.duration;
            resolve(duration);
          }
        });
      });
    }

    // Wait for all chunking promises to resolve before continuing
    await Promise.all(chunkPromises);

    console.log('Video splitting completed');
      return chunkNumber
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
  





module.exports = {
  transcribedScript: transcribedScript,
  router: router
};


