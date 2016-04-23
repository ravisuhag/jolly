import React from 'react';
import {render} from 'react-dom';

// class App extends React.Component {
//     getIntitalState(){
//         return {
//             count: 5
//         };
//     }
//     render () {
//         return <p> 
//                 Hello {this.props.name} ! {this.state}
//             </p>;
//     }
// }

// render(<App name="Ravi Suhag"/>, document.getElementById('app'));

// render(<App name="Parveen Suhag"/>, document.getElementById('app2'));



var Comment = React.createClass({
    getIntitalState: function(){
        return {
            count: 5
        };
    },
    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.name}
                    {this.state.count}
                </h2>
            </div>
        );
    }
});

render(<Comment name="Ravi Suhag"/>, document.getElementById('app'));
