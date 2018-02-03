import {Controller} from 'stimulus'

export default class extends Controller {
    static targets = ['form', 'make', 'color', 'model', 'addons', 'addonsInput', 'follow', 'followInput']

    connect() {
        this.validationMount()
        this.select2mount($(this.makeTarget))
        this.select2mount($(this.colorTarget))
        this.select2mount($(this.modelTarget))
        this.multi2mount($(this.addonsTarget), $(this.addonsInputTarget))
        this.multiTag2mount($(this.followTarget), $(this.followInputTarget))

        document.addEventListener('turbolinks:before-cache', () => {
            this.select2unmount($(this.makeTarget))
            this.select2unmount($(this.colorTarget))
            this.select2unmount($(this.modelTarget))
            this.multi2unmount($(this.addonsTarget))
            this.multi2unmount($(this.followTarget))
        }, {once: true})

        window.Cars = {
            verifyName: function (value, _validator) {
                var existingNames = $('#cars_list a:not(.active)').map(function () {
                    return this.text;
                }).get().join('|')
                var regex = new RegExp('^(' + existingNames + ')$')
                return !regex.test(value)
            }
        }
    }

    select2mount(theSelect) {
        this.initSelect(theSelect)
    }

    multiTag2mount(theSelect, input) {
        const name = theSelect.attr('name')
        const placeholder = theSelect.data('placeholder')

        theSelect.select2({
            minimumResultsForSearch: 5,
            placeholder: placeholder,
            theme: 'bootstrap',
            width: '100%',
            tags: true,
            tokenSeparators: [',', ' '],
            createTag: (params) => {
                return this.validateTags(params.term)
            }
        }).change(() => {
            // we can cheat here and just change the input right away
            // since even if the validation fails the user will have to change to something
            // valid before the form allows submission
            input.val(theSelect.select2('val'))
            $(this.formTarget).formValidation('revalidateField', name)
        })
    }

    validateTags(tagStr) {
        var regex = /^[A-Z,a-z]+$/
        if (regex.test(tagStr)) {
            return {
                id: tagStr,
                text: tagStr
            }
        }
        return null
    }

    multi2mount(theSelect, input) {
        const name = theSelect.attr('name')


        this.initSelect(theSelect).change(() => {
            // we can cheat here and just change the input right away
            // since even if the validation fails the user will have to change to something
            // valid before the form allows submission
            input.val(theSelect.select2('val'))
            $(this.formTarget).formValidation('revalidateField', name)
        })
    }

    initSelect(theSelect) {
        const placeholder = theSelect.data('placeholder')

        return (theSelect.select2({
            minimumResultsForSearch: 5,
            placeholder: placeholder,
            theme: 'bootstrap',
            width: '100%'
        }))
    }

    select2unmount(theSelect) {
        this.saveState(theSelect)
        if ($(theSelect).data('select2')) {
            $(theSelect).select2('destroy')
        }
    }

    saveState(theSelect) {
        let value = theSelect.val()

        theSelect.find(`option[value="${value}"]`).attr('selected', 'selected')
    }

    multi2unmount(theSelect) {
        this.saveMultiState(theSelect)
        if ($(theSelect).data('select2')) { // something here where it tries to destroy 2x..and not found
            $(theSelect).select2('destroy')
        }
    }

    saveMultiState(theSelect) {
        let values = theSelect.val()

        if (values != null) {
            values.forEach((value) => {
                theSelect.find(`option[value="${value}"]`).attr('selected', 'selected')
            })
        }
    }

    validationMount() {
        $(this.formTarget).formValidation()
    }
}