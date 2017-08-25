/*Archive with the commands for the rout with ajax on*/
// MAYBE INCLUDE JQUERY AND AJAX ON THIS FILE

//============ RACES ===============
<script>$(document).ready(function(){
        $("#racesNow").click(function(){
        $.get("/racesNow", function(data, status){
            $('#pageSub').replaceWith(data);
        });
    });
});
</script>

<script>
    $(document).ready(function(){
        $("#racesPast").click(function(){
        $.get("/racesPast", function(data, status){
            $('#pageSub').replaceWith(data);
        });
    });
});
    </script>

//==== CUPONS=============
<script>$(document).ready(function(){
        $("#cupons").click(function(){
        $.get("/cupons", function(data, status){
            $('#pageSub').replaceWith(data);
        });
    });
});</script>

//=====SAVE PLACES=================
<script>$(document).ready(function(){
        $("#locals").click(function(){
        $.get("/locals", function(data, status){
            $('#pageSub').replaceWith(data);
        });
    });
});</script>



//==== PROFILE BUTTON ==========================
<script>$(document).ready(function(){
        $("#perfil").click(function(){
        $.get("/perfil", function(data, status){
            $('#pageSub').replaceWith(data);
        });
    });
});</script>

// ======= DISCOVER ===================
<script>$(document).ready(function(){
        $("#discRest").click(function(){
        $.get("/discRest", function(data, status){
            $('#pageSub').replaceWith(data);
        });
    });
});</script>

<script>$(document).ready(function(){
        $("#discShows").click(function(){
        $.get("/discShows", function(data, status){
            $('#pageSub').replaceWith(data);
        });
    });
});</script>

<script>$(document).ready(function(){
        $("#discMalls").click(function(){
        $.get("/discMalls", function(data, status){
            $('#pageSub').replaceWith(data);
        });
    });
});</script>

<script>$(document).ready(function(){
        $("#discCine").click(function(){
        $.get("/discCine", function(data, status){
            $('#pageSub').replaceWith(data);
        });
    });
});</script>

<script>$(document).ready(function(){
        $("#discEvents").click(function(){
        $.get("/discEvents", function(data, status){
            $('#pageSub').replaceWith(data);
        });
    });
});</script>


