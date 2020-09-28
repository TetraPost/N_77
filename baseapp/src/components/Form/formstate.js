import React from 'react';

function formState(props){
    const { color = '', children } = props;
    return (
        <div>
        {color}
        </div>
    )
};
export default formState;