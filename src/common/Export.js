export default {

    exportarAExcel(resultados, tipoProcesamiento){
        let arrayExport=[];
        for (let key in resultados) {
            let res = resultados[key];
            var registros = res.split("@data")[1];
            var lines = registros.split('\n');
            for(var i = 0;i < lines.length;i++){
                let resjson={};
                if (lines[i].length > 1){
                    var features = lines[i].split(",");
                    if (tipoProcesamiento == "directo"){
                        resjson["rol"]=features[0];
                        resjson["nombre"]=features[1];
                        resjson["rol_companeros"]=features[2];
                        resjson["horario1"]=features[21];
                        resjson["horario2"]=features[22];
                        resjson["horario3"]=features[23];
                        resjson["dominante"]=features[24];
                        resjson["sumiso"]=features[25];
                        resjson["amistoso"]=features[26];
                        resjson["no_amistoso"]=features[27];
                        resjson["tarea"]=features[28];
                        resjson["socio_emocional"]=features[29];
                        resjson["participacion"]=features[30];
                    }else{
                        resjson["rol"]=features[0];
                        resjson["tipo_rol"]=features[1];
                        resjson["nombre"]=features[2];
                        resjson["tipo_rol_companeros"]=features[3];
                        resjson["rol_companeros"]=features[4];
                        resjson["horario1"]=features[23];
                        resjson["horario2"]=features[24];
                        resjson["horario3"]=features[25];
                        resjson["dominante"]=features[26];
                        resjson["sumiso"]=features[27];
                        resjson["amistoso"]=features[28];
                        resjson["no_amistoso"]=features[29];
                        resjson["tarea"]=features[30];
                        resjson["socio_emocional"]=features[31];
                        resjson["participacion"]=features[32];
                    }
                }
                arrayExport.push(resjson)
            }
        }
        return arrayExport;
     },

     exportarAExcelWithColumns(resultados, tipoProcesamiento){
        let data=[];
        let retorno = [];
        let columns=[];
        if (tipoProcesamiento == "directo"){
            columns = ["Rol", "Nombre", "Rol Companeros", "Participacion Intro", "Participacion Desa", "Participacion Fin", "Dominante (SYMLOG)", "Sumiso (SYMLOG)", "Amistoso (SYMLOG)", "No-amistoso (SYMLOG)", "Tarea (SYMLOG)", "Socio-Emocional (SYMLOG)", "Participacion"]
        }else{
            columns = ["Rol", "Tipo Rol", "Nombre", "Tipo Rol Companeros", "Rol Companeros", "Participacion Intro", "Participacion Desa", "Participacion Fin", "Dominante (SYMLOG)", "Sumiso (SYMLOG)", "Amistoso (SYMLOG)", "No-amistoso (SYMLOG)", "Tarea (SYMLOG)", "Socio-Emocional (SYMLOG)", "Participacion"]
        }
        for (let key in resultados) {
            let res = resultados[key];
            var registros = res.split("@data")[1];
            var lines = registros.split('\n');
            for(var i = 0;i < lines.length;i++){
                let dataSubArray=[];
                if (lines[i].length > 1){
                    var features = lines[i].split(",");
                    if (tipoProcesamiento == "directo"){
                        let resjson={};
                        resjson["value"]=features[0];
                        dataSubArray.push(resjson);
                        resjson={};
                        resjson["value"]=features[1];
                        dataSubArray.push(resjson);
                        resjson={};
                        resjson["value"]=features[2];
                        dataSubArray.push(resjson);
                        for (var j = 21; j < features.length; j++){
                            resjson={};
                            resjson["value"]=features[j];
                            dataSubArray.push(resjson);
                        }
                    }else{
                        let resjson;
                        for (var j = 0; j <= 4; j++){
                            resjson={};
                            resjson["value"]=features[j];
                            dataSubArray.push(resjson);
                        }
                        
                        for (j = 23; j <= features.length; j++){
                            resjson={};
                            resjson["value"]=features[j];
                            dataSubArray.push(resjson);
                        }
                    }
                }
                if (dataSubArray.length > 0)
                     data.push(dataSubArray)
            }
        }
        let dataset= {};
        dataset["columns"]= columns;
        dataset["data"]=data;
        retorno.push(dataset);
        return retorno;
     }




    /*exportToExcel(data, tipoProcesamiento) {
        //Tengo que setear cada fila como un arreglo asi me hace los saltos
        let arrayExport=[];
        //Agrego titulo
        arrayExport.push(["Resultado de prediccion de Roles:"]);
        //Agrego salto
        arrayExport.push([]);
        //Agrego fecha emision
        let fecha_emision = "Fecha de emisión: " + moment().format('L') + ' ' + moment().format('LT');
        arrayExport.push([fecha_emision]);
        //Agrego salto
        arrayExport.push([]);

        //Agrego header de lista
        if (tipoProcesamiento == 'Directo')
            arrayExport.push(["Rol", "Nombre", "Rol Companeros", "Participacion Intro", "Participacion Desa", "Participacion Fin", "Dominante (SYMLOG)", "Sumiso (SYMLOG)", "Amistoso (SYMLOG)", "No-amistoso (SYMLOG)", "Tarea (SYMLOG)", "Socio-Emocional (SYMLOG)", "Participacion"]);
        else
            arrayExport.push(["Rol", "Tipo Rol", "Nombre", "Tipo Rol Companeros", "Rol Companeros", "Participacion Intro", "Participacion Desa", "Participacion Fin", "Dominante (SYMLOG)", "Sumiso (SYMLOG)", "Amistoso (SYMLOG)", "No-amistoso (SYMLOG)", "Tarea (SYMLOG)", "Socio-Emocional (SYMLOG)", "Participacion"]);
        let arrayResultados=[];
        for (let key in data) {
            let resultados = data[key];
            var registros = resultados.split("@data")[1];
            var lines = registros.split('\n');
            for(var i = 0;i < lines.length;i++){
                if (lines[i].length > 1){
                    var features = lines[i].split(",");
                    if (tipoProcesamiento == 'Directo'){
                        arrayResultados.push(features[0]);
                        arrayResultados.push(features[1]);
                        arrayResultados.push(features[2]);
                        for (var j = 21; j < features.length; j++)
                            arrayResultados.push(features[j]);
                    }else{
                        for (var j = 0; j <= 4; j++)
                            arrayResultados.push(features[j]);
                        for (j = 23; j <= features.length; j++)
                        arrayResultados.push(features[j]);
                    }
                    
                }
            }
        }
        this.exportResultados(arrayExport);
  },

  exportResultados(data){
      var ws = {};
      var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
      for(var R = 0; R != data.length; ++R) {
          for(var C = 0; C != data[R].length; ++C) {
              if(range.s.r > R) range.s.r = R;
              if(range.s.c > C) range.s.c = C;
              if(range.e.r < R) range.e.r = R;
              if(range.e.c < C) range.e.c = C;
              var cell = {v: data[R][C],
                    s: { font: {sz: 14, bold: true },
                          aligment: {wrapText:true}
              }
        }
              var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
              ws[cell_ref] = cell;
             
          
      }    
    }
      if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
      //Para definir los tamaños de las columnas (en pixeles)
      var wscols = [
        {wpx: 180},
        {wpx: 90},
        {wpx: 450},
        {wpx: 80},
        {wpx: 80},
        {wpx: 90},
        {wpx: 120},
        {wpx: 500}, // "pixels"
      ];
      ws['!cols'] = wscols;
     
      const workBook = { SheetNames: ['Resultados Roles'], Sheets: {}, Props: {} };
      workBook.Sheets['Resultados'] = ws;
      console.log(ws);
      // save to file 
      XLSX.writeFile(workBook, 'Resultados–' + moment().format('L') +  EXCEL_EXTENSION, {
        cellStyles: true
      });
  }*/
}