import React from 'react';
import './Hangouts.css';
import twemoji from 'twemoji';
import ConversationsList from './conversations-list/ConversationsList';

const divStyle = {
    display: 'flex', 
    flexDirection: 'row',
}

const textAreaStyle = {
    marginLeft: 10
}

class Hangouts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          Hangouts: this.props.Hangouts,
          conversaciones: {},
          participantes: [],
          text_conversation: ""
        }
        this.processData = this.processData.bind(this);
        this.switchConvo = this.switchConvo.bind(this);
    }


        componentDidMount(){
            if (this.state.Hangouts)
                this.processData();
        }

        processData() {
            let all_participants = {};
            let all_conversations = {};
            for(let key in this.state.Hangouts['conversation_state']) {
                var conversation = this.state.Hangouts['conversation_state'][key]['conversation_state']['conversation'];
                for(let person_key in conversation['participant_data']){
                    var person  = conversation['participant_data'][person_key];
                    var gaia_id = person['id']['gaia_id'];
                    if(!person['fallback_name'] || person['fallback_name'] == null) continue;
                    if(!all_participants[gaia_id])
                        all_participants[gaia_id] = person['fallback_name'];
                }
            }
           
            let list_participants_string = [];
            for(let key in this.state.Hangouts['conversation_state']) {
                var conversation_state = this.state.Hangouts['conversation_state'][key];
                var id = conversation_state['conversation_id']['id'];
                var conversation = conversation_state['conversation_state']['conversation'];
                // Find participants
                var participants = [], participants_obj = {};
                for(let person_key in conversation['participant_data']){
                    var person  = conversation['participant_data'][person_key];
                    var gaia_id = person['id']['gaia_id'];
                    var name = "Unknown";
                    if(person['fallback_name']){
                        name = person['fallback_name'];
                    }else{
                        name = all_participants[gaia_id];
                    }
                    participants.push(name);
                    participants_obj[gaia_id] = name;
                }
                var participants_string = participants.join(", ");
                let conv = {
                    id: id,
                    participantes: participants_string
                }
               
                list_participants_string.push(conv);
                // Parse events
                var events = [];
                for(let event_key in conversation_state['conversation_state']['event']){
                    var convo_event = conversation_state['conversation_state']['event'][event_key];
                    var timestamp = convo_event['timestamp'];
                    var msgtime = this.formatTimestamp(timestamp);
                    var sender = convo_event['sender_id']['gaia_id'];
                    var message = "";
                    if(convo_event['chat_message']){
                        // Get message
                        for(let msg_key in convo_event['chat_message']['message_content']['segment']){
                            var segment = convo_event['chat_message']['message_content']['segment'][msg_key];
                            if(segment['type'] == 'LINE_BREAK') message += "\n";
                            if(!segment['text']) continue;
                            let e = twemoji.parse(segment['text']);
                            if (e.indexOf('alt=') != -1){
                                let auxEmoji = e.split("alt=\"");
                                auxEmoji = auxEmoji[1].split("\"", 2);
                                message += auxEmoji[0];
                            }else{
                                message += twemoji.parse(segment['text']);
                            }
                           
                        }
                        // Check for images on event
                        if(convo_event['chat_message']['message_content']['attachment']){
                            for(var attach_key in convo_event['chat_message']['message_content']['attachment']){
                                var attachment = convo_event['chat_message']['message_content']['attachment'][attach_key];
                                if(attachment['embed_item']['type'][0] == "PLUS_PHOTO"){
                                    message += attachment['embed_item']['embeds.PlusPhoto.plus_photo']['thumbnail']['image_url']
                                    //message += "\n<a target='blank' href='" + attachment['embed_item']['embeds.PlusPhoto.plus_photo']['url'] + "'><img class='thumb' src='" + attachment['embed_item']['embeds.PlusPhoto.plus_photo']['thumbnail']['image_url'] + "' /></a>";
                                }
                            }
                        }
                        events.push({msgtime: msgtime, sender: participants_obj[sender] ? participants_obj[sender] : 'Desconocido', message: message, timestamp: timestamp});
                    }
                }
                // Sort events by timestamp
                events.sort(function(a, b){
                    var keyA = a.timestamp,
                        keyB = b.timestamp;
                    if(keyA < keyB) return -1;
                    if(keyA > keyB) return 1;
                    return 0;
                });
                // Add events
                all_conversations[id] = events;
            }

            this.props.onChangeConversations(all_conversations);
            this.setState({conversaciones: all_conversations})
            this.setState({participantes : list_participants_string});
        }

        switchConvo(id){
            let text = "";
            for(var event_id in this.state.conversaciones[id]){
                var convo_event = this.state.conversaciones[id][event_id];
                text = text + convo_event.msgtime + ": " + convo_event.sender + ": " + convo_event.message + "\n";
            }
            this.setState({text_conversation: text});
            this.props.onChangeCurrentConversation(id);
        }
        
        zeroPad(string) {
            return (string < 10) ? "0" + string : string;
        }

        formatTimestamp(timestamp) { 
            var d = new Date(timestamp/1000);
            var formattedDate = this.zeroPad(d.getDate()) + "-" +
                this.zeroPad(d.getMonth() + 1) + "-" +
                d.getFullYear()
                ;
            var hours = this.zeroPad(d.getHours());
            var minutes = this.zeroPad(d.getMinutes());
            var formattedTime = hours + ":" + minutes;
            return formattedDate + " " + formattedTime;
        }

        render() {
            console.log("Volvio a renderizar hangouts")
            return (
                <div>
                  <div style={divStyle}>
                    <div>
                      {this.state.participantes.length > 0 && <ConversationsList list_conversations={this.state.participantes} onItemClick={this.switchConvo}></ConversationsList>}
                    </div>
                    <div style={textAreaStyle}>
                                <textarea value={this.state.text_conversation} readOnly="true" style={{
                                width: '1000px',
                                height: '100%',
                                }}/>
                    </div>
                  </div>
			    </div>
            );
          }
}

export default Hangouts;