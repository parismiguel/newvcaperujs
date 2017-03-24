// SideNav init
$(".button-collapse").sideNav();
var el = document.querySelector('.custom-scrollbar');
Ps.initialize(el);


//BACK TO TOP BUTTON ***********************************
var offset = 200;
var duration = 300;
$(window).scroll(function () {
    if ($(this).scrollTop() > offset) {
        $(".back-to-top").fadeIn(duration);
    } else {
        $(".back-to-top").fadeOut(duration);
    }
});

$(".back-to-top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, duration);
    return false;
});

function NotificationToast(type, message, title) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    toastr[type](message, title);
}

$(function () {
    $("form#contact-form").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            ContactName: "required",
            Subject: "required",
            Email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            Message: {
                required: true,
                minlength: 20
            }
        },
        // Specify validation error messages
        messages: {
            ContactName: "Por favor ingrese sus Nombres",
            Subject: "Por favor ingrese un Asunto del Mensaje",
            Message: {
                required: "Por favor ingrese un Mensaje",
                minlength: "El Mensaje debe tener mínimo 20 caracteres"
            },
            Email: "Correo Electrónico inválido"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            //form.submit();

            $.post('/Home/Contact', $("form#contact-form").serialize(), function (result) {
                // This is executed when the call to mail.php was succesful.
                // 'data' contains the response from the request
                //NotificationToast(result.type, result.msg, "Contacto");
                swal({
                    title: "Confirmación",
                    text: "Mensaje Enviado!",
                    type: "success"
                });
                $('form#contact-form')[0].reset();
            }).fail(function (result) {
                // This is executed when the call to mail.php failed.
                //NotificationToast(result.type, result, msg, "Contacto");
                swal({
                    title: "Error",
                    text: "Error de envío!",
                    type: "error"
                });
            });

            return false;

        }
    });

});
