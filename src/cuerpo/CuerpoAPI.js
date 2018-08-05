const urlService = "http://localhost:8080/tesis-backend/rest/roles/";

export default {

    predecirDirecto(conversation, classifier){
        return `${urlService}predecirDirecto?conversation=${encodeURIComponent(JSON.stringify(conversation))}&model=${classifier}`;
    }
}