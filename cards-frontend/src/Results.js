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
        const feedback = this.props.feedback.map(item => {
            return <Segment>
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
        })

        return(
            <div className="resultsContent">
            {feedback}
            </div>
        )
    }
}

export default Results;
