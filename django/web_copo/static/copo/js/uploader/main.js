$(function () {
'use strict';
    $('#fileupload').fileupload({
		dataType: 'json',
		progressInterval: '10',
		maxChunkSize: 10000000,
		fail: function(e, data){
		    alert('FAIL!!!')
		},
        done: function(e, data){
            var x = $(data.result.files)
            for(var i = 0; i < x.size(); i++){
                $('<div/>').addClass('alert alert-success').html("<strong>" + x[i].name + "</strong> - " + x[i].size + "MB").appendTo(this);
            }
            $('#upload_files_button span').text('Done')
            $('#upload_files_button').attr('disabled','disabled')
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
    })
})