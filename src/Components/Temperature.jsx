import React from "react";

class Temperature extends React.Component {
    render() {
        return (
            <div 
                style={{
                    display: 'flex',
                    alignContent: 'flex-end',
                    alignItems: 'flex-end',
                    ...this.props.style
                }}
                className={this.props.className}
            >
                {this.props.temperature} 
                <div 
                    style={{
                        fontSize: 60,
                        marginBottom: 14,
                        marginLeft: 12,
                    }}
                >
                    {this.props.degree[0]}
                </div>
            </div>
        );
    };
};

export default Temperature;