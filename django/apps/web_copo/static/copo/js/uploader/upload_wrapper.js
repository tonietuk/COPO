//this function is called on when the file upload changes, and sets some option in the
//jquery file upload plugin. If the file is larger than chunk_threshold, it should be chunked
var upload_size = 0
var chunk_size = 0
var chunk_threshold = 200000000 // size of chunks in bytes

function get_chunk_size(){
    upload_size = $('#file_upload')[0].files[0].size
    if(upload_size < chunk_threshold){
        chunk_size = 0;
        $('#fileupload').fileupload(
            'option',
            {
                maxChunkSize: 0,
                url: '/rest/receive_data_file/'
            }
        );
    }
    else{
        chunk_size = chunk_threshold
        $('#fileupload').fileupload(
            'option',
            {
                maxChunkSize: chunk_threshold,
                url: '/rest/receive_data_file_chunked/'
            }
        );
    }

}


$(document).ready(function(){

    var u_id = undefined
    var token = $.cookie('csrftoken')
    var f = $('#file_upload')
    $('#upload_id').val('')
    $('#sine_image').hide()
    $('#input_md5_checksum').val('To Be Calculated...')

    $(function () {
    'use strict';
        //file upload plugin
        var s;
        $('#fileupload').fileupload({
            dataType: 'json',
            headers: {'X-CSRFToken':token},
            progressInterval: '100',
            bitrateInterval: '20',
            maxChunkSize: chunk_size,
            fail: function(e, data){
                alert('FAIL!!!')
            },
            done: finalise_upload,
            error: function(e, data){
                console.log($.makeArray(arguments));
            },
            add: function(e, data) {
                data.submit();
            },
            progress: function(e, data){
                //increment progress bar
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .bar').css(
                    'width',
                    progress + '%'
                );
                //display uploaded bytes
                var uploaded = parseFloat(data.loaded) / 1000000.0
                s = uploaded.toFixed(2) + " MB of"
                $('#progress_label').html(s)
                //display upload bitrate
                var bit = " @ " + (data.bitrate / 1000.0 / 1000.0 / 8).toFixed(2) + " MB/sec"
                $('#bitrate').html(bit)
            }
        }).on('fileuploadchunkdone', function (e, data) {
            $('#upload_id').val(data.result.upload_id)
            u_id = data.result.upload_id
        }).bind('fileuploadchange', function (e, data) {
            var size = parseFloat(data.files[0].size)
            size = size / 1000000.0
            size = size.toFixed(2) + ' MB'
            $('#total_label').text(size)
            $('<div/>').addClass('alert alert-warning').html("<strong>" + data.files[0].name + "</strong>").appendTo($('#file_status_label'));
        })
    })

    //function called to finalised chunked upload
    function finalise_upload(e, data){
            //serialise form
            form = $('#fileupload').serializeFormJSON()
            token = $.cookie('csrftoken')
            var output;
            if(chunk_size > 0){
                //if we have a chunked upload, call the complete view method in django
                $.ajax({
                    headers: {'X-CSRFToken':token},
                    url: "/rest/complete_upload/",
                    type: "POST",
                    data: form,
                    success: update_html,
                    error: function(){
                        alert('error')
                        console.log($.makeArray(arguments));
                    },
                    dataType: 'json'
                })
            }
            else{
                //if we have a non chunked upload, just call the update_html method
                update_html(data)
            }
    }

    //update the html based on the results of the upload process
    function update_html(data){
        var x;
        if(chunk_size > 0){
            x = $(data.files)
        }
        else{
            x = $(data.result.files)
        }
        $('#fileupload').hide()
        $('#file_status_label').children().hide()
        for(var i = 0; i < x.size(); i++){


            $('<div/>').addClass('alert alert-success').html("<strong>" + x[i].name + "</strong> - " + x[i].size + "MB").appendTo($('#file_status_label')).fadeIn();
        }
        $('#upload_files_button span').text('Done')
        $('#upload_files_button').attr('disabled','disabled')
        $('#bitrate').hide()

        $('#file_id').val(x[0].id)


        //now call function to get md5 hash
        get_hash()
    }


    function get_hash(){
        $('#sine_image').fadeIn()
        $('#input_md5_checksum').val('Calculating...')
        id = $('#file_id').val()
        $.ajax({ url: "/rest/hash_upload/",
            type: "GET",
            data: {file_id: id},
            dataType: 'text'
        }).done(function(data){
            $('#input_md5_checksum').val(data)
            $('#sine_image').fadeOut()
        })
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