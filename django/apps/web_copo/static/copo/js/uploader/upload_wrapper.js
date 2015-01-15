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
    $('#upload_info_count').val('0')
    $('#progress').hide()

    $(function () {
    'use strict';
        //file upload plugin
        var s;
        $('#fileupload').fileupload({
            dataType: 'json',
            headers: {'X-CSRFToken':token},
            progressInterval: '300',
            bitrateInterval: '300',
            maxChunkSize: chunk_size,
            singleFileUploads: true,
            sequentialUploads: true,
            fail: function(e, data){
                alert('FAIL!!!')
            },
            done: function(e, data){
                var final = $('#upload_id').val()
                $('#upload_id').val('')
                finalise_upload(e, data, final)
            },
            error: function(e, data){
                console.log($.makeArray(arguments));
            },
            processstart: function(e, data){
                $('#progress').show()

            },
            add: function(e, data) {
                data.submit();
            },
            progress: function(e, data){
                //get name of the file for which the progress update is for
                var file_name = data.files[0].name
                file_name = file_name.substr(0, file_name.indexOf('.'))
                //increment progress bar
                var progress = parseInt(data.loaded / data.total * 100, 10);
                var selector = '#progress_' + file_name
                $(selector + ' .bar').css(
                    'width',
                    progress + '%'
                );
                //display uploaded bytes
                var uploaded = parseFloat(data.loaded) / 1000000.0
                s = uploaded.toFixed(2) + " MB of"
                $('#progress_info_' + file_name).children('#progress_label').html(s)
                //display upload bitrate
                var bit = " @ " + (data.bitrate / 1000.0 / 1000.0 / 8).toFixed(2) + " MB/sec"
                $('#progress_info_' + file_name).children('#bitrate').html(bit)
            }
        }).on('fileuploadchunkdone', function (e, data) {

            var file_name = data.files[0].name.substr(0, data.files[0].name.indexOf('.'))
            $('#upload_id').val(data.result.upload_id)

        }).bind('fileuploadchange', function (e, data) {
            for(var k = 0; k < data.files.length; k++){
                var size = parseFloat(data.files[k].size)
                size = size / 1000000.0
                size = size.toFixed(2) + ' MB'
                var file_name = data.files[k].name.substr(0, data.files[k].name.indexOf('.'))
                $('#upload_files_button').attr('disabled','disabled')
                $('<div/>').addClass('alert alert-warning').attr('id', 'id_' + file_name).html("<strong>" + file_name + "</strong>").appendTo($('#file_status_label'));

                var html = '<div id="progress_info_' + file_name + '" class="progress_info">' +
                            '<input type="hidden" id="upload_id_' + file_name + '" value="" />' +
                            '<span id="progress_label"></span>' +
                            '<span id="total_label"> of ' + size + '</span>' +
                            '<span id="bitrate"></span>' +
                            '</div>' +
                            '<div id="progress_' + file_name + '" class="progress">' +
                            '<div style="width: 0%;height: 20px;background: green" class="bar"></div>' +
                            '<div class="progress-bar progress-bar-success"></div>' +
                            '</div>'
                 $(html).appendTo($('#file_status_label'));
            }
        })
    })

    //function called to finalised chunked upload
    function finalise_upload(e, data, final){
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
                    data: {'upload_id':final},
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


        for(var i = 0; i < x.size(); i++){
            var file_name = x[i].name
            file_name = file_name.substr(0, file_name.indexOf('.'))
            $('#progress_' + file_name).hide()
            $('#progress_info_' + file_name).hide()
            $('#id_' + file_name).hide()
            $('<div/>').addClass('alert alert-success').html("<input type='hidden' value='" + x[i].id + "'/> <ul class='list-inline'><li><strong>" + x[i].name + "</strong></li>-<li>" + x[i].size + " MB</li></ul>").insertAfter($('#id_' + file_name)).fadeIn();
        }

        if($.active < 2){

            $('#upload_files_button').removeAttr('disabled')
        }

        //now call function to get md5 hash
        get_hash(x[0].id)
    }


    function get_hash(id){
        $('#sine_image').fadeIn()


        $.ajax({ url: "/rest/hash_upload/",
            type: "GET",
            data: {file_id: id},
            dataType: 'text'
        }).done(function(data){
            //now find the correct div and append the hash to it
            var obj = jQuery.parseJSON(data)
            $d = $( "input[value='" + obj.file_id + "']" ).parent()
            html = '<h5><span class="label label-success">' + obj.output_hash + '</span></h5>'
            $d.children('ul').append(html)
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