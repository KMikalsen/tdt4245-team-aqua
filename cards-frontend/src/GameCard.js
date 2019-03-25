import React, {
    Component
} from 'react';

import { Button, Card, Label } from 'semantic-ui-react';

const styles = {
    card: {
        width:'140px',
        margin:'5px',
        flexShrink:'0',
    }
}

class GameCard extends Component {


    render(){
        const removeBtn = this.props.serverDeck ? (
            <Card.Content extra>
                {this.props.removeable ? (<Button size="mini" basic compact onClick = {() => {this.props.removeCard(this.props.id)}}>Remove</Button>) :
                (<Label size="mini" color='teal'>
                {this.props.owner.name}
                <Label.Detail>Owner</Label.Detail>
                </Label>)}
            </Card.Content>) : null;

        return(
            <Card id={this.props.id} style={styles.card} onClick={this.props.onclick ? (event) => {this.props.onclick(event)} : null}>
                    <Card.Content style={{flexGrow:0}} header= {this.props.title} />
                    <Card.Content description = {this.props.description} />
                        {removeBtn}
            </Card>
        )
    }
}

export default GameCard;
