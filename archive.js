const maxApi = require("max-api");

var randomInternetArchive = require('random-internet-archive');
var internetsearch = require('archive-search');
var download = require('download-file');
var request = require('request');
var randomJSON;

const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 3001

maxApi.addHandler("download", (randomJSON) => {
    var options = { directory: "."
                    }
   
    download(randomJSON, options, function(err){
      if (err) throw err
    })
   
});

maxApi.addHandler("random", (collection, mediatype, fileExtensions, minSize, maxSize) => {
    randomInternetArchive(
        {
          request,
          collection: collection,
          mediatype: mediatype,
          fileExtensions: [fileExtensions],
          minimumSize: minSize,
          maximumSize: maxSize
        },
        print
      );
})

function print(error, result) {
    if (error) {
      console.error(error);
    } else {
        maxApi.outlet(result);

       randomJSON = result.url;
    }
  }

