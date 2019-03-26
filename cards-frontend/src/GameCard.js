import React, {
    Component
} from 'react';

import { Button, Card } from 'semantic-ui-react';

const styles = {
    card: {
        width:'140px',
        margin:'5px',
        flexShrink:'0',
    }
}

class GameCard extends Component {


    render(){
        const removeBtn = this.props.removeable ? (
            <Card.Content extra>
                <Button size="mini" basic compact onClick = {() => {this.props.removeCard(this.props.id)}}>Remove</Button>
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
