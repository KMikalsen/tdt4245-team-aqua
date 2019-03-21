import React, {
    Component
} from 'react';
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        width:'190px',
        margin:'5px',
        flexShrink:'0',
    }
}

class GameCard extends Component {


    render(){
        const removeBtn = this.props.removeable ? (<CardActions>
            <Button size="small" onClick = {() => {this.props.removeCard(this.props.id)}}>Remove</Button>
        </CardActions>) : null;

        return(
            <Card id={"card" + this.props.id} m={1} width={190} style={styles.card} >
            <CardActionArea id={this.props.id} onClick={this.props.onclick ? (event) => {this.props.onclick(event)} : null} >
                <CardContent >
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.title}
                    </Typography>
                    <Typography component="p">
                        {this.props.description}
                    </Typography>
                </CardContent>
                </CardActionArea>
                {removeBtn}
            </Card>
        )
    }
}

export default GameCard;
