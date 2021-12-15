<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
jQuery(document).ready(function( $ ){
    
	const elementGoPasilloEntrada = jQuery('#pasilloEntrada'); 
	const elementGoEntrada = jQuery('#entrada'); 
	const elementGoSala = jQuery('#sala'); 
	const elementGoBalconSala = jQuery('#balconSala'); 
	const elementGoCocina = jQuery('#cocina');
  	const elementGoBalconCocina = jQuery('#balconcocina');
	const elementGoCuartoServicio = jQuery('#cuartoServicio'); 
	const elementGoArmario = jQuery('#armario');  
	const elementGoPasilloPrincipal = jQuery('#pasilloPrincipal'); 
	const elementGoBanoServicio = jQuery('#banoServicio'); 
	const elementGoHabitacionOne = jQuery('#habitacionOne'); 
	const elementGoHabitacionOneBano = jQuery('#habitacionOneBano'); 
	const elementGoHabitacionOneBalcon = jQuery('#habitacionOneBalcon'); 
	const elementGoHabitacionTwo = jQuery('#habitacionTwo'); 
	const elementGoHabitacionTwoArmario = jQuery('#habitacionTwoArmario'); 
	const elementGoHabitacionTwoBano = jQuery('#habitacionTwoBano'); 
	const elementGoHabitacionTwoBalcon = jQuery('#habitacionTwoBalcon'); 
    const elementGoHabitacionThree = jQuery('#habitacionThree'); 
	const elementGoArmarioHabitacionThree = jQuery('#estudio'); 
	const elementGoHabitacionThreeBano = jQuery('#habitacionThreeBano'); 
	const elementGoHabitacionThreeBalcon = jQuery('#habitacionThreeBalcon'); 
    const elementText = jQuery('#textMap');


    
    const itemEntrada = jQuery('.info-box-entrada'); 
    const itemSala = jQuery('.info-box-sala'); 
    const itemCocinaComedor = jQuery('.info-box-cocina-comedor'); 
    const itemBanoSocial = jQuery('.info-box-bano-social'); 
    const itemHabitacionPrincipal = jQuery('.info-box-habitacion-principal'); 


     
    const urlMarker = "/wp-content/uploads/2021/10/icon-map-view-blanco.png"  
    const urlActiveMarker = "/wp-content/uploads/2021/10/icon-ubicacion-actual-color.png"
    const mainUrl = "https://backend.visual2etex.com/";
    const urlScene = "api/register-scene";
    const urlclick = "api/register-click";
    const urlWall = "api/register-wall";
    const urlTypeWall = "api/register-type-wall";
    const urlFile = "api/register-file";

    let markerActive = false;
    let idCurrentMarker = '';


     
    const dataMarkers = [  // revisar la referencia del muro por defecto
        { nameMarker: "Ingresar", idMarker: "2F488BA48C", nameScene: "Entrada", idScene: "AB9E2B7BF7", wall: "", typeModel: ""  },
        { nameMarker: "M22", idMarker: "05EC7020D2", nameScene: "Entrada", idScene: "AB9E2B7BF7", wall: "M22", typeModel: "Good 100 Duc - Esc"  },
        { nameMarker: "M22 - 2", idMarker: "BA8C27C277", nameScene: "Entrada", idScene: "AB9E2B7BF7", wall: "M22", typeModel: "Good 100 Duc - Esc"  },
        { nameMarker: "M21", idMarker: "887628CBB5", nameScene: "Entrada", idScene: "AB9E2B7BF7", wall: "M21", typeModel: "Good 008"  },
        { nameMarker: "M21 - 2", idMarker: "28AF0BDD50", nameScene: "Entrada", idScene: "AB9E2B7BF7", wall: "M21", typeModel: "Good 008"  },
        { nameMarker: "M23", idMarker: "567A1BBC43", nameScene: "Entrada", idScene: "AB9E2B7BF7", wall: "M23", typeModel: "Good 008"  },
        { nameMarker: "M29", idMarker: "B7D702D8A3", nameScene: "Entrada", idScene: "AB9E2B7BF7", wall: "M29", typeModel: "Better 100"  },

        { nameMarker: "Ir a la entrada", idMarker: "EA8CD5F710", nameScene: "Pasillo de entrada", idScene: "919521B462", wall: "", typeModel: ""  },
      	{ nameMarker: "Ir a la sala", idMarker: "BB032C4C0A", nameScene: "Pasillo de entrada", idScene: "919521B462", wall: "", typeModel: ""  },
      	{ nameMarker: "Ir al pasillo", idMarker: "55DF38FE0C", nameScene: "Pasillo de entrada", idScene: "919521B462", wall: "", typeModel: ""  },
        { nameMarker: "Ir a la cocina", idMarker: "BA40633CE4", nameScene: "Pasillo de entrada", idScene: "919521B462", wall: "", typeModel: ""  },
        { nameMarker: "M29", idMarker: "69D946DEA9", nameScene: "Pasillo de entrada", idScene: "919521B462", wall: "M29", typeModel: "Better 100"  },
        { nameMarker: "M29 - 2", idMarker: "A8D5AC86FF", nameScene: "Pasillo de entrada", idScene: "919521B462", wall: "M29", typeModel: "Better 100"  },

      	{ nameMarker: "Ir al pasillo de entrada", idMarker: "63E7E89B19", nameScene: "Sala", idScene: "2db264c2", wall: "", typeModel: "" },
        { nameMarker: "Ir a la cocina", idMarker: "FD05F4E50C", nameScene: "Sala", idScene: "2db264c2", wall: "", typeModel: "" },        
      	{ nameMarker: "Ir al pasillo", idMarker: "98A1EE0C88", nameScene: "Sala", idScene: "2db264c2", wall: "", typeModel: "" },
        { nameMarker: "Ir a la terraza", idMarker: "C66BD770F8", nameScene: "Sala", idScene: "2db264c2", wall: "", typeModel: "" },
        { nameMarker: "Vídeo de instalación", idMarker: "430FDAFFF0", nameScene: "Sala", idScene: "2db264c2", wall: "", typeModel: "" },
        { nameMarker: "M23", idMarker: "2792062DA0", nameScene: "Sala", idScene: "2db264c2", wall: "M23", typeModel: "Good 008" },
        { nameMarker: "M28", idMarker: "46C77F6324", nameScene: "Sala", idScene: "2db264c2", wall: "M28", typeModel: "Good 094Par" },
        { nameMarker: "M7", idMarker: "724EE089E9", nameScene: "Sala", idScene: "2db264c2", wall: "M7", typeModel: "Good 051" },
        { nameMarker: "M5", idMarker: "46C6D2B373", nameScene: "Sala", idScene: "2db264c2", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M2", idMarker: "EEA2A27C91", nameScene: "Sala", idScene: "2db264c2", wall: "M2", typeModel: "Good 001" },

        { nameMarker: "Ir a la sala", idMarker: "DF74B7CD24", nameScene: "Balcón sala", idScene: "F2D6FC551C", wall: "", typeModel: "" },
        { nameMarker: "M30", idMarker: "EEBF32C5F0", nameScene: "Balcón sala", idScene: "F2D6FC551C", wall: "M30", typeModel: "Better 089Par Residencial" },

        { nameMarker: "Ir al pasillo de entrada", idMarker: "93389F5F05", nameScene: "Cocina - Comedor", idScene: "271e0e62", wall: "", typeModel: "" },
      	{ nameMarker: "Ir a la sala", idMarker: "646681D758", nameScene: "Cocina - Comedor", idScene: "271e0e62", wall: "", typeModel: "" },
        { nameMarker: "Ir cuarto de servicios", idMarker: "78A72BEC47", nameScene: "Cocina - Comedor", idScene: "271e0e62", wall: "", typeModel: "" },
      	{ nameMarker: "Ir al balcón", idMarker: "3237D058C2", nameScene: "Cocina - Comedor", idScene: "271e0e62", wall: "", typeModel: "" },
        { nameMarker: "M28", idMarker: "11C2E343F6", nameScene: "Cocina - Comedor", idScene: "271e0e62", wall: "M28", typeModel: "Good 094Par" },
        { nameMarker: "M13", idMarker: "B7AB1FBF22", nameScene: "Cocina - Comedor", idScene: "271e0e62", wall: "M13", typeModel: "Better 011" },
        { nameMarker: "M16", idMarker: "FA8796CCEF", nameScene: "Cocina - Comedor", idScene: "271e0e62", wall: "M16", typeModel: "Good 051" },
      
      	{ nameMarker: "Ir a la cocina", idMarker: "B28F6BA472", nameScene: "Balcón cocina", idScene: "878AFA9F7D", wall: "", typeModel: "" },

        { nameMarker: "Ir cuarto armario", idMarker: "93F1CB6C0F", nameScene: "Cuarto de servicio", idScene: "9CDD67E66C", wall: "", typeModel: "" },
        { nameMarker: "Ir a la cocina", idMarker: "F67920AB32", nameScene: "Cuarto de servicio", idScene: "9CDD67E66C", wall: "", typeModel: "" },
        { nameMarker: "M5", idMarker: "E720113F74", nameScene: "Cuarto de servicio", idScene: "9CDD67E66C", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M12", idMarker: "5A9F8F57B3", nameScene: "Cuarto de servicio", idScene: "9CDD67E66C", wall: "M12", typeModel: "Good 089" },
        { nameMarker: "M18", idMarker: "D25DA559B7", nameScene: "Cuarto de servicio", idScene: "9CDD67E66C", wall: "M18", typeModel: "Good 089" },
        { nameMarker: "M16", idMarker: "FE8DE315E4", nameScene: "Cuarto de servicio", idScene: "9CDD67E66C", wall: "M16", typeModel: "Good 051" },

        { nameMarker: "Ir al cuarto de servicio", idMarker: "0B450ED521", nameScene: "Cuarto armario", idScene: "71A83C0223", wall: "", typeModel: "" },
        { nameMarker: "M2", idMarker: "7AD48A0DFD", nameScene: "Cuarto armario", idScene: "71A83C0223", wall: "M2", typeModel: "Good 051" },
        { nameMarker: "M18", idMarker: "DE06BCFB95", nameScene: "Cuarto armario", idScene: "71A83C0223", wall: "M18", typeModel: "Good 089" },

        { nameMarker: "Ir a la sala", idMarker: "A230F9E65A", nameScene: "Pasillo principal", idScene: "d8f96dd6", wall: "", typeModel: "" },
        { nameMarker: "Baño social", idMarker: "41E08B0761", nameScene: "Pasillo principal", idScene: "d8f96dd6", wall: "", typeModel: "" },
        { nameMarker: "Ir habitación 1", idMarker: "7A44B5B2C3", nameScene: "Pasillo principal", idScene: "d8f96dd6", wall: "", typeModel: "" },
        { nameMarker: "Ir habitación 2", idMarker: "AED51101BE", nameScene: "Pasillo principal", idScene: "d8f96dd6", wall: "", typeModel: "" },
        { nameMarker: "Ir habitación principal", idMarker: "A60449997B", nameScene: "Pasillo principal", idScene: "d8f96dd6", wall: "", typeModel: "" },
        { nameMarker: "M2", idMarker: "E836AA826E", nameScene: "Pasillo principal", idScene: "d8f96dd6", wall: "M2", typeModel: "Good 051" },
        { nameMarker: "M10", idMarker: "5B5F3F8D0A", nameScene: "Pasillo principal", idScene: "d8f96dd6", wall: "M10", typeModel: "Good 051" },

        { nameMarker: "Ir al pasillo", idMarker: "CF146238B3", nameScene: "Baño social", idScene: "6C58A13D4C", wall: "", typeModel: "" },
        { nameMarker: "M10", idMarker: "0F35212408", nameScene: "Baño social", idScene: "6C58A13D4C", wall: "M10", typeModel: "Good 051" },
        { nameMarker: "M7", idMarker: "B10F324947", nameScene: "Baño social", idScene: "6C58A13D4C", wall: "M7", typeModel: "Good 051" },
        { nameMarker: "M6", idMarker: "90DE98CB2F", nameScene: "Baño social", idScene: "6C58A13D4C", wall: "M6", typeModel: "Good 017" },
        { nameMarker: "M29", idMarker: "07555D94CF", nameScene: "Baño social", idScene: "6C58A13D4C", wall: "M29", typeModel: "Better 100" },

        { nameMarker: "Ir al pasillo", idMarker: "A44921649D", nameScene: "Habitación 1", idScene: "7ADB2FC296", wall: "", typeModel: "" },
        { nameMarker: "Ir al baño", idMarker: "A69D56E666", nameScene: "Habitación 1", idScene: "7ADB2FC296", wall: "", typeModel: "" },
        { nameMarker: "Ir al balcón", idMarker: "7E4B2EFAA4", nameScene: "Habitación 1", idScene: "7ADB2FC296", wall: "", typeModel: "" },
        { nameMarker: "Cámara 2", idMarker: "879C8541FC", nameScene: "Habitación 1", idScene: "7ADB2FC296", wall: "", typeModel: "" },
        { nameMarker: "M6", idMarker: "496A95AF1E", nameScene: "Habitación 1", idScene: "7ADB2FC296", wall: "M6", typeModel: "Good 017" },
        { nameMarker: "M5", idMarker: "CFF43B0DB2", nameScene: "Habitación 1", idScene: "7ADB2FC296", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M5 - 2", idMarker: "143FDFCAD3", nameScene: "Habitación 1", idScene: "7ADB2FC296", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M12", idMarker: "8DCF8545F6", nameScene: "Habitación 1", idScene: "7ADB2FC296", wall: "M12", typeModel: "Good 089" },
        { nameMarker: "M2", idMarker: "6EB383728A", nameScene: "Habitación 1", idScene: "7ADB2FC296", wall: "M2", typeModel: "Good 051" },
        
        { nameMarker: "Ir al pasillo", idMarker: "18CFF21639", nameScene: "Habitación 1 cámara 2", idScene: "C39F7B031F", wall: "", typeModel: "" },
        { nameMarker: "Ir al baño", idMarker: "305BC3AE1A", nameScene: "Habitación 1 cámara 2", idScene: "C39F7B031F", wall: "", typeModel: "" },
        { nameMarker: "Ir al balcón", idMarker: "0DE4092DF5", nameScene: "Habitación 1 cámara 2", idScene: "C39F7B031F", wall: "", typeModel: "" },
        { nameMarker: "Cámara 1", idMarker: "5038D930A5", nameScene: "Habitación 1 cámara 2", idScene: "C39F7B031F", wall: "", typeModel: "" },
        { nameMarker: "M6", idMarker: "7144267F96", nameScene: "Habitación 1 cámara 2", idScene: "C39F7B031F", wall: "M6", typeModel: "Good 017" },
        { nameMarker: "M5", idMarker: "8AD84F9066", nameScene: "Habitación 1 cámara 2", idScene: "C39F7B031F", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M5 - 2", idMarker: "FDF4D6E126", nameScene: "Habitación 1 cámara 2", idScene: "C39F7B031F", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M2", idMarker: "53846CDD35", nameScene: "Habitación 1 cámara 2", idScene: "C39F7B031F", wall: "M2", typeModel: "Good 051" },
        { nameMarker: "M12", idMarker: "2205F573F3", nameScene: "Habitación 1 cámara 2", idScene: "C39F7B031F", wall: "M12", typeModel: "Good 089" },

        { nameMarker: "Ir a la habitación", idMarker: "9DC2A81B24", nameScene: "Baño habitación 1", idScene: "2EF8223AB6", wall: "", typeModel: "" },
        { nameMarker: "M29", idMarker: "77E4C34A19", nameScene: "Baño habitación 1", idScene: "2EF8223AB6", wall: "M29", typeModel: "" },
        { nameMarker: "M5", idMarker: "C7C812B703", nameScene: "Baño habitación 1", idScene: "2EF8223AB6", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M5 - 2", idMarker: "9872B672BE", nameScene: "Baño habitación 1", idScene: "2EF8223AB6", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M30", idMarker: "DE7D4CAC99", nameScene: "Baño habitación 1", idScene: "2EF8223AB6", wall: "M30", typeModel: "Better 089Par Residencial" },
        { nameMarker: "M30 - 2", idMarker: "959FA78668", nameScene: "Baño habitación 1", idScene: "2EF8223AB6", wall: "M30", typeModel: "Better 089Par Residencial" },

        { nameMarker: "Ir a la habitación", idMarker: "3398503E26", nameScene: "Balcón habitación 1", idScene: "893F759F6D", wall: "", typeModel: "" },
        { nameMarker: "M30", idMarker: "11F7504F48", nameScene: "Balcón habitación 1", idScene: "893F759F6D", wall: "M30", typeModel: "Better 089Par Residencial" },

        { nameMarker: "Ir al pasillo", idMarker: "B08C51B444", nameScene: "Habitación 2", idScene: "3B8E9C6B79", wall: "", typeModel: "" },
        { nameMarker: "Ir al baño", idMarker: "7C06C87CFD", nameScene: "Habitación 2", idScene: "3B8E9C6B79", wall: "", typeModel: "" },
        { nameMarker: "Ir al balcón", idMarker: "4950369250", nameScene: "Habitación 2", idScene: "3B8E9C6B79", wall: "", typeModel: "" },
        { nameMarker: "Ir al armario", idMarker: "98EF8A2D5C", nameScene: "Habitación 2", idScene: "3B8E9C6B79", wall: "", typeModel: "" },
        { nameMarker: "Cámara 2", idMarker: "CD96EE2391", nameScene: "Habitación 2", idScene: "3B8E9C6B79", wall: "", typeModel: "" },
        { nameMarker: "M1", idMarker: "0C15EF30A4", nameScene: "Habitación 2", idScene: "3B8E9C6B79", wall: "M1", typeModel: "Good 001" },
        { nameMarker: "M2", idMarker: "E056AAE330", nameScene: "Habitación 2", idScene: "3B8E9C6B79", wall: "M2", typeModel: "Good 001" },
        { nameMarker: "M29", idMarker: "B49F26FC7B", nameScene: "Habitación 2", idScene: "3B8E9C6B79", wall: "M29", typeModel: "Better 100" },

        { nameMarker: "Ir al pasillo", idMarker: "0F70E173C7", nameScene: "Habitación 2 cámara 2", idScene: "2E46948F4C", wall: "", typeModel: "" },
        { nameMarker: "Ir al baño", idMarker: "DCBD268DCB", nameScene: "Habitación 2 cámara 2", idScene: "2E46948F4C", wall: "", typeModel: "" },
        { nameMarker: "Ir al balcón", idMarker: "AD6E6A2077", nameScene: "Habitación 2 cámara 2", idScene: "2E46948F4C", wall: "", typeModel: "" },
        { nameMarker: "Ir al armario", idMarker: "B936B797C5", nameScene: "Habitación 2 cámara 2", idScene: "2E46948F4C", wall: "", typeModel: "" },
        { nameMarker: "Cámara 1", idMarker: "7F31A96A2F", nameScene: "Habitación 2 cámara 2", idScene: "2E46948F4C", wall: "", typeModel: "" },
        { nameMarker: "M1", idMarker: "36D7237C5F", nameScene: "Habitación 2 cámara 2", idScene: "2E46948F4C", wall: "M1", typeModel: "Good 001" },
        { nameMarker: "M2", idMarker: "427E8F2B4F", nameScene: "Habitación 2 cámara 2", idScene: "2E46948F4C", wall: "M2", typeModel: "Good 001" },
        { nameMarker: "M29", idMarker: "6F1593344C", nameScene: "Habitación 2 cámara 2", idScene: "2E46948F4C", wall: "M29", typeModel: "Better 100" },
        { nameMarker: "M5", idMarker: "200658C85A", nameScene: "Habitación 2 cámara 2", idScene: "2E46948F4C", wall: "M5", typeModel: "Good 051" },

        { nameMarker: "Ir a la habitación", idMarker: "52642FCF46", nameScene: "Armario habitación 2", idScene: "8D91C74057", wall: "", typeModel: "" },
        { nameMarker: "M5", idMarker: "130B5D342D", nameScene: "Armario habitación 2", idScene: "8D91C74057", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M29", idMarker: "6243C286F7", nameScene: "Armario habitación 2", idScene: "8D91C74057", wall: "M29", typeModel: "Better 100" },
        { nameMarker: "M2", idMarker: "5432B583AF", nameScene: "Armario habitación 2", idScene: "8D91C74057", wall: "M2", typeModel: "Good 001" },

        { nameMarker: "Ir a la habitación", idMarker: "1AF8F5364A", nameScene: "Baño habitación 2", idScene: "7510C39F76", wall: "", typeModel: "" },
        { nameMarker: "M30", idMarker: "2DAEC8D191", nameScene: "Baño habitación 2", idScene: "7510C39F76", wall: "M30", typeModel: "Better 089Par Residencial" },
        { nameMarker: "M12", idMarker: "6548099645", nameScene: "Baño habitación 2", idScene: "7510C39F76", wall: "M12", typeModel: "Good 089" },
        { nameMarker: "M5", idMarker: "FEE2B99709", nameScene: "Baño habitación 2", idScene: "7510C39F76", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M5 - 2", idMarker: "CA01EB8D24", nameScene: "Baño habitación 2", idScene: "7510C39F76", wall: "M5", typeModel: "Good 051" },

        { nameMarker: "Ir a la habitación", idMarker: "F34C8172D1", nameScene: "Balcón habitación 2", idScene: "BABEFF9E8A", wall: "", typeModel: "" },
        { nameMarker: "M30", idMarker: "8399975901", nameScene: "Balcón habitación 2", idScene: "BABEFF9E8A", wall: "M30", typeModel: "Better 089Par Residencial" },

        { nameMarker: "Ir al pasillo", idMarker: "C053C09A95", nameScene: "Habitación principal", idScene: "88761064BB", wall: "", typeModel: "" },
        { nameMarker: "Ir al baño", idMarker: "A2C8E0232D", nameScene: "Habitación principal", idScene: "88761064BB", wall: "", typeModel: "" },
        { nameMarker: "Ir al armario", idMarker: "44B3836CD7", nameScene: "Habitación principal", idScene: "88761064BB", wall: "", typeModel: "" },
        { nameMarker: "Ir al balcón", idMarker: "CCAEB7A463", nameScene: "Habitación principal", idScene: "88761064BB", wall: "", typeModel: "" },
        { nameMarker: "Cámara 2", idMarker: "E83AAB6C85", nameScene: "Habitación principal", idScene: "88761064BB", wall: "", typeModel: "" },
        { nameMarker: "M28", idMarker: "4E7C821E2D", nameScene: "Habitación principal", idScene: "88761064BB", wall: "M28", typeModel: "Good 094Par" },
        { nameMarker: "M1", idMarker: "27BF7220A7", nameScene: "Habitación principal", idScene: "88761064BB", wall: "M1", typeModel: "Good 001" },
        { nameMarker: "M2", idMarker: "6284EEB521", nameScene: "Habitación principal", idScene: "88761064BB", wall: "M2", typeModel: "Good 001" },
        { nameMarker: "M5", idMarker: "9FD518839C", nameScene: "Habitación principal", idScene: "88761064BB", wall: "M5", typeModel: "Good 051" },

        { nameMarker: "Ir al baño", idMarker: "E32A11E941", nameScene: "Habitación principal cámara 2", idScene: "0DD2D21D89", wall: "", typeModel: "" },
        { nameMarker: "Ir al armario", idMarker: "7721CFD432", nameScene: "Habitación principal cámara 2", idScene: "0DD2D21D89", wall: "", typeModel: "" },
        { nameMarker: "Ir al balcón", idMarker: "C0E204FCF9", nameScene: "Habitación principal cámara 2", idScene: "0DD2D21D89", wall: "", typeModel: "" },
        { nameMarker: "Cámara 1", idMarker: "8C34317978", nameScene: "Habitación principal cámara 2", idScene: "0DD2D21D89", wall: "", typeModel: "" },
        { nameMarker: "M28", idMarker: "31FCB74E83", nameScene: "Habitación principal cámara 2", idScene: "0DD2D21D89", wall: "M28", typeModel: "Good 094Par" },
        { nameMarker: "M1", idMarker: "83031540A2", nameScene: "Habitación principal cámara 2", idScene: "0DD2D21D89", wall: "M1", typeModel: "Good 001" },
        { nameMarker: "M2", idMarker: "9B3ECC942A", nameScene: "Habitación principal cámara 2", idScene: "0DD2D21D89", wall: "M2", typeModel: "Good 001" },
        { nameMarker: "M5", idMarker: "0EB66CFC0E", nameScene: "Habitación principal cámara 2", idScene: "0DD2D21D89", wall: "M5", typeModel: "Good 051" },

        { nameMarker: "Ir a la habitación", idMarker: "A5E70322CD", nameScene: "Armario habitación principal", idScene: "C33AC38991", wall: "", typeModel: "" },
        { nameMarker: "M2", idMarker: "2BC0986B85", nameScene: "Armario habitación principal", idScene: "C33AC38991", wall: "M2", typeModel: "Good 001" },
        { nameMarker: "M5", idMarker: "A4538BF171", nameScene: "Armario habitación principal", idScene: "C33AC38991", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M28", idMarker: "E35B79704F", nameScene: "Armario habitación principal", idScene: "C33AC38991", wall: "M28", typeModel: "Good 094Par" },
        { nameMarker: "M29", idMarker: "65307FB571", nameScene: "Armario habitación principal", idScene: "C33AC38991", wall: "M29", typeModel: "Better 100" },
        { nameMarker: "M12", idMarker: "979B404B0E", nameScene: "Armario habitación principal", idScene: "C33AC38991", wall: "M12", typeModel: "Good 089" },

        { nameMarker: "Ir a la habitación", idMarker: "F34E948A8F", nameScene: "Baño habitación principal", idScene: "B37EF65A4F", wall: "", typeModel: "" },
        { nameMarker: "M5", idMarker: "4F5186254E", nameScene: "Baño habitación principal", idScene: "B37EF65A4F", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M5 - 2", idMarker: "580B35747C", nameScene: "Baño habitación principal", idScene: "B37EF65A4F", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M5 - 3", idMarker: "9224617367", nameScene: "Baño habitación principal", idScene: "B37EF65A4F", wall: "M5", typeModel: "Good 051" },
        { nameMarker: "M12", idMarker: "48FB621206", nameScene: "Baño habitación principal", idScene: "B37EF65A4F", wall: "M12", typeModel: "Good 089" },
        { nameMarker: "M12 - 2", idMarker: "1D097CF953", nameScene: "Baño habitación principal", idScene: "B37EF65A4F", wall: "M12", typeModel: "Good 089" },
        { nameMarker: "M29", idMarker: "EC493C4A27", nameScene: "Baño habitación principal", idScene: "B37EF65A4F", wall: "M29", typeModel: "Better 100" },

        { nameMarker: "Ir a la habitación", idMarker: "44D73A8CBD", nameScene: "Balcón habitación principal", idScene: "F1C10E9B62", wall: "", typeModel: "" }
    ];


     
    const elementMarkers = [
        { idScene: 'AB9E2B7BF7', nameScene: "Entrada", elemMap: elementGoPasilloEntrada },
        { idScene: '919521B462', nameScene: "Pasillo de entrada", elemMap: elementGoEntrada },
        { idScene: '2db264c2',   nameScene: "Sala", elemMap: elementGoSala },
        { idScene: 'F2D6FC551C', nameScene: "Balcón sala", elemMap: elementGoBalconSala },
        { idScene: '271e0e62',   nameScene: "Cocina - Comedor", elemMap: elementGoCocina },
      	{ idScene: '878AFA9F7D', nameScene: "Balcón Cocina", elemMap: elementGoBalconCocina },
        { idScene: '9CDD67E66C', nameScene: "Cuarto de servicio", elemMap: elementGoCuartoServicio },
        { idScene: '71A83C0223', nameScene: "Cuarto armario", elemMap: elementGoArmario },
        { idScene: 'd8f96dd6',   nameScene: "Pasillo principal", elemMap: elementGoPasilloPrincipal },
        { idScene: '6C58A13D4C', nameScene: "Baño social", elemMap: elementGoBanoServicio },
        { idScene: '7ADB2FC296', nameScene: "Habitación 1", elemMap: elementGoHabitacionOne },
        { idScene: 'C39F7B031F', nameScene: "Habitación 1 cámara 2", elemMap: '' },
        { idScene: '2EF8223AB6', nameScene: "Baño habitación 1", elemMap: elementGoHabitacionOneBano },
        { idScene: '893F759F6D', nameScene: "Balcón habitación 1", elemMap: elementGoHabitacionOneBalcon },
        { idScene: '3B8E9C6B79', nameScene: "Habitación 2", elemMap: elementGoHabitacionTwo },
        { idScene: '2E46948F4C', nameScene: "Habitación 2 cámara 2", elemMap: '' },
        { idScene: '8D91C74057', nameScene: "Armario habitación 2", elemMap: elementGoHabitacionTwoArmario },
        { idScene: '7510C39F76', nameScene: "Baño habitación 2", elemMap: elementGoHabitacionTwoBano },
        { idScene: 'BABEFF9E8A', nameScene: "Balcón habitación 2", elemMap: elementGoHabitacionTwoBalcon },
        { idScene: '88761064BB', nameScene: "Habitación principal", elemMap: elementGoHabitacionThree },
        { idScene: '0DD2D21D89', nameScene: "Habitación principal cámara 2", elemMap: '' },
        { idScene: 'C33AC38991', nameScene: "Armario habitación principal", elemMap: elementGoArmarioHabitacionThree },
        { idScene: 'B37EF65A4F', nameScene: "Baño habitación principal", elemMap: elementGoHabitacionThreeBano },
        { idScene: 'F1C10E9B62', nameScene: "Balcón habitación principal", elemMap: elementGoHabitacionThreeBalcon },
    ];


     
    elementGoPasilloEntrada.on('click', () => { onSetScene( "AB9E2B7BF7", elementGoPasilloEntrada ); });
    elementGoEntrada.on('click', () => { onSetScene( "919521B462", elementGoEntrada ); });
    elementGoSala.on('click', () => { onSetScene( "2db264c2", elementGoSala ); });
    elementGoBalconSala.on('click', () => { onSetScene( "F2D6FC551C", elementGoBalconSala ); });
    elementGoCocina.on('click', () => { onSetScene( "271e0e62", elementGoCocina ); });
  	elementGoBalconCocina.on('click', () => { onSetScene( "878AFA9F7D", elementGoBalconCocina ); });
    elementGoCuartoServicio.on('click', () => { onSetScene( "9CDD67E66C", elementGoCuartoServicio ); });
    elementGoArmario.on('click', () => { onSetScene( "71A83C0223", elementGoArmario ); });
    elementGoPasilloPrincipal.on('click', () => { onSetScene( "d8f96dd6", elementGoPasilloPrincipal ); });
    elementGoBanoServicio.on('click', () => { onSetScene( "6C58A13D4C", elementGoBanoServicio ); });
    elementGoHabitacionOne.on('click', () => { onSetScene( "7ADB2FC296", elementGoHabitacionOne ); });
    elementGoHabitacionOneBano.on('click', () => { onSetScene( "2EF8223AB6", elementGoHabitacionOneBano ); });
    elementGoHabitacionOneBalcon.on('click', () => { onSetScene( "893F759F6D", elementGoHabitacionOneBalcon ); });
    elementGoHabitacionTwo.on('click', () => { onSetScene( "3B8E9C6B79", elementGoHabitacionTwo ); });
    elementGoHabitacionTwoArmario.on('click', () => { onSetScene( "8D91C74057", elementGoHabitacionTwoArmario ); });
    elementGoHabitacionTwoBano.on('click', () => { onSetScene( "7510C39F76", elementGoHabitacionTwoBano ); });
    elementGoHabitacionTwoBalcon.on('click', () => { onSetScene( "BABEFF9E8A", elementGoHabitacionTwoBalcon ); });
    elementGoHabitacionThree.on('click', () => { onSetScene( "88761064BB", elementGoHabitacionThree ); });
    elementGoArmarioHabitacionThree.on('click', () => { onSetScene( "C33AC38991", elementGoArmarioHabitacionThree ); });
    elementGoHabitacionThreeBano.on('click', () => { onSetScene( "B37EF65A4F", elementGoHabitacionThreeBano ); });
    elementGoHabitacionThreeBalcon.on('click', () => { onSetScene( "F1C10E9B62", elementGoHabitacionThreeBalcon ); });


     
    itemEntrada.on('click', () => { onSetScene( "AB9E2B7BF7", itemEntrada, false ); });
    itemSala.on('click', () => { onSetScene( "2db264c2", itemSala, false ); });
    itemCocinaComedor.on('click', () => { onSetScene( "271e0e62", itemCocinaComedor, false ); });
    itemBanoSocial.on('click', () => { onSetScene( "6C58A13D4C", itemBanoSocial, false ); });
    itemHabitacionPrincipal.on('click', () => { onSetScene( "88761064BB", itemHabitacionPrincipal, false ); });


     
    const onSetScene = ( idScene, element, slider = true ) => {
        window.scene.setScene({ id: idScene }); 
        const currentScene = elementMarkers.find( scene => scene.idScene == idScene );  

        if ( currentScene ) { // go for scene, save location
            const email = jQuery('#currentUserEmail').val();
            const dataScene = { email, nameScene: currentScene.nameScene, click: slider ? 'Mapa' : 'Slider' }

            registerDataMarker( dataScene, urlScene ) // Register scene  =>  email, nombre de la escena
        }

        if ( slider ) {
            onMarkerActive();
            element.css('background-image', `url(${urlActiveMarker})`);
            markerActive = true;
        }
    }
    const onMarkerActive = () => {
        if ( markerActive ) {
            elementMarkers.map( (obj) => {  
                if ( obj.elemMap ) obj.elemMap.css('background-image', `url(${urlMarker})`)                
            });
            markerActive = false;
        }
    }


     
	elementGoPasilloEntrada.hover( () => { addSpan('Entrada') }, () => { removeSpan() } );   
	elementGoEntrada.hover( () => { addSpan('Pasillo entrada') }, () => { removeSpan() } );   
	elementGoSala.hover( () => { addSpan('Sala') }, () => { removeSpan() } );   
	elementGoBalconSala.hover( () => { addSpan('Balcón Sala') }, () => { removeSpan() } );   
	elementGoCocina.hover( () => { addSpan('Cocina - Comedor') }, () => { removeSpan() } );   
  	elementGoBalconCocina.hover( () => { addSpan('Balcón Cocina') }, () => { removeSpan() } );   
	elementGoCuartoServicio.hover( () => { addSpan('Cuarto de servicio') }, () => { removeSpan() } );   
	elementGoArmario.hover( () => { addSpan('Cuarto Armario') }, () => { removeSpan() } );   
	elementGoPasilloPrincipal.hover( () => { addSpan('Pasillo principal') }, () => { removeSpan() } );   
	elementGoBanoServicio.hover( () => { addSpan('Baño social') }, () => { removeSpan() } );   
	elementGoHabitacionOne.hover( () => { addSpan('Habitación 1') }, () => { removeSpan() } );   
	elementGoHabitacionOneBano.hover( () => { addSpan('Baño habitación 1') }, () => { removeSpan() } );   
	elementGoHabitacionOneBalcon.hover( () => { addSpan('Balcón habitación 1') }, () => { removeSpan() } );   
	elementGoHabitacionTwo.hover( () => { addSpan('Habitación 2') }, () => { removeSpan() } );   
	elementGoHabitacionTwoArmario.hover( () => { addSpan('Armario habitación 2') }, () => { removeSpan() } );   
	elementGoHabitacionTwoBano.hover( () => { addSpan('Baño habitación 2') }, () => { removeSpan() } );   
	elementGoHabitacionTwoBalcon.hover( () => { addSpan('Balcón habitación 2') }, () => { removeSpan() } );   
	elementGoHabitacionThree.hover( () => { addSpan('Habitación principal') }, () => { removeSpan() } );   
	elementGoArmarioHabitacionThree.hover( () => { addSpan('Armario habitación principal') }, () => { removeSpan() } );   
	elementGoHabitacionThreeBano.hover( () => { addSpan('Baño habitación principal') }, () => { removeSpan() } );   
	elementGoHabitacionThreeBalcon.hover( () => { addSpan('Balcón habitación principal') }, () => { removeSpan() } );   

    const addSpan = ( text ) => { 
        elementText.css('display', 'block');
        elementText.append(`<span style='color:#fff;'>${text}</span>`); 
    }
    const removeSpan = () => { 
        elementText.find( "span" ).last().remove(); 
        elementText.css('display', 'none');
    }

    
     
    window.onChangeScene = ( e ) => {
        const idMarker = e.cfg.id;
        const currentMarker = dataMarkers.find( marker => marker.idMarker === idMarker );

        if ( currentMarker ) {
            const idScene = e.cfg.linkSceneId;
            const email = jQuery('#currentUserEmail').val();

            if ( idScene ) { // go for scene, save scene
                const currentScene = elementMarkers.find( scene => scene.idScene === idScene );
                const dataScene = { email, nameScene: currentScene.nameScene, click: 'Marcador' }

                registerDataMarker( dataScene, urlScene ) // Register location  =>  email, nombre de la escena

                if ( currentScene.elemMap ) {
                    onMarkerActive();
                    currentScene.elemMap.css( 'background-image', `url(${urlActiveMarker})` )
                    markerActive = true
                }                

            } else { // click marker wall, save wall
                idCurrentMarker = idMarker;
                const dataMarker = { email, nameScene: currentMarker.nameScene, wall: currentMarker.wall, typeWall: currentMarker.typeModel, click: currentMarker.nameMarker }

                registerDataMarker( dataMarker, urlWall ) // Register muro  =>  email, nombre escena, referencia del muro
            }
        }  
    }
   
  	
  	 
  	const addEventClickTitleWall = ( elementViewWall ) => {
      	if ( !elementViewWall ) return;
      
        const titleWall = elementViewWall.querySelectorAll(".content-references-walls");
        const contentWall = elementViewWall.querySelectorAll(".main-content-walls-references");
        let i = 0;
        
        for (i = 0; i < titleWall.length; i++) {
            let title = titleWall[i].title;
            let text = titleWall[i];
            let content = contentWall[i];

            titleWall[i].onclick = () => { isUserRegister( titleWall, contentWall, text, content, title ); };
          	
          	if ( i != 0 ) { // se deja visible solo el primer modelo
              contentWall[i].style.display = 'none';
            }
        }
      	
      	const files = elementViewWall.querySelectorAll(".action-files"); 
        if ( files ) {
          for (i = 0; i < files.length; i++) {            
            let title = files[i].attributes[1].value;
            let urlFileCurrent = files[i].attributes[2].value;
            files[i].onclick = () => { clickFile(urlFileCurrent, title) };  
          	
          }
        } 
    };
  	
    // Muro M1
    addEventClickTitleWall( document.querySelector("#muroM1HabPricCam1") );
  	addEventClickTitleWall( document.querySelector("#muroM1HabPricCam2") );
    addEventClickTitleWall( document.querySelector("#muroM1Hab2Cam1") );
    addEventClickTitleWall( document.querySelector("#muroM1Hab2Cam2") );
  
  	// Muro M2
    addEventClickTitleWall( document.querySelector("#muroM2Sala") );  
    addEventClickTitleWall( document.querySelector("#muroM2CuaArm") );  
  	addEventClickTitleWall( document.querySelector("#muroM2PasPrinc") ); 
  	addEventClickTitleWall( document.querySelector("#muroM2Hab1Cam1") ); 
  	addEventClickTitleWall( document.querySelector("#muroM2Hab1Cam2") ); 
  	addEventClickTitleWall( document.querySelector("#muroM2Hab2Cam1") ); 
  	addEventClickTitleWall( document.querySelector("#muroM2Hab2Cam2") );
  	addEventClickTitleWall( document.querySelector("#muroM2Hab2Arm") );
  	addEventClickTitleWall( document.querySelector("#muroM2HabPricCam1") );
  	addEventClickTitleWall( document.querySelector("#muroM2HabPricCam2") );
  	addEventClickTitleWall( document.querySelector("#muroM2HabPricArm") );
  
  	// Muro M5
    addEventClickTitleWall( document.querySelector("#muroM5Sala") ); 
    addEventClickTitleWall( document.querySelector("#muroM5CuaSer") ); 
    addEventClickTitleWall( document.querySelector("#muroM5Hab1Cam1") ); 
    addEventClickTitleWall( document.querySelector("#muro2M5Hab1Cam1") ); 
    addEventClickTitleWall( document.querySelector("#muroM5Hab1Cam2") ); 
    addEventClickTitleWall( document.querySelector("#muro2M5Hab1Cam2") ); 
    addEventClickTitleWall( document.querySelector("#muroM5Hab1Ban") ); 
    addEventClickTitleWall( document.querySelector("#muro2M5Hab1Ban") ); 
    addEventClickTitleWall( document.querySelector("#muroM5Hab2Cam2") ); 
    addEventClickTitleWall( document.querySelector("#muroM5Hab2Arm") ); 
    addEventClickTitleWall( document.querySelector("#muroM5Hab2Ban") ); 
    addEventClickTitleWall( document.querySelector("#muro2M5Hab2Ban") ); 
    addEventClickTitleWall( document.querySelector("#muroM5HabPricCam1") ); 
    addEventClickTitleWall( document.querySelector("#muroM5HabPricCam2") ); 
    addEventClickTitleWall( document.querySelector("#muroM5HabPricArm") ); 
    addEventClickTitleWall( document.querySelector("#muroM5HabPricBan") ); 
    addEventClickTitleWall( document.querySelector("#muro2M5HabPricBan") ); 
    addEventClickTitleWall( document.querySelector("#muro3M5HabPricBan") ); 

    // Muro M6
    addEventClickTitleWall( document.querySelector("#muroM6BanSoc") ); 
    addEventClickTitleWall( document.querySelector("#muroM6Hab1Cam1") ); 
    addEventClickTitleWall( document.querySelector("#muroM6Hab1Cam2") ); 
  	    
    // Muro M7
    addEventClickTitleWall( document.querySelector("#muroM7Sala") ); 
    addEventClickTitleWall( document.querySelector("#muroM7BanSer") ); 
  	
    // Muro M12
  	addEventClickTitleWall( document.querySelector("#muroM12CuaSer") ); 
    addEventClickTitleWall( document.querySelector("#muroM12Hab2Ban") ); 
  	addEventClickTitleWall( document.querySelector("#muroM12Hab1Cam1") ); 
  	addEventClickTitleWall( document.querySelector("#muroM12Hab1Cam2") ); 
  	addEventClickTitleWall( document.querySelector("#muroM12HabPricBan") ); 
  	addEventClickTitleWall( document.querySelector("#muro2M12HabPricBan") ); 
  	addEventClickTitleWall( document.querySelector("#muroM12HabPricArm") ); 
  
  	// Muro M13
    addEventClickTitleWall( document.querySelector("#muroM13Coc") ); 

  	// Muro M16
    addEventClickTitleWall( document.querySelector("#muroM16Coc") ); 
    addEventClickTitleWall( document.querySelector("#muroM16CuaSer") ); 

    // Muro M18
  	addEventClickTitleWall( document.querySelector("#muroM18CuaSer") ); 
    addEventClickTitleWall( document.querySelector("#muroM18CuaArm") ); 
  
  	// Muro M21
    addEventClickTitleWall( document.querySelector("#muroM21Ent") ); 
    addEventClickTitleWall( document.querySelector("#muro2M21Ent") ); 
  	
  	// Muro M22
    addEventClickTitleWall( document.querySelector("#muroM22Ent") ); 
    addEventClickTitleWall( document.querySelector("#muro2M22Ent") ); 

  	// Muro M23
    addEventClickTitleWall( document.querySelector("#muroM23Ent") ); 
    addEventClickTitleWall( document.querySelector("#muroM23Sala") ); 
  	
    // Muro M28  

    // Muro M29  
  	addEventClickTitleWall( document.querySelector("#muroM29Ent") ); 
  	addEventClickTitleWall( document.querySelector("#muroM29PasEnt") ); 
  	addEventClickTitleWall( document.querySelector("#muro2M29PasEnt") ); 
  	addEventClickTitleWall( document.querySelector("#muroM29Hab2Arm") ); 
  	addEventClickTitleWall( document.querySelector("#muroM29Hab2Cam1") ); 
  	addEventClickTitleWall( document.querySelector("#muroM29Hab2Cam2") ); 
  	addEventClickTitleWall( document.querySelector("#muroM29BanSoc") ); 
  	addEventClickTitleWall( document.querySelector("#muroM29Hab1Ban") );
  	addEventClickTitleWall( document.querySelector("#muroM29HabPricBan") );
  	addEventClickTitleWall( document.querySelector("#muroM29HabPricArm") );

    // Muro M30

    
     
    const isUserRegister = ( titleWallM1HP, contentWallM1HP, textReference, elemMuro, typeWall ) => {
      	const email = jQuery('#currentUserEmail').val();

        
        if ( email ) { // guardar la referencia del modelo
            changeColorTextModel( titleWallM1HP, contentWallM1HP, textReference, elemMuro );             

            // guardar la reverencia en la DB
            const currentMarker = dataMarkers.find( marker => marker.idMarker === idCurrentMarker );
            const dataMarkerTypeWall = { email, nameScene: currentMarker.nameScene, wall: currentMarker.wall, typeWall }

            registerDataMarker( dataMarkerTypeWall, urlTypeWall ) // Register muro  =>  email, nombre escena, referencia del muro

        } else { // el usuario debe registrarse
            if ( confirm("Para continuar viendo las demás referencias, debes registrarte") ) {
                location.href = '/my-account/';
            }
        }  
    }
    
    const clickFile = (urlFileCurrent, title = '') => {
      //console.log('url: ', urlFileCurrent, ' title: ', title)
      const email = jQuery('#currentUserEmail').val();

      if ( email ) {  // guardar la reverencia en la DB
        const currentMarker = dataMarkers.find( marker => marker.idMarker === idCurrentMarker );
        const dataFile = { email, nameScene: currentMarker.nameScene, wall: currentMarker.wall, urlFileCurrent, file: title }

        registerDataMarker( dataFile, urlFile ) // Register file
      }

      if ( urlFileCurrent ) window.open(urlFileCurrent,"_blank");
    };


     
    const changeColorTextModel = (titleWallM1HP, contentWallM1HP, elemText, elemMuro ) => {
      	titleWallM1HP.forEach( item => { item.style.color = '#ffffff' });
      	elemText.style.color = '#000000';
      	contentWallM1HP.forEach( item => { item.style.display = 'none' });
      	elemMuro.style.display = 'block';
    }


     
    const registerDataMarker = ( dataMarker, url ) =>  {   
        //console.log('url: ', url, ' Data: ', dataMarker);
        //return;  
     
        if ( dataMarker.email ) {            
        
            jQuery.ajax({
                url: mainUrl + url,
                type: "POST",
              	data: dataMarker,
                success: function (response) {
                    console.log('Register... ', response);            
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error... ',textStatus, errorThrown);
                }
            });
        }	
    }

});</script>
<!-- end Simple Custom CSS and JS -->
