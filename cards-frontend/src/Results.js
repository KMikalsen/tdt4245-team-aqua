import React, {
    Component
} from 'react';
import {Segment, Table, Header} from 'semantic-ui-react';

class Results extends Component {
    componentDidMount() {
        this.props.resetCounter();
    }
    componentDidUpdate() {
        this.props.resetCounter();
    }
    render(){
        console.log("feedback", this.props.feedback)

        const feedback = this.props.feedback.map((item, index) => {
            console.log("item", item.scenario.title)
            return <div>
            <Header as='h2' attached='top'>
                Scenario #{index+1}: {item.scenario.title}
            </Header >
            <Segment attached>
                <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Card</Table.HeaderCell>
                        <Table.HeaderCell>Feedback</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {item.feedback.map(cardItem=>{
                        return (
                            <Table.Row>
                               <Table.Cell>
                                 <Header as='h4'>
                                   <Header.Content>
                                     {cardItem.title}
                                   </Header.Content>
                                 </Header>
                               </Table.Cell>
                               <Table.Cell>{cardItem.feedback}</Table.Cell>
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
