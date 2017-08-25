document.getElementById('submit2').addEventListener('click',function(){
    var userIds = $('.passInterestIds').map(function(){
    return $(this).text();
  }).get()
  cordinatesFinal = {'origin':origin,'destination':destination,'userId':userIds}
  $.post('/finalRoute',{
    data: JSON.stringify(cordinatesFinal),
    datatype:'json'
  }).done(function(data){
    location.href = data.redirect;
  });
});


$('input[type=checkbox]').on('change', function (e) {
      if ($('input[type=checkbox]:checked').length > 1) 
      {
        $(this).prop('checked', false);
        alert("Versão Aplha, apenas 2 usuários por carro");
      }
    });
/*If the checkbox is checked give a name to userId do Pass to Nodejs*/

var elements = $('input[type^=checkbox]');
elements.on('change', function(){
var idNr = $(this).attr('id').match(/\d+/)[0];
	if($(this).is(':checked')) 
	{
  		$('#user' + idNr).addClass('passInterestIds');
		}
	else 
	{
  		$('#user' + idNr).removeClass('passInterestIds');
	}
});

// ============= checkbox
