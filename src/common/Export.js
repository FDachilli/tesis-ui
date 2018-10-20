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
                    if (tipoProcesamiento === "directo"){
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
        if (tipoProcesamiento === "directo"){
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
                    if (tipoProcesamiento === "directo"){
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
                        for (j = 0; j <= 4; j++){
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
     },

     getArff(resultados){
        let first = true;
        let retorno = "";
        for (let key in resultados) {
            if (first){
                retorno += resultados[key];
                retorno += "\n";
                first = false;
            }else{
                retorno += resultados[key].split("@data")[1];
                retorno += "\n";
            }
        }
        return retorno;
    }

}