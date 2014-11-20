/**
 * Created by fshaw on 11/11/14.
 */
$(document).ready( function(){
    study_form_data()
    sample_form_data()
    $('#collection_type').change(function(){
        study_form_data()
        sample_form_data()
    })

    $('#save_study').click(function(){
        //this callback saves the study to the database and returns the study id to the hidden field on the form
        var $inputs = $('#ena_study_form :input');

        // get an associative array of form the values.
        var form_values = {};
        $inputs.each(function() {
            form_values[this.name] = $(this).val();
        });
        //add values from attributes
        var attr_values = {};
       $inputs = $('#ena_study_form_attributes :input');
        $inputs.each(function() {
            attr_values[this.name] = $(this).val();
        });

        var inputs_json = JSON.stringify(form_values)
        var attr_json = JSON.stringify(attr_values)
        var collection_id = $('#collection_id').val()

        //now post to web service to save a new study
        $.ajax({
            type:"GET",
            url:"/rest/ena_new_study/",
            async:false,
            dataType:"text",
            success:function(data){
                alert('ook')
            },
            error:function(){
                alert('no json returned')
            },
            data:{values:inputs_json, attributes: attr_json, collection_id: collection_id}
        });
    })

    $('#study_add_attribute_button').click(function(){
        //need to update the hidden field containing counter for attribute ids
        var att_counter = parseInt($('#attr_counter').attr('value'))
        att_counter += 1
        $('#attr_counter').attr('value', att_counter)

        //add new html for the attribute
        var html = '<div class="form-group col-sm-10">' +
            '<label class="sr-only" for="tag_1">tag</label>' +
            '<label class="sr-only" for="value_1">value</label>' +
            '<label class="sr-only" for="unit_1">unit</label>' +
            '<input type="text" class="col-sm-3 attr" name="tag_' + att_counter + '" placeholder="attribute tag"></input>' +
            '<input type="text" class="col-sm-3 attr" name="value_' + att_counter + '" placeholder="attribute value"/></input>' +
            '<input type="text" class="col-sm-3 attr" name="unit_' + att_counter + '" placeholder="attribute unit (optional)"/></input>' +
            '</div>'
        $(html).insertBefore($('#study_button_p'))

    })

    $('#sample_add_attribute_button').click(function(){
        //need to update the hidden field containing counter for attribute ids
        var att_counter = parseInt($('#attr_counter').attr('value'))
        att_counter += 1
        $('#attr_counter').attr('value', att_counter)

        //add new html for the attribute
        var html = '<div class="form-group col-sm-10">' +
            '<label class="sr-only" for="tag_1">tag</label>' +
            '<label class="sr-only" for="value_1">value</label>' +
            '<label class="sr-only" for="unit_1">unit</label>' +
            '<input type="text" class="col-sm-3 attr" name="tag_' + att_counter + '" placeholder="tag"></input>' +
            '<input type="text" class="col-sm-3 attr" name="value_' + att_counter + '" placeholder="value"/></input>' +
            '<input type="text" class="col-sm-3 attr" name="unit_' + att_counter + '" placeholder="unit (optional)"/></input>' +
            '</div>'
        $(html).insertBefore($('#sample_button_p'))
        //make modal longer
        var height = $('.modal-body').height();
        $('.modal-body').height(height + 50)
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
            },
            message: 'This value is not valid',
            feedbackIcons: {
                required: 'fa fa-asterisk',
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-refresh'
            }
        })
})

function study_form_data(){
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

function sample_form_data(){
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
