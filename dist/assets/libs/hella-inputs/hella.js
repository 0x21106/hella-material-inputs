$(document).ready(function () {

    const options = {
        globalInputClass: 'hella-input',
        globalInputContainerClass: 'hella-container',

        hellaPrefixDataName: 'hella-prefix',
        hellaPrefixClass: 'hella-prefix',

        hellaPlaceholderDataName: 'hella-placeholder',
        hellaPlaceholderClass: 'hella-placeholder',

        hellaPasswordToggleDataName: 'hella-password-toggle',
        hellaPasswordToggleClass: 'hella-password-toggle',
    }
    const hellaInputs = $('.' + options.globalInputClass)

    // Init
    function init() {
        $(hellaInputs).each(function (i, e) {
            const prefixIcon = $(e).data(options.hellaPrefixDataName)
            const placeholder = $(e).data(options.hellaPlaceholderDataName)
            const passwordToggle = $(e).data(options.hellaPasswordToggleDataName)

            // Wrap each input with div
            $(e).wrap(function () { return "<div class='" + options.globalInputContainerClass + "'></div>"; })

            // If input has data-hella-prefix icon
            if (prefixIcon) {
                $(e).closest('.' + options.globalInputContainerClass).prepend("<span class='" + options.hellaPrefixClass + " " + prefixIcon + "'></span>")
            }
            if (placeholder) {
                $(e).closest('.' + options.globalInputContainerClass).append("<span class='" + options.hellaPlaceholderClass + "'>" + placeholder + "</span>")
            }
            if(passwordToggle) {
                if($(e).attr('type') == 'password') {
                    $(e).closest('.' + options.globalInputContainerClass).prepend("<span class='" + options.hellaPasswordToggleClass + " fas fa-eye'></span>")
                } else {
                    $(e).closest('.' + options.globalInputContainerClass).prepend("<span class='" + options.hellaPasswordToggleClass + " fas fa-eye-slash'></span>")
                }
            }

        })
    } init()

    // Codes must be after init function
    const hellaPlaceholders = $('.' + options.hellaPlaceholderClass)
    const hellaPasswordTogglers = $('.' + options.hellaPasswordToggleClass)

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

    $(hellaPasswordTogglers).on('click', function() {
        const parent = $(this).closest('.' + options.globalInputContainerClass)
        passwordToggle(parent)
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

        if($(input).attr('type') == 'password') {
            $(input).attr('type', 'text')
            $(toggler).removeClass().addClass(options.hellaPasswordToggleClass + ' fas fa-eye-slash')
        } else {
            $(input).attr('type', 'password')
            $(toggler).removeClass().addClass(options.hellaPasswordToggleClass + ' fas fa-eye')
        }

    }

})