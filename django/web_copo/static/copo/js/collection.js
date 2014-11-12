/**
 * Created by fshaw on 11/11/14.
 */
$(document).ready( function(){
    get_form_data()
    $('#collection_type').change(function(){
        get_form_data()
    })
})

function get_form_data(){
    var c_type = $('#collection_type').val()

    $.ajax({
        type:"GET",
        url:"/rest/ena_study_form",
        async:false,
        dataType:"html",
        success:add_to_page,
        error:function(){
            alert('no json returned')
        },
        data:{collection_type:c_type}
    });

}

function add_to_page(data){
    $('#collapseOne .panel-body').html(data)
    //$('#collapseOne .panel-body').html()
    //$('body').html(data)
}