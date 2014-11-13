/**
 * Created by fshaw on 11/11/14.
 */
$(document).ready( function(){
    get_study_form_data()
    get_sample_form_data()
    //add_validators()
    $('#collection_type').change(function(){
        get_study_form_data()
        //add_validators()
        get_sample_form_data()
    })



    //add validators to study form
    $('#ena_study_form, #ena_sample_form')
        .on('init.field.bv', function(e, data) {
            // data.bv      --> The BootstrapValidator instance
            // data.field   --> The field name
            // data.element --> The field element

            var $parent    = data.element.parents('.form-group'),
                $icon      = $parent.find('.form-control-feedback[data-bv-icon-for="' + data.field + '"]'),
                options    = data.bv.getOptions(),                      // Entire options
                validators = data.bv.getOptions(data.field).validators; // The field validators

            if (validators.notEmpty && options.feedbackIcons && options.feedbackIcons.required) {
                // The field uses notEmpty validator
                // Add required icon
                $icon.addClass(options.feedbackIcons.required).show();
            }
        })

        .on('status.field.bv', function(e, data) {
            // Remove the required icon when the field updates its status
            var $parent    = data.element.parents('.form-group'),
                $icon      = $parent.find('.form-control-feedback[data-bv-icon-for="' + data.field + '"]'),
                options    = data.bv.getOptions(),                      // Entire options
                validators = data.bv.getOptions(data.field).validators; // The field validators

            if (validators.notEmpty && options.feedbackIcons && options.feedbackIcons.required) {
                $icon.removeClass(options.feedbackIcons.required).addClass('fa');
            }
        })

        .bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                required: 'fa fa-asterisk',
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-refresh'
            },
            fields: {
                STUDY_TITLE: {
                    message: 'Study name not provided',
                    validators: {
                        notEmpty: {
                            message: 'Please provide a name for this study'
                        }
                    }
                },
                STUDY_ABSTRACT:{
                    message: 'Study Abstract not Provided',
                    validators:{
                        notEmpty: {
                            message: 'Please provide an abstract for this study (as it might appear in publication)'
                        }
                    }
                },
                TAXON_ID:{
                    message: 'Taxon ID must be provided',
                    validators:{
                        notEmpty:{
                            message: 'Please provide the taxonimic id for this sample'
                        },
                        integer:{
                            message: 'Taxon id be an integer number'
                        }
                    }
                }
            }
        })


})

function get_study_form_data(){
    var c_type = $('#collection_type').val()

    $.ajax({
        type:"GET",
        url:"/rest/ena_study_form",
        async:false,
        dataType:"html",
        success:function(data){
            $('#ena_study_form').html(data)
        },
        error:function(){
            alert('no json returned')
        },
        data:{collection_type:c_type}
    });

}

function get_sample_form_data(){
    var c_type = $('#collection_type').val()

    $.ajax({
        type:"GET",
        url:"/rest/ena_sample_form",
        async:false,
        dataType:"html",
        success:function(data){
            $('#ena_sample_form').html(data)
        },
        error:function(){
            alert('no json returned')
        },
        data:{collection_type:c_type}
    });

}

function add_validators(){
    var x = $('input[required="true"]').val()

    alert(x)
}