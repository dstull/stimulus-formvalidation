$(document).on 'turbolinks:load', ->
  return unless $('body[data-controller-name="cars"]').length > 0

  $('#car_make').select2
    placeholder: 'Please Select...'
    minimumResultsForSearch: 5
    theme: 'bootstrap'
    width: '100%'

  $('#car_color').select2
    placeholder: 'Please Select...'
    minimumResultsForSearch: 5
    theme: 'bootstrap'
    width: '100%'

  $('#car_model').select2
    placeholder: 'Please Select...'
    minimumResultsForSearch: 5
    theme: 'bootstrap'
    width: '100%'

  $('#addon_list').select2(
    placeholder: 'Enter Addons...'
    minimumResultsForSearch: 5
    theme: 'bootstrap'
    width: '100%'
  ).change () ->
    $('#car_addons').val($('#addon_list').select2('val'))
    $('#car_form').formValidation 'revalidateField', 'addon_list'
    return

  $('#followup_tag_list').select2(
    placeholder: 'Enter Follow Up Tags...'
    minimumResultsForSearch: 5
    theme: 'bootstrap'
    width: '100%'
    tags: true
    tokenSeparators: [',', ' ']
    createTag: (params) ->
      tagStr = params.term
      regex = /^[A-Z,a-z]+$/
      if (regex.test(tagStr))
        return {
          id: tagStr
          text: tagStr
        }
      return null
  ).change () ->
    $('#car_follow_up_tags').val($('#followup_tag_list').select2('val'))
    $('#car_form').formValidation 'revalidateField', 'followup_tag_list'
    return

  $('#car_form').formValidation()

$(document).on 'turbolinks:before-cache', ->
  $('.searchable-select').select2 'destroy'

@Cars =
  verifyName: (value, _validator) ->
    existingNames = $('#cars_list a:not(.active)').map(->
      @text
    ).get().join('|')
    regex = new RegExp('^(' + existingNames + ')$')
    !regex.test(value)
