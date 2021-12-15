<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
let down = true;

function scrollBottom( idElement ) { 
  
  if ( document.querySelector('#' + idElement).parentElement.parentElement.scrollTop > 50 ) {
    document.querySelector('#' + idElement).parentElement.parentElement.scroll({ top: 0, behavior: 'smooth' });  
    document.querySelector('#' + idElement + ' .icon-arrow-down').style.transform = 'rotate(0deg)';
  } else {
    document.querySelector('#' + idElement).parentElement.parentElement.scrollBy({ top: 600, behavior: 'smooth' });
    document.querySelector('#' + idElement + ' .icon-arrow-down').style.transform = 'rotate(180deg)';
  }
}


</script>
<!-- end Simple Custom CSS and JS -->
