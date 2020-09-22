$(document).ready(function () {

    const options = {
        globalInputClass: 'hella-input',
        globalInputContainerClass: 'hella-container',
        globalInputFluidClass: 'hella-fluid',

        hellaPrefixDataName: 'hella-prefix',
        hellaPrefixClass: 'hella-prefix',

        hellaPlaceholderDataName: 'hella-placeholder',
        hellaPlaceholderClass: 'hella-placeholder',

        hellaPasswordToggleDataName: 'hella-password-toggle',
        hellaPasswordToggleClass: 'hella-password-toggle',

        hellaFileSelectorContainerClass: 'hella-file-selector-container',
        hellaFileSelectorClass: 'hella-file-selector',
        hellaFileNameClass: 'hella-file-name',
        hellaFileIconClass: 'file-selector-icon',

        hellaRadioContainerClass: 'hella-radio-container',
        hellaRadioSelectorClass: 'hella-radio-selector',
        hellaRadioLabelClass: 'hella-radio-label'

    }
    const hellaInputs = $('.' + options.globalInputClass)

    // Init
    function init() {
        $(hellaInputs).each(function (i, e) {
            const prefixIcon = $(e).data(options.hellaPrefixDataName)
            const placeholder = $(e).data(options.hellaPlaceholderDataName)
            const passwordToggle = $(e).data(options.hellaPasswordToggleDataName)

            const isRadio = $(e).attr('type') == 'radio'
            const isFluid = $(e).hasClass(options.globalInputFluidClass)
            const file = $(e).attr('type') == 'file'
            
            // Wrap each input with div
            $(e).wrap(function () { return "<div class='" + options.globalInputContainerClass + "'></div>"; })
            const parent = $(e).closest('.' + options.globalInputContainerClass);

            // If input has data-hella-prefix icon
            if (prefixIcon) {
                $(parent).prepend("<span class='" + options.hellaPrefixClass + " " + prefixIcon + "'></span>")
            }

            // If input has data-hella-placeholder
            if (placeholder) {
                $(parent).append("<span class='" + options.hellaPlaceholderClass + "'>" + placeholder + "</span>")
            }

            // If input has data-hella-password-toggle
            if (passwordToggle) {
                if ($(e).attr('type') == 'password') {
                    $(parent).prepend("<span class='" + options.hellaPasswordToggleClass + " fas fa-eye'></span>")
                } else {
                    $(parent).prepend("<span class='" + options.hellaPasswordToggleClass + " fas fa-eye-slash'></span>")
                }
            }

            // If input type is file
            if (file) {
                const fileFluid = isFluid ? options.globalInputFluidClass : '';
                $(e).wrap(function () { return "<div class='" + fileFluid + " " + options.hellaFileSelectorContainerClass + "'><label class='" + options.hellaFileSelectorClass + "'><span class='file-selector-icon fas fa-plus'></span></label></div>" })
            }

            if(isRadio) {
                const parent = $(e).closest('.' + options.globalInputContainerClass)
                const radio = $(parent).children('input[type=radio].hella-input')
                
                $(radio).wrap('<label class="' + options.hellaRadioLabelClass + '"></label>')
                        .after('<div class="' + options.hellaRadioSelectorClass + '"></div>')

                $(parent).addClass(options.hellaRadioContainerClass)
            }

        })
    } init()

    // Codes must be after init function
    const hellaPlaceholders = $('.' + options.hellaPlaceholderClass)
    const hellaPasswordTogglers = $('.' + options.hellaPasswordToggleClass)
    const hellaFileSelectors = $('.' + options.hellaFileSelectorClass).find('input[type=file].hella-input')

    $(hellaPlaceholders).on('click', function () {
        const parent = $(this).closest('.' + options.globalInputContainerClass)
        const input = $(parent).children('.' + options.globalInputClass)
        $(input).focus()
    })

    $(hellaInputs).on('click blur focus', function (e) {
        const parent = $(this).closest('.' + options.globalInputContainerClass)
        const input = $(parent).children('.' + options.globalInputClass)
        const placeholder = $(parent).children('.' + options.hellaPlaceholderClass)

        if (e.type == 'click' || e.type == 'focus') {
            if (placeholder) {
                activatePlaceholder(placeholder)
            }
        }
        else if (e.type == 'blur') {
            if ($(input).val().length == 0) {
                deactivatePlaceholder(placeholder)
            }
        }
    })

    $(hellaPasswordTogglers).on('click', function () {
        const parent = $(this).closest('.' + options.globalInputContainerClass)
        passwordToggle(parent)
    })

    $(hellaFileSelectors).on('click change', function (e) {
        if (e.type == 'change') {
            const files = hellaInputChange(this);
            if (files) {
                showFileName(files, this)
            }
        }
        if (e.type == 'click') {
            const icon = $(this).closest('.' + options.hellaFileSelectorClass).children('.' + options.hellaFileIconClass)
            if($(icon).hasClass('active')) {
                resetHellaFile(this)
                return false;
            }
        }
    })

    function activatePlaceholder(placeholder) {
        $(placeholder).removeClass('deactive').addClass('active')
    }

    function deactivatePlaceholder(placeholder) {
        $(placeholder).removeClass('active').addClass('deactive')
    }

    function passwordToggle(parent) {
        const input = $(parent).children('.' + options.globalInputClass)
        const toggler = $(parent).children('.' + options.hellaPasswordToggleClass)

        if ($(input).attr('type') == 'password') {
            $(input).attr('type', 'text')
            $(toggler).removeClass().addClass(options.hellaPasswordToggleClass + ' fas fa-eye-slash')
        } else {
            $(input).attr('type', 'password')
            $(toggler).removeClass().addClass(options.hellaPasswordToggleClass + ' fas fa-eye')
        }

    }

    function hellaInputChange(input) {
        const files = input.files;
        if (files.length > 0) {
            const fileIcon = $(input).closest('.' + options.hellaFileSelectorClass).children('.' + options.hellaFileIconClass)
            $(fileIcon).addClass('active')
            return files;
        }
        return null
    }

    function showFileName(files, input) {
        let filenames = "";
        $(files).each(function (i, e) {
            if (files.length == i + 1) {
                filenames += e.name
            } else {
                filenames += e.name + ', '
            }
        })
        const hellaSelectorContainer = $(input).closest('.' + options.hellaFileSelectorClass)
        const hellaFileName = $(hellaSelectorContainer).children('.' + options.hellaFileNameClass)
        const hellaFileCounter = $(hellaSelectorContainer).children('.hella-file-counter')
        
        if (hellaFileName.length > 0) {
            $(hellaFileName).text(filenames)
            $(hellaFileCounter).text(files.length)
        } else {
            $(hellaSelectorContainer).append('<span class="hella-file-name">' + filenames + '</span>')
                .append('<span class="hella-file-counter">' + files.length + '</span>')
        }
    }

    function resetHellaFile(hellaInput) {
        const hellaSelectorContainer = $(hellaInput).closest('.' + options.hellaFileSelectorClass)
        const hellaFileName = $(hellaSelectorContainer).children('.' + options.hellaFileNameClass)
        const hellaFileCounter = $(hellaSelectorContainer).children('.hella-file-counter')
        const icon = $(hellaInput).closest('.' + options.hellaFileSelectorClass).children('.' + options.hellaFileIconClass)
        
        $(hellaInput).val(undefined)
        $(hellaFileName).remove()
        $(hellaFileCounter).remove()
        $(icon).removeClass('active')
        return false;
    }

})