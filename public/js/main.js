$(document).ready(function(){
	$('.delete-article').on('click',function(e){
		$target = $(e.target);
		// console.log($target.attr('data-id')); return false;
		const id = $target.attr('data-id');
		$.ajax({
			type:'DELETE',
			url:'/article/'+id,
			success: function(response){
				alert('Deleting Article');
				window.location.href='/';
			},
			error: function(err){
				console.log(err);
			}
		});
	});
});	