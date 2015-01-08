
function get_chunk_size(){
    var upload_size = $('#file_upload')[0].files[0].size
    if(upload_size < 200000000){
        $('#fileupload').fileupload(
            'option',
            {
                maxChunkSize: 0,
                url: '/rest/receive_data_file/'
            }
        );
    }
    else{
        $('#fileupload').fileupload(
            'option',
            {
                maxChunkSize: 200000000,
                url: '/rest/receive_data_file_chunked/'
            }
        );
    }

}


$(document).ready(function(){
var chunk_size = 0
var u_id = undefined
var token = $.cookie('csrftoken')
var f = $('#file_upload')
$('#upload_id').val('')

$(function () {
'use strict';


    $('#fileupload').fileupload({
        dataType: 'json',
        headers: {'X-CSRFToken':token},
        progressInterval: '10',
        maxChunkSize: chunk_size,
        fail: function(e, data){
            alert('FAIL!!!')
        },
        done: function(e, data){
            //when upload is complete, call the finalise method (maybe calculate md5 hash here)
            var output = finalise_upload(data);
        },
        add: function(e, data) {

            data.submit();
        },
        progress: function(e, data){
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .bar').css(
                'width',
                progress + '%'
            );
        }
    }).on('fileuploadchunkdone', function (e, data) {
        $('#upload_id').val(data.result.upload_id)
        u_id = data.result.upload_id
    })
})

function finalise_upload(d){
        //serialise form
        form = $('#fileupload').serializeFormJSON()
        token = $.cookie('csrftoken')
        var output;
        if(d.maxChunkSize > 0){
            //if we have a chunked upload, call the complete view method in django
            $.ajax({
                headers: {'X-CSRFToken':token},
                type: "POST",
                async: "false",
                url: '/rest/complete_upload/',
                data: form,
                success: update_html,
                fail: function(){
                    alert('failed chuck')
                },
                dataType: 'text/json'
            });
        }
        else{
            //if we have a non chunked upload, just call the update_html method
            update_html(d)
        }
}

function update_html(data){
    var x = $(data.result.files)
    for(var i = 0; i < x.size(); i++){
        $('<div/>').addClass('alert alert-success').html("<strong>" + x[i].name + "</strong> - " + x[i].size + "MB").appendTo(this);
    }
    $('#upload_files_button span').text('Done')
    $('#upload_files_button').attr('disabled','disabled')
}

/*
document.getElementById("file_upload").addEventListener("change", function() {
        var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
            file = this.files[0],
            chunkSize = 2097152,                               // read in chunks of 2MB
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0,
            spark = new SparkMD5.ArrayBuffer(),
            frOnload = function(e) {
                console.log("read chunk nr", currentChunk + 1, "of", chunks);
                spark.append(e.target.result);                 // append array buffer
                currentChunk++;

                if (currentChunk < chunks) {
                    loadNext();
                }
                else {
                   console.log("finished loading");
                   console.info("computed hash", spark.end()); // compute hash
                   $('#md5').val(spark.end())
                }
            },
            frOnerror = function () {
                console.warn("oops, something went wrong.");
            };

function loadNext() {
    var fileReader = new FileReader();
    fileReader.onload = frOnload;
    fileReader.onerror = frOnerror;

    var start = currentChunk * chunkSize,
        end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
};

loadNext();
})
*/

})