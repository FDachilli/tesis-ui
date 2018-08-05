import React from 'react';
import './ConversationsList.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';

const containerStyle = {
      maxHeight: 500, 
      width: 400, 
      overflow: 'auto'
};



class ConversationsList extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            list_conversations: this.props.list_conversations
        }
        this.handleClickItem = this.handleClickItem.bind(this);
    }

    handleClickItem(id){
      this.props.onItemClick(id)
    }

    render(){
        const listItems = this.state.list_conversations.map((conversation) => 
         <div>
          <Divider/>
          <ListItem button>
                  <ListItemText primary={conversation.participantes} onClick={()=>this.handleClickItem(conversation.id)}/>
          </ListItem>
          </div>
        );
        return (
          <Paper style={containerStyle}>
            <List className="ConversationsList" component="nav">
              {listItems}
              <Divider />
            </List>
          </Paper>
        );
    }
}

export default ConversationsList;