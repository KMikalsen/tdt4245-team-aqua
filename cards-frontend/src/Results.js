import React, {
    Component
} from 'react';
import {Segment, Table, Header, Label} from 'semantic-ui-react';

const feedbackcolor = (color) => {
    switch (color) {
        case "red":
            return "negative";
            break;
        case "green":
            return "positive";
            break;
        default:
            return "warning";
    }
}

class Results extends Component {
    render(){
        console.log("feedback", this.props.feedback)

        const feedback = this.props.feedback.map((item, index) => {
            console.log("item", item.scenario.title)
            return <div>
            <Header as='h2' attached='top'>
                Scenario #{index+1}: {item.scenario.title}
            </Header >
            <Segment attached>
                <Table basic celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Card</Table.HeaderCell>
                        <Table.HeaderCell>Rating</Table.HeaderCell>
                        <Table.HeaderCell>Feedback</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {item.feedback.map(cardItem=>{
                        return (
                            <Table.Row>
                               <Table.Cell className={feedbackcolor(cardItem.color)}>
                                 <Header as='h4'>
                                   <Header.Content>
                                    {cardItem.title}
                                   </Header.Content>
                                 </Header>
                               </Table.Cell>
                               <Table.Cell textAlign='center' className={feedbackcolor(cardItem.color)}>
                               <Label circular empty color={cardItem.color} />
                               </Table.Cell>
                               <Table.Cell className={feedbackcolor(cardItem.color)} >{cardItem.feedback}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
                </Table>
            </Segment>
            </div>
        })

        return(
            <div className="resultsContent">
            {feedback}
            </div>
        )
    }
}

export default Results;
