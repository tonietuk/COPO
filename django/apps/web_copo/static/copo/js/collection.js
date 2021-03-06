/**
 * Created by fshaw on 11/11/14.
 */
$(document).ready( function(){
    $('#multiplex_checkbox').attr('checked', false);
    $('#delete_upload_group_button').hide()
    $('#upload_counter').val('0')
    $('#save_study').text('Save Study').removeAttr('disabled')
    $('input[name=exp_id]').val('')
    $('input[name=data_modal_id]').val()
    study_form_data()
    sample_form_data()
    exp_form_data()
    get_experimental_samples()
    get_experiment_table_data()
    $('#collection_type').change(function(){
        study_form_data()
        sample_form_data()
        exp_form_data()
    })

    $('#add_data_button').on('click', function(){
        $('input[name=data_modal_id]').val(generate_uid())
    })

    //check value of initial panel id
    var panel_id = $('input[name=panel_id]').val()
    if(panel_id == ""){
        var guid = generate_uid()
        $('input[name=panel_id]').val(generate_uid())
    }

    $('#select_platform').on('change', platform_change_handler)


    $('#add_upload_group_button').click(function(){
        var count = parseInt($('#upload_counter').val())
        count = count + 1
        html = get_upload_box_html(count, generate_uid())
        var dom = jQuery.parseHTML(html)
        $('#container').append(dom)
        $('#upload_counter').val(count)
        if(count > 1){
            $('#delete_upload_group_button').show()
        }
        get_experimental_samples(dom)
    })
    $('#delete_upload_group_button').click(function(){
        var count = parseInt($('#upload_counter').val())
        if(count > 1){
            count = count - 1;
            $('#container').children().last().remove()
            $('#upload_counter').val(count)
        }
        if(count == 1){
            $('#delete_upload_group_button').hide()
        }
    })
    $('#multiplex_checkbox').change(function(){
        //get value of the id of the upload box from hidden field
        var count = parseInt($('#upload_counter').val())
        if($('#multiplex_checkbox').is(':checked')){
            count = count + 1
            var html = get_upload_box_html(count, generate_uid())
            var dom = jQuery.parseHTML(html)
            $('#container').append(dom)

            //deal with csrf token
            var token = $('#hidden_attrs').children('input[name=csrfmiddlewaretoken]').val()
            $('input[name=csrfmiddlewaretoken]').val(token)

            $('#add_upload_group_button').show()

            $('#upload_counter').val(count)
            get_experimental_samples(dom)
        }
        else{
            count = count - 1
            $('#container').children().last().remove()
            $('#add_upload_group_button').hide()
            $('#delete_upload_group_button').hide()
            $('#upload_counter').val(count)
        }
    })




    //function to save study
    $('#save_study').click(function(){
        //first validate form
        var bootstrapValidator = $('#ena_study_form').data('bootstrapValidator');
        if(bootstrapValidator.isValid()){

            //this callback saves the study to the database and returns the study id to the hidden field on the form
            var $inputs = $('#ena_study_form :input');

            // get an associative array of form the values.
            var form_values = {};
            $inputs.each(function() {
                form_values[this.name] = $(this).val();
            });
            //add values from attributes
            var attr_values = [];
            inputs = $('.attr_vals');
            for(var k = 0; k < inputs.length; k++) {
                var els = []
                childs = $(inputs[k]).children()

                for(var i = 0; i < childs.length; i++){
                    els[i] = $(childs[i]).val()
                }
                attr_values[attr_values.length] = els
            }

            var inputs_json = JSON.stringify(form_values)
            var attr_json = JSON.stringify(attr_values)
            var collection_id = $('#collection_id').val()
            var study_id = $('#study_id').val()

            //now post to web service to save a new study
            $.ajax({
                type:"GET",
                url:"/rest/ena_new_study/",
                async:false,
                dataType:"json",
                success:function(data){
                    if(data.return_value == true){
                        $('#save_study').text('Saved').attr('disabled','disabled')
                        $('#study_id').val(data.study_id)
                    }
                },
                error:function(){
                    alert('no json returned')
                },
                data:{values:inputs_json, attributes: attr_json, collection_id: collection_id, study_id: study_id}
            });
        }
        else{
            bootstrapValidator.validate()
        }
    })

    //function to save sample
    $('#p_save_sample').click(function(){
        //make obj from form values
        var form = $('#ena_sample_form').serializeFormJSON()

        //make obj from attribute values
        var attr_values = [];
        inputs = $('.sample_attr_vals');
        for(var k = 0; k < inputs.length; k++) {
            var els = []
            childs = $(inputs[k]).children()

            for(var i = 0; i < childs.length; i++){
                els[i] = $(childs[i]).val()
            }
            attr_values[attr_values.length] = els
        }

        //get collection id
        var collection_id = $('#collection_id').val()
        //get sample id
        var sample_id = $('#sample_id').val()
        //get study id
        var study_id = $('#study_id').val()

        //now post to web service to save new sample
        $.ajax({
            type:"GET",
            url:"/rest/ena_new_sample/",
            async:false,
            dataType:"html",
            success:function(data){
                //insert data into samples table
                $('#sample_table_tr').nextAll().remove()
                $(data).insertAfter('#sample_table_tr')
                $('#newSampleModal').modal('hide')
            },
            error:function(){
                alert('no json returned')
            },
            data:{sample_details:JSON.stringify(form), sample_attr:JSON.stringify(attr_values), collection_id: collection_id, study_id: study_id, sample_id:sample_id}
        });
    })

    //function to save experiment
    $('#btn_save_data').on('click', function(){
        //get common fields

        var token = $.cookie('csrftoken')
        var common = {}
        common.study = $('#study_id').val()
        common.platform = $('#select_platform').val()
        common.model = $('#select_instrument_model').val()
        common.lib_source = $('#select_library_source').val()
        common.lib_selection = $('#select_library_selection').val()
        common.lib_strategy = $('#select_library_strategy').val()
        common.insert_size = $('#input_insert_size').val()

        common = JSON.stringify(common)
        //now iterate for each file group box
        //each of these will produce a separate experiment
        //object using controls in the container and the common values above
        var num_panels = $('#container').children('.row').size()
        $('#container').children('.row').each(function(key_1, panel){
            //get all the alert success labels. Each of these contains the file id
            //of a previously uploaded file
            var per_panel = {}
            var panel_files = []
            var panel_hashes = []
            var p = $(panel)

            //get input to store experiment_id later on
            var exp_input = p.find('input[name=exp_id]')
            per_panel.experiment_id = $(exp_input).val()
            p.find('input[name=file_id]').each(function(key_2, hidden_id){
                //this is the file id
                panel_files[key_2] = $(hidden_id).val()
            })
            per_panel.files = panel_files
            p.find('.hash_span').each(function(key_2, hash_span){
                //now need to get file hash
                panel_hashes[key_2] = $(hash_span).text()
            })
            per_panel.hashes = panel_hashes
            //now get the non-common elements for each panel box
            per_panel.file_type = p.find('#select_file_type').val()
            per_panel.lib_name = p.find('#input_library_name').val()
            per_panel.sample_id = p.find('#select_sample_ref').val()
            per_panel.panel_id = p.find('input[name=panel_id]').val()
            per_panel.panel_ordering = p.find('input[name=panel_ordering]').val()
            per_panel.data_modal_id = p.parents().eq(6).find('input[name=data_modal_id]').val()
            per_panel = JSON.stringify(per_panel)

            $.ajax({
                type:'POST',
                url: "/rest/save_experiment/",
                headers: {'X-CSRFToken':token},
                data:{'common':common, 'per_panel':per_panel},
                dataType:'json',
                success: function(data){
                    $(exp_input).val(data.experiment_id)
                    if(key_1 == num_panels-1){
                        $('#newDataModal').modal('hide')
                    }
                },
                error: function(data){
                    alert(data)
                }
            })
        })
        $('newDataModal').modal('hide')
    })



    //function to add new attribute to study html
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
        '<div class="attr_vals">' +
        '<input type="text" class="col-sm-3 attr" name="tag_' + att_counter + '" placeholder="attribute tag"></input>' +
        '<input type="text" class="col-sm-3 attr" name="value_' + att_counter + '" placeholder="attribute value"/></input>' +
        '<input type="text" class="col-sm-3 attr" name="unit_' + att_counter + '" placeholder="attribute unit (optional)"/></input>' +
        '</div>' +
        '</div>'
        $(html).insertBefore($('#study_button_p'))

    })

    //function to add new attribute to sample html
    $('#sample_button_p').on('click', function(){

        //need to update the hidden field containing counter for attribute ids
        var att_counter = parseInt($('#sample_attr_counter').attr('value'))
        att_counter += 1
        $('#attr_counter').attr('value', att_counter)

        //add new html for the attribute
        var html = '<div class="form-group col-sm-10">' +
            '<label class="sr-only" for="tag_1">tag</label>' +
            '<label class="sr-only" for="value_1">value</label>' +
            '<label class="sr-only" for="unit_1">unit</label>' +
            '<div class="sample_attr_vals">' +
            '<input type="text" class="col-sm-3 attr" name="tag_' + att_counter + '" placeholder="tag"></input>' +
            '<input type="text" class="col-sm-3 attr" name="value_' + att_counter + '" placeholder="value"/></input>' +
            '<input type="text" class="col-sm-3 attr" name="unit_' + att_counter + '" placeholder="unit (optional)"/></input>' +
            '</div></div>'
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
    //function to populate the study panel
    function study_form_data(){
        var c_type = $('#collection_type').val()
        var c_id = $('#collection_id').val()
        var study_id = $('#study_id').val()
        //get the contents of the panel (excluding attributes)
        $.ajax({
            type:"GET",
            url:"/rest/ena_study_form/",
            async:false,
            dataType:"html",
            success:function(data){
                $('#ena_study_form').html(data)
            },
            error:function(){
                alert('no json returned')
            },
            data:{collection_type:c_type, collection_id:c_id, study_id:study_id}
        });
        //now get attibutes
        $.ajax({
            type:"GET",
            url:"/rest/ena_study_form_attr/",
            async:false,
            dataType:"html",
            success:function(data){
                if(data != 'not found'){
                    $('#attribute_group').empty()
                    $(data).insertBefore($('#study_button_p'))
                }
            },
            error:function(){
                alert('no json returned')
            },
            data:{collection_id:c_id}
        });
    }

    //function to populate the sample input modal
    function sample_form_data(){
        var c_type = $('#collection_type').val()
        var c_id = $('#collection_id').val()
        $.ajax({
            type:"GET",
            url:"/rest/ena_sample_form/",
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
        $.get( "/rest/populate_samples_form/",
            {
                collection_id:c_id
            },
            function( data ) {
                $(data).insertAfter('#sample_table_tr')
                sample_table_handler()
            }
        );
    }

    function exp_form_data(){
        $.get( "/rest/populate_data_dropdowns/",
            function( data ) {
                $('#select_library_strategy').append(data.strategy_dd)
                $('#select_library_selection').append(data.selection_dd)
                $('#select_library_source').append(data.source_dd)
                platform_change_handler()
            }
        );
    }

    function platform_change_handler(){
        var val = $('#select_platform').val()
        $.get( "/rest/get_instrument_models/",
        {
            'dd_value':val
        },
        function( data ) {
            $('#select_instrument_model').empty().append(data)
        });
    }

    function get_experimental_samples(context){
        var study_id = $('#study_id').val()
        $.get( "/rest/get_experimental_samples/",
        {
            'study_id':study_id
        },
        function(data){

            var out = ''
            for(var k = 0; k < data.length; k++){
                out += '<option value="' + data[k].pk + '">'
                out += data[k].fields.title
                out += ' - '
                out += data[k].fields.scientific_name
                out += '</option>'
            }
            if(context == undefined){
                $('select[name=select_sample_ref]').empty().append(out)
            }
            else{
                $(context).find('select[name=select_sample_ref]').empty().append(out)
            }
        });
    }

    function sample_table_handler(){
        //handle clicks on sample table
        $('#sample_table').find('a').on('click', function(e){
            e.preventDefault()
            var url = $(this).attr('rest_url')
            //now call web service to get content for sample panel
            var service = url.substring(0, url.lastIndexOf("/")) + '/'
            var id = url.substring(url.lastIndexOf("/") + 1, url.length)
            $.get(service,
                {
                    'sample_id':id
                },
                function(data){
                    //add returned data to the form
                    $('#sample_id').val(data.sample_id)
                    $('#TITLE').val(data.title)
                    $('#TAXON_ID').val(data.taxon_id)
                    $('#SCIENTIFIC_NAME').val(data.scientific_name)
                    $('#COMMON_NAME').val(data.common_name)
                    $('#ANONYMIZED_NAME').val(data.anonymized_name)
                    $('#INDIVIDUAL_NAME').val(data.individual_name)
                    $('#DESCRIPTION').val(data.description)
                    //make changes for attributes
                    var at = JSON.parse(data.attributes)
                    str = ''
                    for(var x = 0; x < at.length; x++){

                        str += '<div class="form-group col-sm-10 attribute_group">'
                        str += '<div class="sample_attr_vals">'
                        str += '<input type="text" class="col-sm-3 attr" name="tag_' + at[x].fields.id + '" value="' + at[x].fields.tag + '"placeholder="tag"/>'
                        str += '<input type="text" class="col-sm-3 attr" name="value_' + at[x].fields.id + '" value="' + at[x].fields.value + '"placeholder="value"/>'
                        str += '<input type="text" class="col-sm-3 attr" name="unit_' + at[x].fields.id + '" value="' + at[x].fields.unit + '"placeholder="unit"/>'
                        str += '</div>'
                        str += '</div>'

                    }
                    $('.sample_attr_vals').remove()
                    $(str).insertBefore($('#sample_button_p'))
                    $('#newSampleModal').modal('show')
                }
            )
        })
    }

    function get_experiment_table_data(){
        var study_id = $('#study_id').val()
        $.get( "/rest/get_experiment_table_data/",
            {
                study_id:study_id
            },
            function( data ) {
                //initialise string
                var str =''
                var data = $.parseJSON(data)
                console.log(data)
                for (x in data){
                    var row = data[x]
                    str = str + '<tr>'

                    str = str + '<td data-exp_id="' + row['data_modal_id'] + '"><a>' + row['platform'] + '</a></td>'
                    str = str + '<td>' + row['group_size'] + '</td>'
                    str = str + '<td>' + row['last_modified'] + '</td>'

                    str = str + '</tr>'
                }
                $('#exp_table tr').after(str)
            }
        );
    }


})