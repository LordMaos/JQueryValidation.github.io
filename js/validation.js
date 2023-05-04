$(document).ready(function(){
    var error_mail = false;
    var error_password = false;
    var error_prenom = false;
    var error_nom = false;
    var error_pseudo = false;
    var error_confirmation = false;
    var error_phone = false;
   
    $(".alert").hide();    
    $(".help-block").hide();
    $("#envoi").prop("disabled", true);
    $("#confirmation").prop("disabled", true);
 
    $("#mail").keyup(function(){
        verif_mail();
        verif_envoyer();
        $("#bravo").hide();
        $("body").removeAttr("style");
    });
 
    $("#prenom").keyup(function(){
        verif_prenom();
        verif_envoyer();
        $("#bravo").hide();
        $("body").removeAttr("style");
    });

    $("#mdp").keyup(function(){
        verif_password();
        verif_confirmation();
         verif_envoyer();
         $("#bravo").hide();
         $("body").removeAttr("style");
    });

    $("#confirmation").keyup(function(){
        verif_confirmation();
        verif_envoyer();
        $("#bravo").hide();
        $("body").removeAttr("style");
    });

    $("#pseudo").keyup(function(){
        verif_pseudo();
        verif_envoyer();
        $("#bravo").hide();
        $("body").removeAttr("style");
    });

    $("#nom").keyup(function(){
        verif_nom();
        verif_envoyer();
        $("#bravo").hide();
        $("body").removeAttr("style");
    });

    $("#tel").keyup(function(){
        verif_phone();
        verif_envoyer();
        $("#bravo").hide();
        $("body").removeAttr("style");
    });

    $("#prenom").focusout(function(){
        var prenom_val=$("#prenom").val();
        prenom_val = prenom_val.replace(/^\s+/, "").replace(/\s{1,}$/, "").replace(/\s+/g, " ");
        $("#prenom").val(prenom_val);
    });

    $("#nom").focusout(function(){
        var nom_val=$("#nom").val();
        nom_val = nom_val.replace(/^\s+/, "").replace(/\s{1,}$/, "").replace(/\s+/, " ");
        $("#nom").val(nom_val);
    });

    $("#rafraichir").click(function(){
        $("#envoi").prop("disabled", true);
        $(".alert").hide();    
        $(".help-block").hide();
        $("#prenom").removeAttr("style");
        $("#nom").removeAttr("style");
        $("#pseudo").removeAttr("style");
        $("#mdp").removeAttr("style");
        $("#confirmation").removeAttr("style");
        $("#mail").removeAttr("style");
        $("#tel").removeAttr("style");
        $("body").removeAttr("style");
    })

    $("#envoi").click(function(){
        if(!error_mail && !error_phone && !error_prenom && !error_nom && !error_confirmation && !error_pseudo && !error_password){
            $("#bravo").show();
            $("#envoi").prop("disabled", true);    
            $(".help-block").hide();
            $("#prenom").removeAttr("style");
            $("#nom").removeAttr("style");
            $("#pseudo").removeAttr("style");
            $("#mdp").removeAttr("style");
            $("#confirmation").removeAttr("style");
            $("#mail").removeAttr("style");
            $("#tel").removeAttr("style");
            $(".champ").val("");
            $("body").attr("style","background-image: url('https://acegif.com/wp-content/gif/confetti-4.gif');");
        }
        else $("#erreur").show();
        event.preventDefault();   
    })

    function verif_envoyer(){
        if($("#mdp").val()!="" && $("#tel").val()!="" && $("#prenom").val()!="" && $("#nom").val()!="" && $("#pseudo").val()!="" && $("#mail").val()!="" && $("#confirmation").val()!="") 
            $("#envoi").prop("disabled", false);
        else $("#envoi").prop("disabled", true);
        if(!error_mail && !error_phone && !error_prenom && !error_nom && !error_confirmation && !error_pseudo && !error_password)
             $("#erreur").hide();
    }

    function verif_mail(){
        var mail_val=$("#mail").val();
        var pattern=new RegExp(/^[a-zA-Z0-9][\-_\.]{0,1}([a-zA-Z0-9][\-_\.]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i);
        if(!pattern.test(mail_val) && mail_val.length>0)
        {
            $("#mail").attr("style","border-color: red");
            $("#mail_error").show();
            error_mail = true;
        }
        else{ 
            error_mail = false;
            $("#mail_error").hide();
            if(mail_val.length>0) $("#mail").attr("style","border-color: #66ff00");
            else $("#mail").removeAttr("style");
        }
    }

    function verif_password(){
        var pass_length=$("#mdp").val().length;
        var pass_val=$("#mdp").val();
        if(pass_length>0) $("#confirmation").prop("disabled", false);
        var pattern= new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\-_()#@&'\.]).{6,20}$/g);
        if(!pattern.test(pass_val)&&pass_length>0){
            if(pass_length<6||pass_length>20) $("#password_error").html("Le mot de pass doit contenir entre 6 et 20 caractères");
            else $("#password_error").html("Le mot de passe doit contenir au mons 1 minuscule, 1 majuscule, 1 chiffre et un des caractères - _ . ( ) # @ &");
            $("#mdp").attr("style","border-color: red");
            $("#password_error").show();
            error_password = true;
        }
        else{ 
            error_password = false;
            if(pass_length>0) $("#mdp").attr("style","border-color: #66ff00");
            else {
                $("#mdp").removeAttr("style");
                $("#confirmation").prop("disabled", true);
            }
            $("#password_error").hide();
            
        }
        
    }

    function verif_confirmation(){
        var confirm_val=$("#confirmation").val();
        var pass_val=$("#mdp").val();
        if(confirm_val!=pass_val)
        {
            $("#confirmation_error").show();
            $("#confirmation").attr("style","border-color: red");
            error_confirmation = true;
        }
        else{
            error_confirmation = false;
            if(confirm_val.length>0) $("#confirmation").attr("style","border-color: #66ff00");
            else $("#confirmation").removeAttr("style");
            $("#confirmation_error").hide();
        }
    }

    function verif_pseudo(){
        var pseudo_val=$("#pseudo").val();
        var pattern=new RegExp(/^([a-zA-Z0-9]{1,}[\_]{0,1}[a-zA-Z0-9]+){0,20}$/g);
        if((pseudo_val.length<5||pseudo_val.length>20)&&pseudo_val.length>0){
            $("#pseudo").attr("style","border-color: red");
            $("#pseudo_error").html("Merci d'entrer un Pseudo de 5 à 20 caractères");
            $("#pseudo_error").show();
            error_pseudo = true;
        }
        else if(!pattern.test(pseudo_val) && pseudo_val.length>0)
        {
            $("#pseudo").attr("style","border-color: red");
            $("#pseudo_error").html("Le pseudo ne peut contenir que des lettres et un caractère _ entre d'autres caractères");
            $("#pseudo_error").show();
            error_pseudo = true;
        }
        else{ 
            error_pseudo = false;
            $("#pseudo_error").hide();
            if(pseudo_val.length>0) $("#pseudo").attr("style","border-color: #66ff00");
            else $("#pseudo").removeAttr("style");
        }
    }

    function verif_nom(){
        var nom_val=$("#nom").val();
        var pattern= new RegExp(/^[A-Z\ ÉÈÀ]+$/g);    var h=new RegExp(/^[]/g)
        if(!pattern.test(nom_val)&&nom_val.length>0){
            $("#nom").attr("style","border-color: red");
            $("#nom_error").show();
            error_nom = true;
        }
        else{ 
            error_nom = false;
            $("#nom_error").hide();
            if(nom_val.length>0) $("#nom").attr("style","border-color: #66ff00");
            else $("#nom").removeAttr("style");
        }
    }

    function verif_prenom(){
        var prenom_val=$("#prenom").val();
        var pattern= new RegExp(/^[a-z\ éèçâêà]+$/g);
        if(!pattern.test(prenom_val)&&prenom_val.length>0){
            $("#prenom").attr("style","border-color: red");
            $("#prenom_error").show();
            error_prenom = true;
        }
        else{ 
            error_prenom = false;
            $("#prenom_error").hide();
            if(prenom_val.length>0) $("#prenom").attr("style","border-color: #66ff00");
            else $("#prenom").removeAttr("style");
        }
    }

    function verif_phone(){
        var phone_val=$("#tel").val();
        var pattern1= new RegExp(/^0[0-9]{9,9}$/g);
        var pattern2= new RegExp(/^\+[1-9]{1,3} [1-9]{9,9}$/g);
        if((!pattern1.test(phone_val) && !pattern2.test(phone_val))&&phone_val.length>0){
            $("#tel").attr("style","border-color: red");
            $("#phone_error").show();
            error_phone = true;
        }
        else{ 
            error_phone = false;
            $("#phone_error").hide();
            if(phone_val.length>0) $("#tel").attr("style","border-color: #66ff00");
            else $("#tel").removeAttr("style");
        }
    }
});