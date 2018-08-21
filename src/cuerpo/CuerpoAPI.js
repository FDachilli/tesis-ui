const urlService = "http://localhost:8080/tesis-backend/rest/roles/";

export default {

    predecirDirecto(conversation, classifier){
        return `${urlService}predecirDirecto?conversation=${encodeURIComponent(JSON.stringify(conversation))}&model=${classifier}`;
    },

    predecirDirectoTotal(conversation, classifier){
        return `${urlService}predecirDirectoTotal?conversation=${encodeURIComponent(JSON.stringify(conversation))}&model=${classifier}`;
    },

    armarGrupos(participantes, size){
        return `${urlService}armarGrupos?participantes=${encodeURIComponent(JSON.stringify(participantes))}&size=${size}`;
    },

    predecirFases(conversation, classifier, classifier2, classifier3){
        let models = {};
        models["model1"]= classifier;
        models["model2"]= classifier2;
        models["model3"]= classifier3;
        return `${urlService}predecirFases?conversation=${encodeURIComponent(JSON.stringify(conversation))}&models=${encodeURIComponent(JSON.stringify(models))}`;
    },

    predecirFasesTotal(conversation, classifier, classifier2, classifier3){
        let models = {};
        models["model1"]= classifier;
        models["model2"]= classifier2;
        models["model3"]= classifier3;
        return `${urlService}predecirFasesTotal?conversation=${encodeURIComponent(JSON.stringify(conversation))}&models=${encodeURIComponent(JSON.stringify(models))}`;
    }
}