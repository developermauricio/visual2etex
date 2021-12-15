<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
 


jQuery(document).ready(function( $ ){
  
  const btnViewUserRegister = jQuery(".view-user-register");  
  const btnViewUserLogin = jQuery(".view-connected-users");
  const btnViewSites = jQuery(".view-sites");
  const btnViewWalls = jQuery(".view-walls");
  const btnViewTypeWalls = jQuery(".view-types-walls");
  
  const elemContentUserRegister = jQuery("#userRegister");
  const elemContentUserLogin = jQuery("#userLogin");
  const elemContentSites = jQuery("#sitesApartament");
  const elemContentWalls = jQuery("#wallsApartament");
  const elemContentTypeWalls = jQuery("#typesWallsApartament");
  
  
  
  btnViewUserRegister.on('click', () => { getUserRegister("https://backend-etex.creategicalatina.com/api/user-register", elemContentUserRegister); });
  btnViewUserLogin.on('click', () => { getUserRegister('https://backend-etex.creategicalatina.com/api/user-login', elemContentUserLogin); });
  btnViewSites.on('click', () => { getInfoApartament('https://backend-etex.creategicalatina.com/api/get-list-scenes', elemContentSites); });
  btnViewWalls.on('click', () => { getInfoApartament('https://backend-etex.creategicalatina.com/api/get-list-walls', elemContentWalls, true); });
  btnViewTypeWalls.on('click', () => { getInfoApartament('https://backend-etex.creategicalatina.com/api/get-list-types-walls', elemContentTypeWalls, true, true); });
  
  const getUserRegister = ( url, elem ) => {
    jQuery.ajax({
      url: url,
      type: "GET",
      success: function (response) {
        elem.empty();
        elem.append( createTable(response.data) ); 
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error...', textStatus, errorThrown);
      }
    });
  }
  
  const getInfoApartament = ( url, elem, wall = false, typeWall = false ) => {
    jQuery.ajax({
      url: url,
      type: "GET",
      success: function (response) {
        elem.empty();
        elem.append( createTableInfoApartament(response.data, wall, typeWall) ); 
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error...', textStatus, errorThrown);
      }
    });
  }
  
  
  const createTable = (data) => {
    if( data.length == 0 ) {
      return `<div>
        <h3>No hay datos disponibles</h3>
        </div>`;
    }

    let i = 0;
    const tbody = data.map( user => {
      i++;
      let date = new Date(user.created_at);
      let format = date.toLocaleDateString('es-ES', { dateStyle: 'full', timeZone: 'America/Bogota' });
      
      return `<tr>
        <th scope="row">${i}</th>
        <td>${user.username}</td>
        <td>${user.email}</td>
		<td>${user.fullname}</td>
		<td>${user.profesion}</td>
		<td>${format}</td>
        </tr>`;
    }).join('');

    return `<table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre de usuario</th>
            <th scope="col">Email</th>
            <th scope="col">Nombre Completo</th>
            <th scope="col">Profesión</th>			
			<th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
        ${tbody}
        </tbody>
        </table>`;
  };  
  
  
  const createTableInfoApartament = ( data, wall, typeWall ) => {
    if( data.length == 0 ) {
      return `<div>
        <h3>No hay datos disponibles</h3>
        </div>`;
    }

    let i = 0;
    const tbody = data.map( info => {
      i++;
      let date = new Date(info.created_at);
      let format = date.toLocaleDateString('es-ES', { dateStyle: 'full', timeZone: 'America/Bogota' });
      
      return `<tr>
        <th scope="row">${i}</th>
        <td>${info.email}</td>
		<td>${info.fullname}</td>
		<td>${info.profesion}</td>
		<td>${info.location ? info.location : 'Indefinido'}</td>
		${wall ? `<td>${info.walls_reference}</td>` : ''}
		${typeWall ? `<td>${info.Type_reference}</td>` : ''}
		<td>${format}</td>
        </tr>`;
    }).join('');

    return `<table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Nombre Completo</th>
            <th scope="col">Profesión</th>
			<th scope="col">Sitio</th>
			${wall ? '<th scope="col">Referencia del muro</th>' : ''}
			${typeWall ? '<th scope="col">Tipo de muro</th>' : ''}
			<th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
        ${tbody}
        </tbody>
        </table>`;
  };  
  
});
</script>
<!-- end Simple Custom CSS and JS -->
